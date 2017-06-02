using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Campus.Recruitment.Enterprise.Controllers
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
        [Route("edit/{id}")]
        public ActionResult Edit(int id = 0)
        {
            return View();
        }

    }
}