using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Condition
{
    public class EnterpriseCondition
    {
        public string Id { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        public string AccountName { get; set; }

        /// <summary>
        /// 验证码
        /// </summary>
        public string ValidateCode { get; set; }
        /// <summary>
        /// 邮箱
        /// </summary>
        public string Email { get; set; }


        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }
        
        /// <summary>
        /// 企业名称
        /// </summary>
        public string Name { get; set; }


        /// <summary>
        /// 所属行业
        /// </summary>
        public string showIndustry { get; set; }


        /// <summary>
        /// 公司规模
        /// </summary>
        public string Scale { get; set; }


        /// <summary>
        /// 公司性质
        /// </summary>
        public string Mode { get; set; }


        /// <summary>
        /// 所在地区
        /// </summary>
        public string showCity { get; set; }


        /// <summary>
        /// 所在地区
        /// </summary>
        public string City { get; set; }


        /// <summary>
        /// 公司网址
        /// </summary>
        public string WebSite { get; set; }


        /// <summary>
        /// 联系人
        /// </summary>
        public string ContactMan { get; set; }


        /// <summary>
        /// 联系电话-区号
        /// </summary>
        public string ContactAreaCode { get; set; }


        /// <summary>
        /// 联系电话-座机
        /// </summary>
        public string ContactTelephone { get; set; }


        /// <summary>
        /// 联系电话-分机
        /// </summary>
        public string ContactExt { get; set; }


        /// <summary>
        /// 联系电话
        /// </summary>
        public string ContactMobile { get; set; }

        public string Address { get; set; }
        
    }
}
