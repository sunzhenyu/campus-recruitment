using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Campus.Recruitment.Startup))]
namespace Campus.Recruitment
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
