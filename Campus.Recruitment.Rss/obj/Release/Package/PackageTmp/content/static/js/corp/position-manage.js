(function ($) {
    
    $(function () {
    $('.select').select();

    $('.select li').click(function () {
        $('#formFilter').submit();
    });
    
        new Positions();
    })
   
    var Positions = function () {
        this.positionBox = $("#J_PosMnger");
        this.actionUrl = '/position/update-position-status';
        this.init();
    }

    Positions.prototype = {
        init: function () {
            var that = this;
            this.positionBox.on('click', '.solo-action', function () {
                that.soloHandler(this);
            });
            this.positionBox.on('click', '.multi-action', function () {
                that.multiHandler(this);
            });
            this.positionBox.on('change', '.item-check-all', function () {
                that.checkall(this);
            });
            this.positionBox.on('change', '.item-check', function () {
                that.checkone(this);
            });
        },
        soloHandler: function (obj) {
            var target = $(obj),
                row = target.closest('tr'),
                actionType = target.attr('action-type');

            switch (actionType) {
                case 'delete':
                    this.soloDelete(target, row);
                    break;
                case 'push':
                    this.soloPush(target, row);
                    break;
                case 'pause':
                    this.soloPause(target, row);
                    break;
                case 'refresh':
                    this.soloRefresh(target, row);
                    break;
                case 'restore':
                    this.soloRestore(target, row);
                    break;
                case 'republish':
                    this.soloRepublish(target, row);
                    break;
                case 'deleteTemplate':
                    this.deleteTemplate(target,row);
                    break;
            }
        },
        multiHandler: function (obj) {
            var target = $(obj),
                rows = $('.item-check:checked').closest('tr'),
                actionType = target.attr('action-type');
            if (!target.hasClass('multi-action-diabled')) {
                switch (actionType) {
                    case 'delete':
                        this.multiDelete(target, rows);
                        break;
                    case 'pause':
                        this.multiPause(target, rows);
                        break;
                    case 'refresh':
                        this.multiRefresh(target, rows);
                        break;
                    case 'deleteTemplate':
                        this.multiDeleteTemplate(target, rows);
                        break;
                    case "restore":
                        this.multiRestore(target, rows);
                        break;
                }
            }
        },
        deleteTemplate: function (target, rows) {
            var that = this,
                data = {};
            data.templateIdStr = rows.attr('id');
            //判断是否已有对应弹框
            if (target.attr('active') == 0) {
                Showbo.Msg.confirm('确定删除职位？该操作不可恢复', function (btn) {
                    if (btn == 'yes') {
                        that.doAjaxTemplate(data, function (res) {
                            if (res.status == 0) {
                                rows.next().add(rows).fadeOut(400, function () {
                                    rows.next().add(rows).remove();
                                    $.alert("删除成功！");
                                });
                            }
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        multiDeleteTemplate: function (target, rows) {
            var that = this,
                data = {},
                str = '';
            rows.each(function () {
                str += ',' + $(this).attr('id');
            });
            str = str.substring(1);
            data.templateIdStr = str;
            //防止重复点击，如果有mask可以去除该逻辑
            if (target.attr('active') == 0) {
                if ($('.item-check').length > 0) {
                    Showbo.Msg.confirm('确定删除这些职位？该操作不可恢复', function (btn) {
                        if (btn == 'yes') {
                            that.doAjaxTemplate(data, function (res) {
                                if (res.status == 0) {
                                    rows.each(function (i, v) {
                                        $(v).add($(v).next()).fadeOut(400, function () {
                                            $(v).add($(v).next()).remove();
                                        });
                                    });
                                    $.alert("删除成功！");
                                    that.disableMulAction();
                                    $(".item-check-all").prop("checked") && $(".item-check-all").prop("checked", false);
                                }
                            });
                        } else {
                            return false;
                        }
                    });
                }
            }
        },
        doAjaxTemplate: function (data, callback) {
            var url = '/position/DeleteTemplate';
            $.post(url, data, callback);
        },
        //单操作
        soloDelete: function (target, row) {
            var that = this,
                data = {};
            data.positionIdStr = row.attr('id');
            data.opr = 'delete';
            //判断是否已有对应弹框
            if (target.attr('active') == 0) {
                Showbo.Msg.confirm('确定删除职位？该操作不可恢复', function (btn) {
                    if (btn == 'yes') {
                        that.doAjax(data, function (res) {
                            if (res) {
                                row.next().add(row).fadeOut(400, function () {
                                    row.next().add(row).remove();
                                    $.alert("删除成功！");
                                });
                            }
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        soloRefresh: function (target, row) {
            // 判断是否已刷新
            if (!target.hasClass('solo-action-disabled')) {
                var data = {};
                data.positionIdStr = row.attr('id');
                data.opr = 'refresh';
                this.doAjax(data, function (res) {
                    if (res) {
                        target.addClass('solo-action-disabled');
                        var date = new Date();
                        row.find("td").eq(6).html(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
                        //row.next().remove();
                        //row.remove();
                        //$('#J_PosTbody').prepend(res.html);
                    }
                });
            }
        },
        soloPause: function (target, row) {
            //todo pause ajax
            var data = {};
            var that = this;
            data.positionIdStr = row.attr('id');
            data.opr = 'pause';
            Showbo.Msg.confirm('确定停止该职位？', function (btn) {
                if (btn == 'yes') {
                    that.doAjax(data, function (res) {
                        if (res) {
                            row.next().add(row).fadeOut(400, function () {
                                row.next().add(row).remove();
                                $.alert("操作成功，您可以到已停止的职位中查看该职位！");
                            });
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        soloRestore: function (target, row) {
            //todo pause ajax
            var data = {};
            var that = this;
            data.positionIdStr = row.attr('id');
            data.opr = 'restore';
            Showbo.Msg.confirm('确定恢复该职位？', function (btn) {
                if (btn == 'yes') {                   
                    that.doAjax(data, function (res) {
                        if (res.status == 0) {
                            row.next().add(row).fadeOut(400, function () {
                                row.next().add(row).remove();
                                $.alert("操作成功，您可以到发布中的职位中查看该职位！");
                            });
                        } else if (res.status == 2) {
                            var cs = '<p>亲，您的帐号目前最多可发布职位数达到' + res.maxPosCount + '个，不可在发布职位。</p>\
                                    <p>如果您需要发布更多的职位，请联系我们申请提升职位数量上限。</p>\
                                    <p>联系电话：021-58360268-572</p>';
                            var layer = new Layer({
                                content: cs,
                                title: '提示'
                            });
                            layer.show();
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        soloRepublish: function (target, row) {
            //todo pause ajax
            var data = {};
            var that = this;
            data.positionIdStr = row.attr('id');
            data.opr = 'republish';
            Showbo.Msg.confirm('确定重新发布该职位？', function (btn) {
                if (btn == 'yes') {
                    that.doAjax(data, function (res) {
                        if (res.status == 0) {
                            row.next().add(row).fadeOut(400, function () {
                                row.next().add(row).remove();
                                $.alert("该职位已经重新发布！");
                            });
                        } else if (res.status == 2) {
                            var cs = '<p>亲，您的帐号目前最多可发布职位数达到' + res.maxPosCount + '个，不可在发布职位。</p>\
                                    <p>如果您需要发布更多的职位，请联系我们申请提升职位数量上限。</p>\
                                    <p>联系电话：021-58360268-572</p>';
                            var layer = new Layer({
                                content: cs,
                                title: '提示'
                            });
                            layer.show();
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        //群操作
        multiDelete: function (target, rows) {
            var that = this,
                data = {},
                str = '';
            data.opr = 'delete';
            rows.each(function () {
                str += ',' + $(this).attr('id');
            });
            str = str.substring(1);

            data.positionIdStr = str;

            //防止重复点击，如果有mask可以去除该逻辑
            if (target.attr('active') == 0) {
                if ($('.item-check').length > 0) {
                    Showbo.Msg.confirm('确定删除这些职位？该操作不可恢复', function (btn) {
                        if (btn == 'yes') {
                            that.doAjax(data, function (res) {
                                if (res.status == 0) {
                                    rows.each(function (i, v) {
                                        $(v).add($(v).next()).fadeOut(400, function () {
                                            $(v).add($(v).next()).remove();
                                        });
                                    });
                                    $.alert("删除成功！");
                                    that.disableMulAction();
                                    $(".item-check-all").prop("checked") && $(".item-check-all").prop("checked", false);
                                }
                            });
                        } else {
                            return false;
                        }
                    });
                }
            }
        },
        multiPause: function (target, rows) {

            var that = this,
                data = {},
                str = '',
                flag = true;
            data.opr = 'pause';
            rows.each(function () {
                str += ',' + $(this).attr('id');
            });
            str = str.substring(1);
            data.positionIdStr = str;

            Showbo.Msg.confirm('确定停止这些职位？', function (btn) {
                if (btn == 'yes') {
                    that.doAjax(data, function (res) {
                        if (res.status == 0) {
                            rows.each(function (i, v) {
                                $(v).add($(v).next()).fadeOut(400, function () {
                                    $(v).add($(v).next()).remove();
                                });
                            });
                            $.alert("操作成功，您可以到已停止的职位中查看这些职位！");
                            $(".item-check-all").prop("checked") && $(".item-check-all").prop("checked", false);
                            that.disableMulAction();
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        multiRefresh: function (target, rows) {
            //todo multiRefresh ajax
            var that = this,
                data = {},
                str = '';
            data.opr = 'refresh';
            rows.each(function () {
                str += ',' + $(this).attr('id');
            });
            str = str.substring(1);
            data.positionIdStr = str;

            that.doAjax(data, function (res) {
                if (res.status == 0) {
                    rows.removeClass("checked").find(".actions a:first").addClass('solo-action-disabled').end().find(".item-check").prop('checked',false);
                    $('#J_PosTbody').prepend(rows.next().add(rows));
                    $.alert("刷新成功！");
                    $(".item-check-all").prop("checked") && $(".item-check-all").prop("checked", false);
                    //移除后需要禁用群操作
                    that.disableMulAction();
                }
            });

        },
        multiRestore: function(target, rows){
            var that = this,
                data = {},
                str = '';
            data.opr = 'restore';
            rows.each(function () {
                str += ',' + $(this).attr("id");
            });
            str = str.substring(1);
            data.positionIdStr = str;
            Showbo.Msg.confirm('确定恢复这些职位？', function (btn) {
                that.doAjax(data, function (res) {
                    if (btn == 'yes') {
                        if (res.status == 0) {
                            rows.each(function (i, v) {
                                $(v).add($(v).next()).fadeOut(400, function () {
                                    $(v).add($(v).next()).remove();
                                });
                            });
                            $.alert("操作成功，您可以到发布中的职位中查看该职位！");
                            $(".item-check-all").prop("checked") && $(".item-check-all").prop("checked", false);
                            //移除后需要禁用群操作
                            that.disableMulAction();
                        } else if (res.status == 2) {
                            var cs = '<p>亲，您的帐号目前最多可发布职位数达到' + res.maxPosCount + '个，不可在发布职位。</p>\
                                    <p>如果您需要发布更多的职位，请联系我们申请提升职位数量上限。</p>\
                                    <p>联系电话：021-58360268-572</p>';
                            var layer = new Layer({
                                content: cs,
                                title: '提示'
                            });
                            layer.show();
                        }
                    } else {
                        return false;
                    }
                });
            });
        },
        doAjax: function (data, callback) {
            var url = this.actionUrl;
            $.post(url, data, callback);
        },
        checkall: function (obj) {
            var target = $(obj);
            if (target[0].checked) {
                $('.item-check').attr('checked', true);
                $('.position-row').addClass('checked');
                this.enableMulAction();
            } else {
                $('.item-check').attr('checked', false);
                $('.position-row').removeClass('checked');
                this.disableMulAction();
            }
        },
        checkone: function (obj) {
            var target = $(obj);
            $chkAll = $('.item-check-all'),
            $chks = $('.item-check'),
            $row = target.parents('.position-row'),
            flag = 1,
            isAllUnChk = 1;

            if (!target[0].checked) {
                $row.removeClass('checked');
                $chkAll.attr('checked', false);
                //遍历check 查看是否全部未选中
                $chks.each(function (i) {
                    var $chk = $(this);
                    if (this.checked) {
                        isAllUnChk = 0;
                        return
                    }
                });
                //如果 全部未选中，禁用群操作
                if (isAllUnChk) {
                    this.disableMulAction();
                }

            } else {
                $row.addClass('checked');
                this.enableMulAction();
                //遍历check 查看是否有未选中的
                $chks.each(function (i) {
                    var $chk = $(this);
                    if (!this.checked) {
                        flag = 0;
                        return
                    }
                });
                if (!flag) return

                $chkAll.attr('checked', true);

            }

        },
        enableMulAction: function () {
            $('.multi-action').removeClass('multi-action-diabled');
        },
        disableMulAction: function () {
            $('.multi-action').addClass('multi-action-diabled');
        },
        isAllUnChk: function () {
            var isAllUnChk = 1;
            $('.check-item').each(function (i) {
                var $chk = $(this);
                if (this.checked) {
                    isAllUnChk = 0;
                    return
                }
            });
            //如果 全部未选中，禁用群操作
            if (isAllUnChk) {
                this.disableMulAction();
            }
        }
    };// endPositions
    new Positions();
}(jQuery));

