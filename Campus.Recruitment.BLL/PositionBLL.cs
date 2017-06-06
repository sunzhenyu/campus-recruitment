using Campus.Recruitment.IBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.IDAL;
using Campus.Recruitment.DAL;
using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Utility;

namespace Campus.Recruitment.BLL
{
    public class PositionBLL : IPositionBLL
    {
        private Lazy<IBaseRepository<Position>> _baseRepository;
        private Lazy<IBaseRepository<Enterprises>> _enterprisesRepository;
        private Lazy<IBaseRepository<PositionApply>> _positionApplyRepository;
        private Lazy<IBaseRepository<PositionCollect>> _positionCollectRepository;
        private Lazy<IBaseRepository<NotificationInterview>> _notificationInterviewRepository;
        private IPositionDAL _positionDal;
        public PositionBLL(IPositionDAL positionDal)
        {
            _baseRepository = new Lazy<IBaseRepository<Position>>(() => new BaseRepository<Position>());
            _enterprisesRepository = new Lazy<IBaseRepository<Enterprises>>(() => new BaseRepository<Enterprises>());
            _positionApplyRepository = new Lazy<IBaseRepository<PositionApply>>(() => new BaseRepository<PositionApply>());
            _positionCollectRepository = new Lazy<IBaseRepository<PositionCollect>>(() => new BaseRepository<PositionCollect>());
            _notificationInterviewRepository = new Lazy<IBaseRepository<NotificationInterview>>(() => new BaseRepository<NotificationInterview>());
            _positionDal = positionDal;
        }

        public string CreatePosition(Position entity)
        {
            entity.Id = Guid.NewGuid().ToString();
            _baseRepository.Value.AddEntity(entity);
            return entity.Id;
        }


        public string UpdatePosition(Position entity)
        {
            var oldEntity = _baseRepository.Value.LoadEntities(x => x.Id == entity.Id).FirstOrDefault() ?? new Position();
            oldEntity.Additional = entity.Additional;
            oldEntity.City_ids = entity.City_ids;
            oldEntity.City_names = entity.City_names;
            oldEntity.Daily_salary = entity.Daily_salary;
            oldEntity.Degree_ids = entity.Degree_ids;
            oldEntity.Degree_names = entity.Degree_names;
            oldEntity.Function_ids = entity.Function_ids;
            oldEntity.Function_names = entity.Function_names;
            oldEntity.Hour_salary = entity.Hour_salary;
            oldEntity.Id = entity.Id;
            oldEntity.Intern_days = entity.Intern_days;
            oldEntity.Intern_length = entity.Intern_length;
            oldEntity.Intern_salary_max = entity.Intern_salary_max;
            oldEntity.Intern_salary_min = entity.Intern_salary_min;
            oldEntity.Intern_salary_type = entity.Intern_salary_type;
            oldEntity.Major_ids = entity.Major_ids;
            oldEntity.Major_name = entity.Major_name;
            oldEntity.Name = entity.Name;
            oldEntity.Position_type = entity.Position_type;
            oldEntity.Pos_description = entity.Pos_description;
            oldEntity.Recruit_count = entity.Recruit_count;
            oldEntity.Salary_max = entity.Salary_max;
            oldEntity.Salary_min = entity.Salary_min;
            oldEntity.School_city_ids = entity.School_city_ids;
            oldEntity.School_city_names = entity.School_city_names;
            oldEntity.School_level_ids = entity.School_level_ids;
            oldEntity.School_level_name = entity.School_level_name;
            oldEntity.State = entity.State;
            oldEntity.Update_at = DateTime.Now;
            oldEntity.Update_id = entity.Update_id;
            _baseRepository.Value.UpdateEntity(oldEntity);
            return entity.Id;
        }

        public Position GetEntity(string id)
        {
            return _baseRepository.Value.LoadEntities(x => x.Id == id).FirstOrDefault() ?? new Position();
        }

