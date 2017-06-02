using System.Data.Entity;
using System.Runtime.Remoting.Messaging;
using Campus.Recruitment.IDAL;

namespace Campus.Recruitment.DAL
{
    public class DbContextFactory : IDbContextFactory
    {
        /// <summary>
        /// 获取当前EF上下文的唯一实例
        /// </summary>
        /// <returns></returns>
        public DbContext GetCurrentThreadInstance()
        {
            DbContext obj = CallContext.GetData(typeof(EFDbContext).FullName) as DbContext;
            if (obj == null)
            {
                obj = new EFDbContext();
                CallContext.SetData(typeof(EFDbContext).FullName, obj);
            }
            return obj;
        }
    }
}
