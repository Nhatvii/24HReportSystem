using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.ViewModel.Report
{
    public class ReportResponseWithUserID
    {
        public string ReportId { get; set; }
        public string Location { get; set; }
        public DateTime TimeFraud { get; set; }
        public string Description { get; set; }
        public DateTime CreateTime { get; set; }
        public bool? IsAnonymous { get; set; }
        public string UserId { get; set; }
        public string Status { get; set; }
    }
}
