using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class Report
    {
        public Report()
        {
            ReportDetails = new HashSet<ReportDetail>();
            ReportTasks = new HashSet<ReportTask>();
            ReportViews = new HashSet<ReportView>();
        }

        public string ReportId { get; set; }
        public string ReportTitle { get; set; }
        public string Location { get; set; }
        public DateTime TimeFraud { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public DateTime CreateTime { get; set; }
        public bool? IsAnonymous { get; set; }
        public string StaffId { get; set; }
        public string UserId { get; set; }
        public string EditorId { get; set; }
        public string Status { get; set; }
        public bool IsDelete { get; set; }
        public int Score { get; set; }

        [JsonIgnore]
        public virtual Category Category { get; set; }
        [JsonIgnore]
        public virtual Account Editor { get; set; }
        [JsonIgnore]
        public virtual Account Staff { get; set; }
        [JsonIgnore]
        public virtual Account User { get; set; }
        public virtual ICollection<ReportDetail> ReportDetails { get; set; }
        [JsonIgnore]
        public virtual ICollection<ReportTask> ReportTasks { get; set; }
        public virtual ICollection<ReportView> ReportViews { get; set; }
    }
}
