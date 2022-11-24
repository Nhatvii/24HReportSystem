using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.ViewModel.Notify
{
    public class CreateFirebaseNotiViewModel
    {
        [Required]
        public string TokenId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
    }
}
