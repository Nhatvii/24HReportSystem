using _24HReportSystemData.Constants;
using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Response;
using _24HReportSystemData.Service;
using _24HReportSystemData.ViewModel.Report;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using FirebaseAdmin.Messaging;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Parameter.Report;
using ReportSystemData.Repository;
using ReportSystemData.Service.Base;
using ReportSystemData.ViewModel.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;
using System.IO;

namespace ReportSystemData.Service
{
    public partial interface IReportService : IBaseService<Report>
    {
        Task<SuccessResponse> CreateReportAsync(CreateReportViewModel report);
        List<Report> GetAllReport(ReportParameters reportParameters);
        SuccessResponse UpdateReport(UpdateReportViewModel report);
        Report GetReportByID(string id);
        public SuccessResponse ChangeReportStatus(ChangeReportStatusViewModel model);
        SuccessResponse DeleteReport(string id);
        SuccessResponse ChangeReportCategory(string id, int categoryID, string staffID);
        SuccessResponse UpdateReportEditor(string reportID, string editorID);
        List<ReportResponseWithUserID> ListReportWithUserID(string UserID);
        string UploadFileGenerater(ChangeReportStatusViewModel data);
        //Task<bool> NotifyAsync(string to, string title, string body);
    }
    public partial class ReportService : BaseService<Report>, IReportService
    {
        private readonly IMapper _mapper;
        private readonly ICategoryService _categoryService;
        private readonly IAccountInfoService _accountInfoService;
        private readonly IAccountService _accountService;
        private readonly IReportDetailService _reportDetailService;
        private readonly ITaskService _taskService;
        private readonly IBoardService _boardService;
        public ReportService(DbContext context, IMapper mapper, IReportRepository repository,
            ICategoryService categoryService, IAccountInfoService accountInfoService, IAccountService accountService,
            ITaskService taskService, IBoardService boardService,
            IReportDetailService reportDetailService) : base(context, repository)
        {
            _dbContext = context;
            _mapper = mapper;
            _categoryService = categoryService;
            _accountInfoService = accountInfoService;
            _reportDetailService = reportDetailService;
            _taskService = taskService;
            _boardService = boardService;
            _accountService = accountService;
        }
        public List<Report> GetAllReport(ReportParameters reportParameters)
        {
            var reports = Get().Where(r => r.IsDelete == false)
                .Include(detail => detail.ReportDetails)
                .Include(c => c.ReportViews)
                .Include(c => c.Staff)
                .Include(c => c.User)
                .Include(c => c.Editor)
                .Include(cate => cate.Category).ThenInclude(c => c.RootCategoryNavigation).ToList();
            if (reportParameters.Status.HasValue && reportParameters.Status > 0)
            {
                reports = GetListReportWithStatus(reportParameters.Status);
            }
            if (reportParameters.StaffID != null)
            {
                reports = reports.Where(c => (c.StaffId != null) && c.StaffId.Equals(reportParameters.StaffID)).ToList();
            }
            if(reportParameters.IsEditor != null)
            {
                if(reportParameters.IsEditor == true)
                {
                    reports = reports.Where(c => c.EditorId == null).ToList();
                }
            }
            return reports;
        }
        public List<ReportResponseWithUserID> ListReportWithUserID(string UserID)
        {
            var rp = Get().Where(p => p.IsDelete == false && !string.IsNullOrEmpty(p.UserId) ? p.UserId.Equals(UserID) : false).ToList();
            var tmp = new List<ReportResponseWithUserID>();
            foreach (var item in rp)
            {
                tmp.Add(_mapper.Map<ReportResponseWithUserID>(item));
            }
            return tmp;
        }
        public List<Report> GetListReportWithStatus(int? status)
        {
            var report = new List<Report>();
            if (status == 1)
            {
                report = Get().Where(r => r.IsDelete == false && r.Status.Equals(ReportConstants.STATUS_REPORT_NEW)).Include(detail => detail.ReportDetails).ToList();
            }
            if (status == 2)
            {
                report = Get().Where(r => r.IsDelete == false && r.Status.Equals(ReportConstants.STATUS_REPORT_PENDING)).Include(detail => detail.ReportDetails).ToList();
            }
            if (status == 3)
            {
                report = Get().Where(r => r.IsDelete == false && r.Status.Equals(ReportConstants.STATUS_REPORT_APPROVE)).Include(detail => detail.ReportDetails).ToList();
            }
            if (status == 4)
            {
                report = Get().Where(r => r.IsDelete == false && r.Status.Equals(ReportConstants.STATUS_REPORT_DENIED)).Include(detail => detail.ReportDetails).ToList();
            }
            return report;
        }
        public string UploadFileGenerater(ChangeReportStatusViewModel data)
        {
            CloudinaryDotNet.Account account = new CloudinaryDotNet.Account(
          "da1ufebzk",
          "557692973675122",
          "JrKJ-54ecoIp1kQ25cS90CCKhj0");

            Cloudinary cloudinary = new Cloudinary(account);
            var uploadParams = new VideoUploadParams()
            {
                File = new FileDescription(@"" + data.ReportId +""),
                PublicId = "Report/Video",
                Overwrite = true
            };
            var uploadResult = cloudinary.Upload(uploadParams);
            return uploadResult.SecureUrl.ToString();
        }
        //public async Task<bool> NotifyAsync(string to, string title, string body)
        //{
        //    try
        //    {
        //        // Get the server key from FCM console
        //        //var serverKey = string.Format("key={0}", "AAAA18R_leU:APA91bFs4IswdpTTW64y8Y5YyhZ43JAMr74vDjdnC1no4wWPraCQsgK5s4kfxT_BB1OIb2TeOibIIwno-mf5RtUp_88aoOQzj3lFG9EXiONntpxV0eEMMAbk-oKlt6ZKoikyG-ET5BOE");

