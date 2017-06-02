using Campus.Recruitment.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.IBLL.Home
{
    /// <summary>
    /// 意见反馈
    /// </summary>
    public interface IFeedbackBLL
    {
        /// <summary>
        /// 创建
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Feedback CreateFeedback(Feedback entity);

        List<Feedback> FeedbackList(int pageSize, int pageIndex, out int total);
    }
}
