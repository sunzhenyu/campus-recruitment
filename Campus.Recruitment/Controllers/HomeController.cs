using Campus.Recruitment.BLL;
using Campus.Recruitment.Entities;
using Campus.Recruitment.IBLL.Home;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.IBLL;

namespace Campus.Recruitment.Controllers
{
    public class HomeController : Controller
    {
        private readonly IFeedbackBLL _feedbackBll;
        private readonly IPositionBLL _positionBll;
        public HomeController(IFeedbackBLL feedbackBll,IPositionBLL positionBll)
        {
            _feedbackBll = feedbackBll;
            _positionBll = positionBll;
        }
        /// <summary>
        /// 首页
        /// </summary>
        /// <returns></returns>
        [Route("")]
        public ActionResult Index()
        {
            SearchPositionCondition condition = new SearchPositionCondition();
            condition.Position_type = 1;
            condition.PageSize = 16;
            PageList<List<SearchPosition>> result = _positionBll.GetPageBySearch(condition);
            return View(result);
        }

        /// <summary>
        /// 首页模块列表
        /// </summary>
        /// <returns></returns>
        [Route("model/{id}")]
        public ActionResult Model(int id = 0) {
            return View();
        }

        /// <summary>
        /// 首页模块详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("model/{id}/{jobId}")]
        public ActionResult ModelDetail(int id = 0,int jobId = 0) {
            return View();
        }

        /// <summary>
        /// 企业推荐-详情
        /// </summary>
        /// <returns></returns>
        [Route("enterprise/{id}")]
        public ActionResult EnterpriseRecommend(int id = 0) {
            return View();
        }

        /// <summary>
        /// 企业推荐-职位
        /// </summary>
        /// <returns></returns>
        [Route("enterprise/{id}/job")]
        public ActionResult EnterpriseJob(int id = 0) {
            return View();
        }

        /// <summary>
        /// 企业推荐-Hr
        /// </summary>
        /// <returns></returns>
        [Route("enterprise/{id}/hr")]
        public ActionResult EnterpriseHr(int id = 0) {
            return View();
        }

        /// <summary>
        /// 企业推荐面试评价
        /// </summary>
        /// <returns></returns>
        [Route("enterprise/{id}/interview-comment")]
        public ActionResult EnterpriseInterviewComment(int id = 0) {
            return View();
        }

        /// <summary>
        /// 用户反馈
        /// </summary>
        /// <returns></returns>
        [Route("feedback")]
        public ActionResult Feedback() {
            return View();
        }

        [Route("feedback/success")]
        public ActionResult FeedbackSuccess() {
            return View();
        }

        [Route("feedback/create")]
        public ActionResult CreateFeedback(Feedback entity) {
            //List<Feedback> temp = _feedbackBll.FeedbackList(10, 1, out total);
            entity.Id = Guid.NewGuid().ToString();
            var result = _feedbackBll.CreateFeedback(entity);

            return View("FeedbackSuccess");
        }
    }
}