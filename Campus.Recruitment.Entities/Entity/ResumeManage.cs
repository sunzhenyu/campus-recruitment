using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Entity
{
    public class ResumeManage
    {
        public string Position_apply_id { get; set; }
        public string Position_id { get; set; }

        public string Position_Name { get; set; }

        public string Position_city_name { get; set; }

        public string Position_apply_date { get; set; }

        public string Customer_id { get; set; }

        public string Customer_head_logo { get; set; }

        public string Customer_real_name { get; set; }

        public string Customer_Sex_name { get; set; }

        public string Intentional_city_name { get; set; }

        public string Education { get; set; }

        public string Major { get; set; }

        public string University { get; set; }

        public string Interview_date { get; set; }

        public string Interview_hour { get; set; }

        public string Interview_munites { get; set; }

        public string Interview_address { get; set; }

        public string Interview_contact_people { get; set; }

        public string Interview_contact_mobile { get; set; }



        public int Position_apply_state { get; set; }

        public string Position_apply_state_name
        {
            get
            {
                switch (Position_apply_state)
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
    }
}
