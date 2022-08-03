using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.ViewModel.Report;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReportSystemData.Parameter.Report;
using ReportSystemData.Service;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ReportSystemAPI.Controllers
{
    [Route("api/Report")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _repository;
        public ReportController(IReportService service)
        {
            _repository = service;
        }
        [HttpGet]
        [Produces("application/json")]
        public ActionResult<Report> GetAllReport([FromQuery] ReportParameters reportParameters)
        {
            return Ok(_repository.GetAllReport(reportParameters));
        }
        [HttpPost]
        [Produces("application/json")]
        public async Task<IActionResult> CreateReport(CreateReportViewModel report)
        {
            return Ok(await _repository.CreateReportAsync(report));
        }

        [HttpGet("{id}")]
        [Produces("application/json")]
        public ActionResult<Report> GetReportByID(string id)
        {
            return Ok(_repository.GetReportByID(id));
        }

        /// <summary>
        /// Update Report Status
        /// </summary>
        /// <param name="id"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        [HttpPut]
        [Produces("application/json")]
        [Route("StatusUpdate")]
        public ActionResult ChangeStatus(ChangeReportStatusViewModel model)
        {
            return Ok(_repository.ChangeReportStatus(model));
        }

        //[HttpPut]
        //[Produces("application/json")]
        //public ActionResult<Report> UpdateReport(UpdateReportViewModel report)
        //{
        //    return Ok(_repository.UpdateReport(report));
        //}
        [HttpDelete]
        [Produces("application/json")]
        public ActionResult DeleteReport(string id)
        {
            return Ok(_repository.DeleteReport(id));
        }

        [HttpPut]
        [Produces("application/json")]
        [Route("CategoryUpdate")]
        public ActionResult ChangeReportCategory(string id, int categoryID, string staffID)
        {
            return Ok(_repository.ChangeReportCategory(id, categoryID, staffID));
        }
        [HttpGet]
        [Produces("application/json")]
        [Route("GetListWithUserID")]
        public ActionResult<ReportResponseWithUserID> GetReportByUserID(string UserID)
        {
            return Ok(_repository.ListReportWithUserID(UserID));
        }
        [HttpPut]
        [Produces("application/json")]
        [Route("UpdateReportEditor")]
        public ActionResult ChangeReportCategory(string reportID, string editorID)
        {
            return Ok(_repository.UpdateReportEditor(reportID, editorID));
        }
        //[HttpPost]
        //[Produces("application/json")]
        //[Route("UploadFile")]
        //public async Task<ActionResult> GetfileUrl(string clientToken, string title, string body)
        //{
        //    //    Console.WriteLine(file);
        //    //    using (var img = Video.FromStream(memoryStream))
        //    //    {
        //    //        // TODO: ResizeImage(img, 100, 100);
        //    //    }
        //    return Ok(await _repository.NotifyAsync(clientToken, title, body));
        //}
    }
}
