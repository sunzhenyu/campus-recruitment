using Campus.Recruitment.IDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.Entities.Entity;
using KeChong.Framework.Data.Command;
using Campus.Recruitment.Entities.Condition;

namespace Campus.Recruitment.DAL
{
    public class EnterprisesDAL : IEnterprisesDAL
    {
        public bool AccountSetting(AccountSettingCondition condition)
        {
            var cmd = DataCommandManager.GetCommand("Enterprise.AccountSetting");

            cmd.SetParameterValue("@email", condition.ContactEmail);
            cmd.SetParameterValue("@contact_man", condition.ContactMan);
            cmd.SetParameterValue("@contact_area_code", condition.ContactAreaCode);
            cmd.SetParameterValue("@contact_telephone", condition.ContactTelephone);
            cmd.SetParameterValue("@contact_ext", condition.ContactExt);
            cmd.SetParameterValue("@contact_mobile", condition.ContactMobile);
            cmd.SetParameterValue("@update_id", condition.UpdateId);
            cmd.SetParameterValue("@id", condition.Id);

            return cmd.Execute() > 0;
        }

        public bool ChangePassword(string id, string password, string password_salt)
        {
            var cmd = DataCommandManager.GetCommand("Enterprise.AccountSetting");

            cmd.SetParameterValue("@password", password);
            cmd.SetParameterValue("@password_salt", password_salt);
            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        public bool UpdateEnterprises(Enterprises entity)
        {
            var cmd = DataCommandManager.GetCommand("Enterprise.RegisterTwoUpdate");

            cmd.SetParameterValue("@name", entity.Name);
            cmd.SetParameterValue("@address", entity.Address);
            cmd.SetParameterValue("@icon_logo", entity.Icon_logo);
            cmd.SetParameterValue("@show_industry", entity.Show_industry);
            cmd.SetParameterValue("@scale", entity.Scale);
            cmd.SetParameterValue("@mode", entity.Mode);
            cmd.SetParameterValue("@show_city", entity.Show_city);
            cmd.SetParameterValue("@city", entity.City);
            cmd.SetParameterValue("@web_site", entity.Web_site);
            cmd.SetParameterValue("@contact_man", entity.Contact_man);
            cmd.SetParameterValue("@contact_area_code", entity.Contact_area_code);
            cmd.SetParameterValue("@contact_telephone", entity.Contact_telephone);
            cmd.SetParameterValue("@contact_ext", entity.Contact_ext);
            cmd.SetParameterValue("@contact_mobile", entity.Contact_mobile);
            cmd.SetParameterValue("@update_id", entity.Update_id);
            cmd.SetParameterValue("@id", entity.Id);

            return cmd.Execute() > 0;
        }
    }
}
