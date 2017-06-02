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
    /// 教育经历
    /// </summary>
    [Table("customer_education")]
    public　class CustomerEducation : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        //
        public string Customer_id { get; set; }

        /// <summary>
        /// 学校名称
        /// </summary>
        public string School_name { get; set; }

        /// <summary>
        /// 学历
        /// </summary>
        public string Degree { get; set; }

        /// <summary>
        /// 专业
        /// </summary>
        public string Major { get; set; }

        /// <summary>
        /// 学习时间——开始
        /// </summary>
        public DateTime Start_edu { get; set; }

        /// <summary>
        /// 学习时间-结束
        /// </summary>
        public DateTime End_edu { get; set; }

        /// <summary>
        /// 班级排名
        /// </summary>
        public string Class_rank { get; set; }

        /// <summary>
        /// 是否统招
        /// </summary>
        public bool Is_entrance_examination { get; set; }

    }
}
