using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.ViewModel.Notify
{
    public class CreateNotifyViewModel
    {
        [Required]
        public string OfficeId { get; set; }
        [Required]
        public string OfficerId { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public decimal Latitude { get; set; }
        [Required]
        public decimal Longitude { get; set; }
    }
}
