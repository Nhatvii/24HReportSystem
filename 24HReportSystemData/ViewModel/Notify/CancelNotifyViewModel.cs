using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.ViewModel.Notify
{
    public class CancelNotifyViewModel
    {
        [Required]
        public string NotifyId { get; set; }
        public string CancelType { get; set; }
    }
}
