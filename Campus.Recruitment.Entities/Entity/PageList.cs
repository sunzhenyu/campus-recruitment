using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Entity
{
    public class PageList<T> where T : new()
    {
        public int PageIndex { get; set; } = 0;

        public int PageSize { get; set; } = 10;

        public int PageCount
        {
            get
            {
                return (int)Math.Ceiling((decimal)(Total / PageSize));
            }
        }

        public int Total { get; set; } = 0;

        public T Data { get; set; } = new T();
    }
}
