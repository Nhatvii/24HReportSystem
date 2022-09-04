using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class PromotionHistory
    {
        public string PromotionHistoryId { get; set; }
        [JsonIgnore]
        public string PromotionId { get; set; }
        public string ReportId { get; set; }
        public int Score { get; set; }
        public DateTime CreateTime { get; set; }

        [JsonIgnore]
        public virtual Promotion Promotion { get; set; }
        [JsonIgnore]
        public virtual Report Report { get; set; }
    }
}
