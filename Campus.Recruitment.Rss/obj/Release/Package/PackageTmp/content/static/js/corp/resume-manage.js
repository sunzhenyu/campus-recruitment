$(function () {

    
    //$('.new-hot').tipso({
    //    useTitle: false,
    //    position: 'right',
    //    background: '#fff',
    //    color: '#f90',
    //    width:'240',
    //    content: '<h3>什么是推荐简历？</h3><p>系统根据您发布的职位信息，通过简历智能匹配、筛选出符合职位要求的候选人简历，并免费推荐给您。</p>'
    //})

    $(document).on('click', '[data-action]', function () {
        if ($(this).hasClass('multi-action-diabled')) {
            return false;
        }
        var params = {};
        var $this = $(this);
        var action = $(this).attr('data-action');
        var cfm = '',
            url = '';
        switch (action) {
            case 'interest':                            //感兴趣 + 恢复为感兴趣
                url = 'application/markresumeapplystatus';
                params.applyStatus = 28;
                params.applyIdStr = $this.closest('tr').prev().attr('id');
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                var rows = $this.closest('tbody');
                operatedUn(url, params, rows);
                break;
            case 'unsuitable':                          //不合适
                cfm = '<h2>确认该简历不符合职位要求？</h2><div class="d-tips">标记为不合适的简历将会进入简历回收箱</div>';
                url = 'application/markresumeapplystatus';
                params.applyStatus = 61;
                params.applyIdStr = $this.closest('tr').prev().attr('id');
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                var rows = $this.closest('tbody');
                Showbo.Msg.confirm(cfm, function (btn) {
                    if (btn == 'yes') {
                        operated(url, params, rows);
                    } else {
                        return false;
                    }
                });
                break;
            case 'collect':                             //收藏
                url = 'application/markresumeapplystatus';
                params.applyStatus = 999;
                params.applyIdStr = $this.closest('tr').attr('id');
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                var rows = $this.closest('tbody');
                operated(url, params, rows);
                break;
            case 'delete':                              //删除
                cfm = '<h2>确定删除该简历到回收箱？</h2><div class="d-tips">删除后，您还可以从简历回收箱找回</div>';
                url = 'application/markresumeapplystatus';
                params.applyStatus = 1001;
                params.applyIdStr = $this.closest('tr').attr('id');
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                var rows = $this.closest('tbody');
                Showbo.Msg.confirm(cfm, function (btn) {
                    if (btn == 'yes') {
                        operated(url, params, rows);
                    } else {
                        return false;
                    }
                });
                break;
            case 'uncollect':                           //取消收藏
                url = 'application/markresumeapplystatus';
                params.applyStatus = 1000;
                params.applyIdStr = $this.closest('tr').attr('id');
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                var rows = $this.closest('tbody');
                operated(url, params, rows);
                break;
            case 'restore':
                url = 'application/markresumeapplystatus';
                params.applyStatus = 1002;
                params.applyIdStr = $this.closest('tr').prev().attr('id');
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                var rows = $this.closest('tbody');
                operated(url, params, rows);
                break;
            case 'destroy':                             //彻底删除
                cfm = '<h2>确定彻底删除该简历？</h2><div class="d-tips">彻底删除后您将无法找回</div>';
                url = 'application/markresumeapplystatus';
                params.applyStatus = 99;
                params.applyIdStr = $this.closest('tr').prev().attr('id');
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                var rows = $this.closest('tbody');
                Showbo.Msg.confirm(cfm, function (btn) {
                    if (btn == 'yes') {
                        operated(url, params, rows);
                    } else {
                        return false;
                    }
                });
                break;
            case 'invite':
                url = 'application/markpush';
                params.etpMark = 1;
                params.pushIdStr = '';
                var rows = $this.closest('tbody');
                inviteDialog = new Dialog();
                inviteDialog.init({
                    width: 518,
                    target: '<div class="legend-info">' + 
                                '<div class="content-info">'
                                    + checkbox($this) +
                                '</div>' +
                                '<div class="tcdPageCode">' +
                                '</div>' +
                                '<p class="invite-push" style="margin:10px auto 0;width:110px;background:#338BE3;color:#fff;text-align:center;font-size:16px;height:36px;line-height:36px;border-radius:3px;cursor:pointer;">确定</p>'+
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
                        params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                        operatedInvite(url, params, rows);
                        $('.js-dialog-close').trigger('click');
                    } else {
                        alert("请选择邀请职位");
                    }
                });
                $('.ui-dialog-title').css('width', '488px');
                if (arrPosition.length > 10) {
                    var index = Math.ceil(arrPosition.length / 10);
                    //前端邀请投递分页
                    $('.tcdPageCode').createPage({
                        pageCount: index,
                        current: 1,
                        backFn: function (r) {
                            var temp = '';
                            if (r == index && (arrPosition.length % 10)) {
                                for (var i = 0; i < (arrPosition.length % 10) ; i++) {
                                    temp += '<p style="line-height:1.5;font-size:16px;color:#4566a3;"><input class="invite-push-input" style="margin-right:3px;" type="checkbox" value="' + arrPosition[(r - 1) * 10 + i].value + '" /><label>' + arrPosition[(r - 1) * 10 + i].str + '</label></p>';
                                }
                            } else {
                                for (var i = 0; i < 10; i++) {
                                    temp += '<p style="line-height:1.5;font-size:16px;color:#4566a3;"><input class="invite-push-input" style="margin-right:3px;" type="checkbox" value="' + arrPosition[(r - 1) * 10 + i].value + '" /><label>' + arrPosition[(r - 1) * 10 + i].str + '</label></p>';
                                }
                            }
                            $('.content-info').empty().append(temp);
                        }//点击回调函数
                    });
                }
                break;
            case 'pushunsuitable':
                cfm = '<h2>确定该简历不符合职位要求吗？</h2>';
                url = 'application/markpush';
                params.etpMark = 2;
                params.pushIdStr = $this.closest('tr').prev().attr('id');
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                Showbo.Msg.confirm(cfm, function (btn) {
                    if (btn == 'yes') {
                        operated(url, params, rows);
                    } else {
                        location.href = "/position";
                    }
                }, {"yes":"确定", "no": "修改职位"});
                break;
            case 'mDelete':
                cfm = '<h2>确定删除选中简历？</h2><div class="d-tips">删除后，您还可以从简历回收箱找回</div>';
                url = 'application/markresumeapplystatus';
                params.applyStatus = 1001;
                params.applyIdStr = getIdStr();
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                if (!params.applyIdStr) {
                    Showbo.Msg.alert('当前页没有可选项！');
                    return false;
                }
                var rows = $('.item-check').filter(':checked').closest('tbody');
                Showbo.Msg.confirm(cfm, function (btn) {
                    if (btn == 'yes') {
                        operated(url, params, rows);
                    } else {
                        return false;
                    }
                });
                break;
            case 'mInterest':
                url = 'application/markresumeapplystatus';
                params.applyStatus = 28;
                params.applyIdStr = getIdStr();
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                if (!params.applyIdStr) {
                    Showbo.Msg.alert('当前页没有可选项！');
                    return false;
                }
                var rows = $('.item-check').filter(':checked').closest('tbody');
                operated(url, params, rows);
                break;
            case 'mUnsuitable':
                cfm = '<h2>确定将选中简历标记为不合适？</h2><div class="d-tips">标记为不合适后，您可以在不合适状态找到这些简历</div>';
                url = 'application/markresumeapplystatus';
                params.applyStatus = 61;
                params.applyIdStr = getIdStr();
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                if (!params.applyIdStr) {
                    Showbo.Msg.alert('当前页没有可选项！');
                    return false;
                }
                var rows = $('.item-check').filter(':checked').closest('tbody');
                Showbo.Msg.confirm(cfm, function (btn) {
                    if (btn == 'yes') {
                        operated(url, params, rows);
                    } else {
                        return false;
                    }
                });
                break;
            case 'mUncollect':
                cfm = '<h2>确定将选中简历取消收藏？</h2>';
                url = 'application/markresumeapplystatus';
                params.applyStatus = 1000;
                params.applyIdStr = getIdStr();
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                if (!params.applyIdStr) {
                    Showbo.Msg.alert('当前页没有可选项！');
                    return false;
                }
                var rows = $('.item-check').filter(':checked').closest('tbody');
                Showbo.Msg.confirm(cfm, function (btn) {
                    if (btn == 'yes') {
                        operated(url, params, rows);
                    } else {
                        return false;
                    }
                });
                break;
            case 'mInvite':
                cfm = '<h2>确定邀请选中候选人投递简历？</h2>';
                url = 'application/markpush';
                params.etpMark = 1;
                params.pushIdStr = getIdStr();
                params.isInviteAll = true;
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                if (!params.pushIdStr) {
                    Showbo.Msg.alert('当前页没有可选项！');
                    return false;
                }
                Showbo.Msg.confirm(cfm, function (btn) {
                    if (btn == 'yes') {
                        operated(url, params, rows);
                    } else {
                        return false;
                    }
                });
                break;
            case 'mPushunsuitable':
                cfm = '<h2>确定邀请选中候选人不合适？</h2>';
                url = 'application/markpush';
                params.etpMark = 2;
                params.pushIdStr = getIdStr();
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                if (!params.pushIdStr) {
                    Showbo.Msg.alert('当前页没有可选项！');
                    return false;
                }
                Showbo.Msg.confirm(cfm, function (btn) {
                    if (btn == 'yes') {
                        operated(url, params, rows);
                    } else {
                        return false;
                    }
                });
                break;
            case 'mRestore':
                url = 'application/markresumeapplystatus';
                params.applyStatus = 1002;
                params.applyIdStr = getIdStr();
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                if (!params.applyIdStr) {
                    Showbo.Msg.alert('当前页没有可选项！');
                    return false;
                }
                operated(url, params, rows);
                break;
            case 'mDestroy':
                cfm = '<h2>确定彻底删除选中简历？</h2><div class="d-tips">彻底删除这些简历后，您将无法找回</div>';
                url = 'application/markresumeapplystatus';
                params.applyStatus = 99;
                params.applyIdStr = getIdStr();
                params.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                if (!params.applyIdStr) {
                    Showbo.Msg.alert('当前页没有可选项！');
                    return false;
                }
                var rows = $('.item-check').filter(':checked').closest('tbody');
                Showbo.Msg.confirm(cfm, function (btn) {
                    if (btn == 'yes') {
                        operated(url, params, rows);
                    } else {
                        return false;
                    }
                });
                break;
            default:
                break;
        }
    })
    function checkbox($this) {
        var temp = '',
            ele = $this.closest('tr').children('.job').find('.toggle');
        arrPosition = [];//全局数组，获取所有职位
        $.each(ele, function (i, v) {
            arrPosition.push({ 'value': $(v).attr('data-pushid'), 'str': $(v).html() });
        });
        var arrLen = arrPosition.length;
        if (arrLen > 10) {
            for (var i = 0 ; i < 10 ; i++) {
                temp += '<p style="line-height:1.5;font-size:16px;color:#4566a3;"><input class="invite-push-input" style="margin-right:3px;" type="checkbox" value="' + arrPosition[i].value + '" /><label for="push' + i + '">' + arrPosition[i].str + '</label></p>';
            }
        } else {
            for (var i = 0 ; i < arrLen ; i++) {
                temp += '<p style="line-height:1.5;font-size:16px;color:#4566a3;"><input class="invite-push-input" style="margin-right:3px;" type="checkbox" value="' + arrPosition[i].value + '" /><label for="push' + i + '">' + arrPosition[i].str + '</label></p>';
            }
        }
        return temp;
    }
    function operated(url, params, rows) {
        //url    请求地址
        //params 参数
        //$el    操作元素
        $.ajax({
            type: 'POST',
            url: url,
            data: params,
            dataType: 'json',
            success: function (data) {
                $.alert(data.tipmsg);
                if(location.href.indexOf('?')==-1){
                    var urlInner = location.href + '?t=' + Math.random()
                } else {
                    var urlInner = location.href + '&t=' + Math.random()
                }
                if (data.code == 0) {
                    $.ajax({
                        type: 'get',
                        url: urlInner ,
                        dataType: 'HTML',
                        beforeSend: function () { angelastate = "1" },
                        success: function (data) {
                            $('.container').children().eq(0).siblings().remove();
                            $('.container').children().eq(0).after(data);
                            $('.channel-bd .select').select();
                            if ($('.select li').attr('data-url')) {
                                $('.select li').click(function (e) {
                                    var durl = $(this).attr("data-url");
                                    if (durl != undefined && durl.length > 0) {
                                        location.href = durl;
                                        return false;
                                        $form = $(this).closest('form');
                                        $form.submit();
                                    }
                                });
                            } else {
                                $('.select li').click(function (e) {
                                    var durl = $(this).attr("data-id");
                                    if (durl != undefined && durl.length > 0) {                                       
                                        $form = $(this).closest('form');
                                        $form.submit();
                                    }
                                });
                            }
                        }
                    })
                }
            }
        })
    }
    function operatedUn(url, params, rows) {
        //url    请求地址
        //params 参数
        //$el    操作元素
        $.ajax({
            type: 'POST',
            url: url,
            data: params,
            dataType: 'json',
            success: function (data) {
                $.alert(data.tipmsg);
                if (location.href.indexOf('?') == -1) {
                    var urlInner = location.href + '?t=' + Math.random()
                } else {
                    var urlInner = location.href + '&t=' + Math.random()
                }
                if (data.code == 0) {
                    rows.removeClass('unhandle');
                    rows.find('[data-action="interest"]').addClass('solo-action-iv').removeAttr('data-action').text('通知面试');
                    rows.find('.job').children('span').text('已感兴趣');
                }
            }
        })
    }
    function operatedInvite(url, params, rows) {
        //url    请求地址
        //params 参数
        //$el    操作元素
        $.ajax({
            type: 'POST',
            url: url,
            data: params,
            dataType: 'json',
            success: function (data) {
                $.alert(data.tipmsg);
                if (location.href.indexOf('?') == -1) {
                    var urlInner = location.href + '?t=' + Math.random()
                } else {
                    var urlInner = location.href + '&t=' + Math.random()
                }
                if (data.code == 0) {
                    rows.find('.actions').empty().append('<div class="u-user-fired">已发送短信、邮件邀请</div>');
                }
            }
        })
    }
    function renderRow(rowData, isShowCheck) {
        var row =   '<tr class="interval">' +
                        '<td colspan="6" class="noborder"></td>'+
                    '</tr>'+
                    '<tr class="row-hd" id="' + rowData.ApplyId + '">' +
                        '<td class="first">';
                        if (isShowCheck) {
                            row += '<input type="checkbox" class="item-check">';
                        }
                row += '</td>' +
                        '<td colspan="2" class="column">' +
                            '<div class="user-info-top">' +
                                '<a href="/application/resume?applyId="' + rowData.ApplyId + '" class="user-name" target="_blank">' + rowData.UserName + '</a>' +
                                '<span class="user-meta">' + rowData.GenderName + '/' + rowData.CurrentLocationName + '</span>' +
                            '</div>' +
                        '</td>' +
                        '<td colspan="2" class="last">' +
                            '<div class="applicant-operates">';
                        if (isShowCheck) {
                        row += '<a href="http://Upload.test.com/api/stuupload/downloadresume?applyIds='+rowData.ApplyId+'&amp;time='+new Date().getTime()+'" class="solo-action-link" data-action="download" title="下载"><i class="a-o-download"></i>下载</a>' +
                                '<a href="javascript:;" class="solo-action-link" data-action="forward" title="转发"><i class="a-o-transpond"></i>转发</a>';
                        }
                        row += '<a href="javascript:;" class="solo-action-link" id="legend-btn" data-action="legend" title="备注"><i class="a-o-legend">';
                        if (rowData.NoteList.length > 0) {
                            row += '<span class="legend-count">' + rowData.NoteList.length + '</span>';
                        }
                        row += '</i>备注</a>';
                        if (rowData.IsFavorite) {
                            row += '<a href="javascirpt:;" class="solo-action-link" data-action="uncollect" title="取消收藏"><i class="a-o-uncollect"></i>取消收藏</a>';
                        } else {
                            row += '<a href="javascirpt:;" class="solo-action-link" data-action="collect" title="收藏"><i class="a-o-collect"></i>收藏</a>';
                        }   
                            row += '<a href="javascirpt:;" class="solo-action-link" data-action="delete" title="删除"><i class="a-o-delete"></i>删除</a>' +
                            '</div>' +
                    '</td>' +
                '</tr>' +
                '<tr class="tbl-row">' +
                    '<td class="check"></td>' +
                    '<td class="user">' +
                        '<a href="/application/resume?applyId=' + rowData.ApplyId + '" class="user-avatar" target="_blank">' +
                            '<img src="' + rowData.UserAvatarUrl + '" alt="" title="">' +
                        '</a>' +
                        '<div class="user-info">' +
                            '<div class="user-info-row">' +
                                '<p>' + rowData.DegreeName + ' | ' + rowData.Major + ' | ' + rowData.SchoolName + ' </p>' +
                            '</div>' +
                        '</div>' +
                    '</td>' +
                    '<td class="job">' +
                        '<a href="' + rowData.PositionUrl + '" class="b-link position-name" target="_blank">' + rowData.Position + '</a>' +
                        '<span class="job-location">' + rowData.jobCityName + '</span>' +
                    '</td>' +
                    '<td class="time">' + rowData.ApplyTime + '</td>' +
                    '<td class="actions">';
                    if (rowData.ApplyStatus == 28) {
                        row += '<a href="javascript:;" class="solo-action m-solo-action solo-action-iv">通知面试</a>' +
                               '<a href="javascript:;" class="solo-action m-solo-action" data-action="unsuitable">不合适</a>';
                    } else if (rowData.ApplyStatus == 61 || rowData.ApplyStatus == 71) {
                        row += '<a href="javascript:;" class="solo-action l-solo-action" data-action="interest">恢复为感兴趣</a>';
                    } else if (rowData.ApplyStatus == 21) {
                        row += '<a href="javascript:;" class="solo-action m-solo-action" data-action="interest">感兴趣</a>' +
                               '<a href="javascript:;" class="solo-action m-solo-action" data-action="unsuitable">不合适</a>';
                    } else if (rowData.ApplyStatus == 31) {
                        row += '<a href="javascript:;" class="solo-action a-solo-action" data-action="schedule">面试日程<i class="a-arrow"></i></a>';
                    }
                    row += '</td>' +
                '</tr>';
                if (rowData.InterViewInfo) {
                    for (var i = 0; i < rowData.NoteList.length; i++) {
                        row += '<tr class="inter-row">' +
                                    '<td colspan="5">' +
                                        '<div class="inter-info">' +
                                            '<span>面试时间：2015/7/2 10:30:00</span>' +
                                            '<span>面试地址：上海市浦东新区世纪大道</span>' +
                                            '<span>联系人：张冬林(021-11)</span>' +
                                            '<i class="ico-arrow"></i>' +
                                        '</div>' +
                                    '</td>' +
                                '</tr>';
                    }
                }
                
                row += '<tr class="inter-row">' +
                            '<td colspan="5">' +
                                '<div class="legend-info">' +
                                    '<h3>简历备注</h3>';
                                    if (rowData.NoteList.length > 0) {
                                        for (var i = 0; i < rowData.NoteList.length; i++) {
                                            row += '<div class="ld-item" data-ld-id="' + rowData.NoteList[i].Id + '"><span class="ld-date">' + rowData.NoteList[i].CreateDateD + '</span><span class="ld-time">' + rowData.NoteList[i].CreateDateH + '</span><span class="ld-info">' + rowData.NoteList[i].Note + '</span><i class="del-legend"></i></div>';
                                        }
                                    }
                                    row += '<div class="add-ld">'+
                                        '<input type="text" value="" placeholder="添加简历备注，300字以内" class="ui-text-s add-ld-input">'+
                                        '<a href="javascript:;" class="add-ld-btn" id="submit-ld-btn">添加简历备注</a>' +
                                    '</div>' +
                                '</div>' +
                            '</td>' +
                        '</tr>';

        return row;
    }

    //$(document).on('click', '[data-action="legend"]', function () {
    //    var $this = $(this),
    //        $row = $this.closest('tr'),
    //        $legendRow = $row.siblings(':last');
    //    $legendRow.toggleClass('inter-row-show');
    //    if ($legendRow.hasClass('inter-row-show')) {
    //        $legendRow.siblings().removeClass('inter-row-show');
    //        $legendRow.siblings('.tbl-row').addClass('noBorderBottom');
    //    } else {
    //        $legendRow.siblings('.tbl-row').removeClass('noBorderBottom');
    //    }
    //})

    var applyid, dataLength;
    $(document).on('click', '[data-action="legend"]', function () {
        applyid = $(this).closest('tr').attr('id');
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/Application/GetNoteListByApplyId',
            data: {
                applyid: applyid
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
                //w1 = $(window).width();
                //$('html').addClass('fancybox-lock-test');
                //w2 = $(window).width();
                //$("<style type='text/css'>html{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");    //禁用滚动条
            }
        })
        //var sHeight = $('body').scrollTop();
        //$(window).bind('scroll',function () {
        //    window.scrollTo(0, sHeight);
        //});
    })
    $(document).on('click', '#submit-ld-btn', function () {
        var Ldval = $('#alert-input').val(),
            $this = $(this),
            $id = applyid;
        data = {},
        LdItem = $('<div class="m-memucontent" data-ld-id="">' +
                '<div class="m-minHead">' +
                '</div><div class="m-minHeadR del-legend"></div>' +
                '<div class="m-minContent"></div>' +
                '</div>');
        if (Ldval != '') {
            if (Ldval.length < 100) {
                data.applyId = applyid;
                data.note = Ldval;
                data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                $.ajax({
                    type: 'post',
                    url: '/application/addapplynote',
                    data: data,
                    success: function (data) {
                        var conval = data.dt1 +"  "+data.dt2;
                        var itemL = $('div').filter('.m-memucontent').length;
                        if (data.code > 0) {
                            LdItem.find('.m-minHead').html(conval);
                            LdItem.find('.m-minContent').html(Ldval);
                            LdItem.attr('data-ld-id', data.code);
                            switch(itemL){
                                case 0: $('.hfilter').append(LdItem);
                                    dynamicChange(0,conval,Ldval);
                                    break;
                                case 1: 
                                case 2: LdItem.insertBefore($('.hfilter .m-memucontent').first());
                                    dynamicChange(2,conval,Ldval);
                                    break;
                                default: LdItem.insertBefore($('.hfilter .m-memucontent').first());
                                    dynamicChange(3,conval, Ldval);
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

    $(document).on('click', '.del-legend', function () {
        
        var $this = $(this),
            data = {};
        data.noteId = $this.parent().attr('data-ld-id'),
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        tempL = $('[id=' + applyid + ']').find('[data-action="legend"]').parent();
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
                    alert('error!');
                }
                //删除简历更新hover数据
                var mconLen = dataLength, minTemplate='';
                switch(mconLen){
                    case 0: $(tempL).siblings('.m-boxHover').remove();
                            $(tempL).siblings('.m-utrian').remove();
                            break;
                    case 1:
                    case 2:
                    case 3: $('.hfilter').find('.m-memucontent').each(function (i, v) {
                        minTemplate += '<div class="m-memu" data-ld-id="">' +
                                          '<div class="m-minH">' + $(v).find('.m-minHead').text() + '</div>' +
                                          '<div class="m-minC">' + $(v).find('.m-minContent').text() + '</div>' +
                                      '</div>'
                    });
                        $(tempL).siblings('.m-boxHover').children('.m-memu').remove();
                        $(tempL).siblings('.m-boxHover').append(minTemplate);
                        break;
                    default: $('.hfilter').find('.m-memucontent').each(function (i, v) {
                        if (i < 3) {
                            minTemplate += '<div class="m-memu" data-ld-id="">' +
                                         '<div class="m-minH">' + $(v).find('.m-minHead').text() + '</div>' +
                                         '<div class="m-minC">' + $(v).find('.m-minContent').text() + '</div>' +
                                     '</div>'
                        }
                        });
                        $(tempL).siblings('.m-boxHover').children('.m-memu').remove();
                        $(tempL).siblings('.m-boxHover').append(minTemplate);
                        break;
                }
            }
        })
    });
    function changeColor(temp) {
        var $temp = $('[id=' + applyid + ']').find('[data-action="legend"]');
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
        var count = $('[id='+applyid+']').find('.legend-count');
        if (count.length > 0) {
            if ($('.legend-info').find('.m-memucontent').length > 0) {
                count.html($('.legend-info').find('.m-memucontent').length);
            } else {
                count.remove();
                changeColor(2);
            }
        } else {
            $('[id=' + applyid + ']').find('.a-o-legend').append($('<span class="legend-count"></span>').html($('.legend-info').find('.m-memucontent').length));
            changeColor(1);         
        }
    }
    function dynamicChange(number,conval,Ldval) {
        var templateWhole = '<div class="m-boxHover" style="position: absolute; line-height: 20px; width: 396px; top: 50px; right: 50px; z-index: 3; border: 1px solid rgb(245, 203, 57); display: none; background-color: rgb(255, 251, 243);">' +
                                '<div class="m-hoverHead" style="font-size:14px;color:#333;height:30px;"><span style="float:left;margin-left:20px;margin-top:8px;">简历备注<span style="color:#999">（只显示最新三条）</span></span></div>' +
                                '<div class="m-memu" data-ld-id="">' +
                                    '<div class="m-minH">' + conval + '</div>' +
                                    '<div class="m-minC">' + Ldval + '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="m-utrian" style="position:absolute;z-index:3;top:30px;right:137px;border-width:10px;border-style:solid;border-color:transparent transparent #f5cb39 transparent;line-height: 0; display:none;"></div>' +
                            '<div class="m-utrian" style="position:absolute;z-index:4;top:31px;right:137px;border-width:10px;border-style:solid;border-color: transparent transparent #FFFBF3 transparent;line-height: 0;display:none;"></div>',
            templateCase = '<div class="m-memu" data-ld-id="">' +
                               '<div class="m-minH">' + conval + '</div>' +
                               '<div class="m-minC">' + Ldval + '</div>' +
                           '</div>',
            $temp = $('[id=' + applyid + ']').find('[data-action="legend"]').parent(), $tempCh = $temp.parent().find('.m-boxHover');
        switch (number){
            case 0: $temp.after(templateWhole);
                break;
            case 1:
            case 2: $tempCh.find('.m-memu:first').before(templateCase);
                break;
            default: $tempCh.find('.m-memu:first').before(templateCase);
                $tempCh.find('.m-memu:last').remove();
                break;
        }
    }
    $(document).on('click', '#delete-btn', function () {
        if (!confirm('确定删除简历？该操作不可恢复')) {
            return false;
        }
    })

    $(document).on('click','[data-action="download"]',function () {
        if ($(this).hasClass('multi-action-diabled')) {
            return false;
        }
        if ($(this).hasClass('multi-action')) {
            if (getIdStr()) {
                location.href = $(this).attr('href') + getIdStr();
                return false;
            }
            return false;
        }
    })

    $(document).on('click','[data-action="forward"]',function () {
        if ($(this).hasClass('multi-action-diabled')) {
            return false;
        }
        var ids ='';
        if ($(this).hasClass('multi-action')) {
            ids = getIdStr();
        } else {
            ids = $(this).closest('tr').attr('id');
        }
        var dialog = new Dialog();
        dialog.init({
            target: '\
                    <div class="forward-dailog">\
                        <div class="ui-form-item">\
                            <label for="subject" class="ui-label">转发给</label>\
                            <input type="text" name="" id="forwardEmails" class="ui-text" placeholder="Email地址">\
                            <p style="margin:10px 0 20px 0; color:#999;display:none;">多个Email地址用；隔开（最多5个Email地址）</p>\
                            <div class="ui-form-explain"></div>\
                        </div>\
                        <div class="ui-form-item">\
                            <button type="button"  id="forwardEmail" class="ui-btn ui-btn-ok-s mr10">转发</button>\
                            <button type="button" id="close-dialog" class="ui-btn ui-btn-cancel-s">取消</button>\
                        </div>\
                    </div>\
                   ',
            trigger:$(this),
            mask: true,
            title: '转发简历',
            animate: true
        });
        dialog.show();

        $('#forwardEmail').click(function () {
            if($('#forwardEmails').val() == ''){
                Showbo.Msg.alert('转发Email不能为空！');
            }
            $.ajax({
                url: '/Application/SendForwardResumeEmail',
                type: 'post',
                data: {
                    applyIds: ids,
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
        })

        $('#close-dialog').click(function () {
            dialog.dispose();
        })
    })

    $(document).on('click', '.btn-fun-video', function () {
        var userid = $(this).closest('tr').attr('id');
        $.ajax({
            type: 'post',
            url: '/Application/GetVideoUrl',
            dataType: 'json',
            data: {
                UserId: userid,
            },
            success: function (data) {
                if (data.code) {
                    /**
                    * 设置视频播放参数
                    * @param {Object} width 视频宽度
                    * @param {Object} height 视频高度
                    * @param {Object} autoPlay 是否自动播放 "yse"or"no"
                    * @param {Object} videoUrl 视频文件地址
                    * @param {Object} divId 显示的divID
                    * @param {Object} thumbURL 显示的divID
                    * @param {Object} logoURL //Logo文件地址
                    * @param {Object} logoSite //Logo文件地址
                    */
                    var swfUrl = 'http://static.test.com/zheyibu/components/cuplayer/CuPlayerMiniV4.swf';
                    var configUrl = 'http://static.test.com/zheyibu/components/cuplayer/CuPlayerSetFile.xml';
                    var thumbUrl = 'http://static.test.com/zheyibu/components/cuplayer/images/start.jpg';
                    var logoUrl = 'http://static.test.com/zheyibu/components/cuplayer/images/Logo.png';
                    var logoSite = 'right-top';
                    //data.Url = 'http://upload.zheyibu.com/upload/wechat/video/case/Tod.mp4';   //测试用
                    function setVideo(swfUrl,configUrl,width, height, autoPlay, videoUrl, divID, thumbUrl, logoUrl, logoSite) {
                        var so = new SWFObject(swfUrl, "CuPlayerV4", width, height, "9", "#000000");
                        so.addParam("allowfullscreen", "true");
                        so.addParam("allowscriptaccess", "always");
                        so.addParam("wmode", "opaque");
                        so.addParam("quality", "high");
                        so.addParam("salign", "lt");
                        so.addVariable("CuPlayerSetFile", configUrl); //配置文件地址
                        so.addVariable("CuPlayerFile", videoUrl);
                        so.addVariable("CuPlayerImage", thumbUrl);
                        so.addVariable("CuPlayerWidth", width);
                        so.addVariable("CuPlayerHeight", height);
                        so.addVariable("CuPlayerAutoPlay", autoPlay);
                        so.addVariable("CuPlayerLogo", logoUrl); //Logo文件地址
                        so.addVariable("CuPlayerPosition", logoSite); //Logo显示的位置
                        so.write(divID);
                    }
                    var dialog = new Dialog();
                    dialog.init({
                        target: '<div id="video-player"></div>',
                        trigger: $(this),
                        mask: true,
                        title: '视频简历',
                        animate: false
                    });
                    setVideo(swfUrl, configUrl, 480, 300, 'no', data.Url, 'video-player', thumbUrl, logoUrl, logoSite);
                    dialog.show();
                    $('#close-dialog').click(function () {
                        dialog.dispose();
                    })
                }
            }
        })
    })
    //通知面试
    $(document).on('click', '.solo-action-iv', function () {
        var $this = $(this);
        var applyid = $(this).closest('tr').prev().attr('id');
        var rows = $this.closest('tbody');
        $.ajax({
            type:'get',
            dataType:'html',
            url: '/resume/notification-interview',
            data:{
                position_apply_id: applyid
            },
            success: function (data) {
                var dialog = new Dialog();
                dialog.init({
                    target:data,
                    trigger: $(this),
                    mask: true,
                    title: '',
                    animate: true,
                    closeTpl:null
                });
                dialog.show();
                $('#close-dialog').click(function () {
                    dialog.dispose();
                })    
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
                        InterviewTime:{
                            required:true
                        },
                        InterviewHour:{
                            required: true,
                            checkInterivewHour:true
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
                            $.alert('通知面试成功！');
                            rows.find('.solo-action-iv').removeClass('solo-action-iv').text('面试日程').attr('data-action', 'schedule');
                            rows.find('[data-action="unsuitable"]').remove();
                            rows.find('.job').children('span').text('已通知面试');
                        }
                    }
                })
                
            }
        })
    })

    $(document).on('click','.solo-action-inviteother',function () {
        var pushid = $(this).closest('tr').attr('id');
        $.ajax({
            type: 'get',
            dataType: 'html',
            url: '/Pop/PtlViewInviteApplyOnPush',
            data: {
                pushid: pushid
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
                            pushid: pushid,
                            ispagecontents:1,
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
                            location.href = location.href;
                        }
                    }
                })

                $('#close-dialog').click(function () {
                    dialog.dispose();
                })
            }
        })
    })

    $(document).on('click','[data-action="schedule"]',function () {
        var data = $(this).closest('tr').parent().find('.row-hd').attr('id');
        $.ajax({
            type: 'get',
            url: '/application/getinterviewbyapplyid?applyid='+data,
            success: function (data) {
                if (data.code == 0) {
                    var targetDialog = new Dialog();
                    targetDialog.init({
                        target: '<div class="m-inper"><span class="u-color">候&nbsp;选&nbsp;人：</span>' + data.stuName +" ( 应聘"+data.positionName+" )"+ '</div>' +
                                '<div class="m-intime"><span class="u-color">面试时间：</span>' + data.interviewTime + '</div>' +
                                '<div class="m-inplace"><span class="u-color">面试地点：</span>' + data.interviewPlace + '</div>' +
                                '<div class="m-contact"><span class="u-color">联&nbsp;系&nbsp;人：</span>' + data.contact + '</div>',
                        trigger: $(this),
                        mask: true,
                        title: '面试日程',
                        animate: true
                    });
                    targetDialog.show();
                    $('#close-dialog').click(function () {
                        targetDialog.dispose();
                    });
                } else {
                    Showbo.Msg.alert(data.msg);
                }
            }
        })
        
    })

    $(document).on('mouseover', '.t-row', function (e) {
        e = e || event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        $(this).addClass('hover');
        $(this).find('.applicant-operates').css('visibility', 'visible');
        //$(this).find('.u-hasStar').css('visibility', 'visible');
        //$(this).find('[data-action="legend"] .u-meto').css('visibility', 'visible');
    })

    $(document).on('mouseout', '.t-row', function (e) {
        e = e || event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        $(this).removeClass('hover');
        //$(this).find('.applicant-operates').css({ 'visibility': 'hidden' });
        //$(this).find('.u-hasStar').css('visibility', 'hidden');
        //$(this).find('[data-action="legend"] .u-meto').css('visibility', 'hidden');
    })

    $(document).on('click','.item-check',function () {
        if (!$(this)[0].checked) {
            $(this).closest('.t-row').removeClass('checked');
            var ids = getIdStr();
            if (ids.length == 0) {
                $('.multi-action').addClass('multi-action-diabled');
                $('.item-check-all').attr('checked', false);
            }
        } else {
            $(this).closest('.t-row').addClass('checked');
            $('.multi-action').removeClass('multi-action-diabled');
        }
    })

    $(document).on('click', '.item-check-all', function () {
        if (!$(this)[0].checked) {
            $('.t-row').find('.item-check').attr('checked', false);
            $('.t-row').removeClass('checked');
            $('.multi-action').addClass('multi-action-diabled');
        } else {
            $('.t-row').find('.item-check').attr('checked', true);
            $('.t-row').each(function () {
                $(this).find('.item-check').length > 0 ? $(this).addClass('checked') : '';
            })
            $('.multi-action').removeClass('multi-action-diabled');
        }
    })
    
    $(document).on('click','.u-onlyStar', function () {
        $('.u-onlyStar').addClass('u-onlyStarLight');
    })
    $(document).on('click', '.u-super', function (e) {
        $('#formFilter').slideToggle(100, function (e) {          
            if ($('.u-icon-down').hasClass('u-icon-up')) {
                $('.u-icon-down').removeClass('u-icon-up');
            } else {
                $('.u-icon-down').addClass('u-icon-up');
            }
        });
    });
    $(document).on('click', '.u-left', function (e) {
        $('.u-user-process').slideToggle(100);
    })
    $(document).on('click', '.u-resume-delete', function () {
        var d_url = $(this).attr('data-url');
        $.ajax({
            type: 'post',
            url: d_url,
            data:{__RequestVerificationToken : $('input[name=__RequestVerificationToken]').val(),},
            success: function (data) {
                location.href = data.redirectUrl;
            }
        })
    })
    var getIdStr = function () {
       var $chks = $('.item-check'),
           str = '';
        $chks.filter(':checked').closest('tr').each(function () {
            str += ',' + $(this).attr('id');
        });
        return str.substring(1);
    }
    //视频简历
    $(document).on('click', '.u-user-video', function () {
        var userid = $(this).data('userid');
        $.ajax({
            type: 'post',
            url: '/Application/GetVideoUrl',
            dataType: 'json',
            data: {
                UserId: userid,
            },
            success: function (data) {
                if (data.code == 1) {
                    var videoUrl = BaofengUrl + data.url + '&auto=1';
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
                }
                else {
                    alert("视频获取失败")
                }
            }
        })
    })
    //简历备注hover
    $('.m-hclick').click(function () {
        $(this).parent().parent().parent('.last').find('[data-action="legend"]').trigger('click');
    });
    /*鼠标移入移出事件 防止多次触发*/
    function contains(parentNode, childNode) {
        if (parentNode.contains) {
            return parentNode != childNode && parentNode.contains(childNode);
        } else {
            return !!(parentNode.compareDocumentPosition(childNode) & 16);
        }
    }
    function checkHover(e, target) {
        if (getEvent(e).type == "mouseenter") {
            return !contains(target, getEvent(e).relatedTarget || getEvent(e).fromElement) && !((getEvent(e).relatedTarget || getEvent(e).fromElement) === target);
        } else {
            return !contains(target, getEvent(e).relatedTarget || getEvent(e).toElement) && !((getEvent(e).relatedTarget || getEvent(e).toElement) === target);
        }
    } function getEvent(e) {
        return e || window.event;
    }
    /*鼠标移入移出事件 防止多次触发*/
    $(document).on('mouseenter', '.u-legend-btn', function (e) {
        if (checkHover(e,this)) {
            $(this).parent().siblings('.m-boxHover').css({ display: 'block' });
            $(this).parent().siblings('.m-utrian').css({ display: 'block' });
            $(this).parent().siblings('.m-dtrian').css({ display: 'block' });
        }
    });
    $(document).on('mouseleave', '.u-legend-btn', function (e) {
        if (checkHover(e,this)) {
            $(this).parent().siblings('.m-boxHover').css({ display: 'none' });
            $(this).parent().siblings('.m-utrian').css({ display: 'none' });
            $(this).parent().siblings('.m-dtrian').css({ display: 'none' });
        }
    });
    $('.filter-out').on('click','input',function () {
        location.href = $(this).parent().attr('href');
    });
    //增加推荐简历tips
    $('.push-tips i').click(function () {
        $(this).parent().hide();
        $.ajax({
            type: 'POST',
            data:{
                __RequestVerificationToken : $('input[name=__RequestVerificationToken]').val(),
            },
            url: '/Application/CloseTheStuPushPageTips'
        });
    });
})

