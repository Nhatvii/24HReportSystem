using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class Post
    {
        public Post()
        {
            Comments = new HashSet<Comment>();
            Emotions = new HashSet<Emotion>();
        }

        public string PostId { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        [JsonIgnore]
        public int CategoryId { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public DateTime? PublicTime { get; set; }
        public string Description { get; set; }
        public string Video { get; set; }
        public string Image { get; set; }
        public int ViewCount { get; set; }
        [JsonIgnore]
        public string EditorId { get; set; }
        public string Status { get; set; }
        public bool IsDelete { get; set; }
        public string TaskId { get; set; }
        public int? LikeCount { get; set; }
        public int? CommentCount { get; set; }
        public int? ShareCount { get; set; }

        public virtual Category Category { get; set; }
        public virtual Account Editor { get; set; }
        [JsonIgnore]
        public virtual Task Task { get; set; }
        [JsonIgnore]
        public virtual ICollection<Comment> Comments { get; set; }
        [JsonIgnore]
        public virtual ICollection<Emotion> Emotions { get; set; }
    }
}
