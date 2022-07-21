using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.Response
{
    public class ErrorResponse : Exception
    {
        public ErrorDetailResponse Error { get; set; }
        public ErrorResponse(string Msg, int errorCode)
        {
            Error = new ErrorDetailResponse
            {
                ErrCode = errorCode,
                Message = Msg
            };
        }
    }
    public class ErrorDetailResponse
    {
        public int ErrCode { get; set; }
        public string Message { get; set; }
    }
}
