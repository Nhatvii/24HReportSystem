using _24HReportSystemData.Models;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReportSystemData.Repositories
{
    public partial interface ICategoryRepository : IBaseRepository<Category>
    {
    }
    public partial class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
