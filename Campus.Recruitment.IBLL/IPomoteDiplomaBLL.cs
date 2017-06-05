using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity;

namespace Campus.Recruitment.IBLL
{
    public interface IPomoteDiplomaBLL
    {
        string Create(PromoteDiploma entity);

        PromoteDiploma GetPromoteDiploma(string user_id);

        string Update(PromoteDiploma entity);

        string UpdateState(PromoteDiploma entity);

        PageList<List<PromoteDiplomaAndCustomer>> GetPage(PomoteDiplomaCondition condition);
    }
}
