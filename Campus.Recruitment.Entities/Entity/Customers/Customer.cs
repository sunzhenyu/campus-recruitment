using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities
{
    [Table("customer")]
    public class Customer : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        /// <summary>
        /// 手机号
        /// </summary>
        public string Mobile { get; set; }

        /// <summary>
        /// 密码+guid  MD5
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Guid
        /// </summary>
        public string Password_salt { get; set; }

        /// <summary>
        /// 头像图标
        /// </summary>
        public string Head_icon { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        public string Real_name { get; set; }

        /// <summary>
        /// 性别
        /// </summary>
        public int Sex { get; set; } = 1;

        /// <summary>
        /// 大学
        /// </summary>
        public string University { get; set; }

        /// <summary>
        /// 学历
        /// </summary>
        public string Education { get; set; }

        /// <summary>
        /// 专业
        /// </summary>
        public string Major { get; set; }

        /// <summary>
        /// 就读开始时间
        /// </summary>
        public DateTime Attend_begin_date { get; set; }
        
        /// <summary>
        /// 就读结束时间
        /// </summary>
        public DateTime Attend_end_date { get; set; }
        
        /// <summary>
        /// 意向城市
        /// </summary>
        public string Intentional_city { get; set; }

        /// <summary>
        /// 意向城市
        /// </summary>
        public string Intentional_city_name { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// 是否找到工作
        /// </summary>
        public bool Is_work { get; set; } = false;


    }
}
