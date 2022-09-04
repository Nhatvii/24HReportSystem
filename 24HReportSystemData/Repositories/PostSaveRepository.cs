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
    public partial interface IPostSaveRepository : IBaseRepository<PostSave>
    {
    }
    public class PostSaveRepository : BaseRepository<PostSave>, IPostSaveRepository
    {
        public PostSaveRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
