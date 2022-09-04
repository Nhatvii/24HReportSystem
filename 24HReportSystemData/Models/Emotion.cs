using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class Emotion
    {
        public string PostId { get; set; }
        public string UserId { get; set; }
        public bool? EmotionStatus { get; set; }

        [JsonIgnore]
        public virtual Post Post { get; set; }
        [JsonIgnore]
        public virtual Account User { get; set; }
    }
}
