using _24HReportSystemData.Models;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReportSystemData.Repositories
{
    public partial interface IRootCategoryRepository : IBaseRepository<RootCategory>
    {
    }
    public partial class RootCategoryRepository : BaseRepository<RootCategory>, IRootCategoryRepository
    {
        public RootCategoryRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
