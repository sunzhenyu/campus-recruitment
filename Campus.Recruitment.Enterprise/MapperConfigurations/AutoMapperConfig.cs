using AutoMapper;
using Campus.Recruitment.Entities;
using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Campus.Recruitment.Enterprise.MapperConfigurations
{
    public class AutoMapperConfig
    {
        public static void Config() {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<PositionCondition, Position>()
                    .ForMember(x => x.Name,y => y.MapFrom(z=>z.Position))
                    .ForMember(x => x.Degree_ids, y => y.MapFrom(z => z.DegreeIds))
                    .ForMember(x => x.Degree_names, y => y.MapFrom(z => z.DegreeNames))
                    .ForMember(x => x.Major_name, y => y.MapFrom(z => z.MajorName))
                    .ForMember(x => x.Major_ids, y => y.MapFrom(z => z.MajorIds))
                    .ForMember(x => x.School_city_names, y => y.MapFrom(z => z.SchoolCityNames))
                    .ForMember(x => x.School_city_ids, y => y.MapFrom(z => z.SchoolCityIds))
                    .ForMember(x => x.School_level_name, y => y.MapFrom(z => z.SchoolLevelNames))
                    .ForMember(x => x.School_level_ids, y => y.MapFrom(z => z.SchoolLevelIds))
                    .ForMember(x => x.Position_type, y => y.MapFrom(z => z.PositionType))
                    .ForMember(x => x.Function_names, y => y.MapFrom(z => z.FunctionNames))
                    .ForMember(x => x.Function_ids, y => y.MapFrom(z => z.FunctionIds))
                    .ForMember(x => x.City_names, y => y.MapFrom(z => z.CityNames))
                    .ForMember(x => x.City_ids, y => y.MapFrom(z => z.CityIds))
                    .ForMember(x => x.Recruit_count, y => y.MapFrom(z => z.RecruitCount))
                    .ForMember(x => x.Intern_length, y => y.MapFrom(z => z.InternLength))
                    .ForMember(x => x.Intern_days, y => y.MapFrom(z => z.InternDays))
                    .ForMember(x => x.Intern_salary_type, y => y.MapFrom(z => z.InternSalaryType))
                    .ForMember(x => x.Intern_salary_min, y => y.MapFrom(z => z.InternSalaryMin))
                    .ForMember(x => x.Intern_salary_max, y => y.MapFrom(z => z.InternSalaryMax))
                    .ForMember(x => x.Daily_salary, y => y.MapFrom(z => z.DailySalary))
                    .ForMember(x => x.Hour_salary, y => y.MapFrom(z => z.HourSalay))
                    .ForMember(x => x.Salary_min, y => y.MapFrom(z => z.SalaryMin))
                    .ForMember(x => x.Salary_max, y => y.MapFrom(z => z.SalaryMax))
                    .ForMember(x => x.Pos_description, y => y.MapFrom(z => z.PosDescription))
                    .ForMember(x => x.Industry_name, y => y.MapFrom(z => z.IndustryName))
                    .ForMember(x => x.Industry_id, y => y.MapFrom(z => z.IndustryId));

                cfg.CreateMap<EnterpriseCondition, Enterprises>()
                    .ForMember(x => x.Account_name, y => y.MapFrom(z => z.AccountName))
                    .ForMember(x => x.Show_industry, y => y.MapFrom(z => z.showIndustry))
                    .ForMember(x => x.Show_city, y => y.MapFrom(z => z.showCity))
                    .ForMember(x => x.Web_site, y => y.MapFrom(z => z.WebSite))
                    .ForMember(x => x.Contact_man, y => y.MapFrom(z => z.ContactMan))
                    .ForMember(x => x.Contact_area_code, y => y.MapFrom(z => z.ContactAreaCode))
                    .ForMember(x => x.Contact_telephone, y => y.MapFrom(z => z.ContactTelephone))
                    .ForMember(x => x.Contact_ext, y => y.MapFrom(z => z.ContactExt))
                    .ForMember(x => x.Contact_mobile, y => y.MapFrom(z => z.ContactMobile));

            });
            
        }
}
}