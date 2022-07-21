using _24HReportSystemData.Models;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReportSystemData.Repositories
{
    public partial interface IReportTaskRepository : IBaseRepository<ReportTask>
    {
    }
    public partial class ReportTaskRepository : BaseRepository<ReportTask>, IReportTaskRepository
    {
        public ReportTaskRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
