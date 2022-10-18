using _24HReportSystemData.Models;
using _24HReportSystemData.Repositories;
using _24HReportSystemData.Service;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ReportSystemData.Repositories;
using ReportSystemData.Repository;
using ReportSystemData.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.DependencyInjection
{
    public static class DIResolver
    {
        public static void IntializerDI(this IServiceCollection services)
        {
            services.AddScoped<DbContext, _24HReportSystemContext>();

            services.AddScoped<IReportService, ReportService>();
            services.AddScoped<IReportRepository, ReportRepository>();

            services.AddScoped<IPostService, PostService>();
            services.AddScoped<IPostRepository, PostRepository>();

            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IAccountRepository, AccountRepository>();

            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();

            services.AddScoped<IAccountInfoService, AccountInfoService>();
            services.AddScoped<IAccountInfoRepository, AccountInfoRepository>();

            services.AddScoped<IReportDetailService, ReportDetailService>();
            services.AddScoped<IReportDetailRepository, ReportDetailRepository>();

            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<ICommentRepository, CommentRepository>();

            services.AddScoped<IEmotionService, EmotionService>();
            services.AddScoped<IEmotionRepository, EmotionRepository>();

            services.AddScoped<IReportViewService, ReportViewService>();
            services.AddScoped<IReportViewRepository, ReportViewRepository>();

            services.AddScoped<IReportTaskService, ReportTaskService>();
            services.AddScoped<IReportTaskRepository, ReportTaskRepository>();

            services.AddScoped<ITaskService, TaskService>();
            services.AddScoped<ITaskRepository, TaskRepository>();

            services.AddScoped<IBoardService, BoardService>();
            services.AddScoped<IBoardRepository, BoardRepository>();

            services.AddScoped<IOfficeService, OfficeService>();
            services.AddScoped<IOfficeRepository, OfficeRepository>();

            services.AddScoped<INotifyInfoService, NotifyInfoService>();
            services.AddScoped<INotifyInfoRepository, NotifyInfoRepository>();

        }
    }
}
