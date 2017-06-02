using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Campus.Recruitment.Enterprise.Models
{
    public static class AppSetting
    {
        public static string Student_Url
        {
            get
            {
                return (System.Configuration.ConfigurationManager.AppSettings["student_url"] ?? "").ToString();
            }
        }


        public static string Image_Path
        {
            get
            {
                return (System.Configuration.ConfigurationManager.AppSettings["imagePath"] ?? "").ToString();
            }
        }
    }
}