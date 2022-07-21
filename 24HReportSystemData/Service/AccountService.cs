using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Response;
using _24HReportSystemData.ViewModel.Account;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repositories;
using ReportSystemData.Service.Base;
using ReportSystemData.ViewModel.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ReportSystemData.Service
{
    public partial interface IAccountService : IBaseService<Account>
    {
        List<Account> GetAllAccount();
        Account Login(LoginParameter login);
        bool CheckAvaiAccount(string email);
        Task<Account> RegisterAsync(CreateAccountViewModel account);
        Account GetAccountByID(string email);
        SuccessResponse UpdateAccount(UpdateAccountViewModel model);
        SuccessResponse CheckAccountRegister(string email, string phoneNumber);
        List<Account> GetAllEditorAccount();
        Account GetMinWorkLoad(int rootCate);
    }
    public partial class AccountService : BaseService<Account>, IAccountService
    {
        private readonly IAccountInfoService _accountInfoService;
        public AccountService(DbContext context, IAccountRepository repository, IAccountInfoService accountInfoService) : base(context, repository)
        {
            _dbContext = context;
            _accountInfoService = accountInfoService;
        }
        public List<Account> GetAllAccount()
        {
            var account = Get().Include(role => role.Role).Include(info => info.AccountInfo).ThenInclude(p => p.SpecializeNavigation).ToList();
            return account;
        }
        public List<Account> GetAllEditorAccount()
        {
            var listAcc = Get().Where(p => p.RoleId == 3).ToList();
            return listAcc;
        }
        public Account Login(LoginParameter login)
        {
            //if(login.Email != null && login.PhoneNumber != null)
            //{
            //    throw new ErrorResponse("Only login with Email or Password!!!", (int)HttpStatusCode.NotFound);
            //}
            var isEmail = Regex.IsMatch(login.Account, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
            var isPhoneNumber = Regex.IsMatch(login.Account, @"^[0-9]{10}$", RegexOptions.IgnoreCase);
            if(isEmail && isPhoneNumber)
            {
                throw new ErrorResponse("Email hoặc mật khấu không hợp lệ!!!", (int)HttpStatusCode.NotFound);
            }
            if (!isEmail && !isPhoneNumber)
            {
                throw new ErrorResponse("Email hoặc mật khấu không hợp lệ!!!", (int)HttpStatusCode.NotFound);
            }
            if (isEmail && !isPhoneNumber)
            {
                var account = Get().Where(acc => acc.Email.Equals(login.Account) && acc.Password.Equals(login.Password))
                    .Include(role => role.Role).Include(info => info.AccountInfo).FirstOrDefault();
                if (account != null)
                {
                    return account;
                }
                throw new ErrorResponse("Email hoặc mật khấu không hợp lệ!!!", (int)HttpStatusCode.NotFound);
            }
            if (!isEmail && isPhoneNumber)
            {
                var account = Get().Where(acc => acc.PhoneNumber.Equals(login.Account) && acc.Password.Equals(login.Password))
                    .Include(role => role.Role).Include(info => info.AccountInfo).FirstOrDefault();
                if (account != null)
                {
                    return account;
                }
                throw new ErrorResponse("Email hoặc mật khấu không hợp lệ!!!", (int)HttpStatusCode.NotFound);
            }
            return null;
        }
        public Account GetAccountByID(string email)
        {
            var acc = Get().Where(ac => ac.Email.Equals(email))
                .Include(r => r.AccountInfo)
                .ThenInclude(p => p.SpecializeNavigation)
                .Include(r => r.Role)
                .FirstOrDefault();
            if (acc != null)
            {
                return acc;
            }
            return null;
        }
        public SuccessResponse CheckAccountRegister(string email, string phoneNumber)
        {
            var acc = Get().Where(ac => ac.Email.Equals(email) && ac.PhoneNumber.Equals(phoneNumber)).FirstOrDefault();
            if (acc != null)
            {
                throw new ErrorResponse("Email & số điện thoại đã tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
            var checkDupliPhone = Get().Where(ac => ac.PhoneNumber.Equals(phoneNumber)).FirstOrDefault();
            if(checkDupliPhone != null)
            {
                throw new ErrorResponse("Số điện thoại đã tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
            var checkDupliEmail = Get().Where(ac => ac.Email.Equals(email)).FirstOrDefault();
            if (checkDupliEmail != null)
            {
                throw new ErrorResponse("Email đã tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
            if (acc == null)
            {
                return new SuccessResponse((int)HttpStatusCode.OK, "Email và số điện thoại hợp lệ");
            }
            throw new ErrorResponse("Email hoặc số điện thoại không hợp lệ!!!", (int)HttpStatusCode.NotFound);
        }
        public bool CheckAvaiAccount(string email)
        {
            var listAccount = Get().ToList();
            foreach (Account account in listAccount)
            {
                if (account.Email.Equals(email))
                {
                    return true;
                }
            }
            return false;
        }
        public async Task<Account> RegisterAsync(CreateAccountViewModel account)
        {
            var checkAccount = CheckAvaiAccount(account.Email);
            if (!checkAccount)
            {
                bool isEmail = Regex.IsMatch(account.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
                if (!isEmail)
                {
                    throw new ErrorResponse("Sai định dạng Email!!!", (int)HttpStatusCode.NotFound);
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
                var accountTmp = new Account()
                {
                    Email = account.Email,
                    Password = account.Password,
                    RoleId = account.RoleId,
                    PhoneNumber = account.PhoneNumber
                };
                var accountInfoTmp = new AccountInfo()
                {
                    Email = account.Email,
                    Username = account.Username,
                    Address = account.Address,
                    IdentityCard = account.IdentityCard,
                    WorkLoad = 0
                };
                await CreateAsyn(accountTmp);
                var check = await _accountInfoService.CreateAccountInfoAsync(accountInfoTmp);
                if (check)
                {
                    var acc = GetAccountByID(account.Email);
                    if (acc != null)
                    {
                        return acc;
                    }
                    throw new ErrorResponse("Không tìm thấy Email!!!", (int)HttpStatusCode.NotFound);
                }
                throw new ErrorResponse("Email này đã tồn tại. Vui lòng chọn Email khác!!!", (int)HttpStatusCode.NoContent);
            }
            throw new ErrorResponse("Email này đã tồn tại. Vui lòng chọn Email khác!!!", (int)HttpStatusCode.NoContent);
        }

        public SuccessResponse UpdateAccount(UpdateAccountViewModel model)
        {
            var account = GetAccountByID(model.Email);
            if (account != null)
            {
                if (model.Email != null)
                {
                    bool isEmail = Regex.IsMatch(model.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
                    if (!isEmail)
                    {
                        throw new ErrorResponse("Sai định dạng Email!!!", (int)HttpStatusCode.NotFound);
                    }
                }
                if (model.PhoneNumber != null)
                {
                    bool isPhoneNumber = Regex.IsMatch(model.PhoneNumber, @"^[0-9]{10}$", RegexOptions.IgnoreCase);
                    if (!isPhoneNumber)
                    {
                        throw new ErrorResponse("Sai định dạng Số điện thoại!!!", (int)HttpStatusCode.NotFound);
                    }
                    account.PhoneNumber = model.PhoneNumber;
                    Update(account);
                }
                if (model.IdentityCard != null)
                {
                    bool isIdentityCard = Regex.IsMatch(model.IdentityCard, @"[0-9]{9}", RegexOptions.IgnoreCase);
                    if (!isIdentityCard)
                    {
                        throw new ErrorResponse("Sai định dạng chứng minh nhân dân!!!", (int)HttpStatusCode.NotFound);
                    }
                }
                if (model.Password != null)
                {
                    account.Password = model.Password;
                    Update(account);
                }
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
            var acc = _accountInfoService.GetMinWorkLoad();
            var listAcc = Get().Where(p => p.RoleId == 3).ToList();
            foreach (var item in acc)
            {
                foreach (var items in listAcc)
                {
                    if(item.Email.Equals(items.Email) && item.Specialize == rootCate)
                    {
                        return items;
                    }
                }
            }
            return null;
        }
    }
}
