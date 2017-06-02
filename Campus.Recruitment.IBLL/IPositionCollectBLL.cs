using Campus.Recruitment.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.IBLL
{
    public interface IPositionCollectBLL
    {
        string Create(PositionCollect entity);

        bool IsCollectByUser(string user_id);
    }
}
