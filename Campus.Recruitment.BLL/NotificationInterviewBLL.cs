using Campus.Recruitment.IBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.DAL;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.IDAL;

namespace Campus.Recruitment.BLL
{
    public class NotificationInterviewBLL:INotificationInterviewBLL
    {
        private  IBaseRepository<NotificationInterview> _notificationInterviewRepository;

        public NotificationInterviewBLL()
        {
            _notificationInterviewRepository = new BaseRepository<NotificationInterview>();
        }

        public string Create(NotificationInterview entity)
        {
            entity.Id = Guid.NewGuid().ToString();
            entity.State = 1;
            if (_notificationInterviewRepository.Count(
                    x => x.Position_id == entity.Position_id && x.Customer_id == entity.Customer_id) <= 0)
            {
                _notificationInterviewRepository.AddEntity(entity);
            }
            return entity.Id;
        }

        public NotificationInterview GetEntity(string customer_id, string position_id)
        {
            return _notificationInterviewRepository
                       .LoadEntities(x => x.Customer_id == customer_id && x.Position_id == position_id)
                       .FirstOrDefault() ?? new NotificationInterview();
        }
    }
}

