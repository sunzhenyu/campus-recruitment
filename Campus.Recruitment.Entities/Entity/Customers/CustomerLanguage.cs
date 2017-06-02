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
    /// 语言
    /// </summary>
    [Table("customer_language")]
    public class CustomerLanguage : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Customer_id { get; set; }

        /// <summary>
        /// 语言
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 听说
        /// </summary>
        public string Hear { get; set; }

        /// <summary>
        /// 读写
        /// </summary>
        public string Read_write { get; set; }

        /// <summary>
        /// 等级考试
        /// </summary>
        public string Grades { get; set; }

        /// <summary>
        /// 证书
        /// </summary>
        public string Certifications { get; set; }

    }
}
