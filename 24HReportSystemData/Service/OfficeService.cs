using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Repositories;
using _24HReportSystemData.Response;
using _24HReportSystemData.ViewModel.Account;
using _24HReportSystemData.ViewModel.Notify;
using _24HReportSystemData.ViewModel.Office;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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
    public partial interface IOfficeService: IBaseService<OfficeInfo>
    {
        List<OfficeInfo> GetAllOffice(OfficeParameters officeParameters);
        OfficeInfo GetOfficeByID(string officeID);
        Task<SuccessResponse> CreateOfficeAsync(CreateOfficeViewModel model);
        SuccessResponse UpdateOffice(UpdateOfficeViewModel model);
        SuccessResponse DeleteOffice(string OfficeID);
        Task<SosInfoResponse> GetDirectionAsync(GetDirectionViewModel model);
    }
    public partial class OfficeService : BaseService<OfficeInfo>, IOfficeService
    {
        private readonly IMapper _mapper;
        private readonly IAccountService _accountService;
        private readonly IAccountInfoService _accountInfoService;
        private readonly INotifyInfoService _notifyInfoService;
        //private readonly INotifyHubService _notifyHubService;
        private readonly IHubContext<NotifyHubService, INotifyHubService> _notifyHubService;

        public OfficeService(DbContext context, IOfficeRepository repository, IMapper mapper, IAccountService accountService, IAccountInfoService accountInfoService, INotifyInfoService notifyInfoService, IHubContext<NotifyHubService, INotifyHubService> notifyHubService) : base(context, repository)
        {
            _dbContext = context;
            _mapper = mapper;
            _accountService = accountService;
            _notifyInfoService = notifyInfoService;
            _notifyHubService = notifyHubService;
            _accountInfoService = accountInfoService;
        }

        public List<OfficeInfo> GetAllOffice(OfficeParameters officeParameters)
        {
            var office = Get().ToList();
            if(officeParameters.OfficeName != null)
            {
                office = office.Where(p => p.OfficeName.Contains(officeParameters.OfficeName)).ToList();
            }
            if (officeParameters.District != null)
            {
                office = office.Where(p => p.District.Contains(officeParameters.District)).ToList();
            }
            if (officeParameters.PhoneNumber != null)
            {
                office = office.Where(p => p.PhoneNumber.Equals(officeParameters.PhoneNumber)).ToList();
            }
            return office;
        }
        public OfficeInfo GetOfficeByID(string officeID)
        {
            var office = Get().Where(p => p.OfficeId.Equals(officeID)).FirstOrDefault();
            if(office != null)
            {
                return office;
            }
            throw new ErrorResponse("Cơ quan không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
        public async Task<SuccessResponse> CreateOfficeAsync(CreateOfficeViewModel model)
        {
            var office = _mapper.Map<OfficeInfo>(model);
            office.OfficeId = Guid.NewGuid().ToString();
            office.ActiveOfficer = 0;
            office.IsActive = true;
            await CreateAsyn(office);
            return new SuccessResponse((int)HttpStatusCode.OK, "Tạo cơ quan thành công");
        }
        public SuccessResponse UpdateOffice(UpdateOfficeViewModel model)
        {
            var office = GetOfficeByID(model.OfficeId);
            if(office != null)
            {
                if(model.OfficeName != null)
                {
                    office.OfficeName = model.OfficeName;
                }
                if (model.District != null)
                {
                    office.District = model.District;
                }
                if (model.PhoneNumber != null)
                {
                    office.PhoneNumber = model.PhoneNumber;
                }
                if (model.Latitude.HasValue)
                {
                    office.Latitude = (int)model.Latitude;
                }
                if (model.Longitude.HasValue)
                {
                    office.Longitude = (int)model.Longitude;
                }
                Update(office);
                return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
            }
            throw new ErrorResponse("Cơ quan không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }

        public SuccessResponse DeleteOffice(string OfficeID)
        {
            var office = GetOfficeByID(OfficeID);
            if (office != null)
            {
                office.IsDelete = true;
                Update(office);
                return new SuccessResponse((int)HttpStatusCode.OK, "Xóa thành công");
            }
            throw new ErrorResponse("Cơ quan không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
        public List<OfficeInfo> GetListOfficeActive()
        {
            var listOffice = Get().ToList();
            List<OfficeInfo> listOfficeActive = new List<OfficeInfo>();
            foreach (var item in listOffice)
            {
                var getListOfficeActiveNum = _accountService.CheckAccountIsActiveNotify(item.OfficeId);
                if(getListOfficeActiveNum > 0)
                {
                    listOfficeActive.Add(item);
                }
            }
            return listOfficeActive;
        }
        public async Task<SosInfoResponse> GetDirectionAsync(GetDirectionViewModel model)
        {
            var acc = _accountService.GetAccountByID(model.AccountId);
            var ori = "" + model.Latitude + "," + model.Longitude + "";
            //var listOffice = Get().Where(p => p.IsActive == true && p.IsDelete == false).ToList();
            var listOffice = GetListOfficeActive().Where(p => p.IsActive == true && p.IsDelete == false).ToList();
            var tmpDistance = 10000;
            var tmpDuration = 2000;
            var tmpOffice = "";
            foreach (var item in listOffice)
            {
                var des = "" + item.Latitude + "," + item.Longitude + "";
                var test = GetNearestPosition(ori, des, "bike");
                dynamic obj = JsonConvert.DeserializeObject(test);
                Console.WriteLine(obj);
                if ((obj.rows[0].elements[0].distance.value < tmpDistance) || obj.rows[0].elements[0].duration.value < tmpDuration)
                {
                    tmpDistance = obj.rows[0].elements[0].distance.value;
                    tmpDuration = obj.rows[0].elements[0].duration.value;
                    tmpOffice = item.OfficeId;
                }
            }
            if(!String.IsNullOrEmpty(tmpOffice))
            {
                var oriLat = "" + model.Latitude + "";
                var oriLng = "" + model.Longitude + "";
                var officer = _accountService.GetAccountNotify(tmpOffice);
                // create table notify
                var modelNotify = new CreateNotifyViewModel()
                {
                    OfficeId = tmpOffice,
                    OfficerId = officer.AccountId,
                    UserId = acc.AccountId,
                    Latitude = model.Latitude,
                    Longitude = model.Longitude
                };
                var notiCreate = await _notifyInfoService.CreateNotifyAsync(modelNotify);
                var updateAcc = new UpdateAccountViewModel()
                {
                    AccountID = officer.AccountId,
                    IsActive = false
                };
                _accountService.UpdateAccount(updateAcc);
                //firebaseNoti(acc.PhoneNumber, oriLat, oriLng, tmpOffice, officer.TokenId);
                var notiHub = new NotifyHubService();
                var resNotify = _mapper.Map<NotifyResponseViewModel>(modelNotify);
                resNotify.UserName = _accountInfoService.GetAccountInfoByID(acc.AccountId).Fullname;
                try
                {
                    var tmp = _notifyHubService.Clients.Client(officer.TokenId).SendPrivateMessage(officer.TokenId, resNotify);

                    if (tmp.Exception != null)
                    {
                        throw new ErrorResponse("Gửi tín hiệu thất bại !!!", (int)HttpStatusCode.Conflict);
                    }
                }
                catch (Exception ex)
                {
                    throw new ErrorResponse("Gửi tín hiệu thất bại !!!", (int)HttpStatusCode.Conflict);
                }
                var noti = _notifyInfoService.GetNotifyByID(notiCreate.Message);
                var SosRes = new SosInfoResponse()
                {
                    OfficeId = tmpOffice,
                    NotifyId = notiCreate.Message,
                    OfficeName = noti.Office.OfficeName,
                    District = noti.Office.District,
                    Latitude = noti.Office.Latitude,
                    Longitude = noti.Office.Longitude,
                    OfficerName = officer.AccountInfo.Fullname,
                    OfficerPhoneNumber = officer.PhoneNumber
                };
                return SosRes;
            }
            else
            {
                throw new ErrorResponse("Cơ quan không tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
        }

        public string GetNearestPosition(string ori, string des, string vehicle)
        {
            string url = $"https://rsapi.goong.io/DistanceMatrix?origins={ori}&destinations={des}&vehicle={vehicle}&api_key=6k91iLdrCs4UMY6OFnyb3EXIkDTfhmClgBwbVb5s";
            var client = new WebClient();
            var content = client.DownloadString(url);
            return content;
        }
        public void firebaseNoti(string phonenumber, string lat, string lng, string officeID, string tokenID)
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
                to = tokenID,
                priority = "high",
                content_available = true,
                notification = new
                {
                    body = "Tín hiệu cầu cứu từ người dùng",
                    title = "SOS",
                    badge = 1
                },
                data = new
                {
                    PhoneNumber = phonenumber,
                    Lat = lat,
                    Lng = lng
                }
            };

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
                            }
                    }
                }
            }
        }
    }

}
