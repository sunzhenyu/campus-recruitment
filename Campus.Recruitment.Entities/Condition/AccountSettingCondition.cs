using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Condition
{
    public class AccountSettingCondition
    {
        public string Id { get; set; }
        /// <summary>
        /// 联系人
        /// </summary>
        public string ContactMan { get; set; }


        /// <summary>
        /// 联系电话-区号
        /// </summary>
        public string ContactAreaCode { get; set; }


        /// <summary>
        /// 联系电话-座机
        /// </summary>
        public string ContactTelephone { get; set; }


        /// <summary>
        /// 联系电话-分机
        /// </summary>
        public string ContactExt { get; set; }


        /// <summary>
        /// 联系电话
        /// </summary>
        public string ContactMobile { get; set; }

        public string ContactEmail { get; set; }

        public string UpdateId { get; set; }
    }
}
