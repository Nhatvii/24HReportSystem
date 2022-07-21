using _24HReportSystemData.Models;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReportSystemData.Repositories
{
    public partial interface IAccountInfoRepository : IBaseRepository<AccountInfo>
    {
    }
    public partial class AccountInfoRepository : BaseRepository<AccountInfo>, IAccountInfoRepository
    {
        public AccountInfoRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
