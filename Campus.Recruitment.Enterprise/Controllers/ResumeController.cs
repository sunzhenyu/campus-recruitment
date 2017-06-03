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

        public ResumeController(INotificationInterviewBLL notificationInterviewBLL,ICustomerBLL customerBLL,IResumeBLL resumeBLL,IPositionApplyBLL positionApplyBll)
        {
            _notificationInterviewBLL = notificationInterviewBLL;
            _customerBLL = customerBLL;
            _resumeBLL = resumeBLL;
            _positionApplyBll = positionApplyBll;
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
            return View();
        }

        /// <summary>
        /// 邀请投递
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("invitation/{id}")]
        public ActionResult Invitation(string id) {
            return View();
        }

        [Route("notification-interview")]
        public ActionResult NotificationInterview(string position_apply_id)
        {
            NotificationInterview entity = new NotificationInterview();
            entity = _resumeBLL.GetPositionInvitation(position_apply_id);

            return PartialView("NotificationInterview",entity);
        }

        [Route("save-interview")]
        public ActionResult SaveInterview(NotificationInterview entity)
        {
            entity.Create_id = SessionHelper.Instance().GetSessionValue("EnterpriseId");
            entity.Update_id = entity.Create_id;
            var id = _notificationInterviewBLL.Create(entity);
            _positionApplyBll.UpdateState(entity.Customer_id, entity.Position_id, 2);

            return Json(true);
        }
    }
}