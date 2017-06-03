using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.DAL;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.IBLL;
using Campus.Recruitment.IDAL;

namespace Campus.Recruitment.BLL
{
    /// <summary>
    /// 邀请用户
    /// </summary>
    public class PositionInvitationBLL : IPositionInvitationBLL
    {

        private IBaseRepository<PositionInvitation> _positionInvitationRepository;

        public PositionInvitationBLL()
        {
            _positionInvitationRepository = new BaseRepository<PositionInvitation>();
        }
        public string Create(PositionInvitation entity)
        {
            entity.Id = Guid.NewGuid().ToString();
            entity.State = 1;
            _positionInvitationRepository.AddEntity(entity);
            return entity.Id;
        }
    }
}
