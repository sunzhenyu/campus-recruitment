using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.IDAL
{
    public interface IEnterprisesDAL
    {
        bool UpdateEnterprises(Enterprises entity);

        bool AccountSetting(AccountSettingCondition condition);


        bool ChangePassword(string id,string password,string password_salt);
    }
}
