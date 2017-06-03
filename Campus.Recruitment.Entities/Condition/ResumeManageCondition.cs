using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Condition
{
    public class ResumeManageCondition : BasePageCondition
    {
        public string Enterprise_id { get; set; }
        public string positionId { get; set; }
        public int State { get; set; }
    }
}
