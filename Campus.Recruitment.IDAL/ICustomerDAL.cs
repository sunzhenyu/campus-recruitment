using Campus.Recruitment.Entities;
using Campus.Recruitment.Entities.Entity.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.IDAL
{
    public interface ICustomerDAL
    {
        bool RegisterTwoUpdate(Customer entity);

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="id"></param>
        /// <param name="password"></param>
        /// <param name="password_salt"></param>
        /// <returns></returns>
        bool ChangePassword(string id, string password, string password_salt);

        /// <summary>
        /// 更新求职状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="is_work"></param>
        /// <returns></returns>
        bool UpdateWorkState(string id,bool is_work);

        ///// <summary>
        ///// 更新用户信息
        ///// </summary>
        ///// <param name="entity"></param>
        ///// <returns></returns>
        //bool CustomerUpdate(Customer entity);

        ///// <summary>
        ///// 更新用户基础信息
        ///// </summary>
        ///// <param name="entity"></param>
        ///// <returns></returns>
        //bool CustomerBaseUpdate(CustomerBase entity);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="head_icon"></param>
        /// <returns></returns>
        bool UpdateAvator(string id, string head_icon);


        /// <summary>
        /// 用户基本信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool UpdateCustomerAndBase(CustomerAndBase entity);

        /// <summary>
        /// 获取证书
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool UpdateCustomerCertificate(CustomerCertificate entity);

        /// <summary>
        /// 教育经历
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool UpdateCustomerEducation(CustomerEducation entity);

        /// <summary>
        /// 实习、工作经历
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool UpdateCustomerExperience(CustomerExperience entity);

        /// <summary>
        /// 校内职务
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool UpdateCustomerIntramuralJob(CustomerIntramuralJob entity);

        /// <summary>
        /// 校内奖励
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool UpdateCustomerIntramuralReward(CustomerIntramuralReward entity);

        /// <summary>
        /// IT技能
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool UpdateCustomerItSkill(CustomerItSkill entity);

        /// <summary>
        /// 语言
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool UpdateCustomerLanguage(CustomerLanguage entity);

        /// <summary>
        /// 项目经验
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool UpdateCustomerProject(CustomerProject entity);

        bool UpdateCustomerSpecialty(string id, string specialty_desc);

        bool UpdateCustomerEval(string id, string eval_desc);


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
