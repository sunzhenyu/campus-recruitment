using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.DAL;
using Campus.Recruitment.Entities;
using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.IBLL;
using Campus.Recruitment.IDAL;
using Campus.Recruitment.Utility;

namespace Campus.Recruitment.BLL
{
    public class ResumeBLL : IResumeBLL
    {

        private Lazy<IBaseRepository<Customer>> _customerRepository;
        private Lazy<IBaseRepository<PositionApply>> _positionApplyRepository;
        private Lazy<IBaseRepository<PositionInvitation>> _positionInvitationRepository;
        private Lazy<IBaseRepository<Position>> _positionRepository;
        private Lazy<IBaseRepository<NotificationInterview>> _notificationInterviewRepository;
        private Lazy<IBaseRepository<Enterprises>> _enterprisesRepository;

        public ResumeBLL()
        {
            _customerRepository = new Lazy<IBaseRepository<Customer>>(() => new BaseRepository<Customer>());
            _positionApplyRepository = new Lazy<IBaseRepository<PositionApply>>(() => new BaseRepository<PositionApply>());
            _positionInvitationRepository = new Lazy<IBaseRepository<PositionInvitation>>(() => new BaseRepository<PositionInvitation>());
            _positionRepository = new Lazy<IBaseRepository<Position>>(() => new BaseRepository<Position>());
            _notificationInterviewRepository = new Lazy<IBaseRepository<NotificationInterview>>(() => new BaseRepository<NotificationInterview>());
            _enterprisesRepository = new Lazy<IBaseRepository<Enterprises>>(() => new BaseRepository<Enterprises>());
        }

        public PageList<List<ResumeManage>> GetPage(ResumeManageCondition condition)
        {
            PageList<List<ResumeManage>> result = new PageList<List<ResumeManage>>();

            int total = 0;
            List<PositionApply> tempList = new List<PositionApply>();
            
            var whereLambda = PredicateBuilder.True<PositionApply>();
            whereLambda = whereLambda.And(x => x.Enterprise_id == condition.Enterprise_id);
            if (condition.State != 0)
            {
                whereLambda = whereLambda.And(x => x.State == condition.State);
            }

            if (!string.IsNullOrWhiteSpace(condition.positionId))
            {
                whereLambda = whereLambda.And(x => x.Position_id == condition.positionId);
            }
            
            tempList = _positionApplyRepository.Value.LoadPageEntities(whereLambda,
                t => t.Create_at, condition.PageSize, condition.PageIndex, out total, false).ToList();
            
            tempList.ForEach(x =>
            {
                var customer = _customerRepository.Value.LoadEntities(y => y.Id == x.Customer_id).FirstOrDefault() ??
                               new Customer();
                var position = _positionRepository.Value.LoadEntities(y => y.Id == x.Position_id).FirstOrDefault() ??
                               new Position();
                var interview =
                    _notificationInterviewRepository.Value
                        .LoadEntities(y => y.Customer_id == customer.Id && y.Position_id == position.Id)
                        .FirstOrDefault() ?? new NotificationInterview();

                ResumeManage entity = new ResumeManage()
                {
                    Position_apply_id = x.Id,
                    Position_id = position.Id,
                    Position_Name = position.Name,
                    Position_city_name = position.City_names,
                    Position_apply_date = x.Create_at.ToString("yyyy-MM-dd"),
                    Customer_id = customer.Id,
                    Customer_head_logo = customer.Head_icon,
                    Customer_real_name = customer.Real_name,
                    Customer_Sex_name = customer.Sex == 1 ? "男" : "女",
                    Intentional_city_name = customer.Intentional_city_name,
                    Education = customer.Education,
                    Major = customer.Major,
                    University = customer.University,
                    Interview_date = interview.Interview_date,
                    Interview_hour = interview.Interview_hour,
                    Interview_munites = interview.Interview_minutes,
                    Interview_address = interview.Interview_address,
                    Interview_contact_people = interview.Contact_people,
                    Interview_contact_mobile = interview.Cantact_mobile,
                    Position_apply_state = x.State
                };
                result.Data.Add(entity);
            });

            result.Total = total;
            result.PageIndex = condition.PageIndex;
            result.PageSize = condition.PageSize;

            return result;
        }

