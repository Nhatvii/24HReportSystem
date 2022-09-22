using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Service;
using _24HReportSystemData.ViewModel.Office;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _24HReportSystemAPI.Controllers
{
    [Route("api/Office")]
    [ApiController]
    public class OfficeController : ControllerBase
    {
        private readonly IOfficeService _repository;
        public OfficeController(IOfficeService service)
        {
            _repository = service;
        }
        [HttpGet]
        [Produces("application/json")]
        public ActionResult<OfficeInfo> GetAllOffice([FromQuery] OfficeParameters OfficeParameter)
        {
            return Ok(_repository.GetAllOffice(OfficeParameter));
        }
        [HttpGet("{id}")]
        [Produces("application/json")]
        public ActionResult<OfficeInfo> GetOfficeById(string id)
        {
            return Ok(_repository.GetOfficeByID(id));
        }
        [HttpPost]
        [Produces("application/json")]
        public async Task<IActionResult> CreateOffice(CreateOfficeViewModel office)
        {
            return Ok(await _repository.CreateOfficeAsync(office));
        }

        [HttpPut]
        [Produces("application/json")]
        public ActionResult<OfficeInfo> UpdateOffice(UpdateOfficeViewModel office)
        {
            return Ok(_repository.UpdateOffice(office));
        }
        [HttpDelete("{id}")]
        [Produces("application/json")]
        public ActionResult DeletePost(string id)
        {
            return Ok(_repository.DeleteOffice(id));
        }

        [HttpPut]
        [Route("GetDirectionSOS")]
        [Produces("application/json")]
        public async Task<IActionResult> GetDirectonSOS(GetDirectionViewModel model)
        {
            return Ok(await _repository.GetDirectionAsync(model));
        }
    }
}
