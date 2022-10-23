using _24HReportSystemData.Constants;
using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Response;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repositories;
using ReportSystemData.Service.Base;
using ReportSystemData.ViewModel.Emotion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ReportSystemData.Service
{
    public partial interface IEmotionService : IBaseService<Emotion>
    {
        List<Emotion> GetAllEmotion(EmotionParameters emotionParameters);
        Task<SuccessResponse> ChangeStatusEmotion(EditStatusEmotion statusEmotion);
        bool CheckEmotion(string postID, string userID, string status);
        Task<SuccessResponse> CreateEmotionView(EditStatusEmotion statusEmotion);
        Task<SuccessResponse> CreateEmotionSave(EditStatusEmotion statusEmotion);
        List<Emotion> GetListPostSave(string userID);
    }
    public partial class EmotionService : BaseService<Emotion>, IEmotionService
    {
        public EmotionService(DbContext context, IEmotionRepository repository) : base(context, repository)
        {
            _dbContext = context;
        }

        public List<Emotion> GetAllEmotion(EmotionParameters emotionParameters)
        {
            var emotionTmp = Get().ToList();
            if (emotionParameters.PostId != null)
            {
                emotionTmp = emotionTmp.Where(e => e.PostId.Equals(emotionParameters.PostId)).ToList();
            }
            if (emotionParameters.UserId != null)
            {
                emotionTmp = emotionTmp.Where(e => e.UserId.Equals(emotionParameters.UserId)).ToList();
            }
            if (emotionParameters.EmotionStatus != null)
            {
                emotionTmp = emotionTmp.Where(e => e.EmotionStatus.Equals(emotionParameters.EmotionStatus)).ToList();
            }
            return emotionTmp;
        }

        public async Task<SuccessResponse> ChangeStatusEmotion(EditStatusEmotion statusEmotion)
        {
            var emotionTmp = Get().Where(e => e.PostId.Equals(statusEmotion.PostId) && e.UserId.Equals(statusEmotion.UserId) && (e.EmotionStatus.Equals("Like") || e.EmotionStatus.Equals("Unlike"))).FirstOrDefault();
            if (emotionTmp == null)
            {
                var emo = new Emotion()
                {
                    EmotionId = Guid.NewGuid().ToString(),
                    PostId = statusEmotion.PostId,
                    UserId = statusEmotion.UserId,
                    EmotionStatus = EmotionConstrants.STATUS_EMOTION_LIKE
                };
                await CreateAsyn(emo);
                return new SuccessResponse((int)HttpStatusCode.OK, "Like thành công");
            }
            else
            {
                if (emotionTmp.EmotionStatus.Equals(EmotionConstrants.STATUS_EMOTION_LIKE))
                {
                    emotionTmp.EmotionStatus = EmotionConstrants.STATUS_EMOTION_UNLIKE;
                }
                else if(emotionTmp.EmotionStatus.Equals(EmotionConstrants.STATUS_EMOTION_UNLIKE))
                {
                    emotionTmp.EmotionStatus = EmotionConstrants.STATUS_EMOTION_LIKE;
                }
                Update(emotionTmp);
                return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật trạng thái thành công");
            }
        }
        public async Task<SuccessResponse> CreateEmotionView(EditStatusEmotion statusEmotion)
        {
            var emotionTmp = CheckEmotion(statusEmotion.PostId, statusEmotion.UserId, "View");
            if (!emotionTmp)
            {
                var emo = new Emotion()
                {
                    EmotionId = Guid.NewGuid().ToString(),
                    PostId = statusEmotion.PostId,
                    UserId = statusEmotion.UserId,
                    EmotionStatus = EmotionConstrants.STATUS_EMOTION_VIEW
                };
                await CreateAsyn(emo);
                return new SuccessResponse((int)HttpStatusCode.OK, "View Success");
            }
            throw new ErrorResponse("Bài viết đã xem!!!", (int)HttpStatusCode.NotFound);
        }

        public bool CheckEmotion(string postID, string userID, string status)
        {
            var checkEmo = Get().Where(e => e.PostId.Equals(postID) && e.UserId.Equals(userID) && e.EmotionStatus.Equals(status)).FirstOrDefault();
            if (checkEmo != null)
            {
                return true;
            }
            return false;
        }

        public async Task<SuccessResponse> CreateEmotionSave(EditStatusEmotion statusEmotion)
        {
            var emotionTmp = CheckEmotion(statusEmotion.PostId, statusEmotion.UserId, "Save");
            if (!emotionTmp)
            {
                var emo = new Emotion()
                {
                    EmotionId = Guid.NewGuid().ToString(),
                    PostId = statusEmotion.PostId,
                    UserId = statusEmotion.UserId,
                    EmotionStatus = EmotionConstrants.STATUS_EMOTION_SAVE
                };
                await CreateAsyn(emo);
                return new SuccessResponse((int)HttpStatusCode.OK, "Lưu thành công");
            }
            else
            {
                var emo = Get().Where(e => e.PostId.Equals(statusEmotion.PostId) && e.UserId.Equals(statusEmotion.UserId) && e.EmotionStatus.Equals(EmotionConstrants.STATUS_EMOTION_SAVE)).FirstOrDefault();
                if (emo != null)
                {
                    Delete(emo);
                }
                return new SuccessResponse((int)HttpStatusCode.OK, "Lưu thành công");
            }
        }
        public List<Emotion> GetListPostSave(string userID)
        {
            var listEmo = Get().Where(p => p.UserId.Equals(userID) && p.EmotionStatus.Equals(EmotionConstrants.STATUS_EMOTION_SAVE)).ToList();
            if (listEmo != null)
            {
                return listEmo;
            }
            return null;
        }
    }
}
