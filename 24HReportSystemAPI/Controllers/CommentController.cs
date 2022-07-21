using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReportSystemData.Service;
using ReportSystemData.ViewModel.Comment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportSystemAPI.Controllers
{
    [Route("api/Comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _repository;
        public CommentController(ICommentService service)
        {
            _repository = service;
        }
        [HttpGet]
        [Produces("application/json")]
        public ActionResult<Comment> GetAllComment([FromQuery] CommentParameters commentParameters)
        {
            return Ok(_repository.GetAllComment(commentParameters));
        }

        [HttpGet("{id}")]
        [Produces("application/json")]
        public ActionResult<Comment> GetCommentById(string id)
        {
            return Ok(_repository.GetCommentByID(id));
        }
        [HttpPost]
        [Produces("application/json")]
        public async Task<IActionResult> CreateComment(CreateCommentViewModel cmt)
        {
            return Ok(await _repository.CreateCommentAsync(cmt));
        }
        [HttpPut]
        [Produces("application/json")]
        public ActionResult<Comment> UpdateComment(UpdateCommentViewModel cmt)
        {
            return Ok(_repository.UpdateComment(cmt));
        }
        [HttpDelete("{id}")]
        [Produces("application/json")]
        public ActionResult DeleteComment(string id)
        {
            return Ok(_repository.DeleteComment(id));
        }
    }
}
