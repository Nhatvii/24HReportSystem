using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Repositories;
using _24HReportSystemData.Response;
using _24HReportSystemData.ViewModel.Account;
using _24HReportSystemData.ViewModel.Notify;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ReportSystemData.Parameter.Report;
using ReportSystemData.Service;
using ReportSystemData.Service.Base;
using System;
using System.Collections.Generic;
using System.IO;
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
        bool CheckExistNoti(string userId);
        SuccessResponse CreateFirebaseNotiViaToken(CreateFirebaseNotiViewModel model);
        SuccessResponse CreateFirebaseNotiViaTopic(CreateFirebaseNotiViewModel model);
        SuccessResponse CancelNotify(CancelNotifyViewModel model);
    }
    public partial class NotifyInfoService : BaseService<NotifyInfo>, INotifyInfoService
    {
        private readonly IMapper _mapper;
        private readonly IReportService _reportService;
        private readonly IAccountService _accountService;
        private readonly IHubContext<NotifyHubService, INotifyHubService> _notifyHubService;

        public NotifyInfoService(DbContext context, INotifyInfoRepository repository, IMapper mapper, IReportService reportService, IAccountService accountService, IHubContext<NotifyHubService, INotifyHubService> notifyHubService) : base(context, repository)
        {
            _dbContext = context;
            _mapper = mapper;
            _reportService = reportService;
            _accountService = accountService;
            _notifyHubService = notifyHubService;
        }

        public List<NotifyInfo> GetAllNotify(NotifyParameters notifyParameters)
        {
            var noti = Get()
                .Include(p => p.Officer).ThenInclude(p => p.AccountInfo)
                .Include(p => p.User).ThenInclude(p => p.AccountInfo)
                .Include(p => p.Office)
                .ToList();
            if(notifyParameters.OfficeId != null)
            {
                noti = noti.Where(p => p.OfficeId.Equals(notifyParameters.OfficeId)).ToList();
            }
            if(notifyParameters.IsToday != null)
            {
                if (notifyParameters.IsToday == true)
                {
                    noti = noti.Where(p => p.AcceptedDate.Date == DateTime.Today).ToList();
                }
            }
            if (notifyParameters.Status != null)
            {
                if (notifyParameters.Status == true)
                {
                    noti = noti.Where(p => p.NotifyStatus == true).ToList();
                }
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
            notify.NotifyStatus = false;
            notify.AcceptedDate = DateTime.Now;
            await CreateAsyn(notify);
            return new SuccessResponse((int)HttpStatusCode.OK, notify.NotifyId);
        }

        public SuccessResponse UpdateNotifyStatus(string notifyID)
        {
            var noti = GetNotifyByID(notifyID);
            if(noti != null)
            {
                noti.NotifyStatus = true;
                Update(noti);
                new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật trạng thái thành công");
            }
            throw new ErrorResponse("Thông báo không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }

        public SuccessResponse CompleteNotify(CompleteNotifyViewModel model)
        {
            var notify = GetNotifyByID(model.NotifyId);
            notify.NotifyStatus = true;
            notify.ExecuteTime = model.ExecuteTime;
            notify.SumaryContent = model.SumaryContent;
            Update(notify);
            var updateAcc = new UpdateAccountViewModel()
            {
                AccountID = model.OfficerId,
                IsActive = true
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
        public bool CheckExistNoti(string userId)
        {
            var noti = Get().Where(p => p.UserId.Equals(userId) && p.NotifyStatus == false).FirstOrDefault();
            if(noti != null)
            {
                return true;
            }
            return false;
        }

        public SuccessResponse CreateFirebaseNotiViaToken(CreateFirebaseNotiViewModel model)
        {
            WebRequest tRequest = WebRequest.Create("https://fcm.googleapis.com/fcm/send");
            tRequest.Method = "post";
            //serverKey - Key from Firebase cloud messaging server  
            tRequest.Headers.Add(string.Format("Authorization: key={0}", "AAAA18R_leU:APA91bFs4IswdpTTW64y8Y5YyhZ43JAMr74vDjdnC1no4wWPraCQsgK5s4kfxT_BB1OIb2TeOibIIwno-mf5RtUp_88aoOQzj3lFG9EXiONntpxV0eEMMAbk-oKlt6ZKoikyG-ET5BOE"));
            //Sender Id - From firebase project setting  
            tRequest.Headers.Add(string.Format("Sender: id={0}", "926714664421"));
            tRequest.ContentType = "application/json";
            //var registrationTokens = "dIxB3uFiTE2XITKA2Aj6q5:APA91bEsOpXxCV5guoUoHU3lr_A-nItHq4xY_IzaIWQQwvvgasra2GsD21IY8KQ_Ov1t3C1HfP-Loj-eOUuwnc7DCeqe1IbebW4sc7wLcYdjBSdyNmi1ETc16QgCQ8szftewZEZ1Hc3S";
            var payload = new
            {
                //to = "/topics/taskA",
                //to = "/topics/" + "" + officeID + "",
                to = model.TokenId,
                priority = "high",
                content_available = true,
                notification = new
                {
                    body = model.Body,
                    title = model.Title,
                    badge = 1
                },
            };

            try
            {
                string postbody = JsonConvert.SerializeObject(payload).ToString();
                Byte[] byteArray = Encoding.UTF8.GetBytes(postbody);
                tRequest.ContentLength = byteArray.Length;
                using (Stream dataStream = tRequest.GetRequestStream())
                {
                    dataStream.Write(byteArray, 0, byteArray.Length);
                    using (WebResponse tResponse = tRequest.GetResponse())
                    {
                        using (Stream dataStreamResponse = tResponse.GetResponseStream())
                        {
                            if (dataStreamResponse != null) using (StreamReader tReader = new StreamReader(dataStreamResponse))
                                {
                                    String sResponseFromServer = tReader.ReadToEnd();
                                    //result.Response = sResponseFromServer;
                                    return new SuccessResponse((int)HttpStatusCode.OK, "Gửi thông báo thành công");
                                }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ErrorResponse("Gửi thông báo thất bại!!!", (int)HttpStatusCode.NotFound);
            }
            return null;
        }
        public SuccessResponse CreateFirebaseNotiViaTopic(CreateFirebaseNotiViewModel model)
        {
            WebRequest tRequest = WebRequest.Create("https://fcm.googleapis.com/fcm/send");
            tRequest.Method = "post";
            //serverKey - Key from Firebase cloud messaging server  
            tRequest.Headers.Add(string.Format("Authorization: key={0}", "AAAA18R_leU:APA91bFs4IswdpTTW64y8Y5YyhZ43JAMr74vDjdnC1no4wWPraCQsgK5s4kfxT_BB1OIb2TeOibIIwno-mf5RtUp_88aoOQzj3lFG9EXiONntpxV0eEMMAbk-oKlt6ZKoikyG-ET5BOE"));
            //Sender Id - From firebase project setting  
            tRequest.Headers.Add(string.Format("Sender: id={0}", "926714664421"));
            tRequest.ContentType = "application/json";
            //var registrationTokens = "dIxB3uFiTE2XITKA2Aj6q5:APA91bEsOpXxCV5guoUoHU3lr_A-nItHq4xY_IzaIWQQwvvgasra2GsD21IY8KQ_Ov1t3C1HfP-Loj-eOUuwnc7DCeqe1IbebW4sc7wLcYdjBSdyNmi1ETc16QgCQ8szftewZEZ1Hc3S";
            var payload = new
            {
                to = "/topics/" + "" + model.Topic + "",
                //to = model.TokenId,
                priority = "high",
                content_available = true,
                notification = new
                {
                    body = model.Body,
                    title = model.Title,
                    badge = 1
                },
            };

            try
            {
                string postbody = JsonConvert.SerializeObject(payload).ToString();
                Byte[] byteArray = Encoding.UTF8.GetBytes(postbody);
                tRequest.ContentLength = byteArray.Length;
                using (Stream dataStream = tRequest.GetRequestStream())
                {
                    dataStream.Write(byteArray, 0, byteArray.Length);
                    using (WebResponse tResponse = tRequest.GetResponse())
                    {
                        using (Stream dataStreamResponse = tResponse.GetResponseStream())
                        {
                            if (dataStreamResponse != null) using (StreamReader tReader = new StreamReader(dataStreamResponse))
                                {
                                    String sResponseFromServer = tReader.ReadToEnd();
                                    //result.Response = sResponseFromServer;
                                    return new SuccessResponse((int)HttpStatusCode.OK, "Gửi thông báo thành công");
                                }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ErrorResponse("Gửi thông báo thất bại!!!", (int)HttpStatusCode.NotFound);
            }
            return null;
        }
        public SuccessResponse CancelNotify(CancelNotifyViewModel model)
        {
            var noti = GetNotifyByID(model.NotifyId);
            var tmp = _notifyHubService.Clients.Client(noti.Officer.TokenId).SendCancelNotifyToUser(noti.Officer.TokenId, model.CancelType);
            if (tmp.Exception != null)
            {
                throw new ErrorResponse("Gửi tín hiệu thất bại !!!", (int)HttpStatusCode.Conflict);
            }
            return new SuccessResponse((int)HttpStatusCode.OK, "Hoàn thành thông báo");
        }
    }
}
