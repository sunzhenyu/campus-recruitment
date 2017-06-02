using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.IBLL
{
    public interface IEnterprisesBLL
    {
        /// <summary>
        /// 创建用户
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        string CreateAccount(Enterprises entity);

        /// <summary>
        /// 更新用户
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        bool UpdateAccount(Enterprises entity);

        /// <summary>
        /// 账户是否存在
        /// </summary>
        /// <param name="mobile"></param>
        /// <returns></returns>
        bool IsExistAccount(string account_name);

        /// <summary>
        /// 验证企业名称
        /// </summary>
        /// <param name="enterprise_name"></param>
        /// <returns></returns>
        bool IsExistEnterpriseName(string enterprise_name);

        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="account_name"></param>
        /// <returns></returns>
        Enterprises GetEntity(string account_name);
        Enterprises GetEntityById(string id);

        /// <summary>
        /// 账号设置
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        bool AccountSetting(AccountSettingCondition condition);

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="id"></param>
        /// <param name="password"></param>
        /// <param name="password_salt"></param>
        /// <returns></returns>
        bool ChangePassword(string id, string password, string password_salt);

        /// <summary>
        /// 修改企业logo
        /// </summary>
        /// <param name="id"></param>
        /// <param name="icon_logo"></param>
        /// <returns></returns>
        bool ChangeEnterpriseLogo(string id, string icon_logo);
    }
}
