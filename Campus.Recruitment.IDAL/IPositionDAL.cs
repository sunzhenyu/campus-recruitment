using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.IDAL
{
    public interface IPositionDAL
    {
        bool UpdateState(string id,int state);

        bool RefreshPosition(string id);
    }
}
