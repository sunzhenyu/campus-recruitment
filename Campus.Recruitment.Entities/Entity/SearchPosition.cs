using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Entity
{
    public class SearchPosition
    {
        public string Id { get; set; } = "";

        /// <summary>
        /// 职位名称
        /// </summary>
        public string Name { get; set; } = "";
       
        /// <summary>
        /// 工作城市
        /// </summary>
        public string City_names { get; set; } = "";

        /// <summary>
        /// 工作城市
        /// </summary>
        public string City_ids { get; set; } = "";

        /// <summary>
        /// 企业编号
        /// </summary>
        public string Enterprise_id { get; set; } = "";

        /// <summary>
        /// 企业名称
        /// </summary>
        public string Enterprise_name { get; set; }

        /// <summary>
        /// 工资
        /// </summary>
        public string Salary { get; set; }

        /// <summary>
        /// 企业图标
        /// </summary>
        public string Logo_icon { get; set; }

        public string Create_at { get; set; }

        /// <summary>
        /// 发布信息更新时间
        /// </summary>
        public string Update_at { get; set; }

        public int State { get; set; }

        public string State_name
        {
            get
            {
                switch (State)
                {
                    case 1:
                        return "待处理";
                    case 2:
                        return "通知面试";
                    case 3:
                        return "不合适";
                    case 4:
                        return "已完成";
                    default:
                        return "异常状态";
                }
            }
        }

        public NotificationInterview NotificationInterviewEntity { get; set; } = new NotificationInterview();
    }
}
