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
    public partial interface IOfficeRepository : IBaseRepository<OfficeInfo>
    {
    }
    public partial class OfficeRepository : BaseRepository<OfficeInfo>, IOfficeRepository
    {
        public OfficeRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
