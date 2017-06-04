using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.Entities.Entity.Customers;

namespace Campus.Recruitment.Entities.Entity
{
    public class ResumeAndApllyDetail
    {
        public CustomerAll CustomerAll { get; set; } = new CustomerAll();

        public SearchPosition SearchPosition { get; set; } = new SearchPosition();
    }
}
