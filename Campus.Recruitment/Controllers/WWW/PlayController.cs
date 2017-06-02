using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Campus.Recruitment.Controllers.WWW
{
    [RoutePrefix("play")]
    public class PlayController : Controller
    {
        /// <summary>
        /// 职业锚
        /// </summary>
        /// <returns></returns>
        [Route("index")]
        public ActionResult Index()
        {
            return View();
        }
    }
}