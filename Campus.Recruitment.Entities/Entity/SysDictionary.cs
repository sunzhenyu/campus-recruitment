using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Entity
{
    [Table("sys_dictionary")]
    public class SysDictionary : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        public int Dic_key { get; set; }

        public string Dic_value { get; set; }

        public string Dic_type { get; set; }

        public string Dic_type_desc { get; set; }
    }
}
