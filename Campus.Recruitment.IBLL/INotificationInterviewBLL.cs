using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.Entities.Entity;

namespace Campus.Recruitment.IBLL
{
    /// <summary>
    /// 通知面试
    /// </summary>
    public interface INotificationInterviewBLL
    {
        /// <summary>
        /// 创建
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        string Create(NotificationInterview entity);

        /// <summary>
        /// 获取面试通知信息
        /// </summary>
        /// <param name="customer_id"></param>
        /// <param name="position_id"></param>
        /// <returns></returns>
        NotificationInterview GetEntity(string customer_id,string position_id);

    }
}
