using _24HReportSystemData.Models;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReportSystemData.Repositories
{
    public partial interface ITaskRepository : IBaseRepository<Task>
    {
    }
    public partial class TaskRepository : BaseRepository<Task>, ITaskRepository
    {
        public TaskRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
