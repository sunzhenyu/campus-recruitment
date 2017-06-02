using Campus.Recruitment.Entities;
using Campus.Recruitment.Entities.Entity.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.IBLL
{
    public interface ICustomerBLL
    {
        /// <summary>
        ///创建Customer
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        string CreateCustomer(Customer entity);

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="id"></param>
        /// <param name="password"></param>
        /// <param name="password_salt"></param>
        /// <returns></returns>
        bool ChangePassword(string id, string password, string password_salt);

        /// <summary>
        /// 更新Customer
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        bool UpdateCustomer(Customer entity);

        /// <summary>
        /// 手机是否存在
        /// </summary>
        /// <param name="mobile"></param>
        /// <returns></returns>
        bool IsExistMobile(string mobile);

        /// <summary>
        /// 获取详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Customer GetEntity(string id);

        /// <summary>
        /// 通过手机号获取详情
        /// </summary>
        /// <param name="mobile"></param>
        /// <returns></returns>
        Customer GetEntityByMobile(string mobile);

        /// <summary>
        /// 获取在线简历用户信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        CustomerAll GetAllCustomerInfo(string id);

        #region 获取用户信息

        /// <summary>
        /// 用户基本信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        CustomerAndBase GetCustomerAndBase(string id);

        /// <summary>
        /// 获取证书
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        CustomerCertificate GetCustomerCertificate(string id);

        /// <summary>
        /// 教育经历
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        CustomerEducation GetCustomerEducation(string id);

        /// <summary>
        /// 实习、工作经历
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        CustomerExperience GetCustomerExperience(string id);

        /// <summary>
        /// 校内职务
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        CustomerIntramuralJob GetCustomerIntramuralJob(string id);

        /// <summary>
        /// 校内奖励
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        CustomerIntramuralReward GetCustomerIntramuralReward(string id);

        /// <summary>
        /// IT技能
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        CustomerItSkill GetCustomerItSkill(string id);

        /// <summary>
        /// 语言
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        CustomerLanguage GetCustomerLanguage(string id);

        /// <summary>
        /// 项目经验
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        CustomerProject GetCustomerProject(string id);


        /// <summary>
        /// 获取证书
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        List<CustomerCertificate> GetCustomerCertificateList(string customer_id);

        /// <summary>
        /// 教育经历
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        List<CustomerEducation> GetCustomerEducationList(string customer_id);

        /// <summary>
        /// 实习、工作经历
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        List<CustomerExperience> GetCustomerExperienceList(string customer_id);

        /// <summary>
        /// 校内职务
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        List<CustomerIntramuralJob> GetCustomerIntramuralJobList(string customer_id);

        /// <summary>
        /// 校内奖励
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        List<CustomerIntramuralReward> GetCustomerIntramuralRewardList(string customer_id);

        /// <summary>
        /// IT技能
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        List<CustomerItSkill> GetCustomerItSkillList(string customer_id);

        /// <summary>
        /// 语言
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        List<CustomerLanguage> GetCustomerLanguageList(string customer_id);

        /// <summary>
        /// 项目经验
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        List<CustomerProject> GetCustomerProjectList(string customer_id);

        #endregion

        #region 创建/更新用户信息
        bool UpdateAvator(string id, string head_icon);
        bool UpdateWorkState(string id, bool is_work);

        /// <summary>
        /// 用户基本信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string CreateOrUpdateCustomerAndBase(CustomerAndBase entity);

        /// <summary>
        /// 获取证书
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string CreateOrUpdateCustomerCertificate(CustomerCertificate entity);

        /// <summary>
        /// 教育经历
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string CreateOrUpdateCustomerEducation(CustomerEducation entity);

        /// <summary>
        /// 实习、工作经历
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string CreateOrUpdateCustomerExperience(CustomerExperience entity);

        /// <summary>
        /// 校内职务
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string CreateOrUpdateCustomerIntramuralJob(CustomerIntramuralJob entity);

        /// <summary>
        /// 校内奖励
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string CreateOrUpdateCustomerIntramuralReward(CustomerIntramuralReward entity);

        /// <summary>
        /// IT技能
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string CreateOrUpdateCustomerItSkill(CustomerItSkill entity);

        /// <summary>
        /// 语言
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string CreateOrUpdateCustomerLanguage(CustomerLanguage entity);

        /// <summary>
        /// 项目经验
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string CreateOrUpdateCustomerProject(CustomerProject entity);

        /// <summary>
        /// 个人特长
        /// </summary>
        /// <param name="id"></param>
        /// <param name="specialty_desc"></param>
        /// <returns></returns>
        string UpdateCustomerSpecialty(string id, string customer_id,string specialty_desc);

        /// <summary>
        /// 自我评价
        /// </summary>
        /// <param name="id"></param>
        /// <param name="eval_desc"></param>
        /// <returns></returns>
        string UpdateCustomerEval(string id, string customer_id, string eval_desc);
        #endregion
        
        #region 删除
        /// <summary>
        /// 获取证书
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool DeleteCustomerCertificate(string id);

        /// <summary>
        /// 教育经历
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool DeleteCustomerEducation(string id);

        /// <summary>
        /// 实习、工作经历
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool DeleteCustomerExperience(string id);

        /// <summary>
        /// 校内职务
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool DeleteCustomerIntramuralJob(string id);

        /// <summary>
        /// 校内奖励
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool DeleteCustomerIntramuralReward(string id);

        /// <summary>
        /// IT技能
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool DeleteCustomerItSkill(string id);

        /// <summary>
        /// 语言
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool DeleteCustomerLanguage(string id);

        /// <summary>
        /// 项目经验
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool DeleteCustomerProject(string id);

        #endregion
    }
}
