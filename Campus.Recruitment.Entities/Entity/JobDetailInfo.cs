using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Entity
{
    public class JobDetailInfo
    {
        public Position PositionInfo { get; set; } = new Position();

        public Enterprises EnterprisesInfo { get; set; } = new Enterprises();
    }
}
