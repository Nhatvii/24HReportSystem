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
            Accounts = new HashSet<Account>();
            NotifyInfos = new HashSet<NotifyInfo>();
        }

        public string OfficeId { get; set; }
        public string OfficeName { get; set; }
        public string District { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string PhoneNumber { get; set; }
        public int ActiveOfficer { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }

        [JsonIgnore]
        public virtual ICollection<Account> Accounts { get; set; }
        [JsonIgnore]
        public virtual ICollection<NotifyInfo> NotifyInfos { get; set; }
    }
}
