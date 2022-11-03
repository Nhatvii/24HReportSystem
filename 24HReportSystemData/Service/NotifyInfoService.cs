using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Repositories;
using _24HReportSystemData.Response;
using _24HReportSystemData.ViewModel.Account;
using _24HReportSystemData.ViewModel.Notify;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Parameter.Report;
using ReportSystemData.Service;
using ReportSystemData.Service.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.Service
{
    public partial interface INotifyInfoService : IBaseService<NotifyInfo>
    {
        List<NotifyInfo> GetAllNotify(NotifyParameters notifyParameters);
        NotifyInfo GetNotifyByID(string notifyID);
        Task<SuccessResponse> CreateNotifyAsync(CreateNotifyViewModel model);
        SuccessResponse UpdateNotifyStatus(string notifyID);
        SuccessResponse CompleteNotify(CompleteNotifyViewModel model);
        
    }
    public partial class NotifyInfoService : BaseService<NotifyInfo>, INotifyInfoService
    {
        private readonly IMapper _mapper;
        private readonly IReportService _reportService;
        private readonly IAccountService _accountService;

        public NotifyInfoService(DbContext context, INotifyInfoRepository repository, IMapper mapper, IReportService reportService, IAccountService accountService) : base(context, repository)
        {
            _dbContext = context;
            _mapper = mapper;
            _reportService = reportService;
            _accountService = accountService;
        }

        public List<NotifyInfo> GetAllNotify(NotifyParameters notifyParameters)
        {
            var noti = Get().Where(p => p.AcceptedDate.Date == DateTime.Today)
                .Include(p => p.Officer).ThenInclude(p => p.AccountInfo)
                .Include(p => p.User).ThenInclude(p => p.AccountInfo)
                .Include(p => p.Office)
                .ToList();
            if(notifyParameters.OfficeId != null)
            {
                noti = noti.Where(p => p.OfficeId.Equals(notifyParameters.OfficeId)).ToList();
            }
            return noti;
        }
        public NotifyInfo GetNotifyByID(string notifyID)
        {
            var notify = Get().Where(p => p.NotifyId.Equals(notifyID))
                .Include(p => p.Officer).ThenInclude(p => p.AccountInfo)
                .Include(p => p.User).ThenInclude(p => p.AccountInfo)
                .Include(p => p.Office)
                .FirstOrDefault();
            if (notify != null)
            {
                return notify;
            }
            throw new ErrorResponse("Thông báo không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
        public async Task<SuccessResponse> CreateNotifyAsync(CreateNotifyViewModel model)
        {
            var notify = _mapper.Map<NotifyInfo>(model);
            notify.NotifyId = Guid.NewGuid().ToString();
            notify.NotifyStatus = true;
            notify.AcceptedDate = DateTime.Now;
            await CreateAsyn(notify);
            return new SuccessResponse((int)HttpStatusCode.OK, notify.NotifyId);
        }

        public SuccessResponse UpdateNotifyStatus(string notifyID)
        {
            var noti = GetNotifyByID(notifyID);
            if(noti != null)
            {
                noti.NotifyStatus = false;
                Update(noti);
                new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật trạng thái thành công");
            }
            throw new ErrorResponse("Thông báo không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }

        public SuccessResponse CompleteNotify(CompleteNotifyViewModel model)
        {
            var notify = GetNotifyByID(model.NotifyId);
            notify.NotifyStatus = false;
            notify.ExecuteTime = model.ExecuteTime;
            notify.SumaryContent = model.SumaryContent;
            Update(notify);
            var updateAcc = new UpdateAccountViewModel()
            {
                AccountID = model.OfficerId,
                IsActive = false
            };
            _accountService.UpdateAccount(updateAcc);
            var reportInfo = new CreateReportViewModel()
            {
                Location = "" + notify.Latitude + "," + notify.Longitude + "",
                TimeFraud = notify.AcceptedDate,
                Description = model.SumaryContent,
                IsAnonymous = false
            };
            var res = _reportService.CreateReportForCompleteNoti(reportInfo);

            if (res.Result.StatusCode == 200)
            {
                return new SuccessResponse((int)HttpStatusCode.OK, "Hoàn thành thông báo");
            }
            throw new ErrorResponse("Hoàn thành thất bại!!!", (int)HttpStatusCode.NotFound);
        }
    }
}
