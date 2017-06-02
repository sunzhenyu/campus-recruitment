using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Campus.Recruitment.Enterprise.Controllers
{
    [RoutePrefix("resume")]
    public class ResumeController : Controller
    {
        /// <summary>
        /// 简历管理
        /// </summary>
        /// <returns></returns>
        [Route("search")]
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("{id}")]
        public ActionResult Detail(int id = 0) {
            return View();
        }

        /// <summary>
        /// 邀请投递
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("invitation/{id}")]
        public ActionResult Invitation(int id = 0) {
            return View();
        }
    }
}