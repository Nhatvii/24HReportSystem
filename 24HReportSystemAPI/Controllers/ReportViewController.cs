using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReportSystemData.Service;
using ReportSystemData.ViewModel.ReportView;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportSystemAPI.Controllers
{
    [Route("api/ReportView")]
    [ApiController]
    public class ReportViewController : ControllerBase
    {
        private readonly IReportViewService _repository;
        public ReportViewController(IReportViewService service)
        {
            _repository = service;
        }
        [HttpPost]
        [Produces("application/json")]
        public async Task<IActionResult> CreateReportView(CreateReportViewViewModel report)
        {
            return Ok(await _repository.CreateReportViewAsync(report));
        }
    }
}
