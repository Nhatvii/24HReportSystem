using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class AccountInfo
    {
        [JsonIgnore]
        public string Email { get; set; }
        public string Username { get; set; }
        public string Address { get; set; }
        public string IdentityCard { get; set; }
        public bool IsAuthen { get; set; }
        public int? WorkLoad { get; set; }
        [JsonIgnore]
        public int? Specialize { get; set; }

        [JsonIgnore]
        public virtual Account EmailNavigation { get; set; }
        
        public virtual RootCategory SpecializeNavigation { get; set; }
    }
}
