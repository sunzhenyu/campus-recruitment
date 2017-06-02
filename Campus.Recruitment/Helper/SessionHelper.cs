using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Campus.Recruitment.Helper
{
    public class SessionHelper
    {
        private static SessionHelper _instance = null;

        private SessionHelper()
        {
        }

        public static SessionHelper Instance()
        {
            if (_instance == null)
            {
                _instance = new SessionHelper();
            }
            return _instance;
        }

        /// <summary>
        /// 根据key获得session值
        /// </summary>
        /// <param name="key">key</param>
        /// <returns>session内容</returns>
        public string GetSessionValue(string key)
        {
            string result = HttpContext.Current.Session == null ? "" : HttpContext.Current.Session[key] == null ? "" : HttpContext.Current.Session[key].ToString();
            return result;
        }

        ////获取用户编号
        //public int GetUserId() {
        //    if (HttpContext.Current.Session == null 
        //        || HttpContext.Current.Session["UserId"] == null 
        //        || string.IsNullOrWhiteSpace(HttpContext.Current.Session["UserId"].ToString())) {
        //        return 0;
        //    }
        //    return Convert.ToInt32(HttpContext.Current.Session["UserId"].ToString());
        //}

        ////获取登录名称
        //public string GetLoginName() {
        //    return HttpContext.Current.Session == null ? "" : HttpContext.Current.Session["Login_Name"] == null ? "" : HttpContext.Current.Session["Login_Name"].ToString();
        //}

        ////获取姓名
        //public string GetRealName() {
        //    return HttpContext.Current.Session == null ? "" : HttpContext.Current.Session["RealName"] == null ? "" : HttpContext.Current.Session["RealName"].ToString();
        //}
        
        ////获取组织编号
        //public string GetOrganCode()
        //{
        //    return HttpContext.Current.Session == null ? "" : HttpContext.Current.Session["Organ_Code"] == null ? "" : HttpContext.Current.Session["Organ_Code"].ToString();
        //}

        ////获取组织名称
        //public string GetOrganName()
        //{
        //    return HttpContext.Current.Session == null ? "" : HttpContext.Current.Session["Organ_Name"] == null ? "" : HttpContext.Current.Session["Organ_Name"].ToString();
        //}
    }
}