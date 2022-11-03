using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class PostRecommend
    {
        public string AccountId { get; set; }
        public string PostId { get; set; }
        public int? RatingPoint { get; set; }
    }
}
