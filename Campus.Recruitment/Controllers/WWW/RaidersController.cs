using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Campus.Recruitment.Controllers.WWW
{
    [RoutePrefix("raiders")]
    public class RaidersController : Controller
    {
        /// <summary>
        /// 求职攻略
        /// </summary>
        /// <returns></returns>
        [Route("search")]
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 求职攻略详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("{id}")]
        public ActionResult Detail(int id = 0) {
            return View();
        }
    }
}