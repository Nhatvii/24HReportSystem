using _24HReportSystemData.Models;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReportSystemData.Repositories
{
    public partial interface IPostRepository : IBaseRepository<Post>
    {
    }
    public partial class PostRepository : BaseRepository<Post>, IPostRepository
    {
        public PostRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
