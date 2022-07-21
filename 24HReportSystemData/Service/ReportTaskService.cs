using _24HReportSystemData.Constants;
using _24HReportSystemData.Models;
using _24HReportSystemData.Response;
using _24HReportSystemData.ViewModel.ReportTask;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repositories;
using ReportSystemData.Service.Base;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace ReportSystemData.Service
{
    public partial interface IReportTaskService : IBaseService<ReportTask>
    {
        SuccessResponse CreateReportTask(CreateReportTaskViewModel model);
    }
    public class ReportTaskService : BaseService<ReportTask>, IReportTaskService
    {
        public ReportTaskService(DbContext context, IReportTaskRepository repository) : base(context, repository)
        {
            _dbContext = context;
        }

        public SuccessResponse CreateReportTask(CreateReportTaskViewModel model)
        {
            var reportTask = new ReportTask()
            {
                TaskId = model.TaskId,
                ReportId = model.ReportId,
                CreateTime = (DateTime)model.CreateTime,
                Status = TaskConstants.STATUS_TASK_NEW
            };
            Create(reportTask);
            return new SuccessResponse((int)HttpStatusCode.OK, "Tạo thành công");
        }
    }
}
