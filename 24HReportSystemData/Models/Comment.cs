using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class Comment
    {
        public string CommentId { get; set; }
        public string CommentTitle { get; set; }
        [JsonIgnore]
        public string UserId { get; set; }
        public DateTime CreateTime { get; set; }
        public string Status { get; set; }
        public string PostId { get; set; }
        public bool IsDelete { get; set; }

        public virtual Post Post { get; set; }
        public virtual Account User { get; set; }
    }
}