        //        //// Get the sender id from FCM console
        //        //var senderId = string.Format("id={0}", "926714664421");

        //        //var data = new
        //        //{
        //        //    to, // Recipient device token
        //        //    notification = new { title, body }
        //        //};

        //        //// Using Newtonsoft.Json
        //        //var jsonBody = JsonConvert.SerializeObject(data);

        //        //using (var httpRequest = new HttpRequestMessage(System.Net.Http.HttpMethod.Post, "https://fcm.googleapis.com/fcm/send"))
        //        //{
        //        //    httpRequest.Headers.TryAddWithoutValidation("Authorization", serverKey);
        //        //    httpRequest.Headers.TryAddWithoutValidation("Sender", senderId);
        //        //    httpRequest.Content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

        //        //    using (var httpClient = new HttpClient())
        //        //    {
        //        //        var result = await httpClient.SendAsync(httpRequest);

        //        //        if (result.IsSuccessStatusCode)
        //        //        {
        //        //            return true;
        //        //        }
        //        //        else
        //        //        {
        //        //            // Use result.StatusCode to handle failure
        //        //            // Your custom error handler here
        //        //            //_logger.LogError($"Error sending notification. Status Code: {result.StatusCode}");
        //        //            Console.WriteLine($"Error sending notification. Status Code: {result.StatusCode}");
        //        //        }
        //        //    }
        //        //}
        //        var value = body;
        //        WebRequest tRequest = WebRequest.Create("https://fcm.googleapis.com/fcm/send");
        //        tRequest.Method = "post";
        //        tRequest.ContentType = "application/x-www-form-urlencoded;charset=UTF-8";
        //        tRequest.Headers.Add(string.Format("Authorization: key={0}", "AAAA18R_leU:APA91bFs4IswdpTTW64y8Y5YyhZ43JAMr74vDjdnC1no4wWPraCQsgK5s4kfxT_BB1OIb2TeOibIIwno-mf5RtUp_88aoOQzj3lFG9EXiONntpxV0eEMMAbk-oKlt6ZKoikyG-ET5BOE"));
        //        tRequest.Headers.Add(string.Format("Sender: id={0}", "926714664421"));

        //        string postData = "collapse_key=score_update&time_to_live=108&delay_while_idle=1&data.message=" + value + "&data.time=" + System.DateTime.Now.ToString() + "&registration_id=" + "d_d_etc6Tge_-Lr9ijDcFX:APA91bGq5danLu8IIn2tnTdtjZJjySnDboqw6IUMxCo8O4B5fUOSVuIeYCI4KvMS4CNZ3fCHVSzs624O8bLaV-ETaBRdqU5tyiqckJyJBtkE1dhF3ZEX-8O0e53CTC0ETRb5vunyiHdN" + "";

