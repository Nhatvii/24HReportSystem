using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Repositories;
using _24HReportSystemData.Response;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Service;
using ReportSystemData.Service.Base;
using ReportSystemData.ViewModel.Post;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.Service
{
    public partial interface IPostViewService : IBaseService<PostView>
    {
        List<PostView> GetAllPostView(PostViewParameters postViewParameters);
        Task<SuccessResponse> CreatePostView(PostViewParameters postView);
    }
    public partial class PostViewService : BaseService<PostView>, IPostViewService
    {
        private readonly IPostService _postService;
        public PostViewService(DbContext context, IPostViewRepository repository, IPostService postService) : base(context, repository)
        {
            _dbContext = context;
            _postService = postService;
        }
        public List<PostView> GetAllPostView(PostViewParameters postViewParameters)
        {
            var postViewTmp = Get().ToList();
            if (postViewParameters.UserId != null)
            {
                postViewTmp = postViewTmp.Where(p => p.UserId.Equals(postViewParameters.UserId)).ToList();
            }
            if (postViewParameters.PostId != null)
            {
                postViewTmp = postViewTmp.Where(p => p.PostId.Equals(postViewParameters.PostId)).ToList();
            }
            return postViewTmp;
        }
        public async Task<SuccessResponse> CreatePostView(PostViewParameters postView)
        {
            var check = Get().Where(p => p.PostId.Equals(postView.PostId) && p.UserId.Equals(postView.UserId)).FirstOrDefault();
            if (check == null)
            {
                var postview = new PostView()
                {
                    PostId = postView.PostId,
                    UserId = postView.UserId
                };
                await CreateAsyn(postview);

                var tmp = GetAllPostView(new PostViewParameters() { PostId = postView.PostId });
                _postService.UpdateViewCount(new UpdateViewCountViewModel() { PostId = postView.PostId, Count = tmp.Count() });
                return new SuccessResponse((int)HttpStatusCode.OK, "Lưu thành công");
            }
            throw new ErrorResponse("Bài viết xem đã tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
    }
}
