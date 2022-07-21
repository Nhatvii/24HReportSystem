using _24HReportSystemData.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReportSystemData.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportSystemAPI.Controllers
{
    [Route("api/RootCategory")]
    [ApiController]
    public class RootCategoryController : ControllerBase
    {
        private readonly IRootCategoryService _repository;

        public RootCategoryController(IRootCategoryService service)
        {
            _repository = service;
        }

        [HttpGet]
        [Produces("application/json")]
        public ActionResult<RootCategory> GetAllRootCategory()
        {
            return Ok(_repository.GetAllRootCategory());
        }

        [HttpGet("{id}")]
        [Produces("application/json")]
        public ActionResult<RootCategory> GetRootCategoryByID(int id)
        {
            return Ok(_repository.GetRootCategoryByID(id));
        }

        [HttpPost]
        [Produces("application/json")]
        public async Task<IActionResult> CreateRootCategory(string rootType)
        {
            return Ok(await _repository.CreateRootCategoryAsync(rootType));
        }
        [HttpPut]
        [Produces("application/json")]
        public ActionResult<RootCategory> UpdateRootCategory(int id,string rootType)
        {
            return Ok(_repository.UpdateRootCategory(id, rootType));
        }
        [HttpDelete]
        [Produces("application/json")]
        public ActionResult DeleteRootCategory(int id)
        {
            return Ok(_repository.DeleteRootCategory(id));
        }
    }
}
