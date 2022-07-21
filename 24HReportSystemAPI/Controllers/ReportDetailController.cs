using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReportSystemData.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportSystemAPI.Controllers
{
    [Route("api/ReportDetail")]
    [ApiController]
    public class ReportDetailController : ControllerBase
    {
        private readonly IReportDetailService _repository;
        public ReportDetailController(IReportDetailService service)
        {
            _repository = service;
        }

        [HttpGet]
        [Produces("application/json")]
        public ActionResult<ReportDetail> GetAllReport([FromQuery] ReportDetailParameters reportDetailParameters)
        {
            return Ok(_repository.GetAllReportDetail(reportDetailParameters));
        }
    }
}
