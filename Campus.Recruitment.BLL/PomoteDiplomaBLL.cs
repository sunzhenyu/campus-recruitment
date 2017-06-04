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
    public class PomoteDiplomaBLL : IPomoteDiplomaBLL
    {
        private IBaseRepository<PromoteDiploma> _promoteDiplomaRepository;

        public PomoteDiplomaBLL()
        {
            _promoteDiplomaRepository = new BaseRepository<PromoteDiploma>();
        }

        public string Create(PromoteDiploma entity)
        {
            entity.Id = Guid.NewGuid().ToString();
            entity.State = 1;
            _promoteDiplomaRepository.AddEntity(entity);
            return entity.Id;
        }

        public string Update(PromoteDiploma entity)
        {
            var tempEntity = _promoteDiplomaRepository.LoadEntities(x => x.Id == entity.Id).OrderByDescending(x => x.Create_at)
                                 .FirstOrDefault() ?? new PromoteDiploma();

            tempEntity.Customer_id = entity.Customer_id;
            tempEntity.Name = entity.Name;
            tempEntity.Note = entity.Note;

            _promoteDiplomaRepository.UpdateEntity(tempEntity);

            return entity.Id;
        }

        public PromoteDiploma GetPromoteDiploma(string user_id)
        {
            return _promoteDiplomaRepository.LoadEntities(x => x.Customer_id == user_id && x.State == 1).OrderByDescending(x=>x.Create_at)
                       .FirstOrDefault() ?? new PromoteDiploma();
        }
    }
}
