using Campus.Recruitment.DAL;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.IBLL;
using Campus.Recruitment.IDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.BLL
{
    public class PositionCollectBLL : IPositionCollectBLL
    {
        private IBaseRepository<PositionCollect> _positionCollectRepository;

        public PositionCollectBLL()
        {
            _positionCollectRepository = new BaseRepository<PositionCollect>();
        }

        public string Create(PositionCollect entity)
        {
            entity.Id = Guid.NewGuid().ToString();
            entity.State = 1;
            _positionCollectRepository.AddEntity(entity);
            return entity.Id;
        }


        public bool IsCollectByUser(string user_id,string position_id)
        {
            return _positionCollectRepository.Count(x => x.Customer_id == user_id && x.State == 1 && x.Position_id == position_id) > 0;
        }
    }
}
