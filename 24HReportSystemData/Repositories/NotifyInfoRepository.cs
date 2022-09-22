using _24HReportSystemData.Models;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.Repositories
{
    public partial interface INotifyInfoRepository : IBaseRepository<NotifyInfo>
    {
    }
    public partial class NotifyInfoRepository : BaseRepository<NotifyInfo>, INotifyInfoRepository
    {
        public NotifyInfoRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
