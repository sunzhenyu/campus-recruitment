using Campus.Recruitment.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.IBLL
{
    public interface IPositionApplyBLL
    {
        string Create(PositionApply entity);

        bool IsApplyByUser(string user_id);
    }
}
