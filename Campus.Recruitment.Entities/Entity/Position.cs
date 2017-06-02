using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Entity
{
    [Table("position")]
    public class Position : BaseEntity
    {
        /// <summary>
        /// 
        /// </summary>
        [Key]
        public string Id { get; set; } = "";

        /// <summary>
        /// 职位名称
        /// </summary>
        public string Name { get; set; } = "";

        /// <summary>
        /// 学历：大专，本科，硕士，博士
        /// </summary>
        public string Degree_ids { get; set; } = "";
        /// <summary>
        /// 学历：大专，本科，硕士，博士
        /// </summary>
        public string Degree_names { get; set; } = "";

        /// <summary>
        /// 专业要求
        /// </summary>
        public string Major_name { get; set; } = "";

        /// <summary>
        /// 专业要求
        /// </summary>
        public string Major_ids { get; set; } = "";

        /// <summary>
        /// 学校地区
        /// </summary>
        public string School_city_names { get; set; } = "";

        /// <summary>
        /// 学校地区
        /// </summary>
        public string School_city_ids { get; set; } = "";

        /// <summary>
        /// 学校级别
        /// </summary>
        public string School_level_name { get; set; } = "";

        /// <summary>
        /// 学校级别
        /// </summary>
        public string School_level_ids { get; set; } = "";

        /// <summary>
        /// 其它要求
        /// </summary>
        public string Additional { get; set; } = "";

        /// <summary>
        /// 工作性质：1=全职，2=实习
        /// </summary>
        public int Position_type { get; set; }

        /// <summary>
        /// 职能类别
        /// </summary>
        public string Function_names { get; set; } = "";

        /// <summary>
        /// 职能类别
        /// </summary>
        public string Function_ids { get; set; } = "";

        /// <summary>
        /// 工作城市
        /// </summary>
        public string City_names { get; set; } = "";

        /// <summary>
        /// 工作城市
        /// </summary>
        public string City_ids { get; set; } = "";

        /// <summary>
        /// 招聘人数
        /// </summary>
        public int Recruit_count { get; set; }

        /// <summary>
        /// 实习时长
        /// </summary>
        public int Intern_length { get; set; }

        /// <summary>
        /// 每周天数
        /// </summary>
        public int Intern_days { get; set; }

        /// <summary>
        /// 薪资范围:1=月薪，2=日薪，3=时薪
        /// </summary>
        public int Intern_salary_type { get; set; }

        /// <summary>
        /// 月薪范围_最低月薪
        /// </summary>
        public int Intern_salary_min { get; set; }

        /// <summary>
        /// 月薪范围_最高月薪
        /// </summary>
        public int Intern_salary_max { get; set; }

        /// <summary>
        /// 日薪
        /// </summary>
        public int Daily_salary { get; set; }

        /// <summary>
        /// 时薪
        /// </summary>
        public int Hour_salary { get; set; }

        /// <summary>
        /// 最低月薪（全职）
        /// </summary>
        public int Salary_min { get; set; }

        /// <summary>
        /// 最高月薪（全职）
        /// </summary>
        public int Salary_max { get; set; }

        /// <summary>
        /// 职位描述
        /// </summary>
        public string Pos_description { get; set; } = "";

        /// <summary>
        /// 所属行业
        /// </summary>
        public string Industry_name { get; set; }

        /// <summary>
        /// 所属行业
        /// </summary>
        public string Industry_id { get; set; }

    }
}
