using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.DAL;
using Campus.Recruitment.Entities;
using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.IBLL;
using Campus.Recruitment.IDAL;

namespace Campus.Recruitment.BLL
{
    public class PomoteDiplomaBLL : IPomoteDiplomaBLL
    {
        private IBaseRepository<PromoteDiploma> _promoteDiplomaRepository;

        private Lazy<IBaseRepository<Customer>> _customerRepository;
        public PomoteDiplomaBLL()
        {
            _customerRepository = new Lazy<IBaseRepository<Customer>>(() => new BaseRepository<Customer>());
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
            tempEntity.Update_at = DateTime.Now;

            _promoteDiplomaRepository.UpdateEntity(tempEntity);

            return entity.Id;
        }

        public string UpdateState(PromoteDiploma entity)
        {
            var tempEntity = _promoteDiplomaRepository.LoadEntities(x => x.Id == entity.Id).OrderByDescending(x => x.Create_at)
                                 .FirstOrDefault() ?? new PromoteDiploma();

            tempEntity.State = 2;
            tempEntity.Treatment_result = entity.Treatment_result;
            tempEntity.Update_at = DateTime.Now;
            

            _promoteDiplomaRepository.UpdateEntity(tempEntity);

            return entity.Id;
        }

        public PromoteDiploma GetPromoteDiploma(string user_id)
        {
            return _promoteDiplomaRepository.LoadEntities(x => x.Customer_id == user_id && x.State == 1).OrderByDescending(x=>x.Create_at)
                       .FirstOrDefault() ?? new PromoteDiploma();
        }

        public PageList<List<PromoteDiplomaAndCustomer>> GetPage(PomoteDiplomaCondition condition)
        {
            PageList<List<PromoteDiplomaAndCustomer>> result = new PageList<List<PromoteDiplomaAndCustomer>>();
            
            int total = 0;
            
            List<PromoteDiploma> tempList = _promoteDiplomaRepository.LoadPageEntities(x => x.State == condition.State,
                x => x.Update_at, condition.PageSize, condition.PageIndex, out total, false).ToList();

            tempList.ForEach(x =>
            {
                Customer tempCustomer =
                    _customerRepository.Value.LoadEntities(y => y.Id == x.Customer_id).FirstOrDefault() ??
                    new Customer();

                PromoteDiplomaAndCustomer entity = new PromoteDiplomaAndCustomer()
                {
                    Id = x.Id,
                    Create_at = x.Create_at,
                    Create_id = x.Create_id,
                    Customer_id = x.Customer_id,
                    Mobile = tempCustomer.Mobile,
                    Treatment_result = x.Treatment_result,
                    Name = x.Name,
                    Note = x.Note,
                    Real_name = tempCustomer.Real_name,
                    State = x.State,
                    Update_at = x.Update_at,
                    Update_id = x.Update_id
                };
                
                result.Data.Add(entity);
            });
            result.Total = total;
            result.PageSize = condition.PageSize;
            result.PageIndex = condition.PageIndex;
            return result;
        }
    }
}
