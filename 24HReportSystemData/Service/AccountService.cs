using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Response;
using _24HReportSystemData.ViewModel.Account;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repositories;
using ReportSystemData.Service.Base;
using ReportSystemData.ViewModel.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ReportSystemData.Service
{
    public partial interface IAccountService : IBaseService<Account>
    {
        List<Account> GetAllAccount(AccountParameters accountParameters);
        Account Login(LoginParameter login);
        bool CheckAvaiAccount(string email);
        Task<Account> RegisterAsync(CreateAccountViewModel account);
        Account GetAccountByID(string email);
        SuccessResponse UpdateAccount(UpdateAccountViewModel model);
        SuccessResponse CheckAccountRegister(string phoneNumber);
        List<Account> GetAllEditorAccount();
        Account GetMinWorkLoad(int rootCate);
        Task<Account> LoginWithGoogleAsync(string email);
        SuccessResponse UpdateAccountAuthen(string accountID);
        bool UpdateAccountWorkLoad(string email, int workNum);
        int CheckAccountIsActiveNotify(string officeID);
        Task<Account> GetAccountNotify(string officeID);
        SuccessResponse UpdateAccountLocation(UpdateLocationAccountViewModel model);

    }
    public partial class AccountService : BaseService<Account>, IAccountService
    {
        private readonly IAccountInfoService _accountInfoService;
        private readonly ICategoryService _categoryService;
        public AccountService(DbContext context, IAccountRepository repository, IAccountInfoService accountInfoService, ICategoryService categoryService) : base(context, repository)
        {
            _dbContext = context;
            _accountInfoService = accountInfoService;
            _categoryService = categoryService;
        }
        public List<Account> GetAllAccount(AccountParameters accountParameters)
        {
            var account = Get().Include(role => role.Role)
                .Include(info => info.AccountInfo)
                .Include(c => c.SpecializeNavigation)
                .ToList();
            if (accountParameters.RoleId != null)
            {
                account = account.Where(p => p.RoleId.Equals(accountParameters.RoleId)).ToList();
            }
            if (accountParameters.OfficeId != null)
            {
                account = account.Where(p => !String.IsNullOrEmpty(p.OfficeId) ? p.OfficeId.Equals(accountParameters.OfficeId) : false).ToList();
            }
            if (accountParameters.IsActive != null)
            {
                if (accountParameters.IsActive == true)
                {
                    account = account.Where(p => p.IsActive == true).ToList();
                }
                else if (accountParameters.IsActive == false)
                {
                    account = account.Where(p => p.IsActive == false).ToList();
                }
            }
            if (accountParameters.IsAuthen != null)
            {
                if (accountParameters.IsAuthen == true)
                {
                    account = account.Where(p => p.IsAuthen == true).ToList();
                }
                else if (accountParameters.IsAuthen == false)
                {
                    account = account.Where(p => p.IsAuthen == false).ToList();
                }
            }
            if (accountParameters.TotalScore != null)
            {
                if ((bool)accountParameters.TotalScore)
                {
                    account = account.OrderByDescending(p => p.TotalScore).ToList();
                }
                else
                {
                    account = account.OrderBy(p => p.TotalScore).ToList();
                }
            }
            if (accountParameters.WorkLoad != null)
            {
                if ((bool)accountParameters.WorkLoad)
                {
                    account = account.OrderByDescending(p => p.WorkLoad).ToList();
                }
                else
                {
                    account = account.OrderBy(p => p.WorkLoad).ToList();
                }
            }
            return account;
        }
        public List<Account> GetAllEditorAccount()
        {
            var listAcc = Get().Where(p => p.RoleId == 3).ToList();
            return listAcc;
        }
        public async Task<Account> GetAccountNotify(string officeID)
        {
            var account = Get().Where(p => p.OfficeId.Equals(officeID) && p.TokenId != null && p.IsActive == true).FirstOrDefault();
            if (account != null)
            {
                if (account.IsActive == true)
                {
                    account.IsActive = false;
                    Update(account);
                    return account;
                }
            }
            return null;
        }
        public SuccessResponse ChangePassword(ChangePasswordViewModel model)
        {
            var acc = GetAccountByID(model.AccountID);
            if(acc != null)
            {
                if(acc.Password.Equals(model.Password))
                {
                    throw new ErrorResponse("Xin vui lòng không nhập mật khẩu đã dùng trước đó!!!", (int)HttpStatusCode.NotFound);
                }
                acc.Password = model.Password;
                Update(acc);
                return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
            }
            throw new ErrorResponse("Không tìm thấy tài khoản!!!", (int)HttpStatusCode.NotFound);
        }
        public Account Login(LoginParameter login)
        {
            //if(login.Email != null && login.PhoneNumber != null)
            //{
            //    throw new ErrorResponse("Only login with Email or Password!!!", (int)HttpStatusCode.NotFound);
            //}
            var isEmail = Regex.IsMatch(login.Account, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
            var isPhoneNumber = Regex.IsMatch(login.Account, @"^[0-9]{10}$", RegexOptions.IgnoreCase);
            if (isEmail && isPhoneNumber)
            {
                throw new ErrorResponse("Email hoặc mật khấu không hợp lệ!!!", (int)HttpStatusCode.NotFound);
            }
            if (!isEmail && !isPhoneNumber)
            {
                throw new ErrorResponse("Email hoặc mật khấu không hợp lệ!!!", (int)HttpStatusCode.NotFound);
            }
            if (isEmail && !isPhoneNumber)
            {
                var account = Get().Where(acc => acc.Email.Equals(login.Account) && acc.Password.Equals(ParseSHA256(login.Password)))
                    .Include(role => role.Role).Include(info => info.AccountInfo).FirstOrDefault();
                if (account != null)
                {
                    return account;
                }
                throw new ErrorResponse("Email hoặc mật khấu không hợp lệ!!!", (int)HttpStatusCode.NotFound);
            }
            if (!isEmail && isPhoneNumber)
            {
                var account = Get().Where(acc => acc.PhoneNumber.Equals(login.Account) && acc.Password.Equals(ParseSHA256(login.Password)))
                    .Include(role => role.Role).Include(info => info.AccountInfo).FirstOrDefault();
                if (account != null)
                {
                    return account;
                }
                throw new ErrorResponse("Email hoặc mật khấu không hợp lệ!!!", (int)HttpStatusCode.NotFound);
            }
            return null;
        }
        public async Task<Account> LoginWithGoogleAsync(string email)
        {
            if (FirebaseApp.DefaultInstance == null)
            {
                FirebaseApp.Create(new AppOptions()
                {
                    Credential = GoogleCredential.FromFile("../backend/firebaseAuth.json"),
                });
            }
            try
            {
                var account = await FirebaseAuth.DefaultInstance.GetUserByEmailAsync(email);
                if (account.EmailVerified)
                {
                    var tmpAcc = Get().Where(p => p.Email.Equals(account.Email))
                        .Include(r => r.AccountInfo)
                        .Include(r => r.Role)
                        .FirstOrDefault();
                    if (tmpAcc != null)
                    {
                        return tmpAcc;
                    }
                    else
                    {
                        var acc = new CreateAccountViewModel()
                        {
                            Email = account.Email,
                            Password = "123456",
                            RoleId = 1,
                            PhoneNumber = account.PhoneNumber,
                            Fullname = account.DisplayName
                        };
                        var tmp = await RegisterAsync(acc);
                        if (tmp != null)
                        {
                            return tmp;
                        }
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new ErrorResponse(ex.Message, (int)HttpStatusCode.NotFound);
            }
        }
        public Account GetAccountByID(string email)
        {
            var acc = Get().Where(ac => ac.AccountId.Equals(email))
                .Include(r => r.AccountInfo)
                .Include(r => r.Role)
                .Include(r => r.SpecializeNavigation)
                .FirstOrDefault();
            if (acc != null)
            {
                return acc;
            }
            return null;
        }
        public SuccessResponse CheckAccountRegister(string phoneNumber)
        {
            //var acc = Get().Where(ac => ac.Email.Equals(email) && ac.PhoneNumber.Equals(phoneNumber)).FirstOrDefault();
            //if (acc != null)
            //{
            //    throw new ErrorResponse("Email hoặc số điện thoại đã tồn tại!!!", (int)HttpStatusCode.NotFound);
            //}
            var checkDupliPhone = Get().Where(ac => ac.PhoneNumber.Equals(phoneNumber)).FirstOrDefault();
            if (checkDupliPhone != null)
            {
                throw new ErrorResponse("Số điện thoại đã tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
            //var checkDupliEmail = Get().Where(ac => ac.Email.Equals(email)).FirstOrDefault();
            //if (checkDupliEmail != null)
            //{
            //    throw new ErrorResponse("Email đã tồn tại!!!", (int)HttpStatusCode.NotFound);
            //}
            //if (acc == null)
            //{
            return new SuccessResponse((int)HttpStatusCode.OK, "Số điện thoại hợp lệ");
            //}
            //throw new ErrorResponse("Email hoặc số điện thoại không hợp lệ!!!", (int)HttpStatusCode.NotFound);
        }
        public SuccessResponse UpdateAccountAuthen(string accountID)
        {
            if (!String.IsNullOrEmpty(accountID))
            {
                var acc = GetAccountByID(accountID);
                if (acc != null)
                {
                    acc.IsAuthen = true;
                    Update(acc);
                    return new SuccessResponse((int)HttpStatusCode.OK, "Tài khoản đã được xác minh");
                }
                throw new ErrorResponse("Tài khoản xác minh thất bại!!!", (int)HttpStatusCode.NotFound);
            }
            throw new ErrorResponse("AccountID không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
        public bool CheckAvaiAccount(string email)
        {
            var listAccount = Get().ToList();
            foreach (Account account in listAccount)
            {
                if (account.AccountId.Equals(email))
                {
                    return true;
                }
            }
            return false;
        }
        public async Task<Account> RegisterAsync(CreateAccountViewModel account)
        {
            if (account.Email != null)
            {
                bool isEmail = Regex.IsMatch(account.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
                if (!isEmail)
                {
                    throw new ErrorResponse("Sai định dạng Email!!!", (int)HttpStatusCode.NotFound);
                }
            }
            if (account.PhoneNumber != null)
            {
                bool isPhoneNumber = Regex.IsMatch(account.PhoneNumber, @"^[0-9]{10}$", RegexOptions.IgnoreCase);
                if (!isPhoneNumber)
                {
                    throw new ErrorResponse("Sai định dạng Số điện thoại!!!", (int)HttpStatusCode.NotFound);
                }
            }
            if (account.IdentityCard != null)
            {
                bool isIdentityCard = Regex.IsMatch(account.IdentityCard, @"[0-9]{9}", RegexOptions.IgnoreCase);
                if (!isIdentityCard)
                {
                    throw new ErrorResponse("Sai định dạng chứng minh nhân dân!!!", (int)HttpStatusCode.NotFound);
                }
            }
            var pass = QuickHash(account.Password);
            var accountTmp = new Account()
            {
                AccountId = Guid.NewGuid().ToString(),
                Email = account.Email,
                Password = pass,
                RoleId = account.RoleId,
                PhoneNumber = account.PhoneNumber,
                WorkLoad = 0,
                TotalScore = 0,
                OfficeId = !String.IsNullOrEmpty(account.OfficeId) ? account.OfficeId : null,
                TokenId = !String.IsNullOrEmpty(account.TokenId) ? account.TokenId : null
            };
            var accountInfoTmp = new AccountInfo()
            {
                AccountId = accountTmp.AccountId,
                Fullname = account.Fullname,
                Address = account.Address,
                IdentityCard = account.IdentityCard,
            };
            await CreateAsyn(accountTmp);
            var check = await _accountInfoService.CreateAccountInfoAsync(accountInfoTmp);
            if (check)
            {
                var acc = GetAccountByID(accountTmp.AccountId);
                if (acc != null)
                {
                    return acc;
                }
                throw new ErrorResponse("Không tìm thấy Email!!!", (int)HttpStatusCode.NotFound);
            }
            throw new ErrorResponse("Email này đã tồn tại. Vui lòng chọn Email khác!!!", (int)HttpStatusCode.NoContent);
        }
        public string ParseSHA256(string randomString)
        {
            var crypt = new System.Security.Cryptography.SHA256Managed();
            var hash = new System.Text.StringBuilder();
            byte[] crypto = crypt.ComputeHash(Encoding.UTF8.GetBytes(randomString));
            foreach (byte theByte in crypto)
            {
                hash.Append(theByte.ToString("x2"));
            }
            return hash.ToString();
        }
        public string QuickHash(string secret)
        {
            using var sha256 = SHA256.Create();
            var secretBytes = Encoding.UTF8.GetBytes(secret);
            var secretHash = sha256.ComputeHash(secretBytes);
            return Convert.ToHexString(secretHash);
        }
        public SuccessResponse UpdateAccountLocation(UpdateLocationAccountViewModel model)
        {
            var acc = GetAccountByID(model.AccountID);
            if(acc == null)
            {
                throw new ErrorResponse("Không tìm thấy Email!!!", (int)HttpStatusCode.NotFound);
            }
            acc.Latitude = model.Latitude;
            acc.Longitude = model.Longitude;
            Update(acc);
            return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
        }
        public SuccessResponse UpdateAccount(UpdateAccountViewModel model)
        {
            var account = GetAccountByID(model.AccountID);
            if (account != null)
            {
                //CheckAccountRegister(model.Email, model.PhoneNumber);
                if (!String.IsNullOrEmpty(account.PhoneNumber))
                {
                    if (!account.PhoneNumber.Equals(model.PhoneNumber))
                    {
                        if (!String.IsNullOrEmpty(model.PhoneNumber))
                        {
                            var checkDupliPhone = Get().Where(ac => ac.PhoneNumber.Equals(model.PhoneNumber)).FirstOrDefault();
                            if (checkDupliPhone != null)
                            {
                                throw new ErrorResponse("Số điện thoại đã tồn tại!!!", (int)HttpStatusCode.NotFound);
                            }
                        }
                    }
                }
                if (!String.IsNullOrEmpty(account.Email))
                {
                    if (!account.Email.Equals(model.Email))
                    {
                        if (!String.IsNullOrEmpty(model.Email))
                        {
                            var checkDupliEmail = Get().Where(ac => ac.Email.Equals(model.Email)).FirstOrDefault();
                            if (checkDupliEmail != null)
                            {
                                throw new ErrorResponse("Email đã tồn tại!!!", (int)HttpStatusCode.NotFound);
                            }
                        }
                    }
                }
                if (model.Email != null)
                {
                    bool isEmail = Regex.IsMatch(model.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
                    if (!isEmail)
                    {
                        throw new ErrorResponse("Sai định dạng Email!!!", (int)HttpStatusCode.NotFound);
                    }
                    else
                    {
                        account.Email = model.Email;
                    }
                }
                if (model.PhoneNumber != null)
                {
                    bool isPhoneNumber = Regex.IsMatch(model.PhoneNumber, @"^[0-9]{10}$", RegexOptions.IgnoreCase);
                    if (!isPhoneNumber)
                    {
                        throw new ErrorResponse("Sai định dạng Số điện thoại!!!", (int)HttpStatusCode.NotFound);
                    }
                    else
                    {
                        account.PhoneNumber = model.PhoneNumber;
                    }
                }
                if (model.IdentityCard != null)
                {
                    bool isIdentityCard = Regex.IsMatch(model.IdentityCard, @"[0-9]{9}", RegexOptions.IgnoreCase);
                    if (!isIdentityCard)
                    {
                        throw new ErrorResponse("Sai định dạng chứng minh nhân dân!!!", (int)HttpStatusCode.NotFound);
                    }
                }
                if (model.Specialize.HasValue && model.Specialize > 0)
                {
                    var checkAvaiCate = _categoryService.CheckAvaiCategoryWithRoot((int)model.Specialize);
                    if (!checkAvaiCate)
                    {
                        throw new ErrorResponse("Danh mục không tồn tại!!!", (int)HttpStatusCode.NotFound);
                    }
                    account.Specialize = model.Specialize;
                }
                if (model.TokenId != null)
                {
                    account.TokenId = model.TokenId;
                }
                if (model.IsActive != null)
                {
                    account.IsActive = (bool)model.IsActive;
                }
                if (model.IsAuthen != null)
                {
                    account.IsAuthen = (bool)model.IsAuthen;
                }
                if(model.Password != null)
                {
                    account.Password = ParseSHA256(model.Password);
                }
                Update(account);
                var check = _accountInfoService.UpdateAccountInfo(model);
                if (check)
                {
                    return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
                }
                throw new ErrorResponse("Cập nhật thất bại!!!", (int)HttpStatusCode.NotFound);
            }
            throw new ErrorResponse("Không tìm thấy Email!!!", (int)HttpStatusCode.NotFound);
        }

        public Account GetMinWorkLoad(int rootCate)
        {
            var listAcc = Get().Where(p => p.RoleId == 3).OrderBy(p => p.WorkLoad).ToList();
            foreach (var item in listAcc)
            {
                if (item.Specialize == rootCate)
                {
                    return item;
                }
            }
            return null;
        }
        public bool UpdateAccountWorkLoad(string accountID, int workNum)
        {
            var acc = GetAccountByID(accountID);
            if (acc != null)
            {
                acc.WorkLoad = workNum;
                Update(acc);
                return true;
            }
            return false;
        }

        public int CheckAccountIsActiveNotify(string officeID)
        {
            var listAcc = Get().Where(p => p.OfficeId.Equals(officeID)).ToList();
            if (listAcc != null)
            {
                var activeOfficerNum = 0;
                foreach (var item in listAcc)
                {
                    if (item.IsActive)
                    {
                        activeOfficerNum++;
                    }
                }
                if (activeOfficerNum != 0)
                {
                    return activeOfficerNum;
                }
            }
            return 0;
        }
    }
}
