using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class ReportView
    {
        public string ReportId { get; set; }
        public string UserId { get; set; }
        public bool IsView { get; set; }

        [JsonIgnore]
        public virtual Report Report { get; set; }
        [JsonIgnore]
        public virtual Account User { get; set; }
    }
}
