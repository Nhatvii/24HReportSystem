using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.ViewModel.Account
{
    public class UpdateAccountViewModel
    {
        [Required]
        public string AccountID { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Fullname { get; set; }
        public string Address { get; set; }
        public string IdentityCard { get; set; }
        public bool? IsAuthen { get; set; }
        public int? Specialize { get; set; }
        public string TokenId { get; set; }
        public bool? IsActive { get; set; }
    }
}
