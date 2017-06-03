using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Campus.Recruitment.Entities;
using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity;

namespace Campus.Recruitment.IBLL
{
    public interface IResumeBLL
    {
        /// <summary>
        /// 获取简历翻页数据
        /// </summary>
        /// <param name="state"></param>
        /// <returns></returns>
        PageList<List<ResumeManage>> GetPage(ResumeManageCondition condition);


        /// <summary>
        /// 获取简历翻页数据-邀请简历
        /// </summary>
        /// <param name="state"></param>
        /// <returns></returns>
        PageList<List<ResumeManage>> GetPageInvitation (ResumeManageCondition condition);

        /// <summary>
        /// 获取简历数量
        /// </summary>
        /// <param name="enterprise_id"></param>
        /// <returns></returns>
        int ResumeTotal(string enterprise_id);

        /// <summary>
        /// 获取邀请简历数量
        /// </summary>
        /// <param name="enterprise_id"></param>
        /// <returns></returns>
        int InvitationTotal(string enterprise_id);

        /// <summary>
        /// 获取通知面试模板信息
        /// </summary>
        /// <param name="position_apply_id"></param>
        /// <returns></returns>
        NotificationInterview GetPositionInvitation(string position_apply_id);
    }
}
