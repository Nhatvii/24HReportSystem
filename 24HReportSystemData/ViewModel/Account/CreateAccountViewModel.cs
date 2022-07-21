using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ReportSystemData.ViewModel.Account
{
    public class CreateAccountViewModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public int RoleId { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public string Username { get; set; }
        public string Address { get; set; }
        public string IdentityCard { get; set; }
    }
}
