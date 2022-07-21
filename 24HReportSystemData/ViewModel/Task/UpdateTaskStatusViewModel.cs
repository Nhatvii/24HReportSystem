using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.ViewModel.Task
{
    public class UpdateTaskStatusViewModel
    {
        [Required]
        public string TaskId { get; set; }
        [Required]
        public int Status { get; set; }
        public string PostId { get; set; }
    }
}
