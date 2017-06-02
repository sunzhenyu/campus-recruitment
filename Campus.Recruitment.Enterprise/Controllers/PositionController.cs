using Campus.Recruitment.Enterprise.Helper;
using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.IBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Campus.Recruitment.Enterprise.Controllers
{
    [RoutePrefix("position")]
    public class PositionController : Controller
    {
        private readonly IPositionBLL _positionBll;

        public PositionController(IPositionBLL positionBll)
        {
            _positionBll = positionBll;
        }

        /// <summary>
        /// 职位管理
        /// </summary>
        /// <returns></returns>
        [Route("search")]
        public ActionResult Index(PositionPageCondition condition)
        {
            condition = condition ?? new PositionPageCondition();
            condition.EnterpriseId = SessionHelper.Instance().GetSessionValue("EnterpriseId");
            var result = _positionBll.GetPage(condition);

            ViewBag.State = condition.State;
            ViewBag.Name = condition.Name;
            ViewBag.CityId = condition.CityId;
            ViewBag.PositionType = condition.PositionType;
            ViewBag.FunctionId = condition.FunxtionId;

            return View(result);
        }

        /// <summary>
        /// 职位发布第一步
        /// </summary>
        /// <returns></returns>
        [Route("publish")]
        public ActionResult Publish(string id) {
            Position entity = new Position();
            if (string.IsNullOrWhiteSpace(id))
            {
                entity = new Position();
            }
            else {
                entity = _positionBll.GetEntity(id);
            }
            
            return View(entity);
        }
        
        /// <summary>
        /// 职位发布成功
        /// </summary>
        /// <returns></returns>
        [Route("publish-success")]
        public ActionResult PublishSuccess(PositionCondition condition) {
            var position = AutoMapper.Mapper.Map<Position>(condition);
            position.Create_id = SessionHelper.Instance().GetSessionValue("EnterpriseId");
            position.Update_id = position.Create_id;

            string id = condition.Id;
            if (string.IsNullOrWhiteSpace(condition.Id))
            {
                id = _positionBll.CreatePosition(position);
            }
            else {
                id = _positionBll.UpdatePosition(position);
                ViewBag.Success = "保存成功";
                return RedirectToAction("Publish",new { id = id});
            }

            if (string.IsNullOrWhiteSpace(id)) {
                return RedirectToAction("Publish");
            }
            return View();
        }

        [Route("update-position-status")]
        public ActionResult UpdatePositionState(string positionIdStr,string opr) {
            switch(opr){
                case "refresh":
                    return Json(_positionBll.RefreshPosition(positionIdStr));
                case "delete":
                    return Json(_positionBll.UpdateState(positionIdStr,0)); 
                case "pause": //暂停
                    return Json(_positionBll.UpdateState(positionIdStr, 2));
                case "restore":
                    return Json(true);
                case "republish":
                    return Json(true);
                default:
                    return Json(true);
            }
        }
    }
}