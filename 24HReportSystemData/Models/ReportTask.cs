using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class ReportTask
    {
        [JsonIgnore]
        public string TaskId { get; set; }
        public string ReportId { get; set; }
        public DateTime CreateTime { get; set; }
        public string Status { get; set; }

        [JsonIgnore]
        public virtual Report Report { get; set; }
        [JsonIgnore]
        public virtual Task Task { get; set; }
    }
}
