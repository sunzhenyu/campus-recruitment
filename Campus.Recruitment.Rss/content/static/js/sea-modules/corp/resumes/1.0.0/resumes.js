define(function (require, exports, module) {

    var $ = require('$');
    var Widget = require('arale/widget/1.1.1/widget');
    var Confirm = require('corp/confirm/1.0.0/confirm');
    var Dialog = require('arale/dialog/1.3.0/dialog');
    var ConfirmBox = require('arale/dialog/1.3.0/confirmbox');

    var Resumes = Widget.extend({
        attrs: {
            element: '#J_RsmMnger',
            checkOne: $('.item-check'),
            checkAll: $('.item-check-all'),
            single:true
        },
        events: {
            'click #J_FilterMoreBtn': 'expandFilter',
            'click .inter-calendar-btn': 'expandIvInfo',
            'click #legend-btn': 'legendtoggle',
            'click .del-legend':'deletelegend',
            'click #submit-ld-btn':'addlegend',
            'click .solo-action': 'soloHandle',
            'click .solo-action-link': 'soloHandle',
            'click .multi-action': 'multiHandle',
            'change .item-check-all': 'checkall',
            'change .item-check': 'checkone',
            'mouseenter .t-row': function (e) {
                var target = $(e.currentTarget).addClass('hover');
            },
            'mouseleave .t-row': function (e) {
                var target = $(e.currentTarget).removeClass('hover');
            }
        },
        setup: function () {
            this.initInterView();
            this.initInvite();
        },
        soloHandle: function (e) {
            var target = $(e.currentTarget);
            if (target.attr('active') == 0) {
                var url = target.attr('href');
                var actionType = target.attr('action-type');

                switch (actionType) {
                    case 'delete':
                        e.preventDefault();
                        this.soloDelete(target, url);
                        break;
                    case 'unsuitable':
                        e.preventDefault();
                        this.soloUnsuitable(target, url);
                        break;
                    case 'invite':
                        e.preventDefault();
                        this.soloInvite(target, url);
                        break;
                    case 'forward':
                        e.preventDefault();
                        this.soloForward(target, url);
                        break;
                }
            }
        },
        multiHandle: function (e) {
            
            var target = $(e.currentTarget);

            //判断操作是否可用 且 没有确认消息
            if (!target.hasClass('multi-action-diabled') && target.attr('active') == 0) {
                var idStr = this.getIdStr(),
                    url = target.attr('href') + idStr;
                actionType = target.attr('action-type');

                switch (actionType) {
                    case 'delete':
                        e.preventDefault();
                        this.multiDelete(target, url);
                        break;
                    case 'unfav':
                        e.preventDefault();
                        this.multiUnfav(target, url);
                        break;
                    case 'invite':
                        e.preventDefault();
                        this.multiInvite(target, url);
                        break;
                    case 'fav':
                        e.preventDefault();
                        location = url;
                        break;
                    case 'download':
                        e.preventDefault();
                        location = url;
                        break;
                    case 'forward':
                        e.preventDefault();
                        this.multiForward(target,url)
                        break;
                }
            }
            e.preventDefault();
        },
        //单操作
        soloDelete: function (target, url) {
            var that = this;
            if (that.get('single')) {
                new Confirm({
                    message: '确定删除简历？该操作不可恢复',
                    onConfirm: function () {
                        location = url;
                        this.hide();
                    },
                    onCancel: function () {
                        target.parent().removeAttr('style');
                    }
                })
                .before('show', function () {
                    target.attr('active', 1);
                    that.set('single', false);
                    this.set('align', {
                        baseElement: target,
                        selfXY: ["100%", "100% + 8"],
                        baseXY: ["100% + 118", 148]
                    });
                })
               .show()
               .after("hide", function () {
                   target.attr('active', 0);
                   that.set('single', true);
                   $("#topAlert").slideUp(1000);
                   this.destroy();
                });
            }
            
        },
        soloInvite: function (target, url) {
            var that = this;
            if (that.get('single')) {
                new Confirm({
                    message: '确定邀请候选人投递简历？',
                    onConfirm: function () {
                        location = url;
                        this.hide();
                    },
                    classPrefix: 'general-confirm',
                    width: 216
                })
                .before('show', function () {
                    target.attr('active', 1);
                    that.set('single', false);
                    this.set('align', {
                        baseElement: target,
                        selfXY: ["100%", "100% + 8"],
                        baseXY: ["100% + 80", 142]
                    });
                })
                .show()
                .after("hide", function () {
                    target.attr('active', 0);
                    that.set('single', true);
                    this.destroy();
                });
            }  
        },
        soloUnsuitable: function (target, url) {
            var that = this;
            if (that.get('single')) {
                new Confirm({
                    message: '确定该简历不符合职位要求吗？',
                    onConfirm: function () {
                        location = url;
                        this.hide();
                    },
                    classPrefix: 'general-confirm',
                    width: 216
                })
                .before('show', function () {
                    console.log(this);
                    target.attr('active', 1);
                    that.set('single', false);
                    this.set('align', {
                        baseElement: target,
                        selfXY: ["100%", "100% + 8"],
                        baseXY: ["100% + 80", 142]
                    });
                })
                .show()
                .after("hide", function () {
                    target.attr('active', 0);
                    that.set('single', true);
                    this.destroy();
                });
            }
            
        },
        soloForward: function (target, url) {
            new Dialog({
                content: url,
                initialHeight: 210
            }).show();
        },
        multiDelete: function (target, url) {
            var that = this;
            if (that.get('single')) {
                new Confirm({
                    message: '确定删除简历？该操作不可恢复',
                    onConfirm: function () {
                        location = url;
                        this.hide();
                    }
                })
                .before('show', function () {
                    target.attr('active', 1);
                    that.set('single', false);
                    this.set('align', {
                        baseElement: target,
                        selfXY: ["100%", "100% + 8"],
                        baseXY: ["100% + 90", 158]
                    });
                })
               .show()
               .after("hide", function () {
                   target.attr('active', 0);
                   that.set('single', true);
                   this.destroy();
               });
            }  
        },
        multiUnfav: function (target, url) {
            var that = this;
            if (that.get('single')) {
                new Confirm({
                    message: '确定该简历不符合职位要求吗？',
                    onConfirm: function () {
                        location = url;
                        this.hide();
                    }
                })
                .before('show', function () {
                    target.attr('active', 1);
                    that.set('single', false);
                    this.set('align', {
                        baseElement: target,
                        selfXY: ["100%", "100% + 8"],
                        baseXY: ["100% + 92", 160]
                    });
                })
               .show()
               .after("hide", function () {
                   target.attr('active', 0);
                   that.set('single', true);
                   this.destroy();
               });
            }
        },
        multiInvite: function (target, url) {
            var that = this;
            if (that.get('single')) {
                new Confirm({
                    message: '确定邀请候选人投递简历？',
                    onConfirm: function () {
                        location = url;
                        this.hide();
                    }
                })
                .before('show', function () {
                    target.attr('active', 1);
                    that.set('single', true);
                    this.set('align', {
                        baseElement: target,
                        selfXY: ["100%", "100% + 8"],
                        baseXY: ["100% + 90", 160]
                    });
                })
                .show()
                .after("hide", function () {
                    target.attr('active', 0);
                    that.set('single', true);
                    this.destroy();
                });
            }  
        },
        multiForward: function (target, url) {
            new Dialog({
                content: url,
                initialHeight: 210
            }).show();
        },
        expandFilter: function (e) {
            var target = $(e.currentTarget),
                $filterWrap = $('#J_FilterWrap'),
                showClass = 'data-filter-show';
            if (target.hasClass(showClass)) {
                $filterWrap.hide();
                target.removeClass(showClass).html('更多筛选条件');
            } else {
                $filterWrap.show();
                target.addClass(showClass).html('收起筛选条件');
            }
        },
        expandIvInfo: function (e) {
            var target = $(e.currentTarget),
                $row = target.closest('tr'),
                $ivInfoRow = $row.next(),
                classArr = ['noBorderBottom', 'inter-btn-showed', 'inter-row-show'];
            if ($ivInfoRow.hasClass(classArr[2])) {
                target.removeClass(classArr[1]);
                $row.removeClass(classArr[0]);
                $ivInfoRow.removeClass(classArr[2]);
            } else {
                target.addClass(classArr[1]);
                $row.addClass(classArr[0]);
                $ivInfoRow.addClass(classArr[2]);
                $ivInfoRow.siblings().removeClass(classArr[2]);
            }
        },
        legendtoggle:function(e){
            var target = $(e.currentTarget),
                $row = target.closest('tr'),
                $legendRow = $row.siblings(':last');
            $legendRow.toggleClass('inter-row-show');
            if ($legendRow.hasClass('inter-row-show')) {
                $legendRow.siblings().removeClass('inter-row-show');
                $legendRow.siblings('.tbl-row').addClass('noBorderBottom');
            } else {
                $legendRow.siblings('.tbl-row').removeClass('noBorderBottom');
            }
        },
        addlegend: function (e) {
            
            var target = $(e.currentTarget),
                $row = target.closest('tr'),
                Ldval = $row.find('.add-ld-input').val(),
                $id = $row.siblings('.row-hd').attr("id"),
                data = {},
                count = $row.parent().find('.legend-count'),
                LdItem = $('<div class="ld-item"><span class="ld-date"></span><span class="ld-time"></span><span class="ld-info"></span><i class="del-legend"></i></div>');
                
            if (Ldval != '') {
                if (Ldval.length < 300) {
                    data.applyId = $id;
                    data.note = Ldval;
                    data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
                    $.ajax({
                        type: 'post',
                        url: 'http://enterprise.zheyibu.com/application/AddApplyNote',
                        data: data,
                        success:function(data){
                            if (data.code > 0) {
                                LdItem.find('.ld-date').html(data.dt1);
                                LdItem.find('.ld-time').html(data.dt2);
                                LdItem.find('.ld-info').html(Ldval);
                                LdItem.attr('data-ld-id', data.code);
                                target.parent().before(LdItem);
                                target.siblings(':input').val('');
                                if(count.length > 0){
                                    count.html($row.find('.ld-item').length);
                                } else {
                                    $row.parent().find('#legend-btn').append($('<i class="legend-count"></i>').html($row.find('.ld-item').length));
                                }
                            } else {
                                alert('error');
                            }
                        }
                    }) 
                } else {
                    alert('备注内容不能超过300！');
                }
            } else {
                alert('备注不能为空！');
            };
        },
        deletelegend: function (e) {
            var target = $(e.currentTarget),
                $row = target.closest('tr'),
                $ld = target.parent(),
                $id = $ld.attr("data-ld-id"),
                data = {};
            data.noteId = $id;
            data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
            $.ajax({
                type: 'post',
                url: 'http://enterprise.zheyibu.com/application/DeleteApplyNote',
                data: data,
                success: function (data) {
                    if (data.code == 0) {
                        $ld.remove();
                        if ($row.find('.ld-item').length == 0) {
                            $row.parent().find('.legend-count').remove();
                        } else {
                            $row.parent().find('.legend-count').html($row.find('.ld-item').length);
                        }
                    } else {
                        alert('error!');
                    }
                }
            })
        },
        initInterView: function () {
            new Dialog({
                trigger: '.solo-action-iv',
                classPrefix: 'corp-dialog',
                width: 500,
                initialHeight:537
            }).before('show', function () {
                var url = this.activeTrigger.attr('data-url');
                this.set('content', url);
            });
        },
        initInvite: function () {
            new Dialog({
                trigger: '.solo-action-inviteother',
                classPrefix: 'corp-dialog',
                width: 500
            }).before('show', function () {
                var url = this.activeTrigger.attr('data-url');
                this.set('content', url);
            });
        },
        checkall: function (e) {
            var target = $(e.currentTarget),
                $chks = this.get('checkOne');
            if (target[0].checked) {
                $chks.attr('checked', true);
                $('.t-row:not(.cannotChecked)').addClass('checked');
                this.enableMulAction()
            } else {
                $chks.attr('checked', false);
                $('.t-row:not(.cannotChecked)').removeClass('checked');
                this.disableMulAction()
            }
        },
        checkone: function (e) {
            var target = $(e.currentTarget);
            $row = target.parents('.t-row');
            
            if (!target[0].checked) {
                $row.removeClass('checked');
            } else {
                $row.addClass('checked');
            }
            this.traverseChks();
        },
        enableMulAction: function () {
            $('.multi-action').removeClass('multi-action-diabled');
        },
        disableMulAction: function () {
            $('.multi-action').addClass('multi-action-diabled');
        },
        traverseChks: function () {
            var $chks = this.get('checkOne'),
                checkedCount = 0,
                sum = $chks.length,
                $checkAll = this.get('checkAll');
            $chks.each(function () {
                if (this.checked) checkedCount += 1;
            });

            if (checkedCount == sum) {
                $checkAll.attr('checked', true);
                this.enableMulAction();
            } else if (checkedCount == 0) {
                $checkAll.attr('checked', false);
                this.disableMulAction();
            } else {
                $checkAll.attr('checked', false);
                this.enableMulAction();
            }
        },
        getIdStr: function () {
            var $chks = this.get('checkOne'),
                str = '';
            $chks.filter(':checked').closest('tr').each(function () {
                str += ',' + $(this).attr('id');
            });

            return str.substring(1);
        }
    });

    module.exports = Resumes;

});