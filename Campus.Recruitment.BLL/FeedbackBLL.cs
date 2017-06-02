using Campus.Recruitment.IBLL.Home;
using Campus.Recruitment.IDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.Entities;
using Campus.Recruitment.DAL;

namespace Campus.Recruitment.BLL
{
    public class FeedbackBLL : IFeedbackBLL
    {
        private IBaseRepository<Feedback> _feedbackRepository;

        public FeedbackBLL() {
            _feedbackRepository = new BaseRepository<Feedback>();
        }

        public Feedback CreateFeedback(Feedback entity)
        {
            return this._feedbackRepository.AddEntity(entity);
        }

        public List<Feedback> FeedbackList(int pageSize, int pageIndex, out int total)
        {
            return this._feedbackRepository.LoadPageEntities<Feedback>(null, null, 10, 1, out total, true).ToList();
        }
    }
}
