using Campus.Recruitment.IDAL;
using KeChong.Framework.Data.Command;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.DAL
{
    public class PositionDAL : IPositionDAL
    {

        public bool RefreshPosition(string id)
        {
            var cmd = DataCommandManager.GetCommand("Position.Refresh");

            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        public bool UpdateState(string id, int state)
        {
            var cmd = DataCommandManager.GetCommand("Position.Delete");

            cmd.SetParameterValue("@id", id);
            cmd.SetParameterValue("@state", state);

            return cmd.Execute() > 0;
        }
    }
}
