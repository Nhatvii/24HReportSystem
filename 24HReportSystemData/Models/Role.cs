using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class Role
    {
        public Role()
        {
            Accounts = new HashSet<Account>();
        }

        public int RoleId { get; set; }
        public string RoleName { get; set; }

        [JsonIgnore]
        public virtual ICollection<Account> Accounts { get; set; }
    }
}
