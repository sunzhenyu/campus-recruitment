using Campus.Recruitment.Entities;
using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.Helper;
using Campus.Recruitment.IBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Campus.Recruitment.Controllers.WWW
{
    [RoutePrefix("job")]
    public class JobController : Controller
    {
        private readonly IPositionBLL _positionBll;
        private readonly IEnterprisesBLL _enterpriseBll;
        private readonly IPositionApplyBLL _positionApplyBll;
        private readonly IPositionCollectBLL _positionCollectBll;
        private readonly IPositionFireBLL _positionFireBll;
        public JobController(IPositionBLL positionBll,
            IEnterprisesBLL enterpriseBll, IPositionApplyBLL positionApplyBll,
            IPositionCollectBLL positionCollectBll, IPositionFireBLL positionFireBll)
        {
            _positionBll = positionBll;
            _enterpriseBll = enterpriseBll;
            _positionApplyBll = positionApplyBll;
            _positionCollectBll = positionCollectBll;
            _positionFireBll = positionFireBll;
        }

        /// <summary>
        /// 找全职
        /// </summary>
        /// <returns></returns>
        [Route("full-time")]
        public ActionResult FullTime(SearchPositionCondition condition)
        {
            condition.Position_type = 1;
            var result = _positionBll.GetPageBySearch(condition);
            ViewBag.Name = condition.Name;
            ViewBag.Function_id = condition.Function_id;
            ViewBag.Industry_id = condition.Industry_id;
            ViewBag.Degree_id = condition.Degree_id;
            ViewBag.Salary = condition.Salary;
            ViewBag.City = condition.City;
            ViewBag.Major_name = condition.Major_name;
            ViewBag.CityName = condition.CityName;
            return View(result);
        }

        /// <summary>
        /// 找实习
        /// </summary>
        /// <returns></returns>
        [Route("practice")]
        public ActionResult Practice(SearchPositionCondition condition)
        {
            condition.Position_type = 2;
            var result = _positionBll.GetPageBySearch(condition);
            ViewBag.Name = condition.Name;
            ViewBag.Function_id = condition.Function_id;
            ViewBag.Industry_id = condition.Industry_id;
            ViewBag.Degree_id = condition.Degree_id;
            ViewBag.Salary = condition.Salary;
            ViewBag.City = condition.City;
            ViewBag.Major_name = condition.Major_name;
            ViewBag.CityName = condition.CityName;
            return View(result);
        }

        /// <summary>
        /// 详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("{id}")]
        public ActionResult Detail(string id) {
            JobDetailInfo result = new JobDetailInfo();
            result.PositionInfo = _positionBll.GetEntity(id);
            result.EnterprisesInfo = _enterpriseBll.GetEntityById(result.PositionInfo.Create_id);

            string user_id = SessionHelper.Instance().GetSessionValue("UserId");
            if (string.IsNullOrWhiteSpace(user_id))
            {
                ViewBag.ApplyState = "";
                ViewBag.CollectState = "";
                ViewBag.FireState = "";
            }
            else {
                ViewBag.ApplyState = _positionApplyBll.IsApplyByUser(user_id,result.PositionInfo.Id) ? "1" : "";
                ViewBag.CollectState = _positionCollectBll.IsCollectByUser(user_id, result.PositionInfo.Id) ? "1" : "";
                ViewBag.FireState = _positionFireBll.IsFireByUser(user_id, result.PositionInfo.Id) ? "1" : "";

            }
            return View(result);
        }

        /// <summary>
        /// 申请成功
        /// </summary>
        /// <returns></returns>
        [Route("apply-success")]
        public ActionResult Apply() {
            return View();
        }

        [Route("qrcode")]
        public ActionResult GetQrCode(string position_id) {
            return File(RQCodeHelper.CreateCodeByte(position_id),@"image/jpeg");
        }

        [Route("apply")]
        public ActionResult PositionApply(PositionApply entity)
        {
            string user_id = SessionHelper.Instance().GetSessionValue("UserId");
            entity.Customer_id = user_id;
            entity.Update_id = user_id;
            entity.Create_id = user_id;
           
            _positionApplyBll.Create(entity);

            return Json(true);
        }

        [Route("collect")]
        public ActionResult PositionCollect(PositionCollect entity)
        {
            string user_id = SessionHelper.Instance().GetSessionValue("UserId");
            entity.Customer_id = user_id;
            entity.Update_id = user_id;
            entity.Create_id = user_id;
            _positionCollectBll.Create(entity);

            return Json(true);
        }

        [Route("fire")]
        public ActionResult PositionFire(PositionFire entity)
        {
            string user_id = SessionHelper.Instance().GetSessionValue("UserId");
            entity.Customer_id = user_id;
            entity.Update_id = user_id;
            entity.Create_id = user_id;

            _positionFireBll.Create(entity);

            return Json(true);
        }

    }
}