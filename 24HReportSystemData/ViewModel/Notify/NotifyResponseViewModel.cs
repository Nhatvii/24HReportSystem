using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.ViewModel.Notify
{
    public class NotifyResponseViewModel
    {
        public string OfficeId { get; set; }
        public string OfficerId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string NotifyId { get; set; }
    }
}
