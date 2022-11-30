using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Response;
using _24HReportSystemData.Service;
using _24HReportSystemData.ViewModel.Notify;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace _24HReportSystemAPI.Controllers
{
    [Route("api/Notify")]
    [ApiController]
    public class NotifyController : ControllerBase
    {
        private readonly INotifyInfoService _repository;
        private readonly IHubContext<NotifyHubService, INotifyHubService> _notifyHubService;
        public NotifyController(INotifyInfoService service, IHubContext<NotifyHubService ,INotifyHubService> notifyHubService)
        {
            _repository = service;
            _notifyHubService = notifyHubService;
        }

        [HttpGet]
        [Produces("application/json")]
        public ActionResult<NotifyInfo> GetAllNotify([FromQuery] NotifyParameters notifyParameter)
        {
            return Ok(_repository.GetAllNotify(notifyParameter));
        }
        [HttpGet("{id}")]
        [Produces("application/json")]
        public ActionResult<NotifyInfo> GetNotifyById(string id)
        {
            return Ok(_repository.GetNotifyByID(id));
        }
        [HttpPost]
        [Produces("application/json")]
        public async Task<IActionResult> CreateNotify(CreateNotifyViewModel office)
        {
            return Ok(await _repository.CreateNotifyAsync(office));
        }

        [HttpPut]
        [Produces("application/json")]
        public ActionResult<OfficeInfo> ChangeNotifyStatus([Required]string notifyID)
        {
            return Ok(_repository.UpdateNotifyStatus(notifyID));
        }

        [HttpPost]
        [Route("sendUserMess")]
        public string SendUserMess(string connectID, string mess)
        {
            try
            {
                var tmp = _notifyHubService.Clients.Client(connectID).SendPrivateMessageToUser(connectID, mess);
                return "success";
            }
            catch (Exception ex)
            {
                throw new ErrorResponse(ex.Message, (int)HttpStatusCode.NotFound);
            }
        }
        [HttpPost]
        [Route("sendLatLng")]
        public string SendLatLng(string connectID, string lat, string lng)
        {
            try
            {
                var tmp = _notifyHubService.Clients.Client(connectID).SendLatLngToUser(connectID, lat, lng);
                return "success";
            }
            catch (Exception ex)
            {
                throw new ErrorResponse(ex.Message, (int)HttpStatusCode.NotFound);
            }
        }
        [HttpPut]
        [Produces("application/json")]
        [Route("CancelNotify")]
        public ActionResult<OfficeInfo> CancelNotify(CancelNotifyViewModel model)
        {
            return Ok(_repository.CancelNotify(model));
        }
        [HttpPut]
        [Produces("application/json")]
        [Route("CompleteNotify")]
        public ActionResult<OfficeInfo> CompleteNotify(CompleteNotifyViewModel model)
        {
            return Ok(_repository.CompleteNotify(model));
        }

        [HttpPut]
        [Route("SendFirebaseNotifyViaToken")]
        public ActionResult<CreateFirebaseNotiViewModel> CreateFirebaseNotiViaToken(CreateFirebaseNotiViewModel model)
        {
            return Ok(_repository.CreateFirebaseNotiViaToken(model));
        }
        [HttpPut]
        [Route("SendFirebaseNotifyViaTopic")]
        public ActionResult<CreateFirebaseNotiViewModel> CreateFirebaseNotiViaTopic(CreateFirebaseNotiViewModel model)
        {
            return Ok(_repository.CreateFirebaseNotiViaTopic(model));
        }
    }
}
