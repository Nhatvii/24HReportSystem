using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class AccountInfo
    {
        [JsonIgnore]
        public string AccountId { get; set; }
        public string Username { get; set; }
        public string Address { get; set; }
        public string IdentityCard { get; set; }
        public bool IsAuthen { get; set; }
        public int WorkLoad { get; set; }
        [JsonIgnore]
        public int? Specialize { get; set; }
        public string OfficeId { get; set; }
        public int TotalScore { get; set; }
        [JsonIgnore]
        public virtual Account Account { get; set; }
        public virtual OfficeInfo Office { get; set; }
        public virtual Category SpecializeNavigation { get; set; }
    }
}