        public PageList<List<ResumeManage>> GetPageInvitation(ResumeManageCondition condition)
        {
            PageList<List<ResumeManage>> result = new PageList<List<ResumeManage>>();

            int total = 0;
            List<PositionInvitation> tempList = _positionInvitationRepository.Value.LoadPageEntities(x => x.Enterprise_id == condition.Enterprise_id && x.State == condition.State,
                    t => t.Create_at, condition.PageSize, condition.PageIndex, out total, false).ToList();
            
            tempList.ForEach(x =>
            {
                var customer = _customerRepository.Value.LoadEntities(y => y.Id == x.Customer_id).FirstOrDefault() ??
                               new Customer();
                var position = _positionRepository.Value.LoadEntities(y => y.Id == x.Position_id).FirstOrDefault() ??
                               new Position();

                ResumeManage entity = new ResumeManage()
                {
                    Position_apply_id = x.Id,
                    Position_id = position.Id,
                    Position_Name = position.Name,
                    Position_city_name = position.City_names,
                    Position_apply_date = x.Create_at.ToString("yyyy-MM-dd"),
                    Customer_id = customer.Id,
                    Customer_head_logo = customer.Head_icon,
                    Customer_real_name = customer.Real_name,
                    Customer_Sex_name = customer.Sex == 1 ? "男" : "女",
                    Intentional_city_name = customer.Intentional_city_name,
                    Education = customer.Education,
                    Major = customer.Major,
                    University = customer.University
                };
                result.Data.Add(entity);
            });

            result.Total = total;
            result.PageIndex = condition.PageIndex;
            result.PageSize = condition.PageSize;

            return result;
        }

        public int ResumeTotal(string enterprise_id)
        {
            return _positionApplyRepository.Value.Count(x => x.Enterprise_id == enterprise_id);
        }

        public int InvitationTotal(string enterprise_id)
        {
            return _positionInvitationRepository.Value.Count(x => x.Enterprise_id == enterprise_id);
        }

        public NotificationInterview GetPositionInvitation(string position_apply_id)
        {
            NotificationInterview entity = new NotificationInterview();
            var positionApplyEntity = _positionApplyRepository.Value.LoadEntities(x => x.Id == position_apply_id)
                                          .FirstOrDefault() ?? new PositionApply();

            var enterpriseEntity = _enterprisesRepository.Value
                                       .LoadEntities(x => x.Id == positionApplyEntity.Enterprise_id).FirstOrDefault() ??
                                   new Enterprises();

            var customerEntity = _customerRepository.Value.LoadEntities(x => x.Id == positionApplyEntity.Customer_id)
                                     .FirstOrDefault() ?? new Customer();

            var positionEntity = _positionRepository.Value.LoadEntities(x => x.Id == positionApplyEntity.Position_id)
                                     .FirstOrDefault() ?? new Position();
            entity.Enterprise_id = positionApplyEntity.Enterprise_id;
            entity.Customer_id = positionApplyEntity.Customer_id;
            entity.Position_id = positionApplyEntity.Position_id;
            entity.Cantact_mobile = enterpriseEntity.Contact_mobile;
            entity.Contact_people = enterpriseEntity.Contact_man;
            entity.Interview_address = enterpriseEntity.Address;
            entity.Interview_date = DateTime.Now.AddDays(1).ToString("yyyy-MM-dd");
            entity.Interview_hour = "10";
            entity.Interview_minutes = "30";
            entity.Customer_name = customerEntity.Real_name;
            entity.Name = positionEntity.Name;
            return entity;
        }
    }
}
