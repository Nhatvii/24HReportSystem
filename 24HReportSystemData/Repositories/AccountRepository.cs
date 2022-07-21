using _24HReportSystemData.Models;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReportSystemData.Repositories
{
    public partial interface IAccountRepository : IBaseRepository<Account>
    {
    }
    public partial class AccountRepository : BaseRepository<Account>, IAccountRepository
    {
        public AccountRepository(DbContext  dbContext): base(dbContext)
        {
        }
    }
}
