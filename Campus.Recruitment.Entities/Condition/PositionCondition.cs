using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Condition
{
    public class PositionCondition
    {
        /// <summary>
        /// 
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 职位名称
        /// </summary>
        public string Position { get; set; }

        /// <summary>
        /// 学历：大专，本科，硕士，博士
        /// </summary>
        public string DegreeIds { get; set; }

        /// <summary>
        /// 学历：大专，本科，硕士，博士
        /// </summary>
        public string DegreeNames { get; set; }

        /// <summary>
        /// 专业要求
        /// </summary>
        public string MajorName { get; set; }

        /// <summary>
        /// 专业要求
        /// </summary>
        public string MajorIds { get; set; }

        /// <summary>
        /// 学校地区
        /// </summary>
        public string SchoolCityNames { get; set; }

        /// <summary>
        /// 学校地区
        /// </summary>
        public string SchoolCityIds { get; set; }

        /// <summary>
        /// 学校级别
        /// </summary>
        public string SchoolLevelNames { get; set; }

        /// <summary>
        /// 学校级别
        /// </summary>
        public string SchoolLevelIds { get; set; }

        /// <summary>
        /// 其它要求
        /// </summary>
        public string Additional { get; set; }

        /// <summary>
        /// 工作性质：1=全职，2=实习
        /// </summary>
        public int PositionType { get; set; }

        /// <summary>
        /// 职能类别
        /// </summary>
        public string FunctionNames { get; set; }

        /// <summary>
        /// 职能类别
        /// </summary>
        public string FunctionIds { get; set; }

        /// <summary>
        /// 工作城市
        /// </summary>
        public string CityNames { get; set; }

        /// <summary>
        /// 工作城市
        /// </summary>
        public string CityIds { get; set; }

        /// <summary>
        /// 招聘人数
        /// </summary>
        public int RecruitCount { get; set; }

        /// <summary>
        /// 实习时长
        /// </summary>
        public int InternLength { get; set; }

        /// <summary>
        /// 每周天数
        /// </summary>
        public int InternDays { get; set; }

        /// <summary>
        /// 薪资范围:1=月薪，2=日薪，3=时薪
        /// </summary>
        public int InternSalaryType { get; set; }

        /// <summary>
        /// 月薪范围_最低月薪
        /// </summary>
        public int InternSalaryMin { get; set; }

        /// <summary>
        /// 月薪范围_最高月薪
        /// </summary>
        public int InternSalaryMax { get; set; }

        /// <summary>
        /// 日薪
        /// </summary>
        public int DailySalary { get; set; }

        /// <summary>
        /// 时薪
        /// </summary>
        public int HourSalay { get; set; }

        /// <summary>
        /// 最低月薪（全职）
        /// </summary>
        public int SalaryMin { get; set; }

        /// <summary>
        /// 最高月薪（全职）
        /// </summary>
        public int SalaryMax { get; set; }

        /// <summary>
        /// 职位描述
        /// </summary>
        public string PosDescription { get; set; }

        /// <summary>
        /// 所属行业
        /// </summary>
        public string IndustryName { get; set; }

        /// <summary>
        /// 所属行业
        /// </summary>
        public string IndustryId { get; set; }
    }
}
