using Campus.Recruitment.DAL;
using Campus.Recruitment.Entities;
using Campus.Recruitment.IBLL;
using Campus.Recruitment.IDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.BLL
{
    public class PositionFireBLL : IPositionFireBLL
    {
        private IBaseRepository<PositionFire> _positionFireRepository;

        public PositionFireBLL()
        {
            _positionFireRepository = new BaseRepository<PositionFire>();
        }

        public string Create(PositionFire entity)
        {
            entity.Id = Guid.NewGuid().ToString();
            entity.State = 1;
            _positionFireRepository.AddEntity(entity);
            return entity.Id;
        }

        public bool IsFireByUser(string user_id,string position_id)
        {
            return _positionFireRepository.Count(x => x.Customer_id == user_id && x.State == 1 && x.Position_id == position_id) > 0;
        }

    }
}
