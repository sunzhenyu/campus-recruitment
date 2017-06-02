using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Campus.Recruitment.Enterprise.Startup))]
namespace Campus.Recruitment.Enterprise
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
