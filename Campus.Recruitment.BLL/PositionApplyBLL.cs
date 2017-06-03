using Campus.Recruitment.IBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.IDAL;
using Campus.Recruitment.DAL;

namespace Campus.Recruitment.BLL
{
    public class PositionApplyBLL : IPositionApplyBLL
    {

        private IBaseRepository<PositionApply> _positionApplyRepository;

        public PositionApplyBLL() {
            _positionApplyRepository = new BaseRepository<PositionApply>();
        }

        public string Create(PositionApply entity)
        {
            entity.Id = Guid.NewGuid().ToString();
            entity.State = 1;
            _positionApplyRepository.AddEntity(entity);
            return entity.Id;
        }

        public bool IsApplyByUser(string user_id,string position_id) {
            return _positionApplyRepository.Count(x => x.Customer_id == user_id && x.State > 0 && x.Position_id == position_id) > 0;
        }

        public bool UpdateState(string customer_id,string position_id, int state)
        {
            var entity = _positionApplyRepository.LoadEntities(x => x.Customer_id == customer_id && x.Position_id == position_id).FirstOrDefault() ?? new PositionApply();

            entity.State = state;
            entity.Update_at = DateTime.Now;

            _positionApplyRepository.UpdateEntity(entity);

            return true;
        }
    }
}
