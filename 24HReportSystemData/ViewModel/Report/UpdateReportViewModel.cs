using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ReportSystemData.Parameter.Report
{
    public class UpdateReportViewModel
    {
        [Required]
        public string ReportId { get; set; }
        [StringLength(200)]
        public string Location { get; set; }
        public DateTime? TimeFraud { get; set; }
        [StringLength(300)]
        public string Description { get; set; }
        [StringLength(200)]
        public string Video { get; set; }
        [StringLength(200)]
        public string Image { get; set; }
        public int CategoryId { get; set; }
        public string Status { get; set; }
    }
}
