using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.ViewModel.Task;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReportSystemData.Service;
using ReportSystemData.ViewModel.Task;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace ReportSystemAPI.Controllers
{
    [Route("api/Task")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _repository;
        public TaskController(ITaskService service)
        {
            _repository = service;
        }
        [HttpGet]
        [Produces("application/json")]
        public ActionResult<Task> GetAllTAsk([FromQuery] TaskParameters taskParameters)
        {
            return Ok(_repository.GetAllTask(taskParameters));
        }
        [HttpGet("{id}")]
        [Produces("application/json")]
        public ActionResult<Task> GetTaskByID(string id)
        {
            return Ok(_repository.GetTaskByID(id));
        }
        [HttpPost]
        [Produces("application/json")]
        public ActionResult<Task> CreateTask(CreateTaskViewModel task)
        {
            return Ok(_repository.CreateTask(task));
        }
        [HttpDelete]
        [Produces("application/json")]
        public ActionResult DeleteTask(string id)
        {
            return Ok(_repository.DeleteTask(id));
        }
        [HttpPut]
        [Produces("application/json")]
        [Route("StatusUpdate")]
        public ActionResult ChangeTaskStatus(UpdateTaskStatusViewModel model)
        {
            return Ok(_repository.ChangeTaskStatus(model));
        }
        [HttpPut]
        [Produces("application/json")]
        [Route("TaskReviewFilter")]
        public ActionResult TaskReviewFilter(string boardID, double percent)
        {
            return Ok(_repository.TaskReviewFilter(boardID, percent));
        }
        [HttpGet]
        [Produces("application/json")]
        [Route("ListTaskHistory")]
        public ActionResult<List<Task>> GetTaskHistory([Required]string TaskId)
        {
            return Ok(_repository.GetListTaskHistory(TaskId));
        }
    }
}
