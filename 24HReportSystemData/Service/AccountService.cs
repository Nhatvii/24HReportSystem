﻿using _24HReportSystemData.Models;
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
        SuccessResponse CheckAccountRegister(string phoneNumber);
        List<Account> GetAllEditorAccount();
        Account GetMinWorkLoad(int rootCate);
        Task<Account> LoginWithGoogleAsync(string email);
        SuccessResponse UpdateAccountAuthen(string accountID);
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
        public async Task<Account> LoginWithGoogleAsync(string email)
        {
            if(FirebaseApp.DefaultInstance == null)
            {
                FirebaseApp.Create(new AppOptions()
                {
                    Credential = GoogleCredential.FromFile("../backend/firebaseAuth.json"),
                });
            }
            try
            {
                var account = await FirebaseAuth.DefaultInstance.GetUserByEmailAsync(email);
                if(account.EmailVerified)
                {
                    var tmpAcc = Get().Where(p => p.Email.Equals(account.Email))
                        .Include(r => r.AccountInfo)
                        .ThenInclude(p => p.SpecializeNavigation)
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
                            Username = account.DisplayName
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
            return null;
        }
        public Account GetAccountByID(string email)
        {
            var acc = Get().Where(ac => ac.AccountId.Equals(email))
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
        public SuccessResponse CheckAccountRegister(string phoneNumber)
        {
            //var acc = Get().Where(ac => ac.Email.Equals(email) && ac.PhoneNumber.Equals(phoneNumber)).FirstOrDefault();
            //if (acc != null)
            //{
            //    throw new ErrorResponse("Email hoặc số điện thoại đã tồn tại!!!", (int)HttpStatusCode.NotFound);
            //}
            var checkDupliPhone = Get().Where(ac => ac.PhoneNumber.Equals(phoneNumber)).FirstOrDefault();
            if(checkDupliPhone != null)
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
            if(!String.IsNullOrEmpty(accountID))
            {
                var check = _accountInfoService.UpdateAccountInfoAuthen(accountID);
                if(check)
                {
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

            var accountTmp = new Account()
            {
                AccountId = Guid.NewGuid().ToString(),
                Email = account.Email,
                Password = account.Password,
                RoleId = account.RoleId,
                PhoneNumber = account.PhoneNumber
            };
            var accountInfoTmp = new AccountInfo()
            {
                AccountId = accountTmp.AccountId,
                Username = account.Username,
                Address = account.Address,
                IdentityCard = account.IdentityCard,
                WorkLoad = 0
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
                    }else
                    {
                        account.Email = model.Email;
                        Update(account);
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
                        Update(account);
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
                    if(item.AccountId.Equals(items.AccountId) && item.Specialize == rootCate)
                    {
                        return items;
                    }
                }
            }
            return null;
        }
    }
}
