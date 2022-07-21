using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReportSystemData.Service;
using ReportSystemData.ViewModel.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportSystemAPI.Controllers
{
    [Route("api/Category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _repository;
        public CategoryController(ICategoryService service)
        {
            _repository = service;
        }
        [HttpGet]
        [Produces("application/json")]
        public ActionResult<Category> GetAllCategory([FromQuery] SubCategoryParameters subCategoryParameters)
        {
            return Ok(_repository.GetAllCategory(subCategoryParameters));
        }

        [HttpGet("{id}")]
        [Produces("application/json")]
        public ActionResult<Category> GetCategoryById(int id)
        {
            return Ok(_repository.GetCategoryByID(id));
        }

        [HttpPost]
        [Produces("application/json")]
        public async Task<IActionResult> CreateCategory(CreateCategoryViewModel cate)
        {
            return Ok(await _repository.CreateCategoryAsync(cate));
        }
        [HttpPut]
        [Produces("application/json")]
        public ActionResult<Category> UpdateCategory(UpdateCategoryViewModel cate)
        {
            return Ok(_repository.UpdateCategory(cate));
        }
        [HttpDelete]
        [Produces("application/json")]
        public ActionResult DeleteCategory(int id)
        {
            return Ok(_repository.DeleteCategory(id));
        }
    }
}
