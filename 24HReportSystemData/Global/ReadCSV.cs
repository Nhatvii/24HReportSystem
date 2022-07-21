using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace _24HReportSystemData.Global
{
    public class ReadCSV
    {
        private string url;

        public string Url
        {
            get { return url; }
            set { url = value; }
        }
        public ReadCSV(string url)
        {
            this.url = url;
        }

        public ReadCSV()
        {

        }
        public string[] CsvHeaders()
        {
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
            HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
            StreamReader sr = new StreamReader(resp.GetResponseStream());
            string[] headers;
            headers = sr.ReadLine().Split('\t');
            return headers;
        }
        public StringBuilder CsvContent()
        {

            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
            HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
            StreamReader sr = new StreamReader(resp.GetResponseStream(), Encoding.UTF8);
            StringBuilder stringBuilder = new StringBuilder();

            sr.ReadLine();
            string textline;
            while ((textline = sr.ReadLine()) != null)
            {
                stringBuilder.Append(textline);
                stringBuilder.Append(';');
            }
            return stringBuilder;
        }
    }
}