        //        Byte[] byteArray = Encoding.UTF8.GetBytes(postData);
        //        tRequest.ContentLength = byteArray.Length;

        //        using (Stream dataStream = tRequest.GetRequestStream())
        //        {
        //            dataStream.Write(byteArray, 0, byteArray.Length);

        //            using (WebResponse tResponse = tRequest.GetResponse())
        //            {
        //                using (Stream dataStreamResponse = tResponse.GetResponseStream())
        //                {
        //                    using (StreamReader tReader = new StreamReader(dataStreamResponse))
        //                    {
        //                        String sResponseFromServer = tReader.ReadToEnd();
        //                        //result.Response = sResponseFromServer;
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Exception thrown in Notify Service: {ex}");
        //        //_logger.LogError($"Exception thrown in Notify Service: {ex}");
        //    }

        //    return false;
        //}
        public async Task<SuccessResponse> CreateReportAsync(CreateReportViewModel report)
        {
            if (report.StaffID == null )
            {
                var reportTmp = _mapper.Map<Report>(report);
                reportTmp.ReportId = Guid.NewGuid().ToString();
                reportTmp.CreateTime = DateTime.Now;
                reportTmp.Status = ReportConstants.STATUS_REPORT_NEW;
                reportTmp.IsAnonymous = report.IsAnonymous;
                reportTmp.UserId = report.UserID;
                reportTmp.CategoryId = 1;
                await CreateAsyn(reportTmp);
                await _reportDetailService.CreateReportDetail(reportTmp.ReportId, report.Image, report.Video, report.Record);
                return new SuccessResponse((int)HttpStatusCode.OK, "Tạo thành công");
            }
            else
            {
                var reportTmp = _mapper.Map<Report>(report);
                reportTmp.ReportId = Guid.NewGuid().ToString();
                reportTmp.CreateTime = DateTime.Now;
                reportTmp.Status = ReportConstants.STATUS_REPORT_NEW;
                reportTmp.IsAnonymous = report.IsAnonymous;
                reportTmp.StaffId = report.StaffID;
                if (report.CategoryId.HasValue && report.CategoryId > 0)
                {
                    reportTmp.CategoryId = (int)report.CategoryId;
                }
                await CreateAsyn(reportTmp);
                await _reportDetailService.CreateReportDetail(reportTmp.ReportId, report.Image, report.Video);
                var changeStatusModel = new ChangeReportStatusViewModel()
                {
                    ReportId = reportTmp.ReportId,
                    Status = 3,
                    StaffId = reportTmp.StaffId
                };
                ChangeReportStatus(changeStatusModel);
                return new SuccessResponse((int)HttpStatusCode.OK, "Tạo thành công");
            }
        }

