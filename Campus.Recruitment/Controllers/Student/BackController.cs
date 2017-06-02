using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Campus.Recruitment.Controllers.Student
{
    public class BackController : Controller
    {
        /// <summary>
        /// 学生-我的首页
        /// </summary>
        /// <returns></returns>
        [Route("student/home")]
        public ActionResult Index()
        {
            return View();
        }
    }
}