using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Entity
{
    [Table("promote_diploma")]
    public class PromoteDiploma : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        public string Customer_id { get; set; }

        public string Name { get; set; }

        public string Note { get; set; }
        
    }
}
