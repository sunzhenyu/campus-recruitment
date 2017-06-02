using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Campus.Recruitment.Controllers.WWW
{
    [RoutePrefix("site")]
    public class SiteController : Controller
    {
        /// <summary>
        /// 关于我们
        /// </summary>
        /// <returns></returns>
        [Route("about")]
        public ActionResult About()
        {
            return View();
        }

        /// <summary>
        /// 新闻报道
        /// </summary>
        /// <returns></returns>
        [Route("news")]
        public ActionResult News() {
            return View();
        }

        /// <summary>
        /// 加入我们
        /// </summary>
        /// <returns></returns>
        [Route("join")]
        public ActionResult Join() {
            return View();
        }

        /// <summary>
        /// 员工生活
        /// </summary>
        /// <returns></returns>
        [Route("employee-life")]
        public ActionResult EmployeeLife() {
            return View();
        }

        /// <summary>
        /// 联系我们
        /// </summary>
        /// <returns></returns>
        [Route("contact")]
        public ActionResult ContactUs() {
            return View();
        }

        /// <summary>
        /// 用户协议
        /// </summary>
        /// <returns></returns>
        [Route("user-protocol")]
        public ActionResult UserProtocol() {
            return View();
        }


    }
}