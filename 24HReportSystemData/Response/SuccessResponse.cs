using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.Response
{
    public class SuccessResponse
    {
        public SuccessResponse(int statusCode, string msg)
        {
            StatusCode = statusCode;
            Message = msg;
        }
        public int StatusCode { get; set; }
        public string Message { get; set; }
    }
}
