using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ReportSystemData.ViewModel.Post
{
    public class UpdatePublicPostViewModel
    {
        [Required]
        public string PostId { get; set; }
        [Required]
        public int Status { get; set; }
    }
}
