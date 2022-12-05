using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.ViewModel.Office
{
    public class SosInfoResponse
    {
        public string OfficeId { get; set; }
        public string NotifyId { get; set; }
        public string OfficeName { get; set; }
        public string District { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string OfficerId { get; set; }
        public string OfficerName { get; set; }
        public string OfficerPhoneNumber { get; set; }
        public int Distance { get; set; }
        public int Duration { get; set; }
    }
}
