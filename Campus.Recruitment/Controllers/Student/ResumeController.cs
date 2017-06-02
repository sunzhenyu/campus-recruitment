using Campus.Recruitment.Entities.Entity.Customers;
using Campus.Recruitment.Helper;
using Campus.Recruitment.IBLL;
using Campus.Recruitment.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Campus.Recruitment.Controllers.Student
{
    [RoutePrefix("resume")]
    public class ResumeController : Controller
    {
        private readonly ICustomerBLL _customerBll;

        public ResumeController(ICustomerBLL customerBll) {
            _customerBll = customerBll;
        }

        /// <summary>
        /// 在线简历
        /// </summary>
        /// <returns></returns>
        [Route("{id}")]
        public ActionResult Index(string id)
        {
            CustomerAll result = _customerBll.GetAllCustomerInfo(id);
            return View(result);
        }

        /// <summary>
        /// 简历预览
        /// </summary>
        /// <returns></returns>
        [Route("preview")]
        public ActionResult Preview(string id)
        {
            CustomerAll result = _customerBll.GetAllCustomerInfo(id);
            return View(result);
        }

        [Route("createrecord")]
        public ActionResult CreateResume(string itemType) {
            switch (itemType) {
                case "avator":
                    return PartialView("avator");
                case "base":        //基本信息
                    return PartialView("Detail",new CustomerAndBase());
                case "education":   //教育经历
                    return PartialView("Education",new CustomerEducation());
                case "position":    //校内职务
                    return PartialView("IntramuralJob",new CustomerIntramuralJob());
                case "scholarship": //校内奖励
                    return PartialView("IntramuralReward",new CustomerIntramuralReward());
                case "experience":  //实习/工作经验
                    return PartialView("Experience",new CustomerExperience());
                case "project":     //项目经历
                    return PartialView("Project",new CustomerProject());
                case "language":    //语言能力
                    return PartialView("Language",new CustomerLanguage());
                case "it":          //IT技能
                    return PartialView("ITSkill",new CustomerItSkill());
                case "cert":        //获得证书
                    return PartialView("Certificate",new CustomerCertificate());
                case "speciality":  //个人特长
                    return PartialView("Specialty",new CustomerAndBase());
                case "eval":        //自我评价
                    return PartialView("Evaluate", new CustomerAndBase());
                default:
                    return PartialView("Detail", new CustomerAndBase());
            }
        }

        [Route("editrecord")]
        public ActionResult EditResume(string itemType,string itemId = "")
        {
            var userId = SessionHelper.Instance().GetSessionValue("UserId");
            switch (itemType)
            {
                case "avator":
                    return PartialView("avator");
                case "base":        //基本信息
                    return PartialView("Detail", _customerBll.GetCustomerAndBase(userId));
                case "education":   //教育经历
                    return PartialView("Education", _customerBll.GetCustomerEducation(itemId));
                case "position":    //校内职务
                    return PartialView("IntramuralJob",_customerBll.GetCustomerIntramuralJob(itemId));
                case "scholarship": //校内奖励
                    return PartialView("IntramuralReward",_customerBll.GetCustomerIntramuralReward(itemId));
                case "experience":  //实习/工作经验
                    return PartialView("Experience",_customerBll.GetCustomerExperience(itemId));
                case "project":     //项目经历
                    return PartialView("Project",_customerBll.GetCustomerProject(itemId));
                case "language":    //语言能力
                    return PartialView("Language",_customerBll.GetCustomerLanguage(itemId));
                case "it":          //IT技能
                    return PartialView("ITSkill",_customerBll.GetCustomerItSkill(itemId));
                case "cert":        //获得证书
                    return PartialView("Certificate",_customerBll.GetCustomerCertificate(itemId));
                case "speciality":  //个人特长
                    return PartialView("Specialty", _customerBll.GetCustomerAndBase(userId));
                case "eval":        //自我评价
                    return PartialView("Evaluate" ,_customerBll.GetCustomerAndBase(userId));
                default:
                    return PartialView("Detail", _customerBll.GetCustomerAndBase(userId));
            }
        }

        [Route("submitrecord")]
        public ActionResult SubmitRecord() {
            var itemType = Request.Params["itemType"].ToString();
            var userId = SessionHelper.Instance().GetSessionValue("UserId");
            var itemIdTemp = "";
            switch (itemType)
            {
                case "avator":
                    return PartialView("avator");
                case "base":        //基本信息
                    CustomerAndBase customerAndBase = new CustomerAndBase() {
                        Id = Request.Params["Id"].ToString(),
                        Customer_id = userId,
                        Sex = Convert.ToInt32(Request.Params["sex"].ToString()),
                        Birthday = Convert.ToDateTime(Request.Params["Birthday"].ToString()),
                        Current_name = Request.Params["CurrentName"].ToString(),
                        Current_location = Request.Params["CurrentLocation"].ToString(),
                        Family_name = Request.Params["familyName"].ToString(),
                        Family_location = Request.Params["FamilyLocation"].ToString(),
                        High_school_name = Request.Params["HighSchoolName"].ToString(),
                        High_school_location = Request.Params["HighSchoolLocation"].ToString(),
                        Email = Request.Params["email"].ToString(),
                        Policital_status = Request.Params["PolicitalStatus"].ToString(),
                        Height = Convert.ToInt32(Request.Params["Height"] ?? "0"),
                        Create_id = userId,
                        Update_id = userId
                    };
                    itemIdTemp = _customerBll.CreateOrUpdateCustomerAndBase(customerAndBase);
                    return PartialView("_Detail", _customerBll.GetCustomerAndBase(userId));
                case "education":   //教育经历
                    CustomerEducation customerEducation = new CustomerEducation()
                    {
                        Id = Request.Params["Id"].ToString(),
                        Customer_id = userId,
                        School_name = Request.Params["SchoolName"].ToString(),
                        Degree = Request.Params["degree"].ToString(),
                        Major = Request.Params["Major"].ToString(),
                        Start_edu = Convert.ToDateTime(Request.Params["StartDate"].ToString()),
                        End_edu = Convert.ToDateTime(Request.Params["EndDate"].ToString()),
                        Class_rank = Request.Params["ClassRank"].ToString(),
                        Is_entrance_examination = Convert.ToBoolean(Request.Params["IsEntranceExamination"].ToString()),
                        Create_id = userId,
                        Update_id = userId
                    };
                    itemIdTemp = _customerBll.CreateOrUpdateCustomerEducation(customerEducation);
                    return PartialView("_Education", _customerBll.GetCustomerEducationList(userId));
                case "position":    //校内职务
                    CustomerIntramuralJob customerIntramuralJob = new CustomerIntramuralJob()
                    {
                        Id = Request.Params["Id"].ToString(),
                        Customer_id = userId,
                        Position_name = Request.Params["JobName"].ToString(),
                        School_name = Request.Params["SchoolName"].ToString(),
                        Start_campus = Convert.ToDateTime(Request.Params["StartDate"].ToString()),
                        End_campus = Convert.ToDateTime(Request.Params["EndDate"].ToString()),
                        Position_desc = Request.Params["JobDesc"].ToString(),
                        Create_id = userId,
                        Update_id = userId
                    };
                    itemIdTemp = _customerBll.CreateOrUpdateCustomerIntramuralJob(customerIntramuralJob);
                    return PartialView("_IntramuralJob", _customerBll.GetCustomerIntramuralJobList(userId));
                case "scholarship": //校内奖励
                    CustomerIntramuralReward customerIntramuralReward = new CustomerIntramuralReward()
                    {
                        Id = Request.Params["Id"].ToString(),
                        Customer_id = userId,
                        Scholarship_name = Request.Params["RewardName"].ToString(),
                        Reward_school_ext = Request.Params["RewardName"].ToString(),
                        Start_reward = Convert.ToDateTime(Request.Params["RewardTime"].ToString()),
                        Scholarship_desc = Request.Params["RewardDesc"].ToString(),
                        Create_id = userId,
                        Update_id = userId
                    };
                    itemIdTemp = _customerBll.CreateOrUpdateCustomerIntramuralReward(customerIntramuralReward);
                    return PartialView("_IntramuralReward", _customerBll.GetCustomerIntramuralRewardList(userId));
                case "experience":  //实习/工作经验
                    CustomerExperience customerExperience = new CustomerExperience()
                    {
                        Id = Request.Params["Id"].ToString(),
                        Customer_id = userId,
                        Units = Request.Params["Units"].ToString(),
                        Units_dept = Request.Params["UnitsDept"].ToString(),
                        Units_position = Request.Params["UnitsPosition"].ToString(),
                        Start_intership = Convert.ToDateTime(Request.Params["StartDate"].ToString()),
                        End_intership =  Convert.ToDateTime(Request.Params["EndDate"].ToString()),
                        Units_work_desc = Request.Params["UnitsWorkDesc"].ToString(),
                        Create_id = userId,
                        Update_id = userId
                    };
                    itemIdTemp = _customerBll.CreateOrUpdateCustomerExperience(customerExperience);
                    return PartialView("_Experience", _customerBll.GetCustomerExperienceList(userId));
                case "project":     //项目经历
                    CustomerProject customerProject = new CustomerProject()
                    {
                        Id = Request.Params["Id"].ToString(),
                        Customer_id = userId,
                        Project_name = Request.Params["ProjectName"].ToString(),
                        Project_job_name = Request.Params["ProjectJobName"].ToString(),
                        Start_project = Convert.ToDateTime(Request.Params["StartDate"].ToString()),
                        End_project = Convert.ToDateTime(Request.Params["EndDate"].ToString()),
                        Project_job_desc = Request.Params["ProjectJobDesc"].ToString(),
                        Create_id = userId,
                        Update_id = userId
                    };
                    itemIdTemp = _customerBll.CreateOrUpdateCustomerProject(customerProject);
                    return PartialView("_Project", _customerBll.GetCustomerProjectList(userId));
                case "language":    //语言能力
                    CustomerLanguage customerLanguage = new CustomerLanguage()
                    {
                        Id = Request.Params["Id"].ToString(),
                        Customer_id = userId,
                        Name = Request.Params["Name"].ToString(),
                        Hear = Request.Params["Hear"].ToString(),
                        Read_write = Request.Params["ReadWrite"].ToString(),
                        Grades = Request.Params["Grades"].ToString(),
                        Certifications = Request.Params["Certifications"].ToString(),
                        Create_id = userId,
                        Update_id = userId
                    };
                    itemIdTemp = _customerBll.CreateOrUpdateCustomerLanguage(customerLanguage);
                    return PartialView("_Language", _customerBll.GetCustomerLanguageList(userId));
                case "it":          //IT技能
                    CustomerItSkill customerItSkill = new CustomerItSkill()
                    {
                        Id = Request.Params["Id"].ToString(),
                        Customer_id = userId,
                        Skill_name_txt = Request.Params["SkillNameTxt"].ToString(),
                        Skill_name = Request.Params["SkillName"].ToString(),
                        Skill_level = Request.Params["SkillLevel"].ToString(),
                        Create_id = userId,
                        Update_id = userId
                    };
                    itemIdTemp = _customerBll.CreateOrUpdateCustomerItSkill(customerItSkill);
                    return PartialView("_ITSkill", _customerBll.GetCustomerItSkillList(userId));
                case "cert":        //获得证书
                    CustomerCertificate customerCertificate = new CustomerCertificate()
                    {
                        Id = Request.Params["Id"].ToString(),
                        Customer_id = userId,
                        Certificate_name = Request.Params["CertificateName"].ToString(),
                        Start_certificate = Convert.ToDateTime(Request.Params["CertificateDate"].ToString()),
                        Create_id = userId,
                        Update_id = userId
                    };
                    itemIdTemp = _customerBll.CreateOrUpdateCustomerCertificate(customerCertificate);
                    return PartialView("_Certificate", _customerBll.GetCustomerCertificateList(userId));
                case "speciality":  //个人特长

                    itemIdTemp = _customerBll.UpdateCustomerSpecialty(Request.Params["Id"].ToString(), userId, Request.Params["Speciality"].ToString());
                    return PartialView("_Specialty", _customerBll.GetCustomerAndBase(userId));
                case "eval":        //自我评价
                    itemIdTemp = _customerBll.UpdateCustomerEval(Request.Params["Id"].ToString(), userId, Request.Params["SelfEvaluation"].ToString());
                    return PartialView("_Evaluate", _customerBll.GetCustomerAndBase(userId));
                default:
                    CustomerAndBase customerAndBase1 = new CustomerAndBase()
                    {
                        Id = Request.Params["Id"].ToString(),
                        Customer_id = userId,
                        Sex = Convert.ToInt32(Request.Params["sex"].ToString()),
                        Birthday = Convert.ToDateTime(Request.Params["Birthday"].ToString()),
                        Current_name = Request.Params["CurrentName"].ToString(),
                        Current_location = Request.Params["CurrentLocation"].ToString(),
                        Family_name = Request.Params["familyName"].ToString(),
                        Family_location = Request.Params["FamilyLocation"].ToString(),
                        High_school_name = Request.Params["HighSchoolName"].ToString(),
                        High_school_location = Request.Params["HighSchoolLocation"].ToString(),
                        Email = Request.Params["email"].ToString(),
                        Policital_status = Request.Params["PolicitalStatus"].ToString(),
                        Height = Convert.ToInt32(Request.Params["Height"] ?? "0"),
                        Create_id = userId,
                        Update_id = userId
                    };
                    itemIdTemp = _customerBll.CreateOrUpdateCustomerAndBase(customerAndBase1);
                    return PartialView("_Detail", _customerBll.GetCustomerAndBase(userId));
            }


            return View();
        }


        [Route("deleterecord")]
        public ActionResult DeleteRecord()
        {
            var itemType = Request.Params["itemType"].ToString();
            var userId = SessionHelper.Instance().GetSessionValue("UserId");
            var itemId = Request.Params["itemId"].ToString();
            switch (itemType)
            {
                case "avator":
                    return PartialView("avator");
                case "base":        //基本信息
                    return PartialView("_Detail", _customerBll.GetCustomerAndBase(userId));
                case "education":   //教育经历
                    _customerBll.DeleteCustomerEducation(itemId);
                    return PartialView("_Education", _customerBll.GetCustomerEducationList(userId));
                case "position":    //校内职务
                    _customerBll.DeleteCustomerIntramuralJob(itemId);
                    return PartialView("_IntramuralJob", _customerBll.GetCustomerIntramuralJobList(userId));
                case "scholarship": //校内奖励
                    _customerBll.DeleteCustomerIntramuralReward(itemId);
                    return PartialView("_IntramuralReward", _customerBll.GetCustomerIntramuralRewardList(userId));
                case "experience":  //实习/工作经验
                    _customerBll.DeleteCustomerExperience(itemId);
                    return PartialView("_Experience", _customerBll.GetCustomerExperienceList(userId));
                case "project":     //项目经历
                    _customerBll.DeleteCustomerProject(itemId);
                    return PartialView("_Project", _customerBll.GetCustomerProjectList(userId));
                case "language":    //语言能力
                    _customerBll.DeleteCustomerLanguage(itemId);
                    return PartialView("_Language", _customerBll.GetCustomerLanguageList(userId));
                case "it":          //IT技能
                    _customerBll.DeleteCustomerItSkill(itemId);
                    return PartialView("_ITSkill", _customerBll.GetCustomerItSkillList(userId));
                case "cert":        //获得证书
                    _customerBll.DeleteCustomerCertificate(itemId);
                    return PartialView("_Certificate", _customerBll.GetCustomerCertificateList(userId));
                case "speciality":  //个人特长

                   
                    return PartialView("_Specialty", _customerBll.GetCustomerAndBase(userId));
                case "eval":        //自我评价
                    
                    return PartialView("_Evaluate", _customerBll.GetCustomerAndBase(userId));
                default:
                    
                    return PartialView("_Detail", _customerBll.GetCustomerAndBase(userId));
            }
        }

        [Route("file-upload-actor")]
        public ActionResult FileUploadActor() {
            string msg = "";
            string userId = SessionHelper.Instance().GetSessionValue("UserId");
            string path = $"/content/Upload/s/{userId}";
            
            string fileName = FileHelper.PostImg(Request.Files[0], ref msg, path);
            Session.SetDataInSession("HeadIcon", $"{path}/{fileName}", 10800);
            _customerBll.UpdateAvator(userId, $"{path}/{fileName}");
            if (!string.IsNullOrWhiteSpace(msg))
            {
                return Json(new ActorFileBack
                {
                    code = "fail",
                    imgulr = "",
                    msg = msg,
                    height = 512,
                    width = 512
                });
            }
            else
            {
                return Json(new ActorFileBack
                {
                    code = "ok",
                    imgulr = $"{path}/{fileName}",
                    msg = "",
                    height = 512,
                    width = 512
                });
            }
            
        }

        [Route("save-actor")]
        public ActionResult SaveActor() {
            double x = Convert.ToDouble(Request.Params["x"].ToString());
            double y = Convert.ToDouble(Request.Params["y"].ToString());
            double w = Convert.ToDouble(Request.Params["w"].ToString());
            double h = Convert.ToDouble(Request.Params["h"].ToString());
            double ow = Convert.ToDouble(Request.Params["ow"].ToString());
            double oh = Convert.ToDouble(Request.Params["oh"].ToString());
            string userId = SessionHelper.Instance().GetSessionValue("UserId");
            string headIcon = SessionHelper.Instance().GetSessionValue("HeadIcon");
            string path = $"/content/Upload/s/{userId}";
            string fileName = $"{Guid.NewGuid().ToString()}.{headIcon.Split('.')[1]}";
            FileHelper.Crop((int)w, (int)h, (int)x, (int)y,path, fileName);

            _customerBll.UpdateAvator(userId, $"{path}/{fileName}");
            Session.SetDataInSession("HeadIcon", $"{path}/{fileName}", 10800);
            return Json(new ActorFileBack
            {
                code = "ok"
            },JsonRequestBehavior.AllowGet);
        }

        [Route("basic-info")]
        public ActionResult BasicInfo()
        {
            var userId = SessionHelper.Instance().GetSessionValue("UserId");
            return PartialView("_Detail", _customerBll.GetCustomerAndBase(userId));
        }
             
    }
}