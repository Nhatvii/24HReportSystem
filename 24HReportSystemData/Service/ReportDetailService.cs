using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Response;
using Microsoft.EntityFrameworkCore;
using ReportSystemData.Repositories;
using ReportSystemData.Service.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ReportSystemData.Service
{
    public partial interface IReportDetailService : IBaseService<ReportDetail>
    {
        Task<SuccessResponse> CreateReportDetail(string reportID, List<string> image, List<string> video);
        List<ReportDetail> GetAllReportDetail(ReportDetailParameters reportDetailParameters);
    }
    public partial class ReportDetailService : BaseService<ReportDetail>, IReportDetailService
    {
        public ReportDetailService(DbContext context, IReportDetailRepository repository) : base(context, repository)
        {
            _dbContext = context;
        }

        public async Task<SuccessResponse> CreateReportDetail(string reportID, List<string> image, List<string> video)
        {
            if(image != null)
            {
                foreach (var itemImage in image)
                {
                    var reportDetail = new ReportDetail()
                    {
                        Media = itemImage.ToString(),
                        Type = "Image",
                        ReportId = reportID
                    };
                    await CreateAsyn(reportDetail);
                }
            }
            if(video != null)
            {
                foreach (var itemVideo in video)
                {
                    var reportDetail = new ReportDetail()
                    {
                        Media = itemVideo.ToString(),
                        Type = "Video",
                        ReportId = reportID
                    };
                    await CreateAsyn(reportDetail);
                }
            }
            return new SuccessResponse((int)HttpStatusCode.OK, "Tạo thành công");
        }

        public List<ReportDetail> GetAllReportDetail(ReportDetailParameters reportDetailParameters)
        {
            var reportDetail = Get().ToList();
            if(reportDetailParameters.ReportID != null)
            {
                reportDetail = reportDetail.Where(rp => rp.ReportId.Equals(reportDetailParameters.ReportID)).ToList();
            }
            return reportDetail;
        }
    }
}
