using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ReportSystemData.ViewModel.Post
{
    public class UpdatePostViewModel
    {
        [Required]
        public string PostId { get; set; }
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public string Video { get; set; }
        public string Image { get; set; }
        public string EditorId { get; set; }
        //public string TaskId{ get; set; }
    }
}
