using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Campus.Recruitment.IDAL
{
    public interface IDbSessionFactory
    {
        IDbSession GetCurrentDbSession();
    }
}
