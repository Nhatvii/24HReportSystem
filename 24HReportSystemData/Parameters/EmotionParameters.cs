using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.Parameters
{
    public class EmotionParameters
    {
        public string PostId { get; set; }
        public string UserId { get; set; }
        public bool? EmotionStatus { get; set; }
        public bool? IsView { get; set; }
    }
}
