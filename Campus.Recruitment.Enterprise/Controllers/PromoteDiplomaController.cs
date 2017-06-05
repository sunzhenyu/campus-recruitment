using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.IBLL;

namespace Campus.Recruitment.Enterprise.Controllers
{
    [RoutePrefix("promote-diploma")]
    public class PromoteDiplomaController : Controller
    {
        private readonly IPomoteDiplomaBLL _promoteDiplomaBll;

        public PromoteDiplomaController(IPomoteDiplomaBLL promoteDiplomaBll)
        {
            _promoteDiplomaBll = promoteDiplomaBll;
        }

        // GET: PromoteDiploma
        [Route("search")]
        public ActionResult Index(PomoteDiplomaCondition condition)
        {
            ViewBag.State = condition.State;
            var result = _promoteDiplomaBll.GetPage(condition);
            return View(result);
        }

        [Route("update-state")]
        public ActionResult UpdateState(PromoteDiploma condition)
        {
            return Json(_promoteDiplomaBll.UpdateState(condition));
        }
    }
}