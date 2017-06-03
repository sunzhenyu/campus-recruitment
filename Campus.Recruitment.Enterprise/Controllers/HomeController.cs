using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Campus.Recruitment.Enterprise.Controllers
{
    public class HomeController : Controller
    {
        [Route("")]
        public ActionResult Index()
        {
            ///获取学生简历
            return View();
        }

        /// <summary>
        /// 首页推广
        /// </summary>
        /// <returns></returns>
        [Route("extension/{id}")]
        public ActionResult Extension(int id = 0) {
            return View();
        }


        [Route("home/colleges-info")]
        public ActionResult CollegesInfo()
        {
            return View();
        }

    }
}