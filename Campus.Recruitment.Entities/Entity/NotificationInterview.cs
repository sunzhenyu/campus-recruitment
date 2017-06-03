using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Entity
{
    /// <summary>
    /// 通知面试
    /// </summary>
    [Table("notification_interview")]
    public class NotificationInterview : BaseEntity
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }


        public string Position_id { get; set; }


        public string Customer_id { get; set; }

        public string Enterprise_id { get; set; }

        public string Customer_name { get; set; }

        public string Interview_date { get; set; }


        public string Interview_hour { get; set; }


        public string Interview_minutes { get; set; }


        public string Interview_address { get; set; }


        public string Contact_people { get; set; }


        public string Cantact_mobile { get; set; }


        public string Note { get; set; }

    }
}
