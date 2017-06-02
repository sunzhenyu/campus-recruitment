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
    /// 获取证书
    /// </summary>
    [Table("customer_certificate")]
    public class CustomerCertificate : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Customer_id { get; set; }

        /// <summary>
        /// 证书父级名称
        /// </summary>
        public string Certificate_parent_name { get; set; }

        /// <summary>
        /// 证书名称
        /// </summary>
        public string Certificate_name { get; set; }

        /// <summary>
        /// 获取时间
        /// </summary>
        public DateTime Start_certificate { get; set; }
    }
}
