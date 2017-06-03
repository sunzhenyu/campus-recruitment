using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.Entities.Entity;

namespace Campus.Recruitment.IBLL
{
    public interface IPositionInvitationBLL
    {
        string Create(PositionInvitation entity);
    }
}
