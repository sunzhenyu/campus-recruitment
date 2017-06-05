using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Entity
{
    public class PromoteDiplomaAndCustomer : BaseEntity
    {
        public string Id { get; set; }

        public string Customer_id { get; set; }

        public string Name { get; set; }

        public string Note { get; set; }

        public string Treatment_result { get; set; }

        public string Real_name { get; set; }

        public string Mobile { get; set; }

        public string State_name {
            get { return State == 1 ? "待处理" : "已处理"; }
        }
    }
}
