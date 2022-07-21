using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.ViewModel.Report
{
    public class ChangeReportStatusViewModel
    {
        public string ReportId { get; set; }
        public int Status { get; set; }
        public string StaffId { get; set; }
        //public string EditorId { get; set; }
    }
}
