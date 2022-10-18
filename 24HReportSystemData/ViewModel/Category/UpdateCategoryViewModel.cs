using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ReportSystemData.ViewModel.Category
{
    public class UpdateCategoryViewModel
    {
        [Required]
        public int CategoryId { get; set; }
        [StringLength(50)]
        [Required]
        public string SubCategory { get; set; }
        public int? RootCategoryID { get; set; }
    }
}
