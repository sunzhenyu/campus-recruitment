using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Campus.Recruitment.Controllers.WWW
{
    [RoutePrefix("seminar")]
    public class SeminarController : Controller
    {
        /// <summary>
        /// 宣讲会
        /// </summary>
        /// <returns></returns>
        [Route("search")]
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 宣讲会详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("{id}")]
        public ActionResult Detail(int id = 0) {
            return View();
        }


    }
}