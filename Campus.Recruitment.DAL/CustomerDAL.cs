using Campus.Recruitment.IDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.Entities;
using KeChong.Framework.Data.Command;
using Campus.Recruitment.Entities.Entity.Customers;

namespace Campus.Recruitment.DAL
{
    public class CustomerDAL : ICustomerDAL
    {
        public bool RegisterTwoUpdate(Customer entity)
        {
            var cmd = DataCommandManager.GetCommand("Account.RegisterTwoUpdate");

            cmd.SetParameterValue("@real_name",entity.Real_name);
            cmd.SetParameterValue("@sex",entity.Sex);
            cmd.SetParameterValue("@university",entity.University);
            cmd.SetParameterValue("@education",entity.Education);
            cmd.SetParameterValue("@major",entity.Major);
            cmd.SetParameterValue("@attend_begin_date",entity.Attend_begin_date);
            cmd.SetParameterValue("@attend_end_date",entity.Attend_end_date);
            cmd.SetParameterValue("@intentional_city",entity.Intentional_city);
            cmd.SetParameterValue("@email",entity.Email);
            cmd.SetParameterValue("@update_id",entity.Update_id);
            cmd.SetParameterValue("@id",entity.Id);

            return cmd.Execute() > 0;
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="id"></param>
        /// <param name="password"></param>
        /// <param name="password_salt"></param>
        /// <returns></returns>
        public bool ChangePassword(string id, string password, string password_salt)
        {
            var cmd = DataCommandManager.GetCommand("Account.ChangePassword");

            cmd.SetParameterValue("@password", password);
            cmd.SetParameterValue("@password_salt", password_salt);
            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        public bool UpdateAvator(string id, string head_icon)
        {
            var cmd = DataCommandManager.GetCommand("Customer.UpdateAvator");

            cmd.SetParameterValue("@head_icon", head_icon);
            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        public bool UpdateWorkState(string id, bool is_work)
        {
            var cmd = DataCommandManager.GetCommand("Customer.UpdateWorkState");

            cmd.SetParameterValue("@is_work", is_work ? 1 : 0);
            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        public bool UpdateCustomerAndBase(CustomerAndBase entity)
        {
            var cmd = DataCommandManager.GetCommand("Customer.UpdateCustomerAndBase");

            cmd.SetParameterValue("@email", entity.Email);
            cmd.SetParameterValue("@customer_id", entity.Customer_id);
            cmd.SetParameterValue("@birthday", entity.Birthday);
            cmd.SetParameterValue("@current_location", entity.Current_location);
            cmd.SetParameterValue("@current_name", entity.Current_name);
            cmd.SetParameterValue("@family_location", entity.Family_location);
            cmd.SetParameterValue("@family_name", entity.Family_name);
            cmd.SetParameterValue("@high_school_location", entity.High_school_location);
            cmd.SetParameterValue("@high_school_name", entity.High_school_name);
            cmd.SetParameterValue("@policital_status", entity.Policital_status);
            cmd.SetParameterValue("@height", entity.Height);
            cmd.SetParameterValue("@update_id", entity.Update_id);
            cmd.SetParameterValue("@id", entity.Id);

            return cmd.Execute() > 0;
        }

        public bool UpdateCustomerEducation(CustomerEducation entity)
        {
            var cmd = DataCommandManager.GetCommand("Customer.UpdateCustomerEducation");

            cmd.SetParameterValue("@school_name", entity.School_name);
            cmd.SetParameterValue("@degree", entity.Degree);
            cmd.SetParameterValue("@major", entity.Major);
            cmd.SetParameterValue("@start_edu", entity.Start_edu);
            cmd.SetParameterValue("@end_edu", entity.End_edu);
            cmd.SetParameterValue("@class_rank", entity.Class_rank);
            cmd.SetParameterValue("@is_entrance_examination", entity.Is_entrance_examination);
            cmd.SetParameterValue("@update_id", entity.Update_id);
            cmd.SetParameterValue("@id", entity.Id);

            return cmd.Execute() > 0;
        }

        public bool UpdateCustomerExperience(CustomerExperience entity)
        {
            var cmd = DataCommandManager.GetCommand("Customer.UpdateCustomerExperience");

            cmd.SetParameterValue("@units", entity.Units);
            cmd.SetParameterValue("@units_dept", entity.Units_dept);
            cmd.SetParameterValue("@units_position", entity.Units_position);
            cmd.SetParameterValue("@start_intership", entity.Start_intership);
            cmd.SetParameterValue("@end_intership", entity.End_intership);
            cmd.SetParameterValue("@units_work_desc", entity.Units_work_desc);
            cmd.SetParameterValue("@update_id", entity.Update_id);
            cmd.SetParameterValue("@id", entity.Id);

            return cmd.Execute() > 0;
        }

        public bool UpdateCustomerIntramuralJob(CustomerIntramuralJob entity)
        {
            var cmd = DataCommandManager.GetCommand("Customer.UpdateCustomerIntramuralJob");

            cmd.SetParameterValue("@position_name", entity.Position_name);
            cmd.SetParameterValue("@school_name", entity.School_name);
            cmd.SetParameterValue("@start_campus", entity.Start_campus);
            cmd.SetParameterValue("@end_campus", entity.End_campus);
            cmd.SetParameterValue("@position_desc", entity.Position_desc);
            cmd.SetParameterValue("@update_id", entity.Update_id);
            cmd.SetParameterValue("@id", entity.Id);

            return cmd.Execute() > 0;
        }

        public bool UpdateCustomerIntramuralReward(CustomerIntramuralReward entity)
        {
            var cmd = DataCommandManager.GetCommand("Customer.UpdateCustomerIntramuralReward");

            cmd.SetParameterValue("@scholarship_name", entity.Scholarship_name);
            cmd.SetParameterValue("@reward_school_ext", entity.Reward_school_ext);
            cmd.SetParameterValue("@start_reward", entity.Start_reward);
            cmd.SetParameterValue("@scholarship_desc", entity.Scholarship_desc);
            cmd.SetParameterValue("@update_id", entity.Update_id);
            cmd.SetParameterValue("@id", entity.Id);

            return cmd.Execute() > 0;
        }

        public bool UpdateCustomerItSkill(CustomerItSkill entity)
        {
            var cmd = DataCommandManager.GetCommand("Customer.UpdateCustomerItSkill");

            cmd.SetParameterValue("@skill_name_txt", entity.Skill_name_txt);
            cmd.SetParameterValue("@skill_level", entity.Skill_level);
            cmd.SetParameterValue("@update_id", entity.Update_id);
            cmd.SetParameterValue("@id", entity.Id);

            return cmd.Execute() > 0;
        }

        public bool UpdateCustomerLanguage(CustomerLanguage entity)
        {
            var cmd = DataCommandManager.GetCommand("Customer.UpdateCustomerLanguage");

            cmd.SetParameterValue("@name", entity.Name);
            cmd.SetParameterValue("@hear", entity.Hear);
            cmd.SetParameterValue("@read_write", entity.Read_write);
            cmd.SetParameterValue("@grades", entity.Grades);
            cmd.SetParameterValue("@certifications", entity.Certifications);
            cmd.SetParameterValue("@update_id", entity.Update_id);
            cmd.SetParameterValue("@id", entity.Id);

            return cmd.Execute() > 0;
        }

        public bool UpdateCustomerProject(CustomerProject entity)
        {
            var cmd = DataCommandManager.GetCommand("Customer.UpdateCustomerProject");

            cmd.SetParameterValue("@project_name", entity.Project_name);
            cmd.SetParameterValue("@project_job_name", entity.Project_job_name);
            cmd.SetParameterValue("@start_project", entity.Start_project);
            cmd.SetParameterValue("@end_project", entity.End_project);
            cmd.SetParameterValue("@project_job_desc", entity.Project_job_desc);
            cmd.SetParameterValue("@update_id", entity.Update_id);
            cmd.SetParameterValue("@id", entity.Id);

            return cmd.Execute() > 0;
        }

        public bool UpdateCustomerCertificate(CustomerCertificate entity)
        {
            var cmd = DataCommandManager.GetCommand("Customer.UpdateCustomerCertificate");

            cmd.SetParameterValue("@certificate_parent_name", entity.Certificate_parent_name);
            cmd.SetParameterValue("@certificate_name", entity.Certificate_name);
            cmd.SetParameterValue("@start_certificate", entity.Start_certificate);
            cmd.SetParameterValue("@update_id", entity.Update_id);
            cmd.SetParameterValue("@id", entity.Id);

            return cmd.Execute() > 0;
        }

        public bool UpdateCustomerSpecialty(string id, string specialty_desc)
        {
            var cmd = DataCommandManager.GetCommand("Customer.UpdateCustomerSpecialty");
            
            cmd.SetParameterValue("@specialty_desc", specialty_desc);
            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        public bool UpdateCustomerEval(string id, string eval_desc)
        {
            var cmd = DataCommandManager.GetCommand("Customer.UpdateCustomerEval");
            
            cmd.SetParameterValue("@eval_desc", eval_desc);
            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        #region 删除


        public bool DeleteCustomerCertificate(string id)
        {
            var cmd = DataCommandManager.GetCommand("Customer.DeleteCustomerCertificate");
            
            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        public bool DeleteCustomerEducation(string id)
        {
            var cmd = DataCommandManager.GetCommand("Customer.DeleteCustomerEducation");

            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        public bool DeleteCustomerExperience(string id)
        {
            var cmd = DataCommandManager.GetCommand("Customer.DeleteCustomerExperience");

            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        public bool DeleteCustomerIntramuralJob(string id)
        {
            var cmd = DataCommandManager.GetCommand("Customer.DeleteCustomerIntramuralJob");

            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        public bool DeleteCustomerIntramuralReward(string id)
        {
            var cmd = DataCommandManager.GetCommand("Customer.DeleteCustomerIntramuralReward");

            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        public bool DeleteCustomerItSkill(string id)
        {
            var cmd = DataCommandManager.GetCommand("Customer.DeleteCustomerItSkill");

            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        public bool DeleteCustomerLanguage(string id)
        {
            var cmd = DataCommandManager.GetCommand("Customer.DeleteCustomerLanguage");

            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        public bool DeleteCustomerProject(string id)
        {
            var cmd = DataCommandManager.GetCommand("Customer.DeleteCustomerProject");

            cmd.SetParameterValue("@id", id);

            return cmd.Execute() > 0;
        }

        #endregion
    }
}
