using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.ViewModel.Report
{
    public class ChangeReportCateViewModel
    {
        [Required]
        public string ReportId { get; set; }
        public int? CategoryId { get; set; }
        public string StaffId { get; set; }
        public int? Score { get; set; }
    }
}
