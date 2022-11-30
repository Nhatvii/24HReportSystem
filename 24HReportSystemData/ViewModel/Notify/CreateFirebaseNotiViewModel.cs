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
        
        public string TokenId { get; set; }
        public string Topic { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
    }
}
