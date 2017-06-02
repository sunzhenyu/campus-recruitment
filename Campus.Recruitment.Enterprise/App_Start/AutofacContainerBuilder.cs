using Autofac;
using Autofac.Integration.Mvc;
using System.Reflection;

namespace Campus.Recruitment.Enterprise
{
    public class AutofacContainerBuilder
    {
        public static IContainer BuildContainer()
        {
            var builder = new ContainerBuilder();

            //注册所有控制器，也可以添加过滤条件
            builder.RegisterControllers(Assembly.GetExecutingAssembly()).Where(t => t.Name.EndsWith("Controller"));
            
            #region DAL程序集注册

            var assembly = Assembly.Load("Campus.Recruitment.DAL");
            builder.RegisterAssemblyTypes(assembly).AsImplementedInterfaces();

            #endregion

            #region BLL程序集注册

            var ResourceDataAssembly = Assembly.Load("Campus.Recruitment.BLL");
            builder.RegisterAssemblyTypes(ResourceDataAssembly).AsImplementedInterfaces();

            #endregion
            

            var container = builder.Build();
            DIContainer.RegisterContainer(container);

            return container;
        }
    }
}