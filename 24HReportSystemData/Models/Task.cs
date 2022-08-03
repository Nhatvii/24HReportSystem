using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class Task
    {
        public Task()
        {
            Posts = new HashSet<Post>();
            ReportTasks = new HashSet<ReportTask>();
        }

        public string TaskId { get; set; }
        public string EditorId { get; set; }
        public string Status { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? DeadLineTime { get; set; }
        public bool IsDelete { get; set; }
        public string BoardId { get; set; }
        public string Description { get; set; }
        public string SubTaskId { get; set; }

        [JsonIgnore]
        public virtual Board Board { get; set; }
        [JsonIgnore]
        public virtual Account Editor { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<ReportTask> ReportTasks { get; set; }
    }
}
