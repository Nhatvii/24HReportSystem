using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class Promotion
    {
        public Promotion()
        {
            PromotionHistories = new HashSet<PromotionHistory>();
        }

        public string PromotionId { get; set; }
        public string UserId { get; set; }
        public int TotalScore { get; set; }

        [JsonIgnore]
        public virtual Account User { get; set; }
        public virtual ICollection<PromotionHistory> PromotionHistories { get; set; }
    }
}
