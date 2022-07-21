using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class Board
    {
        public Board()
        {
            Tasks = new HashSet<Task>();
        }

        public string BoardId { get; set; }
        public string BoardName { get; set; }
        public string ManagerId { get; set; }
        public bool IsDelete { get; set; }
        public DateTime CreateTime { get; set; }

        [JsonIgnore]
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
