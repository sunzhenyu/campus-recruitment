using Campus.Recruitment.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.IBLL
{
    public interface IPositionFireBLL
    {
        string Create(PositionFire entity);

        bool IsFireByUser(string user_id,string position_id);
    }
}
