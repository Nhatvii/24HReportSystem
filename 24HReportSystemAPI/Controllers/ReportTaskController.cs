using _24HReportSystemData.ViewModel.ReportTask;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReportSystemData.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _24HReportSystemAPI.Controllers
{
    [Route("api/ReportTask")]
    [ApiController]
    public class ReportTaskController : ControllerBase
    {
        private readonly IReportTaskService _repository;
        public ReportTaskController(IReportTaskService service)
        {
            _repository = service;
        }
        [HttpPost]
        [Produces("application/json")]
        public ActionResult CreateReportTask(CreateReportTaskViewModel reportTask)
        {
            return Ok(_repository.CreateReportTask(reportTask));
        }
    }
}
