var jQuery = $;
(function ($) {
    $.fn.extend({
        //resumeViewer||view the resume
        resumeViewer: function (options) {
            //build main options before element iteration    
            var defaults = {
                //default applyId||recommend or apply
                ispush: 0,
                //default ajax data
                data: {      
                    status: 0
                }
            };
            //extend defaults
            $.extend(defaults, options);
            //iterate and reformat each matched element 
            return this.each(function () {
                //全局模块渲染参数
                var _this = $(this),_wt;
                //mask init
                init();
                function init() {     
                    //events listener
                    bindEvent();
                }
                //is apply or push 
                if (!defaults.ispush) {
                    _this.baseInfo = $('<div id="g-container">'
                                        //简历投递信息
                                        + '<div class="resume-section-head" data-id=' + defaults.data.stuResumeData.ApplyId +'>'
                                            + '<ul>'
                                                + '<li class="head-part1">当前简历：' + defaults.data.stuResumeData.Resume.UserName + '</li>'
                                                + '<li class="head-part2">应聘职位：' + defaults.data.stuResumeData.PositionName + '</li>'
                                                + '<li class="head-part3">投递时间：' + defaults.data.stuResumeData.ApplyTime + '</li>'
                                                //+ '<li class="head-part4">'
                                                //    + '<div class="part4-left"></div>'
                                                //    + '<div class="part4-close"></div>'
                                                //    + '<div class="part4-right"></div>'
                                                //+ '</li>'
                                            + '</ul>'
                                        + '</div>'
                                        + '<div class="resume-section-content">'
                                            + '<div class="content-left">'
                                                //基本信息
                                                + '<div class="content-left-head">'
                                                    + '<div class="left-head-title">'
                                                        + '<span class="title-name">' + defaults.data.stuResumeData.Resume.UserName + '</span>'
                                                        + '<span class="title-other">' + defaults.data.stuResumeData.Resume.Basic.GenderName + ' ' + defaults.data.stuResumeData.Resume.Basic.Age + '</span>'
                                                        + IsFilterOut(defaults.data.stuResumeData.IsFilterOut, defaults.data.stuResumeData.FilterOutReasons)
                                                        + '</div>'
                                                    + '<div class="left-head-content">'
                                                        + '<div class="content-photo"><img src="' + defaults.data.stuResumeData.Resume.UserAvatar + '" alt="photo"/></div>'
                                                        + '<div class="content-list">'
                                                            + '<ul>'
                                                                + '<li class="content-part"><span class="list-label">现居住地：</span>' + defaults.data.stuResumeData.Resume.Basic.CurrentLocationName + '</li>'
                                                                + '<li class="content-part"><span class="list-label">政治面貌：</span>' + isOrNull(defaults.data.stuResumeData.Resume.Basic.PolicitalStatusName) + '</li>'
                                                                + '<li class="content-part"><span class="list-label">户口地：</span>' + defaults.data.stuResumeData.Resume.Basic.FamilyLocationName + '</li>'
                                                                + '<li class="content-part"><span class="list-label">身高：</span>' + isOrNull(defaults.data.stuResumeData.Resume.Basic.Height, 1) + '</li>'
                                                                + '<li class="content-part"><span class="list-label">生源地：</span>' + isOrNull(defaults.data.stuResumeData.Resume.Basic.HighSchoolLocationName) + '</li>'
                                                                //+ '<li class="content-part"><span class="list-label">星座：</span>' + isOrNull(defaults.data.stuResumeData.Resume.Basic.Horoscope) + '</li>'
                                                                + '<li class="content-part"><span class="list-label">手机：</span><span class="u-mobile">' + isVisibleContact(defaults.data.stuResumeData.IsShowStuContact).mobile + isShowMobile() + '</span></li>'
                                                                + '<li class="content-part"><span class="list-label">职业锚类型：</span>' + isOrNull(defaults.data.assessmentResult.ResultType, 2, defaults.data.assessmentResult) + '</li>'
                                                                + '<li class="content-part"><span class="list-label">邮箱：</span><span class="u-email">' + isVisibleContact(defaults.data.stuResumeData.IsShowStuContact).email + '</span></li>'
                                                            + '</ul>'
                                                        + '</div>'
                                                        //视频简历
                                                    + '</div>'
                                                + '</div>'
                                                //感兴趣提示栏
                                                //详细信息
                                            + '</div>'
                                        + '</div>'
                                    + '</div>');

                    _this.isVideo = $('<div id="video">'
                                        + '<button type="button" class="u-btn-video">视频简历</button>'
                                    + '</div>');
                    //基础信息初始化
                    _this.baseInfo.appendTo('#containerDiv');
                    //视频连接按钮
                    if (defaults.data.stuResumeData.Resume.VideoResumeUrl != '' && defaults.data.stuResumeData.Resume.VideoResumeUrl != null) {
                        _this.isVideo.appendTo(_this.baseInfo.find('.left-head-content'));
                    }
                    switch (defaults.data.stuResumeData.ApplyStatus) {
                        //未读
                        case 0:
                        case 21: break;
                        //已读
                        case 25:
                            ////是否显示感兴趣提示栏
                            //_this.interetSide = $('<div id="review-tips">'
                            //                        + '<p class="tips-txt">*标记“感兴趣”后，可查看联系方式</p>'
                            //                    + '</div>');
                            //右侧按钮栏
                            _this.rightContent = $('<div class="content-right">'
                                                    + '<div class="right-title-unit">' + defaults.data.stuResumeData.ApplyStatusName + '</div>'
                                                    + '<ul>'
                                                        + '<li class="right-click-btn1 m-interested">感兴趣</li>'
                                                        + '<li class="right-click-btn2 m-inproper">不合适</li>'
                                                    + '</ul>'
                                                    //相关操作栏||动态渲染备注信息
                                                    + '<div class="applicant-operates">'
                                                        + '<a href="' + defaults.data.stuResumeData.ResumeDownloadUrl + '" class="solo-action-link m-download uninterested-download" title="下载"><i class="a-o-download"></i>下载简历</a>'
                                                        + '<a href="javascript:;" class="solo-action-link" id="forward-btn" data-url="" title="转发"><i class="a-o-transpond"></i>转发简历</a>'
                                                        + isMention(defaults.data.stuResumeData.ApplyNoteCount)
                                                        + isStar(defaults.data.stuResumeData.IsFavorite)
                                                        + '<a href="javascript:;" class="solo-action-link" data-action="delete" title="删除"><i class="a-o-delete"></i>删除简历</a>'
                                                    + '</div>'
                                                + '</div>');
                            _this.baseInfo.find('.content-left-head').append(_this.interetSide);
                            break;
                        //感兴趣
                        case 28:
                            //右侧按钮栏
                            _this.rightContent = $('<div class="content-right">'
                                                    + '<div class="right-title-unit">' + defaults.data.stuResumeData.ApplyStatusName + '</div>'
                                                    + '<ul>'
                                                        + '<li class="right-click-btn1 m-interview">面试</li>'
                                                        + '<li class="right-click-btn2 m-inproper">不合适</li>'
                                                    + '</ul>'
                                                    //相关操作栏
                                                    + '<div class="applicant-operates">'
                                                        + '<a href="' + defaults.data.stuResumeData.ResumeDownloadUrl + '" class="solo-action-link m-download" title="下载"><i class="a-o-download"></i>下载简历</a>'
                                                        + '<a href="javascript:;" class="solo-action-link" id="forward-btn" data-url="" title="转发"><i class="a-o-transpond"></i>转发简历</a>'
                                                        + isMention(defaults.data.stuResumeData.ApplyNoteCount)
                                                        + isStar(defaults.data.stuResumeData.IsFavorite)
                                                        + '<a href="javascript:;" class="solo-action-link" data-action="delete" title="删除"><i class="a-o-delete"></i>删除简历</a>'
                                                    + '</div>'
                                                + '</div>');
                            break;
                        //通知面试
                        case 31:
                            //右侧按钮栏
                            _this.rightContent = $('<div class="content-right">'
                                                    + '<div class="right-title-unit">' + defaults.data.stuResumeData.ApplyStatusName + '</div>'
                                                    //相关操作栏
                                                    + '<div class="applicant-operates">'
                                                        + '<a href="' + defaults.data.stuResumeData.ResumeDownloadUrl + '" class="solo-action-link m-download" title="下载"><i class="a-o-download"></i>下载简历</a>'
                                                        + '<a href="javascript:;" class="solo-action-link" id="forward-btn" data-url="" title="转发"><i class="a-o-transpond"></i>转发简历</a>'
                                                        + isMention(defaults.data.stuResumeData.ApplyNoteCount)
                                                        + isStar(defaults.data.stuResumeData.IsFavorite)
                                                        + '<a href="javascript:;" class="solo-action-link" data-action="delete" title="删除"><i class="a-o-delete"></i>删除简历</a>'
                                                    + '</div>'
                                                + '</div>');
                            _this.interviewTips = '<div id="m-interview-tip">'
                                                                    + '<ul>'
                                                                        + '<li class="m-tip-interview">面试时间：' + defaults.data.stuResumeData.interviewInfo.InterviewTime + '</li>'
                                                                        + '<li class="m-tip-interview">联系人：' + defaults.data.stuResumeData.interviewInfo.Contact + '</li>'
                                                                        + '<li class="m-tip-address">面试地址：' + defaults.data.stuResumeData.interviewInfo.InterviewPlace + '</li>'
                                                                    + '</ul>'
                                                                + '</div>';
                            $('.resume-section-content').prepend(_this.interviewTips);
                            break;
                        //邀请投递
                        case 32:
                            //右侧按钮栏
                            _this.rightContent = $('<div class="content-right">'
                                                    + '<div class="right-title-unit">' + defaults.data.stuResumeData.ApplyStatusName + '</div>'
                                                    //相关操作栏
                                                    + '<div class="applicant-operates">'
                                                        + '<a href="' + defaults.data.stuResumeData.ResumeDownloadUrl + '" class="solo-action-link m-download" title="下载"><i class="a-o-download"></i>下载简历</a>'
                                                        + '<a href="javascript:;" class="solo-action-link" id="forward-btn" data-url="" title="转发"><i class="a-o-transpond"></i>转发简历</a>'
                                                        + isMention(defaults.data.stuResumeData.ApplyNoteCount)
                                                        + isStar(defaults.data.stuResumeData.IsFavorite)
                                                        + '<a href="javascript:;" class="solo-action-link" data-action="delete" title="删除"><i class="a-o-delete"></i>删除简历</a>'
                                                    + '</div>'
                                                + '</div>');
                            _this.interviewTips = '<div id="m-interview-tip">'
                                                                    + '<ul>'
                                                                        + '<li class="m-tip-interview">面试时间：' + defaults.data.stuResumeData.interviewInfo.InterviewTime + '</li>'
                                                                        + '<li class="m-tip-interview">联系人：' + defaults.data.stuResumeData.interviewInfo.Contact + '</li>'
                                                                        + '<li class="m-tip-address">面试地址：' + defaults.data.stuResumeData.interviewInfo.InterviewPlace + '</li>'
                                                                    + '</ul>'
                                                                + '</div>';
                            $('.resume-section-content').prepend(_this.interviewTips);
                            break;
                        //不合适
                        case 33:
                            //右侧按钮栏
                            _this.rightContent = $('<div class="content-right">'
                                                    + '<div class="right-title-unit">' + defaults.data.stuResumeData.ApplyStatusName + '</div>'
                                                    //相关操作栏
                                                    + '<div class="applicant-operates">'
                                                        + '<a href="' + defaults.data.stuResumeData.ResumeDownloadUrl + '" class="solo-action-link m-download" title="下载"><i class="a-o-download"></i>下载简历</a>'
                                                        + '<a href="javascript:;" class="solo-action-link" id="forward-btn" data-url="" title="转发"><i class="a-o-transpond"></i>转发简历</a>'
                                                        + isMention(defaults.data.stuResumeData.ApplyNoteCount)
                                                        + isStar(defaults.data.stuResumeData.IsFavorite)
                                                        + '<a href="javascript:;" class="solo-action-link" data-action="delete" title="删除"><i class="a-o-delete"></i>删除简历</a>'
                                                    + '</div>'
                                                + '</div>');
                            break;
                        default: break;
                    }
                } else {
                    _this.baseInfo = $('<div id="g-container">'
                                        //简历投递信息
                                        + '<div class="resume-section-head" data-id=' + defaults.data.stuResumeData.PushId + '>'
                                            + '<ul>'
                                                + '<li class="head-part1">当前简历：' + defaults.data.stuResumeData.Resume.UserName + '</li>'
                                                //+ '<li class="head-part2">推荐职位：' + defaults.data.stuResumeData.PositionName + '</li>'
                                                + '<li class="head-part3">推荐时间：' + defaults.data.stuResumeData.LastPushDateTime + '</li>'
                                                //+ '<li class="head-part4">'
                                                //    + '<div class="part4-left"></div>'
                                                //    + '<div class="part4-close"></div>'
                                                //    + '<div class="part4-right"></div>'
                                                //+ '</li>'
                                            + '</ul>'
                                        + '</div>'
                                        + '<div class="resume-section-content">'
                                            + '<div class="content-left">'
                                                //基本信息
                                                + '<div class="content-left-head">'
                                                    + '<div class="left-head-title">'
                                                        + '<span class="title-name">' + defaults.data.stuResumeData.Resume.UserName + '</span>'
                                                        + '<span class="title-other">' + defaults.data.stuResumeData.Resume.Basic.GenderName + ' ' + defaults.data.stuResumeData.Resume.Basic.Age + '</span>'
                                                        + '</div>'
                                                    + '<div class="left-head-content">'
                                                        + '<div class="content-photo"><img src="' + defaults.data.stuResumeData.Resume.UserAvatar + '" alt="photo"/></div>'
                                                        + '<div class="content-list">'
                                                            + '<ul>'
                                                                + '<li class="content-part"><span class="list-label">现居住地：</span>' + defaults.data.stuResumeData.Resume.Basic.CurrentLocationName + '</li>'
                                                                + '<li class="content-part"><span class="list-label">政治面貌：</span>' + isOrNull(defaults.data.stuResumeData.Resume.Basic.PolicitalStatusName) + '</li>'
                                                                + '<li class="content-part"><span class="list-label">户口地：</span>' + defaults.data.stuResumeData.Resume.Basic.FamilyLocationName + '</li>'
                                                                + '<li class="content-part"><span class="list-label">身高：</span>' + isOrNull(defaults.data.stuResumeData.Resume.Basic.Height, 1) + '</li>'
                                                                + '<li class="content-part"><span class="list-label">生源地：</span>' + isOrNull(defaults.data.stuResumeData.Resume.Basic.HighSchoolLocationName) + '</li>'
                                                                + isMobileExist(defaults.data.stuResumeData.IsShowStuContact)
                                                                + '<li class="content-part"><span class="list-label">职业锚类型：</span>' + isOrNull(defaults.data.assessmentResult.ResultType, 2, defaults.data.assessmentResult) + '</li>'
                                                                + '<li class="content-part"><span class="list-label">邮箱：</span><span class="u-email">' + defaults.data.stuResumeData.Resume.Basic.Email + '</span></li>'
                                                            + '</ul>'
                                                        + '</div>'
                                                        //视频简历
                                                    + '</div>'
                                                + '</div>'
                                                //感兴趣提示栏
                                                //详细信息
                                            + '</div>'
                                        + '</div>'
                                    + '</div>');

                    _this.isVideo = $('<div id="video">'
                                        + '<button type="button" class="u-btn-video">视频简历</button>'
                                    + '</div>');
                    //基础信息初始化
                    _this.baseInfo.appendTo('#containerDiv');
                    //视频连接按钮
                    if (defaults.data.stuResumeData.Resume.VideoResumeUrl != '' && defaults.data.stuResumeData.Resume.VideoResumeUrl != null) {
                        _this.isVideo.appendTo(_this.baseInfo.find('.left-head-content'));
                    }
                    switch (defaults.data.stuResumeData.PushEtpMarkStatus) {
                        //未处理
                        case 0:
                            //右侧按钮栏
                            _this.rightContent = $('<div class="content-right">'
                                                    + '<div class="right-title-unit">' + defaults.data.stuResumeData.PushEtpMarkStatusName + '</div>'
                                                    + '<div class="right-push-position" style="margin-left:28px;margin-top:28px;text-align:left;">\
                                                            <p class="push-title" style="font-size:16px;color:#999;margin-bottom:4px;">匹配<span style="color:#f60;">' + defaults.data.stuResumeData.PushPositionsCount + '</span>个职位</p>'
                                                     + positionNum(defaults.data.stuResumeData.PushPositions) +
                                                       '</div>'
                                                    + '<ul>'
                                                        + '<li class="right-click-btn1 m-invite">邀请投递</li>'
                                                        + '<li class="right-click-btn2 m-inproper_status">不合适</li>'
                                                    + '</ul>'
                                                    //相关操作栏
                                                    //+ '<div class="applicant-operates_push">'
                                                    //    + '<a href="javascript:;" class="m-invite-other" title="下载">邀请投递其它职位</a>'
                                                    //+ '</div>'
                                                + '</div>');
                            break;
                        //已邀请投递
                        case 3:
                        case 1:
                            //右侧按钮栏
                            _this.rightContent = $('<div class="content-right">'
                                                    + '<div class="right-title-unit">' + defaults.data.stuResumeData.PushEtpMarkStatusName + '</div>'
                                                + '</div>');
                            break;
                        //不合适
                        case 2:
                            _this.rightContent = $('<div class="content-right">'
                                                    + '<div class="right-title-unit">' + defaults.data.stuResumeData.PushEtpMarkStatusName + '</div>'
                                                + '</div>');
                            break;
                        ////已邀请投递其他职位
                        //case 3:
                        //    //右侧按钮栏
                        //    _this.rightContent = $('<div class="content-right">'
                        //                            + '<div class="right-title-unit">' + defaults.data.stuResumeData.PushEtpMarkStatusName + '</div>'
                        //                        + '</div>');
                        //    break;
                        default: alert(); break;
                    }
                }
                //全局applyId||pushId
                var applyId = $('.resume-section-head').attr('data-id');
                //content
                //生活照片
                if (defaults.data.stuResumeData.Resume.StuPhotoList.length) {
                    _this.stuPhotoList = '<div class="content-left-stuPhoto">'
                                            + '<h3 class="resume-section-hd">生活相册</h3>\
                                            <div style="margin: 0 auto;width: 672px;">\
                                                <div style="width:30px;display: inline-block;height: 70px;cursor: pointer;margin-right:3px;" id="btn-left"></div>\
                                                <div style="width:596px;height: 70px;overflow: hidden;display: inline-block;" class="leftLoop">\
                                                    <ul id="slide-pic" style="position: relative;-webkit-margin-before: 0;-webkit-margin-after:0;font-size: 0;-webkit-padding-start:0;line-height: 70px;">'
                                                        + loadStuPic(defaults.data.stuResumeData.Resume.StuPhotoList) +
                                                    '</ul>\
                                                </div>\
                                                <div style="width:30px;display: inline-block;height: 70px;cursor: pointer;margin-left:3px;" id="btn-right"></div>\
                                            </div>\
                                        </div>';
                    $(_this.stuPhotoList).appendTo($('.content-left'));
                }
                //职业理想
                if (defaults.data.stuResumeData.Resume.Objective!=null) {
                    _this.career = '<div class="content-left-career">'
                                    + '<h3 class="resume-section-hd">职业理想</h3>'
                                    + '<div class="container">'
                                        + '<div class="intention-block">'
                                            + '<p><span class="color-999">期望工作：</span><span class="right-content">' + isOrNull(defaults.data.stuResumeData.Resume.Objective.TypeName) + '</span></p>'
                                            + '<p><span class="color-999">期望城市：</span><span class="right-content">' + isOrNull(defaults.data.stuResumeData.Resume.Objective.CityNames) + '</span></p>'
                                            + '<p><span class="color-999">期望薪资：</span><span class="right-content">' + isOrNull(defaults.data.stuResumeData.Resume.Objective.SalaryName) + '</span></p>'
                                            + '<p><span class="color-999">期望职位：</span><span class="right-content">' + isOrNull(defaults.data.stuResumeData.Resume.Objective.Keyword) + '</span></p>'
                                            + tagsExist(defaults.data.stuResumeData.Resume.Objective.Tags)
                                        + '</div>'
                                    + '</div>'
                                + '</div>';
                    $(_this.career).appendTo($('.content-left'));   
                }
                
                //教育经历
                if (defaults.data.stuResumeData.Resume.EducationList.length) {
                    _wt = 0;
                    _this.education = '<div class="content-left-education">'
                                        + '<h3 class="resume-section-hd">教育经历</h3>'
                                        + '<div class="container">'
                                           + _search(defaults.data.stuResumeData.Resume.EducationList, _wt)
                                        + '</div>'
                                    + '</div>';
                    $(_this.education).appendTo($('.content-left'));
                }
                //校内职务
                if (defaults.data.stuResumeData.Resume.CampusJobList.length) {
                    _wt = 2;
                    _this.position = '<div class="content-left-postition">'
                                    + '<h3 class="resume-section-hd">校内职务</h3>'
                                    + '<div class="container">'
                                        + _search(defaults.data.stuResumeData.Resume.CampusJobList, _wt)
                                    + '</div>'
                                + '</div>';
                    $(_this.position).appendTo($('.content-left'));
                }
                //校内奖励
                if (defaults.data.stuResumeData.Resume.StuRewardList.length) {
                    _wt = 3;
                    _this.reward = '<div class="content-left-reward">'
                                    + '<h3 class="resume-section-hd">校内奖励</h3>'
                                    + '<div class="container">'
                                        + _search(defaults.data.stuResumeData.Resume.StuRewardList, _wt)
                                    + '</div>'
                                + '</div>';
                    $(_this.reward).appendTo($('.content-left'));
                }
                //实习/工作经历
                if (defaults.data.stuResumeData.Resume.StuInternshipList.length) {
                    _wt = 1;
                    _this.job = '<div class="content-left-job">'
                                + '<h3 class="resume-section-hd">实习/工作经历</h3>'
                                + '<div class="container">'
                                   + _search(defaults.data.stuResumeData.Resume.StuInternshipList, _wt)
                                + '</div>'
                            + '</div>';
                    $(_this.job).appendTo($('.content-left'));
                }
                //项目经历
                if (defaults.data.stuResumeData.Resume.StuProjectList.length) {
                    _wt = 7;
                    _this.job = '<div class="content-left-job">'
                                + '<h3 class="resume-section-hd">项目经历</h3>'
                                + '<div class="container">'
                                   + _search(defaults.data.stuResumeData.Resume.StuProjectList, _wt)
                                + '</div>'
                            + '</div>';
                    $(_this.job).appendTo($('.content-left'));
                }
                //语言能力
                if (defaults.data.stuResumeData.Resume.StuLanguageList.length) {
                    _wt = 5;
                    _this.language = '<div class="content-left-language">'
                                        + '<h3 class="resume-section-hd">语言能力</h3>'
                                        + '<div class="container">'
                                            + _search(defaults.data.stuResumeData.Resume.StuLanguageList, _wt)
                                        + '</div>'
                                    + '</div>';
                    $(_this.language).appendTo($('.content-left'));
                }
                //IT技能
                if (defaults.data.stuResumeData.Resume.StuITSkillList.length) {
                    _wt = 4;
                    _this.itskill = '<div class="content-left-itskill">'
                                        + '<h3 class="resume-section-hd">IT技能</h3>'
                                        + '<div class="container">'
                                            + _search(defaults.data.stuResumeData.Resume.StuITSkillList, _wt)
                                        + '</div>'
                                    + '</div>';
                    $(_this.itskill).appendTo($('.content-left'));
                } 
                //获奖证书
                if (defaults.data.stuResumeData.Resume.StuCertificateList.length) {
                    _wt = 6;
                    _this.rewardCer = '<div class="content-left-rewardCer">'
                                            + '<h3 class="resume-section-hd">获奖证书</h3>'
                                            + '<div class="container">'
                                                + _search(defaults.data.stuResumeData.Resume.StuCertificateList, _wt)
                                            + '</div>'
                                        + '</div>';
                    $(_this.rewardCer).appendTo($('.content-left'));
                }
                //个人特长
                if (defaults.data.stuResumeData.Resume.Speciality != null) {
                    _this.selfValue = '<div class="content-left-selfreview">'
                                        + '<h3 class="resume-section-hd">个人特长</h3>'
                                        + '<div class="container">'
                                            + '<div class="intention-block">'
                                                + '<p class="p-para">'
                                                    + defaults.data.stuResumeData.Resume.Speciality.Speciality
                                                + '</p>'
                                            + '</div>'
                                        + '</div>'
                                    + '</div>';
                    $(_this.selfValue).appendTo($('.content-left'));
                }
                //推荐表
                if (defaults.data.stuResumeData.Resume.StuReference != null) {
                    _this.selfValue = '<div class="content-left-recommond">'
                                        + '<h3 class="resume-section-hd">就业推荐表</h3>'
                                        + '<div class="container">'
                                            + '<div class="intention-block">'
                                                + '<p class="p-para">'
                                                    + '<img src="' + defaults.data.stuResumeData.Resume.StuReference.ThumbnailUrl + '" data-url="' + defaults.data.stuResumeData.Resume.StuReference.Url + '"/>'
                                                + '</p>'
                                            + '</div>'
                                        + '</div>'
                                    + '</div>';
                    $(_this.selfValue).appendTo($('.content-left'));
                }
                //自我评价
                if (defaults.data.stuResumeData.Resume.Evaluation != null) {
                    _this.selfValue = '<div class="content-left-selfreview">'
                                        + '<h3 class="resume-section-hd">自我评价</h3>'
                                        + '<div class="container">'
                                            + '<div class="intention-block">'
                                                + '<p class="p-para">'
                                                    + defaults.data.stuResumeData.Resume.Evaluation.SelfEvaluation
                                                + '</p>'
                                            + '</div>'
                                        + '</div>'
                                    + '</div>';
                    $(_this.selfValue).appendTo($('.content-left'));
                }
                //职业锚
                if (defaults.data.assessmentResult !== undefined && defaults.data.assessmentResult !== '') {
                    _this.selfValue = '<div class="content-left-zhiyemao">'
                                        + '<h3 class="resume-section-hd">职业锚<a href="http://www.zheyibu.com/ceshi/zhiyemao/" target="_blank">什么是职业锚？</a></h3>'
                                        + '<div class="container">'
                                            + '<div class="intention-block">'
                                                + '<p class="zhiyemao-title">'
                                                    + defaults.data.assessmentResult.ResultType
                                                + '</p>'
                                                + '<p class="p-para zhiyemao">'
                                                    + defaults.data.assessmentResult.ResultAnalysis
                                                + '</p>'
                                                + '<p class="p-para zhiyemao">该类型职业锚的人比较适合：'
                                                    + defaults.data.assessmentResult.functions
                                                + '相关的工作。</p>'
                                                + '<p class="p-para zhiHidden">以上职业锚类型解读，仅供HR参考。</p>'
                                            + '</div>'
                                        + '</div>'
                                    + '</div>';
                    $(_this.selfValue).appendTo($('.content-left'));
                }
                $('#g-mask').show();
                _this.baseInfo.find('.resume-section-content').append(_this.rightContent);
                //循环遍历数组输出
                function _search(_array, _wt) {
                    var template='';
                    switch (_wt) {
                        case 0:
                            $.each(_array, function (m, n) {
                                template += '<div class="intention-block">'
                                             + '<div class="block-left color-999">' + n.DateName + '</div>'
                                             + '<p><span class="block-right-top">' + n.SchoolName + '</span><span>' + n.Major + '</span></p>'
                                             + '<p><span class="block-right-bottom">' + n.DegreeName + '</span><span class="block-right-padding color-999">班级排名 ' + isOrNull(n.ClassRankName) + '</span></p>'
                                         + '</div>';
                            });
                            return template;
                            break;
                        case 1:
                            $.each(_array, function (m, n) {
                                template += '<div class="intention-block">'
                                                + '<div class="block-left color-999">' + n.StartDateName + '-' + n.EndDateName + '</div>'
                                                + '<p>' + n.Units + ' ' + n.UnitsPosition + '</p>'
                                                + '<p class="color-999">' + isOrNull(n.UnitsWorkDesc) + '</p>'
                                          + '</div>';
                            });
                            return template;
                            break;
                        case 2:
                            $.each(_array, function (m, n) {
                                template += '<div class="intention-block">'
                                                + '<div class="block-left color-999">' + n.DateName + '</div>'
                                                + '<p>' + n.JobName + ' ' + n.SchoolName + '</p>'
                                                + '<p class="color-999">' + isOrNull(n.JobDescName) + '</p>'
                                            + '</div>';
                            });
                            return template;
                            break;
                        case 3:
                            $.each(_array, function (m, n) {
                                template += '<div class="intention-block">'
                                                + '<div class="block-left color-999">2012.02-2013.09</div>'
                                                + '<p>' + n.RewardName + ' ' + n.RewardSchoolExt + '</p>'
                                                + '<p class="color-999">' + isOrNull(n.RewardDesc) + '</p>'
                                            + '</div>';
                            });
                            return template;
                            break;
                        case 4:
                            $.each(_array, function (m, n) {
                                template += '<div class="intention-block">'
                                               + '<div class="block-left color-999">' + n.SkillNameName + '</div>'
                                               + '<p><span class="color-999">掌握程度：</span>' + n.SkillLevelName + '<span class="block-right-padding color-999">时间：</span>' + n.SkillTime +'个月</p>'
                                           + '</div>';
                            });
                            return template;
                            break;
                        case 5:
                            $.each(_array, function (m, n) {
                                template += '<div class="intention-block">'
                                                + '<div class="block-left color-999">' + n.NameName + '</div>'
                                                + '<p><span class="color-999">听说：</span>' + n.HearName + '<span class="block-right-padding color-999">读写：</span>' + n.ReadWriteName + '<span class="block-right-padding color-999">证书：</span>' + isOrNull(n.CertificationNames) + '</p>'
                                            + '</div>';
                            });
                            return template;
                            break;
                        case 6:
                            $.each(_array, function (m, n) {
                                template += '<div class="intention-block">'
                                                + '<div class="block-left color-999">' + n.CertificateDateName + '</div>'
                                                + '<p>' + n.CertificateName + '</p>'
                                            + '</div>';
                            });
                            return template;
                            break;
                        case 7:
                            $.each(_array, function (m, n) {
                                template += '<div class="intention-block">'
                                                + '<div class="block-left color-999">' + n.DateName + '</div>'
                                                + '<p>' + n.ProjectName + ' ' + n.ProjectJobName + '</p>'
                                                + '<p class="color-999">' + isOrNull(n.ProjectJobDesc) + '</p>'
                                          + '</div>';
                            });
                            return template;
                            break;
                    }
                    
                }
                //<-- 公共方法-->
                function loadStuPic(StuPhotoList) {
                    var temp = '';
                    $.each(StuPhotoList, function (i, v) {
                        url = v.Url.replace('740xauto', '108xauto');
                        temp += '<li style="width: 110px;height: 70px;margin-right: 10px;text-align: center;display: inline-block;vertical-align: middle;text-align: center;cursor:pointer;"><img src="'+ url +'" alt="" style="max-width: 100%;max-height: 100%;vertical-align: middle"/></li>';
                    })
                    return temp;
                }
                function tagsExist(tags) {
                    var tag = tags == null || tags == '' ? '' : '<p><span class="color-999">理想标签：</span><span class="right-content">' + tags + '</span></p>';
                    return tag;
                }
                function positionNum(nums) {
                    var temp = '';
                    $.each(nums, function (i,v) {
                        temp += '<p style="color:#4566a3;"><a  target="_blank" href=' + 'http://www.zheyibu.com/job/details/' + v.PositionId + ' style="color:#4566a3;max-width:114px;display:inline-block;vertical-align:top;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">' + v.Position + '</a><span style="display:inline-block;vertical-align:top;color:#999;">（' + v.JobCityName + '）</span></p>';
                    })
                    return temp;
                }
                //联系方式是否可见
                function isVisibleContact(data) {
                    var m_e;
                    data ? m_e = { mobile: defaults.data.stuResumeData.Resume.Basic.Mobile, email: defaults.data.stuResumeData.Resume.Basic.Email } : m_e = { mobile: '******', email: '******' };
                    return m_e;
                }
                function isShowMobile() {
                    var temp = defaults.data.stuResumeData.Resume.IsMobileValidated == true ? '<span> (已验证)</span>' : '<span> (未验证)</span>';
                    return temp;
                }
                //手机是否存在
                function isMobileExist(isTrue) {
                    if (isTrue) {
                        var mobile = '<li class="content-part"><span class="list-label">手机：</span><span class="u-mobile">' + defaults.data.stuResumeData.Resume.Basic.Mobile + isShowMobile() + '</span></li>';
                        return mobile;
                    } else {
                        return '';
                    }
                }
                //邮箱是否存在
                function isEmailExist(isTrue) {
                    if (isTrue) {
                        var email = '<li class="content-part"><span class="list-label">邮箱：</span><span class="u-email">' + defaults.data.stuResumeData.Resume.Basic.Email + '</span></li>';
                        return email;
                    } else {
                        return '';
                    }
                }
                //依据浏览器设置滚动高度
                if (defaults.data.stuResumeData.ApplyStatus ==31 ) {
                    setPositionA();
                }else{
                    //setScrollPostion();
                }
                //null设置成未填写
                // @param {type:1 身高加cm，type:2 职业锚hover显示}
                function isOrNull(para, type, details) {
                    (para == null || para == "" )? para = '未填写' : para;
                    if (type === 1) {
                        return para == '未填写' ? para: (para + 'cm');
                    } else if (type === 2) {
                        return para == '未填写' ? para = '未测试' : (para + ' <span class="blue">(类型解析)<div class="up-anchor"><i></i><p class="blod">' + details.ResultType + '</p><p>' + details.ResultAnalysis + '</p></div></span>');
                    } else {
                        return para;
                    }
                }
                //function setScrollPostion() {
                //    // 获取窗口高度
                //    if (window.innerHeight)
                //        winHeight = window.innerHeight;
                //    else if ((document.body) && (document.body.clientHeight))
                //        winHeight = document.body.clientHeight;
                //    // 通过深入 Document 内部对 body 进行检测，获取窗口大小
                //    //if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
                //    //{
                //    //    winHeight = document.documentElement.clientHeight;
                //    //    winWidth = document.documentElement.clientWidth;
                //    //}
                //    $('.resume-section-content .content-left').css('max-height', winHeight-132);
                //}
                //如果是面试状态，窗口高度单独设置
                function setPositionA() {
                    //获取id="m-interview-tip"高度
                    mTip = $('#m-interview-tip').outerHeight(true);
                    // 获取窗口高度
                    if (window.innerHeight)
                        winHeight = window.innerHeight;
                    else if ((document.body) && (document.body.clientHeight))
                        winHeight = document.body.clientHeight;
                    $('.resume-section-content .content-left').css('max-height', winHeight - (132+mTip));
                }
                //是否简历备注
                function isMention(data) {
                    if (data == 0) {
                        return '<a href="javascript:;" class="solo-action-link legend-btn" id="legend-btn" data-action="legend" title="备注"><i class="a-o-legend"></i>备注简历</a>';
                    }else{
                        return '<a href="javascript:;" class="solo-action-link u-legend-btn" id="legend-btn" data-action="legend" title="备注"><i class="a-o-legend"><span class="legend-count">' + data + '</span></i>备注简历</a>';
                    }
                }
                //是否星标简历
                function isStar(data) {
                    if(data == false){
                        return '<a href="javascript:;" class="solo-action-link legend-btn" data-action="collect" title="星标简历"><i class="a-o-collect"></i><span class="">星标简历</span></a>';
                    } else {
                        return '<a href="javascript:;" class="solo-action-link u-legend-btn" data-action="uncollect" title="星标简历"><i class="a-o-collect"></i><span class="">星标简历</span></a>';
                    }
                }
                //是否显示简历某些选项不符合
                function IsFilterOut(_if, FilterOutReasons) {
                    var recon = _if == true ? '<span class="title-reason">提醒：' + FilterOutReasons + '</span>' : '';
                    return recon;
                }
                function bindEvent() {
                    ////禁止背景页面滚动条滚动
                    //$(window).bind('scroll', function () {
                    //    window.scrollTo(0, 0);
                    //});
                    var cfm = '', url = '', params = {}, isNeedAdditional=true;
                    $(document).unbind();
                    $(document).on('click', '.part4-close', function () {
                        $('#g-mask').hide();
                        $('#g-container').remove();
                        window.location.href = window.location.href;
                    });
                    // 不合适
                    $(document).on('click', '.m-inproper', function () {
                        cfm = '<h2>确认该简历不符合职位要求？</h2><div class="d-tips">标记为不合适的简历将会进入简历回收箱</div>';
                        url = '/application/markresumeapplystatus';
                        params.applyStatus = 61;
                        params.applyIdStr = applyId;
                        params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                        Showbo.Msg.confirm(cfm, function (btn) {
                            if (btn == 'yes') {
                                operated(url, params);
                            } else {
                                return false;
                            }
                        });
                    });
                    // 下载简历未感兴趣状态下操作
                    $(document).on("click", ".uninterested-download", function (event) {
                        var _this = $(this);
                        cfm = '<h2>只有感兴趣之后才能下载简历~~~</h2><div class="d-tips">是否添加到感兴趣简历？</div>';
                        //cfm.buttons = { yes: 'yes按钮显示的文字'};
                        Showbo.Msg.confirm(cfm, function (btn) {
                            if (btn == 'yes') {
                                _this.removeClass("uninterested-download");
                                $('.m-interested').trigger("click");
                            } else {
                                return false;
                            }
                        }, {yes:"感兴趣", no: '取消'});
                        event.preventDefault();
                    });
                    // 感兴趣
                    $(document).on('click', '.m-interested', function () {
                        url = '/application/markresumeapplystatus';
                        params.applyStatus = 28;
                        params.applyIdStr = applyId;
                        params.isNeedAdditional = isNeedAdditional;
                        params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                        operatedInterest(url, params);
                    });
                    // 面试操作
                    $(document).on('click', '.m-interview', function () {
                        url = '/application/markresumeapplystatus';
                        params.applyStatus = 28;
                        params.applyIdStr = applyId;
                        params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                        //弹层通知面试
                        var $this = $(this);
                        $.ajax({
                            type: 'get',
                            dataType: 'html',
                            url: '/resume/notification-interview',
                            data: {
                                position_apply_id: applyId
                            },
                            success: function (data) {
                                var dialog = new Dialog();
                                dialog.init({
                                    target: data,
                                    trigger: $(this),
                                    mask: true,
                                    title: '',
                                    animate: false,
                                    closeTpl: null
                                });
                                dialog.show();

                                $('#close-dialog').click(function () {
                                    dialog.dispose();
                                })
                                $('.m-cancel').click(function () {
                                    dialog.dispose();
                                });
                                $('#interview-form').validate({
                                    debug: false,
                                    errorClass: 'error-explain',
                                    errorElement: 'div',
                                    groups: {
                                        username: "InterviewTime InterviewHour InterivewMinute"
                                    },
                                    rules: {
                                        InterviewInvitation: {
                                            required: true
                                        },
                                        InterviewPlace: {
                                            required: true
                                        },
                                        InterviewTime: {
                                            required: true
                                        },
                                        InterviewHour: {
                                            required: true,
                                            checkInterivewHour: true
                                        },
                                        InterivewMinute: {
                                            required: true,
                                            checkInterivewMinute: true
                                        },
                                        ContactMan: {
                                            required: true
                                        },
                                        ContactTelephone: {
                                            required: true
                                        }
                                    },
                                    messages: {
                                        InterviewInvitation: {
                                            required: '主题不能为空'
                                        },
                                        InterviewPlace: {
                                            required: '面试地址不能为空'
                                        },
                                        InterviewTime: {
                                            required: '面试日期不能为空'
                                        },
                                        InterviewHour: {
                                            required: '面试时间不能为空'
                                        },
                                        InterivewMinute: {
                                            required: '面试时间不能为空'
                                        },
                                        ContactMan: {
                                            required: '联系人不能为空'
                                        },
                                        ContactTelephone: {
                                            required: '联系电话不能为空'
                                        }
                                    }
                                });

                                jQuery.validator.addMethod("checkInterivewHour", function (value, element) {
                                    var reg = /^(([1-9]{1})|([0-1][0-9])|([1-2][0-3]))$/;
                                    return this.optional(element) || reg.test(value);
                                }, "请输入合理的面试时间");
                                jQuery.validator.addMethod("checkInterivewMinute", function (value, element) {
                                    var reg = /^([0-9]|[0-5][0-9]|59)$/;
                                    return this.optional(element) || reg.test(value);
                                }, "请输入合理的面试时间");
                                Date.prototype.Format = function (fmt) { //author: meizz 
                                    var o = {
                                        "M+": this.getMonth() + 1, //月份 
                                        "d+": this.getDate(), //日 
                                        "h+": this.getHours(), //小时 
                                        "m+": this.getMinutes(), //分 
                                        "s+": this.getSeconds(), //秒 
                                        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                                        "S": this.getMilliseconds() //毫秒 
                                    };
                                    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                                    for (var k in o)
                                        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                                    return fmt;
                                }
                                var curDay = new Date().Format("yyyy-MM-dd");
                                var picker = new Pikaday({
                                    field: document.getElementById('day'),
                                    firstDay: 1,
                                    minDate: new Date(curDay),
                                    maxDate: new Date('2020-12-31'),
                                    yearRange: [2000, 2020]
                                });
                                $('#interview-form').ajaxForm({
                                    success: function (data) {
                                        if (data.code == 0) {
                                            dialog.dispose();
                                            //动态操作弹层
                                            var interviewTips = '<div id="m-interview-tip">'
                                                                    + '<ul>'
                                                                        + '<li class="m-tip-interview">面试时间：' + data.interviewTime + '</li>'
                                                                        + '<li class="m-tip-interview">联系人：' + data.contact + '</li>'
                                                                        + '<li class="m-tip-address">面试地址：' + data.interviewPlace + '</li>'
                                                                    + '</ul>'
                                                                + '</div>';
                                            $('.resume-section-content').prepend(interviewTips);
                                            $('.right-title-unit').html('已通知面试');
                                            //处理面试->已通知面试
                                            $('.content-right ul').remove();
                                            $.alert('通知面试成功！');
                                            setPositionA();
                                        }
                                    }
                                })
                            }
                        })
                    });
                    //视频简历
                    $(document).on('click', '.u-btn-video', function () {
                        var videoUrl = 'http://vod.baofengcloud.com/player3/cloud.swf?' + defaults.data.stuResumeData.Resume.VideoResumeUrl + '&auto=1';
                        var videoDialog = new Dialog();
                        videoDialog.init({
                            width: 670,
                            target: '<object width="630" height="360"  align="middle" id="cloudsVideoPlayer" type="application/x-shockwave-flash" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="movie" value="' + videoUrl + '"><param value="always" name="allowscriptaccess"><param value="true" name="allowfullscreen"><param value="transparent" name="wmode" /><embed width="630" height="360" name="CloudPlayer" flashvars="imgurl=oncomplete=swffun.shareComplete" src="' + videoUrl + '" quality="high"  wmode="transparent" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" /></object>',
                            trigger: $(this),
                            mask: true,
                            title: '视频简历',
                            animate: false
                        });
                        videoDialog.show();
                        $('.ui-dialog-title').css({ 'width': '640', 'background-color': '#338be3' });
                        $('#close-dialog').click(function () {
                            videoDialog.dispose();
                        })
                    });
                    //转发简历
                    $(document).on('click', '#forward-btn', function () {
                        var dialog = new Dialog();
                        dialog.init({
                            target: '\
                                    <div class="forward-dailog">\
                                        <form action="post" id="forward-form" class="ui-form">\
                                            <div class="ui-form-item">\
                                                <label for="subject" class="ui-label">转发给</label>\
                                                <input type="text" name="" id="forwardEmails" class="ui-text" placeholder="Email地址">\
                                                <p style="margin:10px 0 20px 0; color:#999;display:none;">多个Email地址用;隔开（最多5个Email地址）</p>\
                                                <div class="ui-form-explain"></div>\
                                            </div>\
                                            <div class="ui-form-item">\
                                                <button type="button"  id="forwardEmail" class="ui-btn ui-btn-ok-s mr10">转发</button>\
                                                <button type="button" id="close-dialog" class="ui-btn ui-btn-cancel-s">取消</button>\
                                            </div>\
                                        </form>\
                                    </div>\
                                    ',
                            trigger: $(this),
                            mask: true,
                            title: '转发简历',
                            animate: true
                        });
                        dialog.show();

                        $('#forwardEmail').click(function () {
                            if ($('#forwardEmails').val() == '') {
                                Showbo.Msg.alert('转发Email不能为空！');
                            } else {
                                $.ajax({
                                    url: '/Application/SendForwardResumeEmail',
                                    type: 'post',
                                    data: {
                                        applyIds: applyId,
                                        __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val(),
                                        to: $('#forwardEmails').val()
                                    },
                                    success: function (data) {
                                        if (data.code == 0) {
                                            dialog.dispose();
                                            Showbo.Msg.alert('转发成功!');
                                        } else {
                                            Showbo.Msg.alert(data.msg);
                                        }
                                    }
                                })
                            }
                        })

                        $('#close-dialog').click(function () {
                            dialog.dispose();
                        })
                    });
                    //星标简历
                    $(document).on('click', '[data-action="collect"]', function () {
                        $this = $(this)
                        url = '/application/markresumeapplystatus';
                        params.applyStatus = 999;
                        params.applyIdStr = applyId;
                        params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                        operatedCollect(url, params,$this);
                    });
                    //取消星标
                    $(document).on('click', '[data-action="uncollect"]', function () {
                        $this = $(this)
                        url = '/application/markresumeapplystatus';
                        params.applyStatus = 1000;
                        params.applyIdStr = applyId;
                        params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                        operatedUncollect(url, params, $this);
                    });
                    //简历备注
                    $(document).on('click', '#legend-btn', function () {
                        $.ajax({
                            type: 'post',
                            dataType: 'json',
                            url: '/Application/GetNoteListByApplyId',
                            data: {
                                applyid: applyId
                            },
                            success: function (data) {
                                dataLength = data.noteList.length;
                                legendDialog = new Dialog();
                                legendDialog.init({
                                    width:580,
                                    target: '<div class="legend-info">' +
                                                '<div class="add-ld">' +
                                                    '<textarea type="text" id="alert-input" placeholder="添加简历备注，100字以内" class="add-ld-input" rows="5"></textarea>' +
                                                '</div>' +
                                                '<a href="javascript:;" class="add-ld-btn" id="submit-ld-btn">添加简历备注</a>' +
                                                '<div class="m-county">该简历已添加' + dataLength + '条备注信息</div>' +
                                                '<div class="hfilter m-minHeight">' +//m-minHeight
                                                '</div>'+
                                            '</div>',
                                    trigger: $(this),
                                    mask: true,
                                    title: '添加备注',
                                    animate: true
                                });
                                legendDialog.show();
                                if (!data.noteList.length) {
                                    $('.m-county').hide();
                                    $('.m-minHeight').css({ 'border-width': 'none', 'border-style': 'none', 'border-color': 'transparent' });
                                } else {
                                    $('.m-county').show();
                                    $('.m-minHeight').css({ 'border-width': '1px', 'border-style': 'solid', 'border-color': '#E4F0FC' });
                                }
                                var temp = '';
                                $.each(data.noteList, function (i,item) {
                                    temp += '<div class="m-memucontent" data-ld-id="' + item.Id + '">' +
                                                  '<div class="m-minHead">' +
                                                  item.CreateDateStr +
                                                  '</div><div class="m-minHeadR del-legend"></div>' +
                                                  '<div class="m-minContent">' + item.Note + '</div>' +
                                                '</div>';
                                });
                                $('.hfilter').append(temp);
                                $('.ui-dialog-title').css('width', '550px');
                                $('.hfilter .m-memucontent').last().find('.m-minContent').css('border-bottom', 'none');
                                //载入滚动条
                                setTimeout("$('.hfilter').niceScroll({zindex:10,cursorcolor: '#666',horizrailenabled:false})", 500);
                            }
                        })
                        //var sHeight = $('body').scrollTop();
                        //$(window).bind('scroll',function () {
                        //    window.scrollTo(0, sHeight);
                        //});

                    })
                    //提交简历备注
                    $(document).on('click', '#submit-ld-btn', function () {
                        var Ldval = $('#alert-input').val(),
                            $this = $(this),
                            $id = applyId;
                        data = {},
                        LdItem = $('<div class="m-memucontent" data-ld-id="">' +
                                '<div class="m-minHead">' +
                                '</div><div class="m-minHeadR del-legend"></div>' +
                                '<div class="m-minContent"></div>' +
                                '</div>');
                        if (Ldval != '') {
                            if (Ldval.length < 100) {
                                data.applyId = applyId;
                                data.note = Ldval;
                                data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                                $.ajax({
                                    type: 'post',
                                    url: '/application/addapplynote',
                                    data: data,
                                    success: function (data) {
                                        var conval = data.dt1 + "  " + data.dt2;
                                        var itemL = $('div').filter('.m-memucontent').length;
                                        if (data.code > 0) {
                                            LdItem.find('.m-minHead').html(conval);
                                            LdItem.find('.m-minContent').html(Ldval);
                                            LdItem.attr('data-ld-id', data.code);
                                            switch (itemL) {
                                                case 0: $('.hfilter').append(LdItem);
                                                    break;
                                                case 1:
                                                case 2: LdItem.insertBefore($('.hfilter .m-memucontent').first());
                                                    break;
                                                default: LdItem.insertBefore($('.hfilter .m-memucontent').first());
                                            }
                                            $('#alert-input').val('');
                                            $this.siblings(':input').val('');
                                            $('.m-county').show();
                                            $('.m-minHeight').css({ 'border-width': '1px', 'border-style': 'solid', 'border-color': '#E4F0FC' });
                                            $('.hfilter .m-memucontent').last().find('.m-minContent').css('border-bottom', 'none');
                                            $('.m-county').text('该简历已添加' + (++dataLength) + '条备注信息');
                                            changeCount();
                                        } else {
                                            alert('error!');
                                        }
                                    }
                                })
                            } else {
                                alert('备注内容不能超过100！');
                            }
                        } else {
                            alert('备注不能为空！');
                        }
                    })
                    function changeColor(temp) {
                        var $temp = $('#legend-btn');
                        if (temp == 1) {
                            $temp.removeClass('legend-btn');
                            $temp.addClass('u-legend-btn');
                            $temp.find('.u-meto').addClass('u-hasStar');
                        } else {
                            $temp.removeClass('u-legend-btn');
                            $temp.addClass('legend-btn');
                            $temp.find('.u-meto').removeClass('u-hasStar');
                        }
                    }
                    function changeCount() {
                        var count = $('#legend-btn').find('.legend-count');
                        if (count.length > 0) {
                            if ($('.legend-info').find('.m-memucontent').length > 0) {
                                count.html($('.legend-info').find('.m-memucontent').length);
                            } else {
                                count.remove();
                                changeColor(2);
                            }
                        } else {
                            $('#legend-btn').find('.a-o-legend').append($('<span class="legend-count"></span>').html($('.legend-info').find('.m-memucontent').length));
                            changeColor(1);
                        }
                    }
                    //备注删除
                    $(document).on('click', '.del-legend', function () {
                        var $this = $(this),data = {};
                        data.noteId = $this.parent().attr('data-ld-id');
                        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                        $.ajax({
                            type: 'post',
                            url: '/application/deleteapplynote',
                            data: data,
                            success: function (data) {
                                $('.m-county').text('该简历已添加' + (--dataLength) + '条备注信息');
                                if (!dataLength) {
                                    $('.m-county').hide();
                                    $('.m-minHeight').css({ 'border-width': 'none', 'border-style': 'none', 'border-color': 'transparent' });
                                } else {
                                    $('.m-county').show();
                                    $('.m-minHeight').css({ 'border-width': '1px', 'border-style': 'solid', 'border-color': '#E4F0FC' });
                                }
                                if (data.code == 0) {
                                    $this.parent().remove();
                                    $('.hfilter .m-memucontent').last().find('.m-minContent').css('border-bottom', 'none');
                                    changeCount();
                                } else {
                                    alert('删除失败');
                                }
                            }
                        })
                    });
                    //删除简历
                    $(document).on('click', 'a[data-action="delete"]', function () {
                        cfm = '<h2>确定删除该简历到回收箱？</h2><div class="d-tips">删除后，您还可以从简历回收箱找回</div>';
                        url = '/application/markresumeapplystatus';
                        params.applyStatus = 1001;
                        params.applyIdStr = applyId;
                        params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                        Showbo.Msg.confirm(cfm, function (btn) {
                            if (btn == 'yes') {
                                operated(url, params);
                            } else {
                                return false;
                            }
                        });
                    });
                    //不合适状态标记
                    $(document).on('click', '.m-inproper_status', function () {
                        cfm = '<h2>确定将选中简历标记为不合适？</h2><div class="d-tips">标记为不合适后，您可以在不合适状态找到这些简历</div>';
                        url = '/application/markpush';
                        params.etpMark = 2;
                        params.pushIdStr = applyId;
                        params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                        operatedInproper(url,params);
                    })
                    //就业推荐表
                    .on('click', '.content-left-recommond img', function () {
                        if (!defaults.ispush && defaults.data.stuResumeData.ApplyStatus < 28) {
                           //提示感兴趣
                            var cfm = '<h2>简历标记为“感兴趣”后，可查看该学生就业推荐表！</h2>';
                            Showbo.Msg.confirm(cfm, function (btn) {

                            });
                        } else if (!defaults.ispush) {
                            //可以看
                            window.open($(this).attr('data-url'));
                        }//推荐的
                        else if (defaults.data.stuResumeData.IsShowStuContact) {
                            //可以看
                            window.open($(this).attr('data-url'));
                        }
                    })
                    //图片预览
                    .on('click', '#slide-pic li', function () {
                        var picView = '<div id="demo" class="flexslider">'
                            + '<div class="flex-viewport">'
                            + '<ul class="slides">'
                            + '</ul>'
                            + '</div>'
                            + '<ul class="flex-direction-nav">'
                            + '<li><a class="flex-prev" href="javascript:;">Previous</a></li>'
                            + '<li><a class="flex-next" href="javascript:;">Next</a></li>'
                            + '</ul>'
                            + '</div>';
                        picReview = new Dialog();
                        picReview.init({
                            width: 820,
                            target: picView,
                            trigger: $(this),
                            mask: true,
                            title: '生活相册'
                        });
                        picReview.show();
                        $('.ui-dialog-title').css({ 'width': '790px', 'background-color': '#328AE2' });
                        //预览操作
                        var photosUnhandle = $('#slide-pic').find('img'), photoNew = [], photos = [], _li = $(this);
                        $.each(photosUnhandle, function (i, v) {
                            photos.push($(v).attr('src').replace('108xauto', '740xauto'));
                        })
                        //请求图片详情
                        $(function () {
                            var lens = photos.length, ele = photos, temp = '';
                            //图片轮播之前初始化图片顺序
                            for (var j = 0; j < lens; j++) {
                                if (_li.find('img').attr('src').replace('108xauto', '740xauto') == ele[j]) {
                                    photoNew = ele.slice(0, j);
                                    photoNew = ele.slice(j, lens).concat(photoNew);
                                }
                            }
                            for (var i = 0; i < lens; i++) {
                                var src = photoNew[i];
                                temp += '<li class=""><div class="img"><img src="' + src + '" alt=""></div></li>';
                            }
                            $('.slides').append(temp);
                            $('#demo').flexslider({
                                animation: "slide", //转换方式 fade淡入淡出 slide滚动
                                direction: "horizontal", //滚动方向 horizontal左右 vertical上下
                                slideshowSpeed: 300000, //停留时间
                                directionNav: true, //是否显示左右控制按钮 true&false
                                controlNav: false, //是否显示下方控制按钮 true&false
                                mousewheel: false //是否允许鼠标控制滚动 true&fals
                            });
                        });
                    });
                    //邀请投递
                    $(document).on('click', '.m-invite', function () {
                        url = '/application/markpush';
                        params.etpMark = 1;
                        params.pushIdStr = applyId;
                        params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                        inviteDialog = new Dialog();
                        inviteDialog.init({
                            width: 518,
                            target: '<div class="legend-info">'
                                            + checkbox(defaults.data.stuResumeData.PushPositions) +
                                        '<p class="invite-push" style="margin:20px auto 0;width:110px;background:#338BE3;color:#fff;text-align:center;font-size:16px;height:36px;line-height:36px;border-radius:3px;cursor:pointer;">确定</p>' +
                                        '<div class="hfilter m-minHeight">' +//m-minHeight
                                        '</div>' +
                                    '</div>',
                            trigger: $(this),
                            mask: true,
                            title: '请选择邀请投递的职位',
                            animate: true
                        });
                        inviteDialog.show();
                        $('.invite-push').click(function () {
                            if ($('input.invite-push-input:checked').length) {
                                var inputVal = [];
                                $('input.invite-push-input:checked').each(function () {
                                    inputVal.push($(this).val());
                                });
                                params.pushIdStr = inputVal.join(',');
                                operatedInvite(url, params);
                                $('.js-dialog-close').trigger('click');
                            } else {
                                alert("请选择邀请职位");
                            }
                        });
                        $('.ui-dialog-title').css('width', '488px');
                    });
                    //邀请投递其它职位
                    $(document).on('click', '.m-invite-other', function () {
                        $.ajax({
                            type: 'get',
                            dataType: 'html',
                            url: '/Pop/PtlViewInviteApplyOnPush',
                            data: {
                                pushid: applyId
                            },
                            success: function (data) {
                                var dialog = new Dialog();
                                dialog.init({
                                    target: data,
                                    trigger: $(this),
                                    mask: true,
                                    title: '邀请投递其他职位',
                                    animate: true
                                });
                                dialog.show();
                                var curPage = parseInt($('#J_PaneCur').text());
                                var totalPage = parseInt($('#J_PaneTotal').text());
                                $('.invite-job-pager a').click(function () {
                                    if ($(this).attr('data-switchable-role') == 'prev') {
                                        curPage = curPage > 1 ? curPage - 1 : 1;
                                    } else if ($(this).attr('data-switchable-role') == 'next') {
                                        curPage = curPage < totalPage ? curPage + 1 : totalPage;
                                    }
                                    $.ajax({
                                        type: 'get',
                                        url: '/Pop/PtlViewInviteApplyOnPush',
                                        data: {
                                            pushid: applyId,
                                            ispagecontents: 1,
                                            pageIndex: curPage
                                        },
                                        dataType: 'html',
                                        success: function (data) {
                                            $('.invite-job-list').empty().html(data);
                                            $('#J_PaneCur').text(curPage);
                                        }
                                    })
                                })

                                $('#invite-other').ajaxForm({
                                    beforeSubmit: function (a, f, o) {
                                        var jobid = $('input:radio[name="jobId"]:checked').val();
                                        if (!jobid) {
                                            $.alert('请选择一个职位');
                                            return false;
                                        }
                                    },
                                    success: function (data) {
                                        if (data.code == 0) {
                                            dialog.dispose();
                                            $.alert('邀请投递其他职位成功！');
                                            $('.right-title-unit').html("已邀请其他职位");
                                            $('.content-right ul').remove();
                                            $('.applicant-operates_push').remove();
                                        }
                                    }
                                })

                                $('#close-dialog').click(function () {
                                    dialog.dispose();
                                })
                            }
                        })
                    })
                    var resumeurl;
                    defaults.ispush == 1 ? resumeurl = '/application/GetStuResumeData?t=' + Math.random() + '&pushId=' : resumeurl = '/application/GetStuResumeData?t=' + Math.random() + '&applyId=';
                    
                //bindEvent end
                }                
                //不合适||按钮操作请求链接
                function operated(url, params) {
                    //url    请求地址
                    //params 参数
                    $.ajax({
                        type: 'POST',
                        url: url,
                        data: params,
                        dataType: 'json',
                        success: function (data) {
                            $.alert(data.tipmsg);
                            if (data.code == 0) {
                                //刷新当前页面重新加载列表
                                if ($('input[name="ReferrerUrl"]').val()) {
                                    location.href = $('input[name="ReferrerUrl"]').val();
                                } else {
                                    location.href = '/application';
                                }
                            }
                        }
                    })
                }
                function operatedCollect(url, params, $this) {
                    var that = $this;
                    //url    请求地址
                    //params 参数
                    //$this    操作元素
                    $.ajax({
                        type: 'POST',
                        url: url,
                        data: params,
                        dataType: 'json',
                        success: function (data) {
                            $.alert(data.tipmsg);
                            if (data.code == 0) {
                                //刷新当前页面重新加载列表
                                that.removeClass('legend-btn').addClass('u-legend-btn');
                                that.attr('data-action', 'uncollect');
                            }
                        }
                    })
                }
                function operatedUncollect(url, params, $this) {
                    var that = $this;
                    //url    请求地址
                    //params 参数
                    $.ajax({
                        type: 'POST',
                        url: url,
                        data: params,
                        dataType: 'json',
                        success: function (data) {
                            $.alert(data.tipmsg);
                            if (data.code == 0) {
                                //刷新当前页面重新加载列表
                                that.removeClass('u-legend-btn').addClass('legend-btn');
                                that.attr('data-action', 'collect');
                            }
                        }
                    })
                }
                //感兴趣操作
                function operatedInterest(url, params) {
                    //url    请求地址
                    //params 参数
                    $.ajax({
                        type: 'POST',
                        url: url,
                        data: params,
                        dataType: 'json',
                        success: function (data) {
                            $.alert(data.tipmsg);
                            if (data.code == 0) {
                                //动态操作弹层
                                var mobileValid = defaults.data.stuResumeData.Resume.IsMobileValidated == true ? '(已验证)' : '';
                                $('.u-mobile').html(data.stuMobild + mobileValid);
                                $('.u-email').html(data.stuEmail);
                                $('#review-tips').remove();
                                $('.right-title-unit').html('感兴趣');
                                //处理感兴趣->面试操作按钮
                                $('.right-click-btn1').html('面 试');
                                $('.right-click-btn1').removeClass('m-interested').addClass('m-interview');
                                defaults.data.stuResumeData.ApplyStatus = 28;
                            }
                            $('.content-left').animate({ scrollTop: 0 }, 300);
                        }
                    })
                }
                function operatedInvite(url, params) {
                    //url    请求地址
                    //params 参数
                    $.ajax({
                        type: 'post',
                        url: url,
                        data: params,
                        dataType: 'json',
                        success: function (data) {
                            if (data.code == 0) {
                                $('.right-title-unit').html("已发送邀请");
                                $('.content-right ul').remove();
                                $('.applicant-operates_push').remove();
                                $.alert(data.count + '个简历 已被' + data.targetstatusname + '！');
                            }
                        }
                    })
                }
                function checkbox($this) {
                    var temp = '',
                        ele = $this;
                    $.each($this, function (i, v) {
                        temp += '<p style="line-height:1.5;font-size:16px;color:#4566a3;"><input class="invite-push-input" style="margin-right:3px;" type="checkbox" id="push' + i + '" value="' + v.PushId + '" /><label for="push' + i + '">' + v.Position + '</label><span style="font-size:16px;color:#999;padding-left:3px;">(' + v.JobCityName + ')</span></p>';
                    });
                    return temp;
                }
                function operatedInproper(url, params) {
                    //url    请求地址
                    //params 参数
                    $.ajax({
                        type: 'post',
                        url: url,
                        data: params,
                        dataType: 'json',
                        success: function (data) {
                            if (data.code == 0) {
                                $('.right-title-unit').html("已标记不合适");
                                $('.content-right ul').remove();
                                $('.applicant-operates_push').remove();
                                $.alert(data.count + '个简历 已被' + data.targetstatusname + '！');
                            }
                        }
                    })
                }
                var num = $(".leftLoop").find("li").length, current = 0; $(".leftLoop ul").css("width", num * 120); var numCount = num > 10 ? 2 : num > 5 ? 1 : 0; switch (numCount) { case 0: i = 0; break; case 1: i = 1; break; default: i = 2; break } $("#btn-right").click(function () { if (i > current) { $("#slide-pic").animate({ left: -600 * ++current }, 500) } }); $("#btn-left").click(function () { if (current != 0) { $("#slide-pic").animate({ left: -600 * --current }, 500) } });
            });

        }
    });
})(jQuery);