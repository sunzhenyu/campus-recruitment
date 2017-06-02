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
    /// 校内职务
    /// </summary>
    [Table("customer_intramural_job")]
    public class CustomerIntramuralJob : BaseEntity
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
        /// 职务
        /// </summary>
        public string Position_name { get; set; }

        /// <summary>
        /// 所在学校
        /// </summary>
        public string School_name { get; set; }

        /// <summary>
        /// 在职日期-开始
        /// </summary>
        public DateTime Start_campus { get; set; }

        /// <summary>
        /// 在职时间-结束
        /// </summary>
        public DateTime End_campus { get; set; }

        /// <summary>
        /// 描述
        /// </summary>
        public string Position_desc { get; set; }

    }
}
