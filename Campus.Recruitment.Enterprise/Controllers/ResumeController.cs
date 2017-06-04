using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Campus.Recruitment.Enterprise.Helper;
using Campus.Recruitment.Entities;
using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.IBLL;

namespace Campus.Recruitment.Enterprise.Controllers
{
    [RoutePrefix("resume")]
    public class ResumeController : Controller
    {
        private readonly INotificationInterviewBLL _notificationInterviewBLL;
        private readonly ICustomerBLL _customerBLL;
        private readonly IResumeBLL _resumeBLL;
        private readonly IPositionApplyBLL _positionApplyBll;
        private readonly IPositionBLL _positionBll;

        public ResumeController(INotificationInterviewBLL notificationInterviewBLL,ICustomerBLL customerBLL,IResumeBLL resumeBLL,IPositionApplyBLL positionApplyBll,IPositionBLL positionBll)
        {
            _notificationInterviewBLL = notificationInterviewBLL;
            _customerBLL = customerBLL;
            _resumeBLL = resumeBLL;
            _positionApplyBll = positionApplyBll;
            _positionBll = positionBll;
        }

        /// <summary>
        /// 简历管理 - 应聘简历
        /// </summary>
        /// <returns></returns>
        [Route("search")]
        public ActionResult Index(ResumeManageCondition condition)
        {
            condition.Enterprise_id = SessionHelper.Instance().GetSessionValue("EnterpriseId");
            PageList<List<ResumeManage>> result = _resumeBLL.GetPage(condition);
            ViewBag.ResumeTotal = _resumeBLL.ResumeTotal(condition.Enterprise_id);
            ViewBag.InvitationTotal = _resumeBLL.InvitationTotal(condition.Enterprise_id);
            ViewBag.State = condition.State;
            return View(result);
        }

        [Route("search-invitation")]
        public ActionResult InvitationSearch(ResumeManageCondition condition)
        {
            condition.Enterprise_id = SessionHelper.Instance().GetSessionValue("EnterpriseId");
            PageList<List<ResumeManage>> result = _resumeBLL.GetPageInvitation(condition);
            ViewBag.ResumeTotal = _resumeBLL.ResumeTotal(condition.Enterprise_id);
            ViewBag.InvitationTotal = _resumeBLL.InvitationTotal(condition.Enterprise_id);
            return View(result);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">position_apply_id</param>
        /// <returns></returns>
        [Route("{id}")]
        public ActionResult Detail(string id) {
            ResumeAndApllyDetail result = new ResumeAndApllyDetail();
            result.SearchPosition = _positionBll.GetSearchPositionByPositionApplyId(id);
            result.CustomerAll = _customerBLL.GetAllCustomerInfo(result.SearchPosition.Customer_id);
            ViewBag.PositionApplyId = id;
            return View(result);
        }

        /// <summary>
        /// 邀请投递
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("invitation/{id}")]
        public ActionResult Invitation(string id) {
            var result  = _customerBLL.GetAllCustomerInfo(id);
            return View(result);
        }

        /// <summary>
        /// 同志简历弹窗
        /// </summary>
        /// <param name="position_apply_id"></param>
        /// <returns></returns>
        [Route("notification-interview")]
        public ActionResult NotificationInterview(string position_apply_id)
        {
            NotificationInterview entity = new NotificationInterview();
            entity = _resumeBLL.GetPositionInvitation(position_apply_id);

            return PartialView("NotificationInterview",entity);
        }

        /// <summary>
        /// 保存通知简历
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        [Route("save-interview")]
        public ActionResult SaveInterview(NotificationInterview entity)
        {
            entity.Create_id = SessionHelper.Instance().GetSessionValue("EnterpriseId");
            entity.Update_id = entity.Create_id;
            var id = _notificationInterviewBLL.Create(entity);
            _positionApplyBll.UpdateState(entity.Customer_id, entity.Position_id, 2);

            return Json(true);
        }

        /// <summary>
        /// 更新简历状态
        /// </summary>
        /// <param name="customer_id"></param>
        /// <param name="position_id"></param>
        /// <param name="state"></param>
        /// <returns></returns>
        [Route("update-apply-state")]
        public ActionResult UpdateApplyState(string customer_id,string position_id, int state)
        {
            _positionApplyBll.UpdateState(customer_id, position_id, state);
            return Json(true);
        }

        /// <summary>
        /// 获取职位集合
        /// </summary>
        /// <returns></returns>
        [Route("position-list")]
        public ActionResult GetPositionList()
        {
            string enterprise_id = SessionHelper.Instance().GetSessionValue("EnterpriseId");
            
            List<Position> result = _positionBll.GetPositionList(enterprise_id);
            return Json(result);
        }

        [Route("position-apply")]
        public ActionResult PositionApply(string user_id,string position_ids)
        {

            string enterprise_id = SessionHelper.Instance().GetSessionValue("EnterpriseId");
            foreach (var item in position_ids.Split(','))
            {
                PositionApply entity = new PositionApply();

                entity.Enterprise_id = enterprise_id;
                entity.Position_id = item;
                entity.Customer_id = user_id;
                entity.Update_id = user_id;
                entity.Create_id = user_id;
                _positionApplyBll.Create(entity);
            }

            return Json(true);
        }
    }
}