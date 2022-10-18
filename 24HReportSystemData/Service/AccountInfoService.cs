using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.ViewModel.Account;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repositories;
using ReportSystemData.Service.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReportSystemData.Service
{
    public partial interface IAccountInfoService : IBaseService<AccountInfo>
    {
        Task<bool> CreateAccountInfoAsync(AccountInfo accInfo);
        bool UpdateAccountInfo(UpdateAccountViewModel accountInfo);
        AccountInfo GetAccountInfoByID(string email);
        List<AccountInfo> GetAllAccountInfo();
        //void UpdateAccountWordLoad();
    }
    public class AccountInfoService : BaseService<AccountInfo>, IAccountInfoService
    {
        public AccountInfoService(DbContext context, IAccountInfoRepository repository) : base(context, repository)
        {
            _dbContext = context;
        }

        public async Task<bool> CreateAccountInfoAsync(AccountInfo accInfo)
        {
            var checkAccountInfo = CheckAvaiAccountInfo(accInfo.AccountId);
            if (!checkAccountInfo)
            {
                await CreateAsyn(accInfo);
                return true;
            }
            return false;
        }

        public bool CheckAvaiAccountInfo(string accountID)
        {
            var check = Get().Where(acc => acc.AccountId.Equals(accountID)).FirstOrDefault();
            if (check != null)
            {
                return true;
            }
            return false;
        }
        public AccountInfo GetAccountInfoByID(string accountID)
        {
            var accountInfo = Get().Where(p => p.AccountId.Equals(accountID)).FirstOrDefault();
            if (accountInfo != null)
            {
                return accountInfo;
            }
            return null;
        }

        public bool UpdateAccountInfo(UpdateAccountViewModel accountInfo)
        {
            var accInfo = GetAccountInfoByID(accountInfo.AccountID);
            if (accInfo != null)
            {
                if (accountInfo.Fullname != null)
                {
                    accInfo.Fullname = accountInfo.Fullname;
                }
                if (accountInfo.Address != null)
                {
                    accInfo.Address = accountInfo.Address;
                }
                if (string.IsNullOrEmpty(accountInfo.Address))
                {
                    accInfo.Address = null;
                }
                if (accountInfo.IdentityCard != null)
                {
                    accInfo.IdentityCard = accountInfo.IdentityCard;
                }
                if (string.IsNullOrEmpty(accountInfo.IdentityCard))
                {
                    accInfo.IdentityCard = null;
                }
                Update(accInfo);
                return true;
            }
            return false;
        }
        public List<AccountInfo> GetAllAccountInfo()
        {
            var accInfo = Get().ToList();
            return accInfo;
        }
        //public void UpdateAccountWordLoad()
        //{
        //    var listAccount = Get().Where(p => p.IsAuthen == true).ToList();
        //    foreach (var item in listAccount)
        //    {
        //        var workNum = GetNumUserWorkLoad(item.Email);
        //        item.WorkLoad = workNum;
        //        Update(item);
        //    }
        //}

        //public int GetNumUserWorkLoad(string email)
        //{
        //    var taskPara1 = new TaskParameters()
        //    {
        //        EditorID = email,
        //        Status = 1
        //    };
        //    var task1 = _taskService.GetAllTask(taskPara1);
        //    var taskPara2 = new TaskParameters()
        //    {
        //        EditorID = email,
        //        Status = 2
        //    };
        //    var task2 = _taskService.GetAllTask(taskPara2);
        //    var taskNum = task1.Count() + task2.Count();
        //    return taskNum;
        //}
    }
}
