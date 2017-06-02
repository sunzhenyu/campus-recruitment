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
    /// 实习/工作经历
    /// </summary>
    [Table("customer_experience")]
    public class CustomerExperience : BaseEntity
    {

        [Key]
        public string Id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Customer_id { get; set; }

        /// <summary>
        /// 公司名称
        /// </summary>
        public string Units { get; set; }

        /// <summary>
        /// 部门
        /// </summary>
        public string Units_dept { get; set; }

        /// <summary>
        /// 职位
        /// </summary>
        public string Units_position { get; set; }

        /// <summary>
        /// 在职时间
        /// </summary>
        public DateTime Start_intership { get; set; }

        /// <summary>
        /// 在职时间
        /// </summary>
        public DateTime End_intership { get; set; }

        /// <summary>
        /// 工作描述
        /// </summary>
        public string Units_work_desc { get; set; }

    }
}
