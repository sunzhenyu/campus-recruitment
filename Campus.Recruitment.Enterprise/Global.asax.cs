using Autofac.Integration.Mvc;
using Campus.Recruitment.Enterprise.MapperConfigurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Campus.Recruitment.Enterprise
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);


            //autofac容器注入
            var container = AutofacContainerBuilder.BuildContainer();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            //autoMapper注册
            AutoMapperConfig.Config();
        }
    }
}
