using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Entity.Customers
{
    /// <summary>
    /// 校内奖励
    /// </summary>
    [Table("customer_intramural_reward")]
    public class CustomerIntramuralReward : BaseEntity
    {
        /// <summary>
        /// 
        /// </summary>
        [Key]
        public string Id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Customer_id { get; set; }

        /// <summary>
        /// 获奖名称
        /// </summary>
        public string Scholarship_name { get; set; }

        /// <summary>
        /// 所在学校
        /// </summary>
        public string Reward_school_ext { get; set; }

        /// <summary>
        /// 获奖时间
        /// </summary>
        public DateTime Start_reward { get; set; }

        /// <summary>
        /// 描述
        /// </summary>
        public string Scholarship_desc { get; set; }
    }
}
