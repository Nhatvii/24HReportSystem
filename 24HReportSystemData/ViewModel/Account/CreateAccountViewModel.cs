using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ReportSystemData.ViewModel.Account
{
    public class CreateAccountViewModel
    {
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public int RoleId { get; set; }
        public string PhoneNumber { get; set; }
        [Required]
        public string Username { get; set; }
        public string Address { get; set; }
        public string IdentityCard { get; set; }
    }
}
