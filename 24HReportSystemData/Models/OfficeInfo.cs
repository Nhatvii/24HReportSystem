using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class OfficeInfo
    {
        public OfficeInfo()
        {
            AccountInfos = new HashSet<AccountInfo>();
        }

        public string OfficeId { get; set; }
        public string OfficeName { get; set; }
        public string District { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string PhoneNumber { get; set; }

        [JsonIgnore]
        public virtual ICollection<AccountInfo> AccountInfos { get; set; }
    }
}
