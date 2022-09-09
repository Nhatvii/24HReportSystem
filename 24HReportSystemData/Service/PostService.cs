using _24HReportSystemData.Constants;
using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Response;
using _24HReportSystemData.ViewModel;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repositories;
using ReportSystemData.Service.Base;
using ReportSystemData.ViewModel.Emotion;
using ReportSystemData.ViewModel.Post;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ReportSystemData.Service
{
    public partial interface IPostService : IBaseService<Post>
    {
        List<Post> GetAllPost(PostParameters postParameters);
        Post GetPostById(string id);
        Task<string> CreatePostAsync(CreatePostViewModel post);
        SuccessResponse UpdatePost(UpdatePostViewModel post);
        SuccessResponse UpdatePublicPost(UpdatePublicPostViewModel post);
        SuccessResponse DeletePost(string id);
        SuccessResponse UpdateViewCount(UpdateViewCountViewModel model);
        //Task<SuccessResponse> UpdatePostSave(UpdateViewCountViewModel model);
        //List<Post> GetListPostSave(string userID);
        SuccessResponse UpdateShareCount(string postID);
        bool UpdateTaskID(string postID, string taskID);
        Post GetPostWithTaskID(string taskID);
    }
    public partial class PostService : BaseService<Post>, IPostService
    {
        private readonly IMapper _mapper;
        private readonly ICategoryService _categoryService;
        private readonly IAccountService _accountService;
        private readonly IEmotionService _emotionService;
        private readonly ICommentService _commentService;
        public PostService(DbContext context, IMapper mapper, IPostRepository repository, ICategoryService categoryService, IAccountService accountService, IEmotionService emotionService, ICommentService commentService) : base(context, repository)
        {
            _dbContext = context;
            _mapper = mapper;
            _categoryService = categoryService;
            _accountService = accountService;
            _emotionService = emotionService;
            _commentService = commentService;
        }

        public List<Post> GetAllPost(PostParameters postParameters)
        {
            var post = Get().Where(p => p.IsDelete == false)
                .Include(p => p.Category).ThenInclude(p => p.RootCategory)
                .Include(p => p.Editor).ThenInclude(p => p.AccountInfo)
                .Include(p => p.Editor).ThenInclude(p => p.Role).ToList();
            UpdatePostEmoCmtShare(post);
            if (postParameters.Status.HasValue && postParameters.Status > 0)
            {
                post = GetPostWithStatus(postParameters.Status);
            }
            if (postParameters.RootCategoryID.HasValue && postParameters.RootCategoryID > 0)
            {
                post = post.Where(p => p.Category.RootCategoryId == postParameters.RootCategoryID).ToList();
            }
            if (postParameters.SubCategoryID.HasValue && postParameters.SubCategoryID > 0)
            {
                post = post.Where(p => p.Category.CategoryId == postParameters.SubCategoryID).ToList();
            }
            if (postParameters.SearchContent != null)
            {
                post = post.Where(p => p.Title.Contains(postParameters.SearchContent) || p.SubTitle.Contains(postParameters.SearchContent)).ToList();
            }
            if (postParameters.isViewCount != null)
            {
                if ((bool)postParameters.isViewCount)
                {
                    post = post.OrderByDescending(p => p.ViewCount).ToList();
                }
                else
                {
                    post = post.OrderBy(p => p.ViewCount).ToList();
                }
            }
            if (postParameters.isShareCount != null)
            {
                if ((bool)postParameters.isShareCount)
                {
                    post = post.OrderByDescending(p => p.ShareCount).ToList();
                }
                else
                {
                    post = post.OrderBy(p => p.ShareCount).ToList();
                }
            }
            if (postParameters.isRecentDate != null)
            {
                if ((bool)postParameters.isRecentDate)
                {
                    post = post.OrderByDescending(p => p.PublicTime).ToList();
                }
                else
                {
                    post = post.OrderBy(p => p.PublicTime).ToList();
                }
            }
            if (postParameters.EditorID != null)
            {
                post = post.Where(p => p.EditorId.Equals(postParameters.EditorID)).ToList();
            }
            return post;
        }

        public Post GetPostById(string id)
        {
            var post = Get().Where(r => r.PostId == id)
                .Include(p => p.Category)
                .Include(p => p.Editor).ThenInclude(p => p.AccountInfo).ToList();
            if (post[0] == null)
            {
                throw new ErrorResponse("Bài viết không tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
            UpdatePostEmoCmtShare(post);
            return post[0];
        }

        public List<Post> GetPostWithStatus(int? status)
        {
            var post = new List<Post>();
            if (status == 1)
            {
                post = Get().Where(p => p.Status.Equals(PostConstrants.STATUS_POST_DRAFT)).ToList();
            }
            if (status == 2)
            {
                post = Get().Where(p => p.Status.Equals(PostConstrants.STATUS_POST_HIDDEN)).ToList();
            }
            if (status == 3)
            {
                post = Get().Where(p => p.Status.Equals(PostConstrants.STATUS_POST_PUBLIC)).ToList();
            }
            return post;
        }

        public async Task<string> CreatePostAsync(CreatePostViewModel post)
        {
            var account = _accountService.GetAccountByID(post.UserID);
            if (account != null)
            {
                if (!(account.RoleId == 1))
                {
                    var postTmp = _mapper.Map<Post>(post);
                    postTmp.PostId = Guid.NewGuid().ToString();
                    postTmp.CreateTime = DateTime.Now;
                    postTmp.ViewCount = 0;
                    postTmp.EditorId = post.UserID;
                    postTmp.Status = PostConstrants.STATUS_POST_DRAFT;
                    await CreateAsyn(postTmp);
                    return postTmp.PostId;
                    //return new SuccessResponse((int)HttpStatusCode.OK, "Tạo thành công");
                }
                throw new ErrorResponse("User không thể tạo bài viết!!!", (int)HttpStatusCode.NoContent);
            }
            throw new ErrorResponse("Tài khoản không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
        public SuccessResponse UpdatePost(UpdatePostViewModel post)
        {
            var checkAccount = _accountService.CheckAvaiAccount(post.EditorId);
            if (checkAccount)
            {
                var checkCate = _categoryService.CheckAvailableCategory(post.CategoryId);
                if (checkCate)
                {
                    var postTmp = Get().Where(p => p.PostId.Equals(post.PostId)).FirstOrDefault();
                    if (postTmp != null)
                    {
                        if (post.Title != null)
                        {
                            postTmp.Title = post.Title;
                        }

                        postTmp.UpdateTime = DateTime.Now;
                        postTmp.CategoryId = post.CategoryId;
                        postTmp.EditorId = post.EditorId;
                        if (post.Description != null)
                        {
                            postTmp.Description = post.Description;
                        }
                        if (post.Video != null)
                        {
                            postTmp.Video = post.Video;
                        }
                        if (post.Image != null)
                        {
                            postTmp.Image = post.Image;
                        }
                        //if(post.TaskId != null)
                        //{
                        //    postTmp.TaskId = post.TaskId;
                        //}
                        Update(postTmp);
                        return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
                    }
                    throw new ErrorResponse("Bài viết không tồn tại!!!", (int)HttpStatusCode.NotFound);
                }
                throw new ErrorResponse("Danh mục gốc không tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
            throw new ErrorResponse("Editor không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }

        public SuccessResponse UpdatePublicPost(UpdatePublicPostViewModel post)
        {
            var postTmp = Get().Where(p => p.PostId.Equals(post.PostId)).FirstOrDefault();
            if (postTmp != null)
            {
                if (post.Status == 1)
                {
                    postTmp.Status = PostConstrants.STATUS_POST_DRAFT;
                }
                if (post.Status == 2)
                {
                    postTmp.Status = PostConstrants.STATUS_POST_HIDDEN;
                }
                if (post.Status == 3)
                {
                    postTmp.Status = PostConstrants.STATUS_POST_PUBLIC;
                }
                postTmp.PublicTime = DateTime.Now;
                Update(postTmp);
                return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
            }
            throw new ErrorResponse("Bài viết không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }

        public SuccessResponse DeletePost(string id)
        {
            var postTmp = Get().Where(r => r.PostId.Equals(id)).FirstOrDefault();
            if (postTmp != null)
            {
                postTmp.IsDelete = true;
                Update(postTmp);
                return new SuccessResponse((int)HttpStatusCode.OK, "Xóa thành công");
            }
            throw new ErrorResponse("Bài viết không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }

        public SuccessResponse UpdateViewCount(UpdateViewCountViewModel model)
        {
            var post = GetPostById(model.PostId);
            post.ViewCount = model.Count;
            Update(post);
            return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
        }

        //public async Task<SuccessResponse> UpdatePostSave(UpdateViewCountViewModel model)
        //{
        //    var emo = _mapper.Map<EditStatusEmotion>(model);
        //    await _emotionService.CreateEmotionSave(emo);
        //    return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
        //}

        public List<Post> UpdatePostEmoCmtShare(List<Post> post)
        {
            foreach (var item in post)
            {
                var listLike = _emotionService.GetAllEmotion(new EmotionParameters() { PostId = item.PostId, EmotionStatus = EmotionConstrants.STATUS_EMOTION_LIKE });
                item.LikeCount = listLike.Count();
                var listCmt = _commentService.GetAllComment(new CommentParameters() { PostId = item.PostId });
                item.CommentCount = listCmt.Count();
                Update(item);
            }
            return post;
        }
        //public List<Post> GetListPostSave(string userID)
        //{
        //    var listPost = new List<Post>();
        //    var listEmo = _emotionService.GetListPostSave(userID);
        //    if (listEmo != null)
        //    {
        //        foreach (var item in listEmo)
        //        {
        //            var postTmp = Get().Where(p => p.PostId.Equals(item.PostId) && p.Status.Equals(PostConstrants.STATUS_POST_PUBLIC)).Include(p => p.Category).ThenInclude(p => p.RootCategoryNavigation).Include(p => p.Editor).ThenInclude(p => p.AccountInfo).FirstOrDefault();
        //            if(postTmp != null)
        //            {
        //                listPost.Add(postTmp);
        //            }
        //        }
        //        if (listPost != null)
        //        {
        //            return listPost;
        //        }
        //    }
        //    return null;
        //}

        public SuccessResponse UpdateShareCount(string postID)
        {
            var post = GetPostById(postID);
            if (post != null)
            {
                if (post.ShareCount == null)
                {
                    post.ShareCount = 1;
                }
                else
                {
                    post.ShareCount++;
                }
                Update(post);
                return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
            }
            throw new ErrorResponse("Bài viết không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
        public Post GetPostWithTaskID(string taskID)
        {
            var post = Get().Where(p => p.TaskId.Equals(taskID)).FirstOrDefault();
            return post;
        }
        public bool UpdateTaskID(string postID, string taskID)
        {
            var taskList = GetPostWithTaskID(taskID);
            if (taskList != null)
            {
                throw new ErrorResponse("Task đã tồn tại trong một bài viết!!!", (int)HttpStatusCode.NotFound);
            }
            else
            {
                var post = Get().Where(p => p.PostId.Equals(postID) && p.IsDelete == false).FirstOrDefault();
                if (post != null)
                {
                    post.TaskId = taskID;
                    Update(post);
                    return true;
                }
                throw new ErrorResponse("Bài viết không tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
        }
    }
}
