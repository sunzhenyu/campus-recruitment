using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Entity.Customers
{
    public class CustomerAndBase : BaseEntity
    {
        public string Id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Customer_id { get; set; }

        /// <summary>
        /// 头像图标
        /// </summary>
        public string Head_icon { get; set; }

        /// <summary>
        /// 生日
        /// </summary>
        public DateTime Birthday { get; set; }

        /// <summary>
        /// 现居住地
        /// </summary>
        public string Current_name { get; set; }
        /// <summary>
        /// 现居住地
        /// </summary>
        public string Current_location { get; set; }

        /// <summary>
        /// 户口所在地
        /// </summary>
        public string Family_name { get; set; }
        /// <summary>
        /// 户口所在地
        /// </summary>
        public string Family_location { get; set; }

        /// <summary>
        /// 生源地：高中毕业所在城市
        /// </summary>
        public string High_school_name { get; set; }
        /// <summary>
        /// 生源地：高中毕业所在城市
        /// </summary>
        public string High_school_location { get; set; }

        /// <summary>
        /// 政治面貌
        /// </summary>
        public string Policital_status { get; set; }

        /// <summary>
        /// 身高：cm
        /// </summary>
        public int Height { get; set; }

        /// <summary>
        /// 个人特长
        /// </summary>
        public string Specialty_desc { get; set; }

        /// <summary>
        /// 自我评价
        /// </summary>
        public string Eval_desc { get; set; }

        /// <summary>
        /// 是否找到工作
        /// </summary>
        public bool Is_work { get; set; }

        public string Real_name { get; set; }

        public int Sex { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        /// <summary>
        /// 意向城市
        /// </summary>
        public string Intentional_city { get; set; }

        /// <summary>
        /// 意向城市
        /// </summary>
        public string Intentional_city_name { get; set; }

        public string University { get; set; }

        public string Education { get; set; }

        public string Major { get; set; }
    }
}
