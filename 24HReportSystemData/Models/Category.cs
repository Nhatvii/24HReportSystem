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
            Posts = new HashSet<Post>();
            Reports = new HashSet<Report>();
        }

        public int CategoryId { get; set; }
        public string SubCategory { get; set; }
        [JsonIgnore]
        public int RootCategory { get; set; }

        public virtual RootCategory RootCategoryNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<Post> Posts { get; set; }
        [JsonIgnore]
        public virtual ICollection<Report> Reports { get; set; }
    }
}
