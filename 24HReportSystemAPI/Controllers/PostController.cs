using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using Microsoft.AspNetCore.Mvc;
using ReportSystemData.Service;
using ReportSystemData.ViewModel.Post;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReportSystemAPI.Controllers
{
    [Route("api/Post")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _repository;
        public PostController(IPostService service)
        {
            _repository = service;
        }

        [HttpGet]
        [Produces("application/json")]
        public ActionResult<Post> GetAllPost([FromQuery] PostParameters postParameter)
        {
            return Ok(_repository.GetAllPost(postParameter));
        }

        [HttpGet("{id}")]
        [Produces("application/json")]
        public ActionResult<Post> GetPostById(string id)
        {
            return Ok(_repository.GetPostById(id));
        }

        [HttpPost]
        [Produces("application/json")]
        public async Task<IActionResult> CreatePost(CreatePostViewModel post)
        {
            return Ok(await _repository.CreatePostAsync(post));
        }

        [HttpPut]
        [Produces("application/json")]
        public ActionResult<Post> UpdatePost(UpdatePostViewModel post)
        {
            return Ok(_repository.UpdatePost(post));
        }

        [HttpPut]
        [Produces("application/json")]
        [Route("EditIsPublic")]
        public ActionResult<Post> UpdatePublicPost(UpdatePublicPostViewModel post)
        {
            return Ok(_repository.UpdatePublicPost(post));
        }

        [HttpDelete("{id}")]
        [Produces("application/json")]
        public ActionResult DeletePost(string id)
        {
            return Ok(_repository.DeletePost(id));
        }

        [HttpPut]
        [Produces("application/json")]
        [Route("UpdateViewCount")]
        public ActionResult UpdateViewCount(UpdateViewCountViewModel post)
        {
            return Ok(_repository.UpdateViewCount(post));
        }

        //[HttpPut]
        //[Produces("application/json")]
        //[Route("UpdatePostSave")]
        //public async Task<IActionResult> UpdatePostSave(UpdateViewCountViewModel post)
        //{
        //    return Ok(await _repository.UpdatePostSave(post));
        //}

        [HttpPut]
        [Produces("application/json")]
        [Route("UpdateShareCount")]
        public  ActionResult UpdateShareCount(string postID)
        {
            return Ok(_repository.UpdateShareCount(postID));
        }

        [HttpGet]
        [Produces("application/json")]
        [Route("GetListPostSave")]
        public ActionResult<Post> GetListPostSave(string userID)
        {
            return Ok(_repository.GetListPostSave(userID));
        }
    }
}
