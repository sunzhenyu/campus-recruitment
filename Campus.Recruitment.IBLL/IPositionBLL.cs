using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.IBLL
{
    public interface IPositionBLL
    {
        string CreatePosition(Position entity);

        string UpdatePosition(Position entity);

        PageList<List<Position>> GetPage(PositionPageCondition condition);

        bool UpdateState(string id, int state);
        
        bool RefreshPosition(string id);

        Position GetEntity(string id);

        PageList<List<SearchPosition>> GetPageBySearch(SearchPositionCondition condition);

        PageList<List<SearchPosition>> GetPageByCollect(string user_id, int pageIndex, int pageSize);

        PageList<List<SearchPosition>> GetPageByApply(string user_id, int pageIndex, int pageSize);
    }
}
