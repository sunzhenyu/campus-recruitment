using Campus.Recruitment.IBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.Entities;
using Campus.Recruitment.IDAL;
using Campus.Recruitment.DAL;
using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity.Customers;
using Campus.Recruitment.Entities.Entity;

namespace Campus.Recruitment.BLL
{
    public class CustomerBLL : ICustomerBLL
    {
        private Lazy<IBaseRepository<Customer>> _customerRepository;
        private Lazy<IBaseRepository<CustomerBase>> _customerBaseRepository;
        private Lazy<IBaseRepository<CustomerCertificate>> _customerCertificateRepository;
        private Lazy<IBaseRepository<CustomerEducation>> _customerEducationRepository;
        private Lazy<IBaseRepository<CustomerExperience>> _customerExperienceRepository;
        private Lazy<IBaseRepository<CustomerIntramuralJob>> _customerIntramuralJobRepository;
        private Lazy<IBaseRepository<CustomerIntramuralReward>> _customerIntramuralRewardRepository;
        private Lazy<IBaseRepository<CustomerItSkill>> _customerItSkillRepository;
        private Lazy<IBaseRepository<CustomerLanguage>> _customerLanguageRepository;
        private Lazy<IBaseRepository<CustomerProject>> _customerProjectRepository;
        private Lazy<IBaseRepository<SysDictionary>> _sysDictionaryRepository;
        private readonly ICustomerDAL _customerDAL;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="customerDAL"></param>
        public CustomerBLL(ICustomerDAL customerDAL)
        {
            _customerDAL = customerDAL;
            _customerRepository = new Lazy<IBaseRepository<Customer>>(() => new BaseRepository<Customer>());
            _customerBaseRepository = new Lazy<IBaseRepository<CustomerBase>>(() => new BaseRepository<CustomerBase>());
            _customerCertificateRepository = new Lazy<IBaseRepository<CustomerCertificate>>(() => new BaseRepository<CustomerCertificate>());
            _customerEducationRepository = new Lazy<IBaseRepository<CustomerEducation>>(() => new BaseRepository<CustomerEducation>());
            _customerExperienceRepository = new Lazy<IBaseRepository<CustomerExperience>>(() => new BaseRepository<CustomerExperience>());
            _customerIntramuralJobRepository = new Lazy<IBaseRepository<CustomerIntramuralJob>>(() => new BaseRepository<CustomerIntramuralJob>());
            _customerIntramuralRewardRepository = new Lazy<IBaseRepository<CustomerIntramuralReward>>(() => new BaseRepository<CustomerIntramuralReward>());
            _customerItSkillRepository = new Lazy<IBaseRepository<CustomerItSkill>>(() => new BaseRepository<CustomerItSkill>());
            _customerLanguageRepository = new Lazy<IBaseRepository<CustomerLanguage>>(() => new BaseRepository<CustomerLanguage>());
            _customerProjectRepository = new Lazy<IBaseRepository<CustomerProject>>(() => new BaseRepository<CustomerProject>());
            _sysDictionaryRepository = new Lazy<IBaseRepository<SysDictionary>>(() => new BaseRepository<SysDictionary>());
        }

        /// <summary>
        /// 创建用户
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public string CreateCustomer(Customer entity)
        {
            entity.Id = Guid.NewGuid().ToString();
            entity.Create_id = entity.Id;
            entity.Update_id = entity.Id;
            entity.State = 0;
            _customerRepository.Value.AddEntity(entity);
            return entity.Id;
        }

        /// <summary>
        /// 通过编号获取用户信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Customer GetEntity(string id)
        {
            return _customerRepository.Value.LoadEntities(x => x.Id == id).FirstOrDefault() ?? new Customer();
        }

        /// <summary>
        /// 通过用户名电话获取用户信息
        /// </summary>
        /// <param name="mobile"></param>
        /// <returns></returns>
        public Customer GetEntityByMobile(string mobile)
        {
            return _customerRepository.Value.LoadEntities(x => x.Mobile == mobile && x.State == 1).FirstOrDefault() ?? new Customer();
        }

        /// <summary>
        /// 手机号是否已经存在
        /// </summary>
        /// <param name="mobile"></param>
        /// <returns></returns>
        public bool IsExistMobile(string mobile)
        {
            return _customerRepository.Value.Count(x => x.State == 1 && x.Mobile == mobile) > 0;
        }

