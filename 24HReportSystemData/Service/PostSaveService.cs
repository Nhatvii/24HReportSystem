using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Repositories;
using _24HReportSystemData.Response;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Service.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.Service
{
    public partial interface IPostSaveService : IBaseService<PostSave>
    {
        List<PostSave> GetAllPostSave(PostSaveParameters postSaveParameters);
        PostSave GetPostSave(PostSaveParameters postSave);
        Task<SuccessResponse> CreatePostSave(PostSaveParameters postSave);
    }
    public partial class PostSaveService : BaseService<PostSave>, IPostSaveService
    {
        public PostSaveService(DbContext context, IPostSaveRepository repository) : base(context, repository)
        {
            _dbContext = context;
        }
        public List<PostSave> GetAllPostSave(PostSaveParameters postSaveParameters)
        {
            var postSaveTmp = Get().ToList();
            if(postSaveParameters.UserId != null)
            {
                postSaveTmp = postSaveTmp.Where(p => p.UserId.Equals(postSaveParameters.UserId)).ToList();
            }
            if(postSaveParameters.PostId != null)
            {
                postSaveTmp = postSaveTmp.Where(p => p.PostId.Equals(postSaveParameters.PostId)).ToList();
            }
            return postSaveTmp;
        }
        public PostSave GetPostSave(PostSaveParameters postSave)
        {
            var postSaveTmp = Get().Where(p => p.PostId.Equals(postSave.PostId) && p.UserId.Equals(postSave.UserId)).FirstOrDefault();
            if(postSaveTmp != null)
            {
                return postSaveTmp;
            }
            throw new ErrorResponse("Bài viết đã lưu không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
        public async Task<SuccessResponse> CreatePostSave(PostSaveParameters postSave)
        {
            var check = Get().Where(p => p.PostId.Equals(postSave.PostId) && p.UserId.Equals(postSave.UserId)).FirstOrDefault();
            if (check == null)
            {
                var postsave = new PostSave()
                {
                    PostId = postSave.PostId,
                    UserId = postSave.UserId
                };
                await CreateAsyn(postsave);
                return new SuccessResponse((int)HttpStatusCode.OK, "Lưu thành công");
            }
            throw new ErrorResponse("Bài viết lưu đã tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
    }
}
