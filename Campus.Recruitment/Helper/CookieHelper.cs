using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace Campus.Recruitment.Helper
{
    public class CookieHelper
    {
         HttpRequest Request = null;
        HttpResponse Response = null;

        private static CookieHelper _instance = null;

        private CookieHelper()
        {
            Request = HttpContext.Current.Request;
            Response = HttpContext.Current.Response;
        }

        public static CookieHelper Instance() {
            if (_instance == null) {
                _instance = new CookieHelper();
            }
            return _instance;
        }
        
        public void AddCookie(string key, string value, int expireMin = 720)
        {
            var ck = new HttpCookie(key, System.Web.HttpUtility.UrlEncode(value,System.Text.Encoding.UTF8));
            if (expireMin != 0)
            {
                ck.Expires = DateTime.Now.AddMinutes(expireMin);
            }
            Response.Cookies.Add(ck);
        }

        public string GetCookie(string key)
        {
            if (Request.Cookies.AllKeys.Contains(key))
            {
                string value = Request.Cookies[key].Value;
                return System.Web.HttpUtility.UrlDecode(value, System.Text.Encoding.UTF8);
            }
            return null;
        }

        public void RemoveCookie(string key)
        {
            HttpCookie ck = Request.Cookies[key];
            if (ck != null)
            {
                ck.Expires = DateTime.Now.AddDays(-1);
                Response.Cookies.Add(ck);
                Request.Cookies.Remove(key);
            }
        }

        public void ClearCookie()
        {
            Response.Cookies.Clear();
        }

        #region  
        //获取用户编号
        public int GetUserId()
        {
            var cookie = GetCookie("UserId");
            return cookie == null ? 0 : Convert.ToInt32(cookie);
        }

        //获取登录名称
        public string GetLoginName()
        {
            var cookie = GetCookie("Login_Name");
            return cookie == null ? "" : cookie;
        }

        //获取姓名
        public string GetRealName()
        {
            var cookie = GetCookie("RealName");
            return cookie == null ? "" : cookie;
        }

        //获取组织编号
        public string GetOrganCode()
        {
            var cookie = GetCookie("Organ_Code");
            return cookie == null ? "" : cookie;
        }

        //获取组织名称
        public string GetOrganName()
        {
            var cookie = GetCookie("Organ_Name");
            return cookie == null ? "" : cookie;
        }
        #endregion

    }
}