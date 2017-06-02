using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Campus.Recruitment.Models
{
    public static  class AppSetting
    {
        public static string Enterprise_Url{
            get {
                return (System.Configuration.ConfigurationManager.AppSettings["enterprise_url"] ?? "").ToString();
            }
        }

        /// <summary>
        /// 本地路径
        /// </summary>
        public static string Image_Path
        {
            get
            {
                return (System.Configuration.ConfigurationManager.AppSettings["imagePath"] ?? "").ToString();
            }
        }

        /// <summary>
        /// 站点路径
        /// </summary>
        public static string Rss_Image {
            get {
                return (System.Configuration.ConfigurationManager.AppSettings["RssImage"] ?? "").ToString();
            }
        }

        /// <summary>
        /// 当前站点路径
        /// </summary>
        public static string Current_Path {
            get {
                return (System.Configuration.ConfigurationManager.AppSettings["current_path"] ?? "").ToString();
            }
        }
    }
}