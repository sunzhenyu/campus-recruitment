using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;

namespace Campus.Recruitment.IDAL
{
    public interface IDbSession
    {
        //保存所有变化
        int SaveChanges();

        //执行sql语句
        int ExeucteSql(string sql, params SqlParameter[] paras);

        List<object> QuerySql(string sql, params SqlParameter[] paras);
    }
}
