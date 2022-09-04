using _24HReportSystemData.Models;
using _24HReportSystemData.Response;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repositories;
using ReportSystemData.Service.Base;
using ReportSystemData.ViewModel.ReportView;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ReportSystemData.Service
{
    public partial interface IReportViewService : IBaseService<ReportView>
    {
        Task<SuccessResponse> CreateReportViewAsync(CreateReportViewViewModel report);
    }
    public partial class ReportViewService : BaseService<ReportView>, IReportViewService
    {
        private readonly IAccountService _accountService;
        private readonly IReportService _reportService;
        public ReportViewService(DbContext context, IReportViewRepository repository,
            IAccountService accountService, IReportService reportService) : base(context, repository)
        {
            _dbContext = context;
            _accountService = accountService;
            _reportService = reportService;
        }

        public async Task<SuccessResponse> CreateReportViewAsync(CreateReportViewViewModel report)
        {
            var checkAcc = _accountService.CheckAvaiAccount(report.UserId);
            if(!checkAcc)
            {
                throw new ErrorResponse("Tài khoản không tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
            var checkPost = _reportService.GetReportByID(report.ReportId);
            if(checkPost == null)
            {
                throw new ErrorResponse("Báo cáo không tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
            if(report.ReportId != null && report.UserId != null)
            {
                bool check = checkReportView(report.ReportId, report.UserId);
                if (!check)
                {
                    var reportView = new ReportView()
                    {
                        ReportId = report.ReportId,
                        UserId = report.UserId
                    };
                    await CreateAsyn(reportView);
                }
                return new SuccessResponse((int)HttpStatusCode.OK, "Tạo thành công");
            }
            throw new ErrorResponse("Tạo thất bại!!!", (int)HttpStatusCode.Conflict);
        }
        public bool checkReportView(string reportID, string userID)
        {
            var check = Get().Where(e => e.ReportId.Equals(reportID) && e.UserId.Equals(userID)).FirstOrDefault();
            if(check != null)
            {
                return true;
            }
            return false;
        }
    }
}
