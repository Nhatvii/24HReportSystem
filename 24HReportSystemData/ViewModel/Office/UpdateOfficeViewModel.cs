using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.ViewModel.Office
{
    public class UpdateOfficeViewModel
    {
        [Required]
        public string OfficeId { get; set; }
        public string OfficeName { get; set; }
        public string District { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public string PhoneNumber { get; set; }
    }
}
