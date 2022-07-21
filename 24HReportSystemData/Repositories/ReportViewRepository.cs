using _24HReportSystemData.Models;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReportSystemData.Repositories
{
    public partial interface IReportViewRepository : IBaseRepository<ReportView>
    {
    }
    public partial class ReportViewRepository : BaseRepository<ReportView>, IReportViewRepository
    {
        public ReportViewRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