        //翻页  企业用户
        public PageList<List<Position>> GetPage(PositionPageCondition condition)
        {
            PageList<List<Position>> result = new PageList<List<Position>>();

            int total = 0;
            var whereLambda = PredicateBuilder.True<Position>();
            whereLambda = whereLambda.And(x => x.State == condition.State && x.Create_id == condition.EnterpriseId);
            if (condition.FunxtionId != null)
            {
                whereLambda = whereLambda.And(x => x.Function_ids.Split(',').Contains(condition.FunxtionId.ToString()));
            }

            if (condition.CityId != null)
            {
                whereLambda = whereLambda.And(x => x.City_ids.Split(',').Contains(condition.CityId.ToString()));
            }

            if (!string.IsNullOrWhiteSpace(condition.Name))
            {
                whereLambda = whereLambda.And(x => x.Name.Contains(condition.Name));
            }

            if (condition.PositionType != null)
            {
                whereLambda = whereLambda.And(x => x.Position_type == condition.PositionType);
            }

            result.Data = _baseRepository.Value.LoadPageEntities(whereLambda, t => t.Create_at, condition.PageSize, condition.PageIndex, out total, false).ToList();
            result.Total = total;
            result.PageIndex = condition.PageIndex;
            result.PageSize = condition.PageSize;

            return result;
        }


        public bool RefreshPosition(string id)
        {
            return _positionDal.RefreshPosition(id);
        }


        public bool UpdateState(string id, int state)
        {
            return _positionDal.UpdateState(id, state);
        }

        /// <summary>
        /// 学生查询职位
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public PageList<List<SearchPosition>> GetPageBySearch(SearchPositionCondition condition)
        {
            PageList<List<SearchPosition>> result = new PageList<List<SearchPosition>>();

            int total = 0;
            #region  筛选条件
            var whereLambda = PredicateBuilder.True<Position>();
            whereLambda = whereLambda.And(x => x.State == 1 && x.Position_type == condition.Position_type);

            if (condition.City > 0)
            {
                whereLambda = whereLambda.And(x => x.City_ids.Split(',').Contains(condition.City.ToString()));
            }

            if (!string.IsNullOrWhiteSpace(condition.Function_id))
            {
                whereLambda = whereLambda.And(x => x.Function_ids.Split(',').Contains(condition.Function_id.ToString()));
            }

            if (!string.IsNullOrWhiteSpace(condition.Degree_id))
            {
                whereLambda = whereLambda.And(x => x.Degree_ids.Split(',').Contains(condition.Degree_id));
            }

            if (!string.IsNullOrWhiteSpace(condition.Industry_id))
            {
                whereLambda = whereLambda.And(x => x.Industry_id == condition.Industry_id);
            }

            if (!string.IsNullOrWhiteSpace((condition.Major_name)))
            {
                whereLambda = whereLambda.And(x => x.Major_name.Split('+').Contains(condition.Major_name));
            }

            if (condition.Salary != null)
            {
                switch (condition.Salary)
                {
                    case 1:
                        if (condition.Position_type == 1)
                        {
                            whereLambda = whereLambda.And(x => x.Salary_min <= 0);
                        }
                        else
                        {
                            whereLambda = whereLambda.And(x => x.Daily_salary <= 0 && x.Intern_salary_min <= 0 && x.Hour_salary <= 0);
                        }
                        break;
                    case 2:
                        if (condition.Position_type == 1)
                        {
                            whereLambda = whereLambda.And(x => x.Salary_min < 2000);
                        }
                        else
                        {
                            whereLambda = whereLambda.And(x => x.Intern_salary_min < 2000);
                        }
                        break;
                    case 3:
                        if (condition.Position_type == 1)
                        {
                            whereLambda = whereLambda.And(x => x.Salary_min >= 2000);
                        }
                        else
                        {
                            whereLambda = whereLambda.And(x => x.Intern_salary_min > 2000);
                        }
                        break;
                    case 4:
                        if (condition.Position_type == 1)
                        {
                            whereLambda = whereLambda.And(x => x.Salary_min >= 3000);
                        }
                        else
                        {
                            whereLambda = whereLambda.And(x => x.Intern_salary_min >= 3000);
                        }
                        break;
                    case 5:
                        if (condition.Position_type == 1)
                        {
                            whereLambda = whereLambda.And(x => x.Salary_min >= 5000);
                        }
                        else
                        {
                            whereLambda = whereLambda.And(x => x.Intern_salary_min >= 5000);
                        }
                        break;
                    case 6:
                        if (condition.Position_type == 1)
                        {
                            whereLambda = whereLambda.And(x => x.Salary_min >= 8000);
                        }
                        else
                        {
                            whereLambda = whereLambda.And(x => x.Intern_salary_min >= 8000);
                        }
                        break;
                    case 7:
                        if (condition.Position_type == 1)
                        {
                            whereLambda = whereLambda.And(x => x.Salary_min >= 10000);
                        }
                        else
                        {
                            whereLambda = whereLambda.And(x => x.Intern_salary_min >= 10000);
                        }
                        break;
                    default:
                        break;
                }
            }


            #endregion

            List<Position> temp = _baseRepository.Value.LoadPageEntities(whereLambda, t => t.Update_at, condition.PageSize, condition.PageIndex, out total, false).ToList();

            temp.ForEach(x =>
            {
                SearchPosition entity = new SearchPosition();
                var enterpriseEntity = _enterprisesRepository.Value.LoadEntities(y => y.Id == x.Create_id).FirstOrDefault() ?? new Enterprises();
                entity.City_ids = x.City_ids;
                entity.City_names = x.City_names;
                entity.Enterprise_id = enterpriseEntity.Id;
                entity.Enterprise_name = enterpriseEntity.Name;
                entity.Id = x.Id;
                entity.Logo_icon = enterpriseEntity.Icon_logo;
                entity.Name = x.Name;
                entity.Update_at = x.Update_at.ToString("yyyy-MM-dd");
                if (x.Position_type == 1)
                {
                    entity.Salary = x.Salary_min <= 0 ? "面议" : $"{x.Salary_min}-{x.Salary_max}元/月";
                }
                else
                {
                    if (x.Intern_salary_type == 1)
                    {
                        entity.Salary = x.Intern_salary_min <= 0 ? "面议" : $"{x.Intern_salary_min}-{x.Intern_salary_max}元/月";
                    }
                    else if (x.Intern_salary_type == 2)
                    {
                        entity.Salary = x.Daily_salary <= 0 ? "面议" : $"{x.Daily_salary}元/日";
                    }
                    else
                    {
                        entity.Salary = x.Hour_salary <= 0 ? "面议" : $"{x.Hour_salary}元/时";
                    }
                }
                result.Data.Add(entity);
            });

            result.Total = total;
            result.PageIndex = condition.PageIndex;
            result.PageSize = condition.PageSize;

            return result;
        }

