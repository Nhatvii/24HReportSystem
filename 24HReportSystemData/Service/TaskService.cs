using _24HReportSystemData.Constants;
using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Response;
using _24HReportSystemData.ViewModel.ReportTask;
using _24HReportSystemData.ViewModel.Task;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repositories;
using ReportSystemData.Service.Base;
using ReportSystemData.ViewModel.Post;
using ReportSystemData.ViewModel.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;

namespace ReportSystemData.Service
{
    public partial interface ITaskService : IBaseService<Task>
    {
        List<Task> GetAllTask(TaskParameters taskParameters);
        Task GetTaskByID(string id);
        Task CreateTask(CreateTaskViewModel task);
        SuccessResponse DeleteTask(string id);
        SuccessResponse ChangeTaskStatus(UpdateTaskStatusViewModel model);
        SuccessResponse TaskReviewFilter(double percent);
        List<Task> GetListTaskHistory(string taskID);
    }
    public partial class TaskService : BaseService<Task>, ITaskService
    {
        private readonly IMapper _mapper;
        private readonly IAccountService _accountService;
        private readonly IPostService _postService;
        private readonly IReportTaskService _reportTaskService;
        private readonly IAccountInfoService _accountInfoService;
        public TaskService(DbContext context, IMapper mapper, ITaskRepository repository,
            IAccountService accountService, IReportTaskService reportTaskService, IAccountInfoService accountInfoService,
            IPostService postService) : base(context, repository)
        {
            _dbContext = context;
            _mapper = mapper;
            _accountService = accountService;
            _postService = postService;
            _reportTaskService = reportTaskService;
            _accountInfoService = accountInfoService;
        }
        public List<Task> GetAllTask(TaskParameters taskParameters)
        {
            var tasks = Get().Where(c => c.IsDelete == false)
                .Include(t => t.ReportTasks).ThenInclude(t => t.Report)
                .Include(p => p.Posts).ToList();
            if (taskParameters.EditorID != null)
            {
                tasks = tasks.Where(t => t.EditorId.Equals(taskParameters.EditorID)).ToList();
            }
            if (taskParameters.Status.HasValue && taskParameters.Status > 0)
            {
                if (taskParameters.Status == 1)
                {
                    tasks = tasks.Where(t => t.Status.Equals(TaskConstants.STATUS_TASK_NEW)).ToList();
                }
                if (taskParameters.Status == 2)
                {
                    tasks = tasks.Where(t => t.Status.Equals(TaskConstants.STATUS_TASK_PENDING)).ToList();
                }
                if (taskParameters.Status == 3)
                {
                    tasks = tasks.Where(t => t.Status.Equals(TaskConstants.STATUS_TASK_REVIEW)).ToList();
                }
                if (taskParameters.Status == 4)
                {
                    tasks = tasks.Where(t => t.Status.Equals(TaskConstants.STATUS_TASK_FINISH)).ToList();
                }
                if (taskParameters.Status == 5)
                {
                    tasks = tasks.Where(t => t.Status.Equals(TaskConstants.STATUS_TASK_UNFINISHED)).ToList();
                }
            }
            if (taskParameters.BoardId != null)
            {
                tasks = tasks.Where(t => t.BoardId.Equals(taskParameters.BoardId)).ToList();
            }
            return tasks;
        }

        public Task GetTaskByID(string id)
        {
            var task = Get().Where(t => t.TaskId.Equals(id) && t.IsDelete == false)
                .Include(t => t.ReportTasks).ThenInclude(t => t.Report)
                .Include(p => p.Posts).FirstOrDefault();
            return task;
        }

