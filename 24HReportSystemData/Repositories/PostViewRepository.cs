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
    public partial interface IPostViewRepository : IBaseRepository<PostView>
    {
    }
    public class PostViewRepository : BaseRepository<PostView>, IPostViewRepository
    {
        public PostViewRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
