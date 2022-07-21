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
    public partial interface IBoardRepository : IBaseRepository<Board>
    {
    }
    public partial class BoardRepository : BaseRepository<Board>, IBoardRepository
    {
        public BoardRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