        /// <summary>
        /// 获取收藏的职位
        /// </summary>
        /// <param name="user_id"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public PageList<List<SearchPosition>> GetPageByCollect(string user_id, int pageIndex, int pageSize)
        {
            PageList<List<SearchPosition>> result = new PageList<List<SearchPosition>>();
            int total = 0;
            List<PositionCollect> positionCollect = _positionCollectRepository.Value.LoadPageEntities(x => x.State == 1 && x.Customer_id == user_id, y => y.Update_at, pageSize, pageIndex, out total, false).ToList();
            positionCollect.ForEach(x =>
            {
                SearchPosition entity = new SearchPosition();
                var positionEntity = _baseRepository.Value.LoadEntities(y => y.Id == x.Position_id && y.State == 1).FirstOrDefault() ?? new Position();
                var enterpriseEntity = _enterprisesRepository.Value.LoadEntities(y => y.Id == positionEntity.Create_id).FirstOrDefault() ?? new Enterprises();
                entity.Customer_id = x.Customer_id;
                entity.City_ids = positionEntity.City_ids;
                entity.City_names = positionEntity.City_names;
                entity.Enterprise_id = enterpriseEntity.Id;
                entity.Enterprise_name = enterpriseEntity.Name;
                entity.Id = positionEntity.Id;
                entity.Logo_icon = enterpriseEntity.Icon_logo;
                entity.Name = positionEntity.Name;
                entity.Update_at = x.Update_at.ToString("yyyy-MM-dd");
                result.Data.Add(entity);
            });

            result.Total = total;
            result.PageIndex = pageIndex;
            result.PageSize = pageSize;

            return result;
        }

