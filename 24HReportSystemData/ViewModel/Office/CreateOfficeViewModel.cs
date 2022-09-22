using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.ViewModel.Office
{
    public class CreateOfficeViewModel
    {
        [Required]
        public string OfficeName { get; set; }
        [Required]
        public string District { get; set; }
        [Required]
        public decimal Latitude { get; set; }
        [Required]
        public decimal Longitude { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
    }
}
