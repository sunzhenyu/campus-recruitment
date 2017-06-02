using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Condition
{
    public class CustomerCondition
    {
        /// <summary>
        /// 编号
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 手机号
        /// </summary>
        public string Mobile { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// 验证码
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 性别
        /// </summary>
        public int sex { get; set; }

        /// <summary>
        /// 大学
        /// </summary>
        public string School { get; set; }

       /// <summary>
       /// 学历
       /// </summary>
        public string Deg { get; set; }

        /// <summary>
        /// 专业
        /// </summary>
        public string Major { get; set; }

        /// <summary>
        /// 开始就读时间
        /// </summary>
        public DateTime StartDateName { get; set; } = DateTime.Now;

        /// <summary>
        /// 结束就读时间
        /// </summary>
        public DateTime EndDateName { get; set; } = DateTime.Now;

        /// <summary>
        /// 意向城市
        /// </summary>
        public string JCtity { get; set; }

        public string City { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        public string Email { get; set; }
    }
}
