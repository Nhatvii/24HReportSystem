using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ReportSystemData.Parameter.Report
{
    public class CreateReportViewModel
    {
        public string UserID { get; set; }
        public string StaffID { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public DateTime TimeFraud { get; set; }
        [Required]
        public string Description { get; set; }
        public List<string> Video { get; set; }
        public List<string> Image { get; set; }
        public List<string> Record { get; set; }
        [Required]
        public bool? IsAnonymous { get; set; }
        public int? CategoryId { get; set; }
    }
}
