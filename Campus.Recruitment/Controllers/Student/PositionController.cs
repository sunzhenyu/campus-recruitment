using Campus.Recruitment.Helper;
using Campus.Recruitment.IBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Campus.Recruitment.Controllers.Student
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
        /// 申请的职位
        /// </summary>
        /// <returns></returns>
        [Route("apply")]
        public ActionResult Apply(int pageIndex= 1,int pageSize = 10)
        {
            var user_id = SessionHelper.Instance().GetSessionValue("UserId");
            var result = _positionBll.GetPageByApply(user_id,pageIndex,pageSize);
            return View(result);
        }

        /// <summary>
        /// 推荐的职位
        /// </summary>
        /// <returns></returns>
        [Route("recommend")]
        public ActionResult Recommend() {
            return View();
        }

        /// <summary>
        /// HR邀请
        /// </summary>
        /// <returns></returns>
        [Route("hr-invintes")]
        public ActionResult HrInvites() {
            return View();
        }

        /// <summary>
        /// 收藏的职位
        /// </summary>
        /// <returns></returns>
        [Route("collection-post")]
        public ActionResult CollectionPost(int pageIndex = 1,int pageSize = 10) {
            var user_id = SessionHelper.Instance().GetSessionValue("UserId");
            var result = _positionBll.GetPageByCollect(user_id, pageIndex, pageSize);
            return View(result);
        }
        
    }
}