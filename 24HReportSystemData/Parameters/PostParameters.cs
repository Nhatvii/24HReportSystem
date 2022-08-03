using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.Parameters
{
    public class PostParameters
    {
        public string EditorID { get; set; }
        public string SearchContent { get; set; }
        public int? Status { get; set; }
        public int? RootCategoryID { get; set; }
        public int? SubCategoryID { get; set; }
        public bool? isRecentDate { get; set; }
        public bool? isViewCount { get; set; }
    }
}