        public Task CreateTask(CreateTaskViewModel task)
        {
            var checkAccountRole = _accountService.GetAccountByID(task.EditorId);
            if (checkAccountRole == null)
            {
                throw new ErrorResponse("Editor không tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
            if (checkAccountRole.RoleId == 1 || checkAccountRole.RoleId == 2 || checkAccountRole.RoleId == 4 || checkAccountRole.RoleId == 5)
            {
                throw new ErrorResponse("Role không phù hợp để tạo task!", (int)HttpStatusCode.NotFound);
            }
            var taskTmp = _mapper.Map<Task>(task);
            taskTmp.TaskId = Guid.NewGuid().ToString();
            taskTmp.EditorId = task.EditorId;
            taskTmp.CreateTime = DateTime.Now;
            taskTmp.DeadLineTime = task.DeadlineTime;
            taskTmp.Status = TaskConstants.STATUS_TASK_NEW;
            taskTmp.Description = task.Description;
            taskTmp.IsDelete = false;
            taskTmp.BoardId = task.BoardId;
            if (task.SubTaskId != null)
            {
                var check = GetTaskByID(task.SubTaskId);
                if (check == null)
                {
                    throw new ErrorResponse("SubTaskID không tồn tại!!!", (int)HttpStatusCode.NotFound);
                }
                else
                {
                    taskTmp.SubTaskId = task.SubTaskId;
                }
            }
            //var tasks = new Task()
            //{
            //    TaskId = Guid.NewGuid().ToString(),
            //    EditorId = task.EditorId,
            //    CreateTime = DateTime.Now,
            //    DeadLineTime = task.DeadlineTime,
            //    Status = TaskConstants.STATUS_TASK_NEW,
            //    Description = task.Description,
            //    IsDelete = false, 
            //    BoardId = task.BoardId,
            //};
            Create(taskTmp);
            foreach (var item in task.ReportId)
            {
                var reportTaskViewModel = new CreateReportTaskViewModel()
                {
                    TaskId = taskTmp.TaskId,
                    ReportId = item,
                    CreateTime = taskTmp.CreateTime
                };
                _reportTaskService.CreateReportTask(reportTaskViewModel);
            }
            UpdateAccountWordLoad(task.EditorId);
            return taskTmp;
        }
        public List<Task> GetListTaskHistory(string taskID)
        {
            var listTask = new List<Task>();
            var task = GetTaskByID(taskID);
            if(task.SubTaskId == null)
            {
                throw new ErrorResponse("Task không tồn tại SubTask", (int)HttpStatusCode.NoContent);
            }
            else
            {
                bool flag = false;
                listTask.Add(task);
                var taskTmp = task;
                do
                {
                    var newtask = GetTaskByID(taskTmp.SubTaskId);
                    if(newtask.SubTaskId != null)
                    {
                        listTask.Add(newtask);
                        taskTmp = newtask;
                    }
                    else
                    {
                        flag = true;
                    }
                } while (flag);
                return listTask;
            }
        }
        public SuccessResponse DeleteTask(string id)
        {
            var task = GetTaskByID(id);
            if (task != null)
            {
                task.IsDelete = true;
                Update(task);
                return new SuccessResponse((int)HttpStatusCode.OK, "Xóa thành công");
            }
            throw new ErrorResponse("Task Không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
        public SuccessResponse ChangeTaskStatus(UpdateTaskStatusViewModel model)
        {
            var task = GetTaskByID(model.TaskId);
            if (task != null)
            {
                if (model.PostId != null)
                {
                    bool check = false;
                    if (model.Status == 2)
                    {
                        throw new ErrorResponse("Trạng thái đang xử lý không thể cập nhật task", (int)HttpStatusCode.Conflict);
                    }
                    if (model.Status == 3)
                    {
                        task.Status = TaskConstants.STATUS_TASK_REVIEW;
                        check = _postService.UpdateTaskID(model.PostId, model.TaskId);
                    }
                    if (model.Status == 4)
                    {
                        task.Status = TaskConstants.STATUS_TASK_FINISH;
                        var checkPublic = _postService.GetPostById(model.PostId).Status;
                        var postStatus = 1;
                        if (checkPublic.Equals("Draft"))
                        {
                            postStatus = 2;
                        }
                        if (checkPublic.Equals("Public"))
                        {
                            postStatus = 3;
                        }
                        if (checkPublic.Equals("Hidden"))
                        {
                            throw new ErrorResponse("Trạng thái ẩn không tồn tại trong review", (int)HttpStatusCode.Conflict);
                        }
                        var updatePublicPost = new UpdatePublicPostViewModel()
                        {
                            PostId = model.PostId,
                            Status = postStatus
                        };
                        _postService.UpdatePublicPost(updatePublicPost);
                        check = true;
                    }
                    if (model.Status == 5)
                    {
                        task.Status = TaskConstants.STATUS_TASK_UNFINISHED;
                        check = true;
                    }
                    if (check)
                    {
                        Update(task);
                        return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
                    }
                }
                else
                {
                    if (model.Status == 1 || model.Status == 3)
                    {
                        throw new ErrorResponse("Bài viết không tồn tại!!!", (int)HttpStatusCode.Conflict);
                    }
                    if (model.Status == 2)
                    {
                        task.Status = TaskConstants.STATUS_TASK_PENDING;
                    }
                    if (model.Status == 5)
                    {
                        task.Status = TaskConstants.STATUS_TASK_UNFINISHED;
                    }
                    Update(task);
                    return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
                }
            }
            throw new ErrorResponse("Task không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
        public SuccessResponse TaskReviewFilter(double percent)
        {
            Random random = new Random();
            var listTask = Get().Where(p => p.Status.Equals("Review")).ToList();
            List<Task> listTaskReview = new List<Task>();
            foreach (var item in listTask)
            {
                var acc = _accountInfoService.GetAccountInfoByID(item.EditorId);
                if (acc.Specialize != null)
                {
                    listTaskReview.Add(item);
                }
            }
            int numFIlter = (int)(percent * listTaskReview.Count());
            var listRand = listTaskReview.OrderBy(x => random.Next(0, numFIlter)).Take(numFIlter);
            foreach (var item in listRand)
            {
                var task = GetTaskByID(item.TaskId);
                task.Status = TaskConstants.STATUS_TASK_FINISH;
                Update(task);
                var post = _postService.GetPostWithTaskID(item.TaskId);
                var model = new UpdatePublicPostViewModel()
                {
                    PostId = post.PostId,
                    Status = 3
                };
                _postService.UpdatePublicPost(model);
            }
            return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
        }
        public void UpdateAccountWordLoad(string email)
        {
            var workNum = GetNumUserWorkLoad(email);
            _accountInfoService.UpdateAccountWorkLoad(email, workNum);
        }
        public int GetNumUserWorkLoad(string email)
        {
            var taskPara1 = new TaskParameters()
            {
                EditorID = email,
                Status = 1
            };
            var task1 = GetAllTask(taskPara1);
            var taskPara2 = new TaskParameters()
            {
                EditorID = email,
                Status = 2
            };
            var task2 = GetAllTask(taskPara2);
            var taskNum = task1.Count() + task2.Count();
            return taskNum;
        }
    }
}
