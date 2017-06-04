using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.Helper;
using Campus.Recruitment.IBLL;

namespace Campus.Recruitment.Controllers.Student
{
    /// <summary>
    /// 提升文凭
    /// </summary>
    [RoutePrefix("promote-diploma")]
    public class PromoteDiplomaController : Controller
    {
        private readonly IPomoteDiplomaBLL _promoteDiplomaBll;

        public PromoteDiplomaController(IPomoteDiplomaBLL promoteDiplomaBll)
        {
            _promoteDiplomaBll = promoteDiplomaBll;
        }

        [Route("index")]
        // GET: PromoteDiploma
        public ActionResult Index(string error = "")
        {
            string user_id = SessionHelper.Instance().GetSessionValue("UserId");
            var result = _promoteDiplomaBll.GetPromoteDiploma(user_id);
            ViewBag.Error = error;
            return View(result);
        }

        [Route("back")]
        public ActionResult Back()
        {
            string user_id = SessionHelper.Instance().GetSessionValue("UserId");
            var result = _promoteDiplomaBll.GetPromoteDiploma(user_id);
            return View(result);
        }

        [Route("edit")]
        public ActionResult Edit(PromoteDiploma entity)
        {
            string user_id = SessionHelper.Instance().GetSessionValue("UserId");
            entity.Customer_id = user_id;
            entity.Create_id = user_id;
            entity.Update_id = user_id;

            if (string.IsNullOrWhiteSpace(entity.Id))
            {
                _promoteDiplomaBll.Create(entity);
            }
            else
            {
                _promoteDiplomaBll.Update(entity);
            }

            return RedirectToAction("Index",new { error = "操作成功！"});
        }
    }
}