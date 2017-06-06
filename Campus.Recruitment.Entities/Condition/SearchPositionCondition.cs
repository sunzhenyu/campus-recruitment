using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Condition
{
    public class SearchPositionCondition : BasePageCondition
    {
        /// <summary>
        /// 1=全职，2=实习
        /// </summary>
        public int Position_type { get; set; }

        /// <summary>
        /// 职能
        /// </summary>
        public string Function_id { get; set; }

        /// <summary>
        /// 行业
        /// </summary>
        public string Industry_id { get; set; }

        /// <summary>
        /// 学历
        /// </summary>
        public string Degree_id { get; set; }

        /// <summary>
        /// 月薪
        /// </summary>
        public int? Salary { get; set; }

        public int City { get; set; }

        public string Major_name { get; set; }
    }
}
