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
        bool CheckEmotion(string postID, string userID);
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
                emotionTmp = emotionTmp.Where(e => e.EmotionStatus == emotionParameters.EmotionStatus).ToList();
            }
            if (emotionParameters.IsView != null)
            {
                emotionTmp = emotionTmp.Where(e => e.IsView == emotionParameters.IsView).ToList();
            }
            return emotionTmp;
        }

        public async Task<SuccessResponse> ChangeStatusEmotion(EditStatusEmotion statusEmotion)
        {
            var emotionTmp = Get().Where(e => e.PostId.Equals(statusEmotion.PostId) && e.UserId.Equals(statusEmotion.UserId)).FirstOrDefault();
            if (emotionTmp == null)
            {
                var emo = new Emotion()
                {
                    PostId = statusEmotion.PostId,
                    UserId = statusEmotion.UserId,
                    EmotionStatus = true
                };
                await CreateAsyn(emo);
                return new SuccessResponse((int)HttpStatusCode.OK, "Like thành công");
            }
            else
            {
                if (emotionTmp.EmotionStatus == true)
                {
                    emotionTmp.EmotionStatus = false;
                }
                else
                {
                    emotionTmp.EmotionStatus = true;
                }
                Update(emotionTmp);
                return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật trạng thái thành công");
            }
        }
        public async Task<SuccessResponse> CreateEmotionView(EditStatusEmotion statusEmotion)
        {
            var emotionTmp = CheckEmotion(statusEmotion.PostId, statusEmotion.UserId);
            if (!emotionTmp)
            {
                var emo = new Emotion()
                {
                    PostId = statusEmotion.PostId,
                    UserId = statusEmotion.UserId,
                    IsView = true
                };
                await CreateAsyn(emo);
                return new SuccessResponse((int)HttpStatusCode.OK, "View Success");
            }
            else
            {
                var emo = Get().Where(e => e.PostId.Equals(statusEmotion.PostId) && e.UserId.Equals(statusEmotion.UserId)).FirstOrDefault();
                emo.IsView = true;
                Update(emo);
                return new SuccessResponse((int)HttpStatusCode.OK, "View Success");
            }
        }

        public bool CheckEmotion(string postID, string userID)
        {
            var checkEmo = Get().Where(e => e.PostId.Equals(postID) && e.UserId.Equals(userID)).FirstOrDefault();
            if (checkEmo != null)
            {
                return true;
            }
            return false;
        }

        public async Task<SuccessResponse> CreateEmotionSave(EditStatusEmotion statusEmotion)
        {
            var emotionTmp = CheckEmotion(statusEmotion.PostId, statusEmotion.UserId);
            if (!emotionTmp)
            {
                var emo = new Emotion()
                {
                    PostId = statusEmotion.PostId,
                    UserId = statusEmotion.UserId,
                    IsSave = true
                };
                await CreateAsyn(emo);
                return new SuccessResponse((int)HttpStatusCode.OK, "Lưu thành công");
            }
            else
            {
                var emo = Get().Where(e => e.PostId.Equals(statusEmotion.PostId) && e.UserId.Equals(statusEmotion.UserId)).FirstOrDefault();
                if (emo.IsSave == true)
                {
                    emo.IsSave = false;
                }
                else
                {
                    emo.IsSave = true;
                }
                Update(emo);
                return new SuccessResponse((int)HttpStatusCode.OK, "Lưu thành công");
            }
        }
        public List<Emotion> GetListPostSave(string userID)
        {
            var listEmo = Get().Where(p => p.UserId.Equals(userID) && p.IsSave == true).ToList();
            if(listEmo != null)
            {
                return listEmo;
            }
            return null;
        }
    }
}
