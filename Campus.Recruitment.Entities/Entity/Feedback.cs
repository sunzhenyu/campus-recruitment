using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Campus.Recruitment.Entities
{
    [Table("feedback")]
    public class Feedback : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        public string Content { get; set; }
               
    }
}
