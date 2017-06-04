using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.IBLL;

namespace Campus.Recruitment.Enterprise.Controllers
{
    public class HomeController : Controller
    {
        private readonly ICustomerBLL _customerBLL;
        public HomeController(ICustomerBLL customerBLL)
        {
            _customerBLL = customerBLL;
        }
        [Route("")]
        public ActionResult Index()
        {
            //获取学生简历
            BasePageCondition condition=new BasePageCondition() {PageSize = 100};
            var customer = _customerBLL.GetCustomerInfoList(condition);
            return View(customer);
        }

        /// <summary>
        /// 首页推广
        /// </summary>
        /// <returns></returns>
        [Route("extension/{id}")]
        public ActionResult Extension(int id = 0) {
            return View();
        }


        [Route("home/colleges-info")]
        public ActionResult CollegesInfo()
        {
            return View();
        }

    }
}