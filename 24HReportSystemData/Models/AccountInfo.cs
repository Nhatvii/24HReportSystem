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
        public string Fullname { get; set; }
        public string Address { get; set; }
        public string IdentityCard { get; set; }

        [JsonIgnore]
        public virtual Account Account { get; set; }
    }
}
