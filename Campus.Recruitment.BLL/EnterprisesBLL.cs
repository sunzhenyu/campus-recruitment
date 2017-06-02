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

namespace Campus.Recruitment.BLL
{
    public class EnterprisesBLL : IEnterprisesBLL
    {
        private Lazy<IBaseRepository<Enterprises>> _enterprisesRepository;
        private readonly IEnterprisesDAL _enterprisesDal;
        private Lazy<IBaseRepository<SysDictionary>> _sysDictionaryRepository;

        public EnterprisesBLL(IEnterprisesDAL enterprisesDal)
        {
            _enterprisesDal = enterprisesDal;
            _enterprisesRepository = new Lazy<IBaseRepository<Enterprises>>(() => new BaseRepository<Enterprises>());
            _sysDictionaryRepository = new Lazy<IBaseRepository<SysDictionary>>(() => new BaseRepository<SysDictionary>());
        }

        public string CreateAccount(Enterprises entity)
        {
            entity.Id = Guid.NewGuid().ToString();
            entity.Create_id = entity.Id;
            entity.Update_id = entity.Id;
            entity.State = 0;
            _enterprisesRepository.Value.AddEntity(entity);
            return entity.Id;
        }

        public Enterprises GetEntity(string account_name)
        {
            return _enterprisesRepository.Value.LoadEntities(x => x.Account_name == account_name && x.State == 1).FirstOrDefault() ?? new Enterprises();
        }

        public bool IsExistAccount(string account_name)
        {
            return _enterprisesRepository.Value.Count(x => x.State == 1 && x.Account_name == account_name) > 0;
        }

        public bool UpdateAccount(Enterprises entity)
        {
            return _enterprisesDal.UpdateEnterprises(entity);
        }

        public bool IsExistEnterpriseName(string enterprise_name)
        {
            return _enterprisesRepository.Value.Count(x => x.State == 1 && x.Name == enterprise_name) > 0;
        }

        public bool AccountSetting(AccountSettingCondition condition)
        {
            return _enterprisesDal.AccountSetting(condition);
        }

        
        public bool ChangePassword(string id, string password, string password_salt)
        {
            return _enterprisesDal.ChangePassword(id, password, password_salt);
        }

        public bool ChangeEnterpriseLogo(string id, string icon_logo)
        {
            var entity = _enterprisesRepository.Value.LoadEntities(x => x.Id == id).FirstOrDefault() ?? new Enterprises();
            entity.Icon_logo = icon_logo;

            _enterprisesRepository.Value.UpdateEntity(entity);
            return true;
        }

        public Enterprises GetEntityById(string id)
        {
            var result = _enterprisesRepository.Value.LoadEntities(x => x.Id == id && x.State == 1).FirstOrDefault() ?? new Enterprises();
            var scale = !string.IsNullOrWhiteSpace(result.Scale)
                ? _sysDictionaryRepository.Value.LoadEntities(x => x.State == 1 && x.Dic_key.ToString() == (result.Scale ?? "0") && x.Dic_type == "scale_type").FirstOrDefault().Dic_value : "";

            var mode =  !string.IsNullOrWhiteSpace(result.Mode)
                ? _sysDictionaryRepository.Value.LoadEntities(x => x.State == 1 && x.Dic_key.ToString() == (result.Mode ?? "0") && x.Dic_type == "mode_type").FirstOrDefault().Dic_value : "";



            return result;
        }
    }
}
