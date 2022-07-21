using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class ReportDetail
    {
        public int ReportDetailId { get; set; }
        public string Media { get; set; }
        public string Type { get; set; }
        public string ReportId { get; set; }

        [JsonIgnore]
        public virtual Report Report { get; set; }
    }
}
