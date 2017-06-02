using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;

namespace Campus.Recruitment.IDAL
{
    public interface IDbContextFactory
    {
        //获取当前上下文的唯一实例
        DbContext GetCurrentThreadInstance();
    }
}
