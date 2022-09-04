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
    [Route("api/PostView")]
    [ApiController]
    public class PostViewController : ControllerBase
    {
        private readonly IPostViewService _repository;
        public PostViewController(IPostViewService service)
        {
            _repository = service;
        }
        [HttpGet]
        [Produces("application/json")]
        public ActionResult<PostView> GetAllPostView([FromQuery] PostViewParameters postViewParameter)
        {
            return Ok(_repository.GetAllPostView(postViewParameter));

        }
        [HttpPost]
        [Produces("application/json")]
        public async Task<IActionResult> CreatePostView(PostViewParameters postViewParameters)
        {
            return Ok(await _repository.CreatePostView(postViewParameters));
        }
    }
}
