using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class RootCategory
    {
        public RootCategory()
        {
            AccountInfos = new HashSet<AccountInfo>();
            Categories = new HashSet<Category>();
        }

        public int RootCategoryId { get; set; }
        public string Type { get; set; }

        [JsonIgnore]
        public virtual ICollection<AccountInfo> AccountInfos { get; set; }
        [JsonIgnore]
        public virtual ICollection<Category> Categories { get; set; }
    }
}
