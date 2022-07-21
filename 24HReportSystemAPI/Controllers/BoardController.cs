using _24HReportSystemData.Models;
using _24HReportSystemData.Service;
using _24HReportSystemData.ViewModel.Board;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _24HReportSystemAPI.Controllers
{
    [Route("api/Board")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        private readonly IBoardService _repository;
        public BoardController(IBoardService service)
        {
            _repository = service;
        }
        [HttpGet]
        [Produces("application/json")]
        public ActionResult<Board> GetAllBoard()
        {
            return Ok(_repository.GetAllBoard());
        }
        [HttpGet("{id}")]
        [Produces("application/json")]
        public ActionResult<Board> GetBoardByID(string id)
        {
            return Ok(_repository.GetBoardByID(id));
        }
        [HttpPost]
        [Produces("application/json")]
        public ActionResult<Board> CreateTask(CreateBoardViewModel board)
        {
            return Ok(_repository.CreateBoard(board));
        }
        [HttpPut]
        [Produces("application/json")]
        public ActionResult UpdateBoard(UpdateBoardViewModel model)
        {
            return Ok(_repository.UpdateBoard(model));
        }
        [HttpDelete]
        [Produces("application/json")]
        public ActionResult DeleteBoard(string id)
        {
            return Ok(_repository.DeleteBoard(id));
        }
    }
}
