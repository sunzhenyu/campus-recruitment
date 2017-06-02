using Autofac.Integration.Mvc;
using Campus.Recruitment.MapperConfigurations;
using System;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Campus.Recruitment
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

        protected void Application_Error(Object sender, EventArgs e)
        {
            //Exception lastError = Server.GetLastError();
            //if (lastError != null)
            //{
            //    Response.StatusCode = 500;
            //    Response.WriteFile("error.html");
            //    Server.ClearError();
            //}
        }

        protected void Application_EndRequest()
        {
            //var statusCode = Context.Response.StatusCode;
            //var routingData = Context.Request.RequestContext.RouteData;
            //if (statusCode == 404 || statusCode == 500 || routingData.Route == null)
            //{
            //    Response.Clear();
            //    Response.WriteFile("error.html");
            //    Server.ClearError();
            //}
        }
    }
}
