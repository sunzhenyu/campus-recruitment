using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Condition
{
    public class PositionPageCondition : BasePageCondition
    {
        /// <summary>
        /// 账号设置
        /// </summary>
        public string EnterpriseId { get; set; }

        /// <summary>
        /// 状态：1=发布，2=暂停，3=过期
        /// </summary>
        public int State { get; set; } = 1;

        /// <summary>
        /// 职位名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 工作城市
        /// </summary>
        public int? CityId { get; set; }

        /// <summary>
        /// 工作性质
        /// </summary>
        public int? PositionType { get; set; }

        /// <summary>
        /// 职位类别
        /// </summary>
        public int? FunxtionId { get; set; }
        
    }
}
