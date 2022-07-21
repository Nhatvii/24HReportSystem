using _24HReportSystemData.Models;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReportSystemData.Repositories
{
    public partial interface IEmotionRepository : IBaseRepository<Emotion>
    {
    }
    public class EmotionRepository : BaseRepository<Emotion>, IEmotionRepository
    {
        public EmotionRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
