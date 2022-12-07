using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.ViewModel.Account
{
    public class ChangePasswordViewModel
    {
        [Required]
        public string AccountID { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string NewPassword { get; set; }

    }
}
