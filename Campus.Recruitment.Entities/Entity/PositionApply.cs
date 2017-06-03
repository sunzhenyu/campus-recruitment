using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Entity
{
    [Table("position_apply")]
    public class PositionApply : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        public string Position_id { get; set; }

        public string Customer_id { get; set; }

        public string Enterprise_id { get; set; }

    }
}
