using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class NotifyInfo
    {
        public string NotifyId { get; set; }
        public string OfficeId { get; set; }
        [JsonIgnore]
        public string OfficerId { get; set; }
        [JsonIgnore]
        public string UserId { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public bool NotifyStatus { get; set; }
        public DateTime AcceptedDate { get; set; }

        [JsonIgnore]
        public virtual OfficeInfo Office { get; set; }
        public virtual Account Officer { get; set; }
        public virtual Account User { get; set; }
    }
}