        public SuccessResponse UpdateReport(UpdateReportViewModel report)
        {
            var checkCate = _categoryService.CheckAvailableCategory(report.CategoryId);
            if (checkCate)
            {
                var reportTmp = Get().Where(rp => rp.ReportId.Equals(report.ReportId)).FirstOrDefault();
                if (reportTmp != null)
                {
                    if (report.Location != null)
                    {
                        reportTmp.Location = report.Location;
                    }
                    if (!report.TimeFraud.HasValue)
                    {
                        reportTmp.TimeFraud = (DateTime)report.TimeFraud;
                    }
                    if (report.Description != null)
                    {
                        reportTmp.Description = report.Description;
                    }
                    reportTmp.CategoryId = report.CategoryId;
                    Update(reportTmp);
                    return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
                }
                throw new ErrorResponse("Báo cáo không tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
            throw new ErrorResponse("Danh mục không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
        public Report GetReportByID(string id)
        {
            var report = Get().Where(r => r.ReportId == id && r.IsDelete == false)
                .Include(detail => detail.ReportDetails)
                .Include(cate => cate.Category)
                .Include(c => c.Staff)
                .Include(c => c.User)
                .Include(c => c.Editor)
                .Include(c => c.ReportViews).FirstOrDefault();
            return report;
        }

        public void UpdateAccountWordLoad()
        {
            var listAccount = _accountService.GetAllEditorAccount();
            foreach (var item in listAccount)
            {
                var workNum = GetNumUserWorkLoad(item.Email);
                _accountInfoService.UpdateAccountWorkLoad(item.Email, workNum);
            }
        }

        public int GetNumUserWorkLoad(string email)
        {
            var taskPara1 = new TaskParameters()
            {
                EditorID = email,
                Status = 1
            };
            var task1 = _taskService.GetAllTask(taskPara1);
            var taskPara2 = new TaskParameters()
            {
                EditorID = email,
                Status = 2
            };
            var task2 = _taskService.GetAllTask(taskPara2);
            var taskNum = task1.Count() + task2.Count();
            return taskNum;
        }
        public SuccessResponse ChangeReportStatus(ChangeReportStatusViewModel model)
        {
            var report = Get().Where(r => r.ReportId.Equals(model.ReportId)).FirstOrDefault();
            if (report != null)
            {
                UpdateAccountWordLoad();
                if (model.Status == 1)
                {
                    report.Status = ReportConstants.STATUS_REPORT_NEW;
                }
                if (model.Status == 2)
                {
                    report.Status = ReportConstants.STATUS_REPORT_PENDING;
                }
                if (model.Status == 3)
                {
                    report.Status = ReportConstants.STATUS_REPORT_APPROVE;
                    if (report.CategoryId != 1)
                    {
                        var rootCate = _categoryService.GetCategoryByID(report.CategoryId);
                        var acc = _accountService.GetMinWorkLoad(rootCate.RootCategory);
                        if(acc == null)
                        {
                            throw new ErrorResponse("Không thể tìm thấy Editor phù hợp cho task này!!!", (int)HttpStatusCode.NotFound);
                        }
                        DateTime aDateTime = DateTime.Now;
                        TimeSpan aInterval = new System.TimeSpan(7, 0, 0, 0);
                        DateTime newTime = aDateTime.Add(aInterval);
                        var board = _boardService.GetLastedBoard();
                        var createTask = new CreateTaskViewModel()
                        {
                            EditorId = acc.AccountId,
                            DeadlineTime = newTime,
                            Description = report.CreateTime.ToString() + " | " + acc.Email ,
                            BoardId = board.BoardId,
                            ReportId = new List<string>() { model.ReportId }.ToArray()
                        };
                        var task = _taskService.CreateTask(createTask);
                        UpdateReportEditor(model.ReportId, acc.AccountId);
                    }
                    if(report.CategoryId == 1)
                    {
                        Update(report);
                        return new SuccessResponse((int)HttpStatusCode.OK, "Báo cáo với danh mục này cần phải tạo task thủ công!!!");
                    }
                }
                if (model.Status == 4)
                {
                    report.Status = ReportConstants.STATUS_REPORT_DENIED;
                }
                report.StaffId = model.StaffId;
                Update(report);
                return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
            }
            throw new ErrorResponse("Báo cáo không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }

        public SuccessResponse DeleteReport(string id)
        {
            var report = GetReportByID(id);
            if (report != null)
            {
                report.IsDelete = true;
                Update(report);
                return new SuccessResponse((int)HttpStatusCode.OK, "Xóa thành công");
            }
            throw new ErrorResponse("Báo cáo không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }

        public SuccessResponse ChangeReportCategory(string id, int categoryID, string staffID)
        {
            var report = GetReportByID(id);
            if (report != null)
            {
                var checkCate = _categoryService.CheckAvailableCategory(categoryID);
                if (checkCate)
                {
                    report.CategoryId = categoryID;
                    report.StaffId = staffID;
                    Update(report);
                    return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
                }
                throw new ErrorResponse("Danh mục không tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
            throw new ErrorResponse("Báo cáo không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }

        public SuccessResponse UpdateReportEditor(string reportID, string editorID)
        {
            var report = GetReportByID(reportID);
            if(report != null)
            {
                report.EditorId = editorID;
                Update(report);
                return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
            }
            throw new ErrorResponse("Báo cáo không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }


    }
}