        /// <summary>
        /// 更新用户
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public bool UpdateCustomer(Customer entity)
        {
            try
            {
                _customerDAL.RegisterTwoUpdate(entity);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public CustomerAll GetAllCustomerInfo(string id)
        {
            CustomerAll result = new CustomerAll();

            //获取customer表信息
            var customer = _customerRepository.Value.LoadEntities(x => x.Id == id).FirstOrDefault() ?? new Customer();

            var customerinfo = _customerBaseRepository.Value.LoadEntities(x => x.Customer_id == id).FirstOrDefault() ?? new CustomerBase();

            //获取基本信息
            result.customerBase = new CustomerAndBase();
            result.customerBase.Id = customerinfo.Id;
            result.customerBase.Customer_id = customerinfo.Customer_id;
            result.customerBase.Real_name = customer.Real_name;
            result.customerBase.Sex = customer.Sex;
            result.customerBase.Birthday = customerinfo.Birthday;
            result.customerBase.Current_location = customerinfo.Current_location;
            result.customerBase.Family_location = customerinfo.Family_location;
            result.customerBase.High_school_location = customerinfo.High_school_location;
            result.customerBase.Current_name = customerinfo.Current_name;
            result.customerBase.Family_name = customerinfo.Family_name;
            result.customerBase.High_school_name = customerinfo.High_school_name;
            result.customerBase.Email = customer.Email;
            result.customerBase.Policital_status = !string.IsNullOrWhiteSpace(customerinfo.Policital_status)
                ? _sysDictionaryRepository.Value.LoadEntities(x => x.State == 1 && x.Dic_key.ToString() == (customerinfo.Policital_status ?? "0") && x.Dic_type == "policital_status_type").FirstOrDefault().Dic_value : "";
            result.customerBase.Height = customerinfo.Height;
            result.customerBase.Is_work = customer.Is_work;
            result.customerBase.Head_icon = customer.Head_icon;
            result.customerBase.Eval_desc = customerinfo.Eval_desc;
            result.customerBase.Specialty_desc = customerinfo.Specialty_desc;
            result.customerBase.Mobile = customer.Mobile;
            result.customerBase.Intentional_city = customer.Intentional_city;
            result.customerBase.Intentional_city_name = customer.Intentional_city_name;


            //获取获得证书集合
            result.customerCertificateList = _customerCertificateRepository.Value.LoadEntities(x => x.Customer_id == id).ToList();

            //获取教育经历集合
            result.customerEducationList = _customerEducationRepository.Value.LoadEntities(x => x.Customer_id == id).ToList();

            result.customerEducationList.ForEach(x =>
            {
                x.Class_rank = !string.IsNullOrWhiteSpace(x.Class_rank) ? _sysDictionaryRepository.Value.LoadEntities(y => y.State == 1 && y.Dic_key.ToString() == (x.Class_rank ?? "0") && y.Dic_type == "class_bank_type").FirstOrDefault().Dic_value : "";
                x.Degree = !string.IsNullOrWhiteSpace(x.Degree) ? _sysDictionaryRepository.Value.LoadEntities(z => z.State == 1 && z.Dic_key.ToString() == (x.Degree ?? "0") && z.Dic_type == "degree_type").FirstOrDefault().Dic_value : "";
            });

            //获取实习、工作经历集合
            result.customerExperienceList = _customerExperienceRepository.Value.LoadEntities(x => x.Customer_id == id).ToList();

            //获取校内职务集合
            result.customerIntramuralJobList = _customerIntramuralJobRepository.Value.LoadEntities(x => x.Customer_id == id).ToList();

            //获取校内奖励集合
            result.customerIntramuralRewardList = _customerIntramuralRewardRepository.Value.LoadEntities(x => x.Customer_id == id).ToList();

            //获取IT技能集合
            result.customerItSkillList = _customerItSkillRepository.Value.LoadEntities(x => x.Customer_id == id).ToList();

            result.customerItSkillList.ForEach(x =>
            {
                x.Skill_level = !string.IsNullOrWhiteSpace(x.Skill_level) ? _sysDictionaryRepository.Value.LoadEntities(y => y.State == 1 && y.Dic_key.ToString() == (x.Skill_level ?? "0") && y.Dic_type == "skill_level_type").FirstOrDefault().Dic_value : "";
            });

            //获取语言能力集合
            result.customerLanguageList = _customerLanguageRepository.Value.LoadEntities(x => x.Customer_id == id).ToList();


            result.customerLanguageList.ForEach(x =>
            {
                x.Name = !string.IsNullOrWhiteSpace(x.Name) ? _sysDictionaryRepository.Value.LoadEntities(y => y.State == 1 && y.Dic_key.ToString() == (x.Name ?? "0") && y.Dic_type == "language_type").FirstOrDefault().Dic_value : "";
                x.Hear = !string.IsNullOrWhiteSpace(x.Hear) ? _sysDictionaryRepository.Value.LoadEntities(z => z.State == 1 && z.Dic_key.ToString() == (x.Hear ?? "0") && z.Dic_type == "skill_level_type").FirstOrDefault().Dic_value : "";
                x.Read_write = !string.IsNullOrWhiteSpace(x.Read_write) ? _sysDictionaryRepository.Value.LoadEntities(z => z.State == 1 && z.Dic_key.ToString() == (x.Read_write ?? "0") && z.Dic_type == "skill_level_type").FirstOrDefault().Dic_value : "";
            });

            //获取项目经历集合
            result.customerProjectList = _customerProjectRepository.Value.LoadEntities(x => x.Customer_id == id).ToList();

            return result;
        }


        public List<CustomerAndBase> GetCustomerInfoList(BasePageCondition condition)
        {
            List<CustomerAndBase> result = new List<CustomerAndBase>();
            int total = 0;
            //获取customer表信息
            List<Customer> customerList = _customerRepository.Value.LoadPageEntities(x => x.State == 1,
                x => x.Update_at, condition.PageSize, condition.PageIndex, out total, false).ToList();
            customerList.ForEach(x =>
            {
                var customerinfo = _customerBaseRepository.Value.LoadEntities(y => y.Customer_id == x.Id).FirstOrDefault() ?? new CustomerBase();
                CustomerAndBase entity = new CustomerAndBase();

                //获取基本信息
                entity.Id = customerinfo.Id;
                entity.Customer_id = customerinfo.Customer_id;
                entity.Real_name = x.Real_name;
                entity.Sex = x.Sex;
                entity.Birthday = customerinfo.Birthday;
                entity.Current_location = customerinfo.Current_location;
                entity.Family_location = customerinfo.Family_location;
                entity.High_school_location = customerinfo.High_school_location;
                entity.Current_name = customerinfo.Current_name;
                entity.Family_name = customerinfo.Family_name;
                entity.High_school_name = customerinfo.High_school_name;
                entity.Email = x.Email;
                entity.Height = customerinfo.Height;
                entity.Is_work = x.Is_work;
                entity.Head_icon = x.Head_icon;
                entity.Eval_desc = customerinfo.Eval_desc;
                entity.Specialty_desc = customerinfo.Specialty_desc;
                entity.Mobile = x.Mobile;
                entity.Intentional_city = x.Intentional_city;
                entity.Intentional_city_name = x.Intentional_city_name;
                entity.University = x.University;
                entity.Major = x.Major;
                entity.Education = x.Major;
                result.Add(entity);
            });

            return result;
        }

        #region 获取用户信息

        public CustomerAndBase GetCustomerAndBase(string id)
        {
            //获取customer表信息
            var customer = _customerRepository.Value.LoadEntities(x => x.Id == id).FirstOrDefault() ?? new Customer();

            var customerinfo = _customerBaseRepository.Value.LoadEntities(x => x.Customer_id == id).FirstOrDefault() ?? new CustomerBase();

            //获取基本信息
            var result = new CustomerAndBase();
            result.Id = customerinfo.Id;
            result.Customer_id = customerinfo.Customer_id;
            result.Real_name = customer.Real_name;
            result.Sex = customer.Sex;
            result.Birthday = customerinfo.Birthday;
            result.Current_location = customerinfo.Current_location;
            result.Family_location = customerinfo.Family_location;
            result.High_school_location = customerinfo.High_school_location;
            result.Current_name = customerinfo.Current_name;
            result.Family_name = customerinfo.Family_name;
            result.High_school_name = customerinfo.High_school_name;
            result.Email = customer.Email;
            result.Policital_status = customerinfo.Policital_status;
            result.Height = customerinfo.Height;
            result.Is_work = customer.Is_work;
            result.Head_icon = customer.Head_icon;
            result.Eval_desc = customerinfo.Eval_desc;
            result.Specialty_desc = customerinfo.Specialty_desc;
            result.Mobile = customer.Mobile;

            return result;
        }

        public CustomerCertificate GetCustomerCertificate(string id)
        {
            return _customerCertificateRepository.Value.LoadEntities(x => x.Id == id).FirstOrDefault() ?? new CustomerCertificate();
        }

        public CustomerEducation GetCustomerEducation(string id)
        {
            return _customerEducationRepository.Value.LoadEntities(x => x.Id == id).FirstOrDefault() ?? new CustomerEducation();
        }

        public CustomerExperience GetCustomerExperience(string id)
        {
            return _customerExperienceRepository.Value.LoadEntities(x => x.Id == id).FirstOrDefault() ?? new CustomerExperience();
        }

        public CustomerIntramuralJob GetCustomerIntramuralJob(string id)
        {
            return _customerIntramuralJobRepository.Value.LoadEntities(x => x.Id == id).FirstOrDefault() ?? new CustomerIntramuralJob();
        }

        public CustomerIntramuralReward GetCustomerIntramuralReward(string id)
        {
            return _customerIntramuralRewardRepository.Value.LoadEntities(x => x.Id == id).FirstOrDefault() ?? new CustomerIntramuralReward();
        }

        public CustomerItSkill GetCustomerItSkill(string id)
        {
            return _customerItSkillRepository.Value.LoadEntities(x => x.Id == id).FirstOrDefault() ?? new CustomerItSkill();
        }

        public CustomerLanguage GetCustomerLanguage(string id)
        {
            return _customerLanguageRepository.Value.LoadEntities(x => x.Id == id).FirstOrDefault() ?? new CustomerLanguage();
        }

        public CustomerProject GetCustomerProject(string id)
        {
            return _customerProjectRepository.Value.LoadEntities(x => x.Id == id).FirstOrDefault() ?? new CustomerProject();
        }



        public List<CustomerCertificate> GetCustomerCertificateList(string customer_id)
        {
            return _customerCertificateRepository.Value.LoadEntities(x => x.Customer_id == customer_id && x.State == 1).ToList();
        }

        public List<CustomerEducation> GetCustomerEducationList(string customer_id)
        {
            var result = _customerEducationRepository.Value.LoadEntities(x => x.Customer_id == customer_id && x.State == 1).ToList();
            result.ForEach(x =>
            {
                x.Class_rank = !string.IsNullOrWhiteSpace(x.Class_rank) ? _sysDictionaryRepository.Value.LoadEntities(y => y.State == 1 && y.Dic_key.ToString() == (x.Class_rank ?? "0") && y.Dic_type == "class_bank_type").FirstOrDefault().Dic_value : "";
                x.Degree = !string.IsNullOrWhiteSpace(x.Degree) ? _sysDictionaryRepository.Value.LoadEntities(z => z.State == 1 && z.Dic_key.ToString() == (x.Degree ?? "0") && z.Dic_type == "degree_type").FirstOrDefault().Dic_value : "";
            });
            return result;
        }

        public List<CustomerExperience> GetCustomerExperienceList(string customer_id)
        {
            return _customerExperienceRepository.Value.LoadEntities(x => x.Customer_id == customer_id && x.State == 1).ToList();
        }

        public List<CustomerIntramuralJob> GetCustomerIntramuralJobList(string customer_id)
        {
            return _customerIntramuralJobRepository.Value.LoadEntities(x => x.Customer_id == customer_id && x.State == 1).ToList();
        }

        public List<CustomerIntramuralReward> GetCustomerIntramuralRewardList(string customer_id)
        {
            return _customerIntramuralRewardRepository.Value.LoadEntities(x => x.Customer_id == customer_id && x.State == 1).ToList();
        }

        public List<CustomerItSkill> GetCustomerItSkillList(string customer_id)
        {
            var result = _customerItSkillRepository.Value.LoadEntities(x => x.Customer_id == customer_id && x.State == 1).ToList();
            result.ForEach(x =>
            {
                x.Skill_level = !string.IsNullOrWhiteSpace(x.Skill_level) ? _sysDictionaryRepository.Value.LoadEntities(y => y.State == 1 && y.Dic_key.ToString() == (x.Skill_level ?? "0") && y.Dic_type == "language_type").FirstOrDefault().Dic_value : "";
            });
            return result;
        }

        public List<CustomerLanguage> GetCustomerLanguageList(string customer_id)
        {
            var result = _customerLanguageRepository.Value.LoadEntities(x => x.Customer_id == customer_id && x.State == 1).ToList();

            result.ForEach(x =>
            {
                x.Name = !string.IsNullOrWhiteSpace(x.Name) ? _sysDictionaryRepository.Value.LoadEntities(y => y.State == 1 && y.Dic_key.ToString() == (x.Name ?? "0") && y.Dic_type == "language_type").FirstOrDefault().Dic_value : "";
                x.Hear = !string.IsNullOrWhiteSpace(x.Hear) ? _sysDictionaryRepository.Value.LoadEntities(z => z.State == 1 && z.Dic_key.ToString() == (x.Hear ?? "0") && z.Dic_type == "skill_level_type").FirstOrDefault().Dic_value : "";
                x.Read_write = !string.IsNullOrWhiteSpace(x.Read_write) ? _sysDictionaryRepository.Value.LoadEntities(z => z.State == 1 && z.Dic_key.ToString() == (x.Read_write ?? "0") && z.Dic_type == "skill_level_type").FirstOrDefault().Dic_value : "";
            });
            return result;
        }

        public List<CustomerProject> GetCustomerProjectList(string customer_id)
        {
            return _customerProjectRepository.Value.LoadEntities(x => x.Customer_id == customer_id && x.State == 1).ToList();
        }


        #endregion


        #region 创建/更新用户信息

        public bool UpdateAvator(string id, string head_icon)
        {
            return _customerDAL.UpdateAvator(id, head_icon);
        }

        public bool UpdateWorkState(string id, bool is_work)
        {
            return _customerDAL.UpdateWorkState(id, is_work);
        }

        public string CreateOrUpdateCustomerAndBase(CustomerAndBase entity)
        {
            if (entity.Id == null || entity.Id == "")
            {
                entity.Id = Guid.NewGuid().ToString();
                CustomerBase baseCustomer = new CustomerBase()
                {
                    Id = entity.Id,
                    Customer_id = entity.Customer_id,
                    Birthday = entity.Birthday,
                    Current_name = entity.Current_name,
                    Current_location = entity.Current_location,
                    Family_name = entity.Family_name,
                    Family_location = entity.Family_location,
                    High_school_location = entity.High_school_location,
                    High_school_name = entity.High_school_name,
                    Policital_status = entity.Policital_status,
                    Height = entity.Height,
                    Specialty_desc = entity.Specialty_desc,
                    Eval_desc = entity.Eval_desc,
                    State = 1,
                    Create_id = entity.Create_id,
                    Create_at = DateTime.Now,
                    Update_id = entity.Update_id,
                    Update_at = DateTime.Now
                };
                _customerBaseRepository.Value.AddEntity(baseCustomer);
            }

            _customerDAL.UpdateCustomerAndBase(entity);
            return entity.Id;

        }

        public string CreateOrUpdateCustomerCertificate(CustomerCertificate entity)
        {
            if (entity.Id == null || entity.Id == "")
            {
                entity.Id = Guid.NewGuid().ToString();
                _customerCertificateRepository.Value.AddEntity(entity);
            }
            else
            {
                _customerDAL.UpdateCustomerCertificate(entity);
            }
            return entity.Id;
        }

        public string CreateOrUpdateCustomerEducation(CustomerEducation entity)
        {
            if (entity.Id == null || entity.Id == "")
            {
                entity.Id = Guid.NewGuid().ToString();
                _customerEducationRepository.Value.AddEntity(entity);
            }
            else
            {
                _customerDAL.UpdateCustomerEducation(entity);
            }
            return entity.Id;
        }

        public string CreateOrUpdateCustomerExperience(CustomerExperience entity)
        {
            if (entity.Id == null || entity.Id == "")
            {
                entity.Id = Guid.NewGuid().ToString();
                _customerExperienceRepository.Value.AddEntity(entity);
            }
            else
            {
                _customerDAL.UpdateCustomerExperience(entity);
            }
            return entity.Id;
        }

        public string CreateOrUpdateCustomerIntramuralJob(CustomerIntramuralJob entity)
        {
            if (entity.Id == null || entity.Id == "")
            {
                entity.Id = Guid.NewGuid().ToString();
                _customerIntramuralJobRepository.Value.AddEntity(entity);
            }
            else
            {
                _customerDAL.UpdateCustomerIntramuralJob(entity);
            }
            return entity.Id;
        }

        public string CreateOrUpdateCustomerIntramuralReward(CustomerIntramuralReward entity)
        {
            if (entity.Id == null || entity.Id == "")
            {
                entity.Id = Guid.NewGuid().ToString();
                _customerIntramuralRewardRepository.Value.AddEntity(entity);
            }
            else
            {
                _customerDAL.UpdateCustomerIntramuralReward(entity);
            }
            return entity.Id;
        }

        public string CreateOrUpdateCustomerItSkill(CustomerItSkill entity)
        {
            if (entity.Id == null || entity.Id == "")
            {
                entity.Id = Guid.NewGuid().ToString();
                _customerItSkillRepository.Value.AddEntity(entity);
            }
            else
            {
                _customerDAL.UpdateCustomerItSkill(entity);
            }
            return entity.Id;
        }

        public string CreateOrUpdateCustomerLanguage(CustomerLanguage entity)
        {
            if (entity.Id == null || entity.Id == "")
            {
                entity.Id = Guid.NewGuid().ToString();
                _customerLanguageRepository.Value.AddEntity(entity);
            }
            else
            {
                _customerDAL.UpdateCustomerLanguage(entity);
            }
            return entity.Id;
        }

        public string CreateOrUpdateCustomerProject(CustomerProject entity)
        {
            if (entity.Id == null || entity.Id == "")
            {
                entity.Id = Guid.NewGuid().ToString();
                _customerProjectRepository.Value.AddEntity(entity);
            }
            else
            {
                _customerDAL.UpdateCustomerProject(entity);
            }
            return entity.Id;
        }

        public string UpdateCustomerSpecialty(string id, string customer_id, string specialty_desc)
        {
            if (id == null || id == "")
            {
                id = Guid.NewGuid().ToString();
                CustomerBase baseCustomer = new CustomerBase()
                {
                    Id = id,
                    Customer_id = customer_id,
                    Specialty_desc = specialty_desc,
                    State = 1,
                    Create_id = customer_id,
                    Create_at = DateTime.Now,
                    Update_id = customer_id,
                    Update_at = DateTime.Now
                };
                _customerBaseRepository.Value.AddEntity(baseCustomer);
            }
            else
            {
                _customerDAL.UpdateCustomerSpecialty(id, specialty_desc);
            }
            return id;
        }

        public string UpdateCustomerEval(string id, string customer_id, string eval_desc)
        {
            if (id == null || id == "")
            {

                id = Guid.NewGuid().ToString();
                CustomerBase baseCustomer = new CustomerBase()
                {
                    Id = id,
                    Customer_id = customer_id,
                    Eval_desc = eval_desc,
                    State = 1,
                    Create_id = customer_id,
                    Create_at = DateTime.Now,
                    Update_id = customer_id,
                    Update_at = DateTime.Now
                };
                _customerBaseRepository.Value.AddEntity(baseCustomer);
            }
            else
            {
                _customerDAL.UpdateCustomerEval(id, eval_desc);
            }
            return id;
        }

        #endregion

        #region 删除


        public bool DeleteCustomerCertificate(string id)
        {
            return _customerDAL.DeleteCustomerCertificate(id);
        }

        public bool DeleteCustomerEducation(string id)
        {
            return _customerDAL.DeleteCustomerEducation(id);
        }

        public bool DeleteCustomerExperience(string id)
        {
            return _customerDAL.DeleteCustomerExperience(id);
        }

        public bool DeleteCustomerIntramuralJob(string id)
        {
            return _customerDAL.DeleteCustomerIntramuralJob(id);
        }

        public bool DeleteCustomerIntramuralReward(string id)
        {
            return _customerDAL.DeleteCustomerIntramuralReward(id);
        }

        public bool DeleteCustomerItSkill(string id)
        {
            return _customerDAL.DeleteCustomerItSkill(id);
        }

        public bool DeleteCustomerLanguage(string id)
        {
            return _customerDAL.DeleteCustomerLanguage(id);
        }

        public bool DeleteCustomerProject(string id)
        {
            return _customerDAL.DeleteCustomerProject(id);
        }


        public bool ChangePassword(string id, string password, string password_salt)
        {
            return _customerDAL.ChangePassword(id, password, password_salt);
        }

        #endregion
    }
}
