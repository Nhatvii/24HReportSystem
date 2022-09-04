using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _24HReportSystemAPI.Controllers
{
    [Route("api/PostSave")]
    [ApiController]
    public class PostSaveController : ControllerBase
    {
        private readonly IPostSaveService _repository;
        public PostSaveController(IPostSaveService service)
        {
            _repository = service;
        }
        [HttpGet]
        [Produces("application/json")]
        public ActionResult<PostSave> GetAllPostSave([FromQuery] PostSaveParameters postSaveParameter)
        {
            return Ok(_repository.GetAllPostSave(postSaveParameter));
        }
        [HttpGet]
        [Route("GetPostSave")]
        [Produces("application/json")]
        public ActionResult<PostSave> GetPostSave([FromQuery] PostSaveParameters postSaveParameter)
        {
            return Ok(_repository.GetPostSave(postSaveParameter));
        }
        [HttpPost]
        [Produces("application/json")]
        public async Task<IActionResult> CreatePostSave(PostSaveParameters postSaveParameters)
        {
            return Ok(await _repository.CreatePostSave(postSaveParameters));
        }
    }
}
