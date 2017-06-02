using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using Campus.Recruitment.IDAL;

namespace Campus.Recruitment.DAL
{
    public class DbSession : IDbSession
    {
        public int SaveChanges()
        {
            IDbContextFactory dbFactory = new DbContextFactory();
            DbContext db = dbFactory.GetCurrentThreadInstance();
            return db.SaveChanges();
        }

        public int ExeucteSql(string sql, params System.Data.SqlClient.SqlParameter[] paras)
        {
            IDbContextFactory dbFactory = new DbContextFactory();
            DbContext db = dbFactory.GetCurrentThreadInstance();
            return db.Database.ExecuteSqlCommand(sql, paras);
        }



        public List<object> QuerySql(string sql, params System.Data.SqlClient.SqlParameter[] paras)
        {
            IDbContextFactory dbFactory = new DbContextFactory();
            DbContext db = dbFactory.GetCurrentThreadInstance();
            return db.Database.SqlQuery<object>(sql, paras).ToList();
        }
    }
}
