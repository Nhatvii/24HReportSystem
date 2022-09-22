using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class Category
    {
        public Category()
        {
            Accounts = new HashSet<Account>();
            InverseRootCategory = new HashSet<Category>();
            Posts = new HashSet<Post>();
            Reports = new HashSet<Report>();
        }

        public int CategoryId { get; set; }
        public string Type { get; set; }
        [JsonIgnore]
        public int? RootCategoryId { get; set; }

        public virtual Category RootCategory { get; set; }
        [JsonIgnore]
        public virtual ICollection<Account> Accounts { get; set; }
        [JsonIgnore]
        public virtual ICollection<Category> InverseRootCategory { get; set; }
        [JsonIgnore]
        public virtual ICollection<Post> Posts { get; set; }
        [JsonIgnore]
        public virtual ICollection<Report> Reports { get; set; }
    }
}
