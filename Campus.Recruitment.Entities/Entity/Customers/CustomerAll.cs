using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Entity.Customers
{
    public class CustomerAll
    {
        //public Customer customer { get; set; } = new Customer();

        //public CustomerBase customerBase { get; set; } = new CustomerBase();
        public CustomerAndBase customerBase { get; set; } = new CustomerAndBase();

        /// <summary>
        /// 教育经历
        /// </summary>
        public List<CustomerEducation> customerEducationList { get; set; } = new List<CustomerEducation>();

        /// <summary>
        /// 校内职务
        /// </summary>
        public List<CustomerIntramuralJob> customerIntramuralJobList { get; set; } = new List<CustomerIntramuralJob>();

        /// <summary>
        /// 校内奖励
        /// </summary>
        public List<CustomerIntramuralReward> customerIntramuralRewardList { get; set; } = new List<CustomerIntramuralReward>();

        /// <summary>
        /// 实习、工作经历
        /// </summary>
        public List<CustomerExperience> customerExperienceList { get; set; } = new List<CustomerExperience>();

        /// <summary>
        /// 项目经历
        /// </summary>
        public List<CustomerProject> customerProjectList { get; set; } = new List<CustomerProject>();

        /// <summary>
        /// 语言能力
        /// </summary>
        public List<CustomerLanguage> customerLanguageList { get; set; } = new List<CustomerLanguage>();

        /// <summary>
        /// IT技能
        /// </summary>
        public List<CustomerItSkill> customerItSkillList { get; set; } = new List<CustomerItSkill>();

        /// <summary>
        /// 获得证书
        /// </summary>
        public List<CustomerCertificate> customerCertificateList { get; set; } = new List<CustomerCertificate>();
    }
}