        /// <summary>
        /// 获取申请的职位
        /// </summary>
        /// <param name="user_id"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public PageList<List<SearchPosition>> GetPageByApply(string user_id, int pageIndex, int pageSize)
        {
            PageList<List<SearchPosition>> result = new PageList<List<SearchPosition>>();
            int total = 0;
            List<PositionApply> positionApply = _positionApplyRepository.Value.LoadPageEntities(x => x.State > 0 && x.Customer_id == user_id, y => y.Update_at, pageSize, pageIndex, out total, false).ToList();
            positionApply.ForEach(x =>
            {
                SearchPosition entity = new SearchPosition();
                var positionEntity = _baseRepository.Value.LoadEntities(y => y.Id == x.Position_id && y.State == 1).FirstOrDefault() ?? new Position();
                var enterpriseEntity = _enterprisesRepository.Value.LoadEntities(y => y.Id == positionEntity.Create_id).FirstOrDefault() ?? new Enterprises();
                entity.Customer_id = x.Customer_id;
                entity.City_ids = positionEntity.City_ids;
                entity.City_names = positionEntity.City_names;
                entity.Enterprise_id = enterpriseEntity.Id;
                entity.Enterprise_name = enterpriseEntity.Name;
                entity.Id = positionEntity.Id;
                entity.Logo_icon = enterpriseEntity.Icon_logo;
                entity.Name = positionEntity.Name;
                entity.Create_at = x.Create_at.ToString("yyyy-MM-dd");
                entity.Update_at = x.Update_at.ToString("yyyy-MM-dd");
                entity.State = x.State;
                if (x.State == 2 || x.State == 4)
                {
                    entity.NotificationInterviewEntity =
                        _notificationInterviewRepository.Value
                            .LoadEntities(y => y.Position_id == x.Position_id && y.Customer_id == x.Customer_id)
                            .FirstOrDefault() ?? new NotificationInterview();
                }
                result.Data.Add(entity);
            });

            result.Total = total;
            result.PageIndex = pageIndex;
            result.PageSize = pageSize;

            return result;
        }

        /// <summary>
        /// 获取职位信息
        /// </summary>
        /// <param name="position_apply_id"></param>
        /// <returns></returns>
        public SearchPosition GetSearchPositionByPositionApplyId(string position_apply_id)
        {
            SearchPosition result = new SearchPosition();
            PositionApply positionApply = _positionApplyRepository.Value.LoadEntities(x => x.Id == position_apply_id).FirstOrDefault() ?? new PositionApply();

            var positionEntity = _baseRepository.Value.LoadEntities(y => y.Id == positionApply.Position_id && y.State == 1).FirstOrDefault() ?? new Position();
            var enterpriseEntity = _enterprisesRepository.Value.LoadEntities(y => y.Id == positionEntity.Create_id).FirstOrDefault() ?? new Enterprises();
            result.City_ids = positionEntity.City_ids;
            result.Customer_id = positionApply.Customer_id;
            result.City_names = positionEntity.City_names;
            result.Enterprise_id = enterpriseEntity.Id;
            result.Enterprise_name = enterpriseEntity.Name;
            result.Id = positionEntity.Id;
            result.Logo_icon = enterpriseEntity.Icon_logo;
            result.Name = positionEntity.Name;
            result.Create_at = positionApply.Create_at.ToString("yyyy-MM-dd HH:mm");
            result.Update_at = positionApply.Update_at.ToString("yyyy-MM-dd");
            result.State = positionApply.State;


            return result;
        }

        /// <summary>
        /// 获取职位集合
        /// </summary>
        /// <param name="enterprise_id"></param>
        /// <returns></returns>
        public List<Position> GetPositionList(string enterprise_id)
        {
            return _baseRepository.Value.LoadEntities(x => x.Create_id == enterprise_id && x.State == 1).ToList();
        }
    }
}
