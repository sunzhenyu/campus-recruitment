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
    /// 项目经历
    /// </summary>
    [Table("customer_project")]
    public class CustomerProject : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Customer_id { get; set; }

        /// <summary>
        /// 项目名称
        /// </summary>
        public string Project_name { get; set; }

        /// <summary>
        /// 担任职位
        /// </summary>
        public string Project_job_name { get; set; }

        /// <summary>
        /// 项目时间
        /// </summary>
        public DateTime Start_project { get; set; }

        /// <summary>
        /// 项目时间
        /// </summary>
        public DateTime End_project { get; set; }

        /// <summary>
        /// 项目描述
        /// </summary>
        public string Project_job_desc { get; set; }

    }
}
