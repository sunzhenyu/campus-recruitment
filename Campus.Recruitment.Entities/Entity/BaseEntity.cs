using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities
{
    public class BaseEntity
    {
        public string Create_id { get; set; } = "";

        public DateTime Create_at { get; set; } = DateTime.Now;

        public string Update_id { get; set; } = "";

        public DateTime Update_at { get; set; } = DateTime.Now;
        /// <summary>
        /// 状态
        /// </summary>
        public int State { get; set; } = 1;
    }
}
