using _24HReportSystemData.Models;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReportSystemData.Repository
{
    public partial interface IReportRepository : IBaseRepository<Report>
    {
    }
    public partial class ReportRepository : BaseRepository<Report>, IReportRepository
    {
        public ReportRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
