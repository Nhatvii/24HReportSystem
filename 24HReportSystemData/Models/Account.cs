using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class Account
    {
        public Account()
        {
            Boards = new HashSet<Board>();
            Comments = new HashSet<Comment>();
            Emotions = new HashSet<Emotion>();
            Posts = new HashSet<Post>();
            ReportEditors = new HashSet<Report>();
            ReportStaffs = new HashSet<Report>();
            ReportUsers = new HashSet<Report>();
            ReportViews = new HashSet<ReportView>();
            Tasks = new HashSet<Task>();
        }

        public string AccountId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        [JsonIgnore]
        public int RoleId { get; set; }
        public string PhoneNumber { get; set; }

        public virtual Role Role { get; set; }
        public virtual AccountInfo AccountInfo { get; set; }
        [JsonIgnore]
        public virtual ICollection<Board> Boards { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        [JsonIgnore]
        public virtual ICollection<Emotion> Emotions { get; set; }
        [JsonIgnore]
        public virtual ICollection<Post> Posts { get; set; }
        [JsonIgnore]
        public virtual ICollection<Report> ReportEditors { get; set; }
        [JsonIgnore]
        public virtual ICollection<Report> ReportStaffs { get; set; }
        [JsonIgnore]
        public virtual ICollection<Report> ReportUsers { get; set; }
        [JsonIgnore]
        public virtual ICollection<ReportView> ReportViews { get; set; }
        [JsonIgnore]
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
