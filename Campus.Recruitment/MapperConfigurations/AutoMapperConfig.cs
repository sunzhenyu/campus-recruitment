using AutoMapper;
using Campus.Recruitment.Entities;
using Campus.Recruitment.Entities.Condition;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Campus.Recruitment.MapperConfigurations
{
    public class AutoMapperConfig
    {
        public static void Config() {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<CustomerCondition, Customer>()
                    .ForMember(x => x.Real_name,y => y.MapFrom(z=>z.UserName))
                    .ForMember(x=> x.University,y=>y.MapFrom(z=>z.School))
                    .ForMember(x=>x.Education,y=>y.MapFrom(z=>z.Deg))
                    .ForMember(x=>x.Attend_begin_date,y=>y.MapFrom(z=>z.StartDateName))
                    .ForMember(x=>x.Attend_end_date,y=>y.MapFrom(z=>z.EndDateName))
                    .ForMember(x=>x.Intentional_city,y=>y.MapFrom(z=>z.JCtity))
                    .ForMember(x => x.Intentional_city_name, y => y.MapFrom(z => z.City));
            });
        }
    }
}