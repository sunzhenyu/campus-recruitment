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
    /// IT技能
    /// </summary>
    [Table("customer_it_skill")]
    public class CustomerItSkill : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Customer_id { get; set; }

        /// <summary>
        /// IT技能
        /// </summary>
        public string Skill_name_txt { get; set; }

        /// <summary>
        /// IT技能
        /// </summary>
        public string Skill_name { get; set; }

        /// <summary>
        /// 掌握程度
        /// </summary>
        public string Skill_level { get; set; }

    }
}
