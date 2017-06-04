/*******************************************
@bugFixedLog ie7下，由于jquery.form.js 中的form.elements的数组无法正常遍历出表单元素，所以使用semantic:true,参数来强制执行 form.getElementByTagName('*')
@bugFixedLog 还原了旧的代码 ，从修改jquery.form.js 代码 来解决bug
*******************************************/
define('zyb/resume/1.0.3/resume', ['$', 'jquery/form/3.49.0/form'], function (require, exports, module) {
    var $ = require('$'),
        jqueryForm = require('jquery/form/3.49.0/form');

    jqueryForm($);
    seajs.use("zyb/popup/1.0.0/topu.dialog");
    $(function () {

        $(document).on("mouseenter", ".info-col", function () {
            $(this).children(".action-col").show();
        }).on("mouseleave", ".info-col", function () {
            $(this).children(".action-col").hide();
        });

        $(document).on('click', '#uploadAvatar', function () {
            $.ajax({
                type: 'GET',
                url: RootUrl + 'resume/EditRecord?itemType=avator&v=' + Date.parse(new Date()),
                dataType: 'html',
                success: function (data) {
                    var itemType = 'base';
                    $('[itemtype="base"]').hide();
                    $('#info-' + itemType).after(data).hide();
                    locateLayer(itemType);
                }
            });
        })

        $(document).on('click', '#submitBtn', function () {
            var left = jcorpData.x;
            var top = jcorpData.y;
            var width = jcorpData.w, height = jcorpData.h;
            var rate = Math.max(jcorpData.holderW, jcorpData.holderH) / Math.max(imgNaturalWidth, imgNaturalHeight);
            $('#x').val(left);
            $('#y').val(top);
            $('#w').val(width);
            $('#h').val(height);
            $('#s').val(rate);
            $('#ow').val(imgNaturalWidth);
            $('#oh').val(imgNaturalHeight);

            $('#cutForm').ajaxSubmit({
                success: function (data) {
                    $.ajax({
                        type: 'get',
                        url: '/resume/basic-info',
                        dataType: 'html',
                        success: function (data) {
                            var itemType = 'base';
                            $('#section-' + itemType).find('.container').empty().html(data);
                            $('.head').find('img').attr('src', $('.head').find('img').attr('src')+'?t='+ new Date().getTime());     //刷新头部头像
                            locateInfoArea(itemType);
                            $('[itemtype="base"]').show();
                            //更新数据库字段，企业端根据此字段首页是否显示简历
                            //$.ajax({
                            //    type: 'POST',
                            //    url: '/Account/UpdateHasImg',
                            //    success: function (data) {
                                    
                            //    },
                            //    error:function(){
                            //        console.log('update img database error.');
                            //    }
                            //})
                        }
                    })
                }
            });
        })

        $(document).on('click', '#cancelBtn', function () {
            $(".uploader").show();
            $(".tailor").hide();
            $('.crop-row').empty();
        })

        $(document).on('click', '.closeEditAvator', function () {
            $(this).closest('.form-holder').prev().show();
            $(this).closest('.form-holder').remove();
            $('[itemtype="base"]').show();
        })

        $('.J_EditBase').click(function (e) {
            e.preventDefault();
            var $this = $(this),
                itemType = $this.attr('itemtype'),
                $container = $('#section-' + itemType).find('.container'),
                $info = $('#info-' + itemType);
            if (!$this.hasClass('disable')) {
                $.ajax({
                    type: 'POST',
                    url: RootUrl + 'resume/editrecord?itemType=' + itemType,
                    dataType: 'html',
                    beforeSend: function (XMLHttpRequest) {
                        //隐藏显示模块，加载编辑模块
                        $this.hide();
                        $info.hide(100, function () {
                            if (XMLHttpRequest.statusText != 'OK') {
                                $container.append($('<div class="loading"></div>'));
                            }
                        });
                        $this.addClass('disable');
                    },
                    success: function (data) {
                        $container.find('.loading').remove();
                        $container.prepend(data);
                        locateInfoAreaBase(itemType);
                    },
                    complete: function () {
                        $container.find('.loading').remove();
                        $this.removeClass('disable');
                    }
                });
            }
        });

        $(document).on('click', '.J_Submit', function (e) {
            var _this = $(this);
            $(this).css({ "background-color": "#999", "border-color": "#999" });
            $(this).attr("disabled", "disabled");
            var itemType = $(this).attr('itemtype');
            //初始化代码在简历编辑模块中
            switch (itemType) {
                case 'base':
                    baseValidator.execute(function (error, results, element) {
                        if (!error) {
                            $('#form-base').ajaxSubmit({
                                success: function (data) {
                                    $('#section-' + itemType).find('.container').empty().html(data);
                                    //编辑按钮颜色变淡
                                    $('.J_EditBase[itemtype="' + itemType + '"]').removeClass('add-info-btn').addClass('add-more-btn');
                                    locateInfoAreaBase(itemType);
                                    $('.J_EditBase[itemtype="' + itemType + '"]').show();
                                    //  refreshSide(itemType);
                                    _this.css('background-color', '#7cbf59');
                                    _this.removeAttr("disabled");
                                }
                            });
                        } else {
                            _this.css({ 'background-color': '#7cbf59', 'border-color': '#7cbf59' });
                            _this.removeAttr("disabled");
                        }
                    });
                    break;
                case 'education':
                    educationValidator.execute(function (error, results, element) {
                        if (!error) {
                            $('#form-' + itemType).ajaxSubmit({
                                success: function (data) {
                                    if ($(data).find('.info-item').length >= 10) {
                                        $('div[itemtype="education"]').parent().css('display', 'none');
                                    }
                                    $('#section-' + itemType).find('.container').html(data);
                                    ResetActionBtnVisibility(itemType);
                                    locateInfoArea(itemType);
                                    $('.J_ActionBtn[itemtype="' + itemType + '"]').removeClass('add-info-btn').addClass('add-more-btn').show();
                                    // refreshSide(itemType);
                                    _this.css('background-color', '#7cbf59');
                                    _this.removeAttr("disabled");
                                }
                            });
                        } else {
                            _this.css({ 'background-color': '#7cbf59', 'border-color': '#7cbf59' });
                            _this.removeAttr("disabled");
                        }
                    });
                    break;
                case 'experience':
                    experienceValidator.execute(function (error, results, element) {
                        if (!error) {
                            $('#form-' + itemType).ajaxSubmit({
                                success: function (data) {
                                    if ($(data).find('.info-item').length >= 15) {
                                        $('div[itemtype="experience"]').parent().css('display', 'none');
                                    }
                                    $('#section-' + itemType).find('.container').html(data);
                                    ResetActionBtnVisibility(itemType);
                                    locateInfoArea(itemType);
                                    $('.J_ActionBtn[itemtype="' + itemType + '"]').removeClass('add-info-btn').addClass('add-more-btn').show();
                                    //refreshSide(itemType);
                                    _this.css('background-color', '#7cbf59');
                                    _this.removeAttr("disabled");
                                }
                            });
                        } else {
                            _this.css({ 'background-color': '#7cbf59', 'border-color': '#7cbf59' });
                            _this.removeAttr("disabled");
                        }
                    });
                    break;
                case 'project':
                    projectValidator.execute(function (error, results, element) {
                        if (!error) {
                            $('#form-' + itemType).ajaxSubmit({
                                success: function (data) {
                                    if ($(data).find('.info-item').length >= 15) {
                                        $('div[itemtype="project"]').parent().css('display', 'none');
                                    }
                                    $('#section-' + itemType).find('.container').html(data);
                                    ResetActionBtnVisibility(itemType);
                                    locateInfoArea(itemType);
                                    $('.J_ActionBtn[itemtype="' + itemType + '"]').removeClass('add-info-btn').addClass('add-more-btn').show();
                                    //refreshSide(itemType);
                                    _this.css('background-color', '#7cbf59');
                                    _this.removeAttr("disabled");
                                }
                            });
                        } else {
                            _this.css({ 'background-color': '#7cbf59', 'border-color': '#7cbf59' });
                            _this.removeAttr("disabled");
                        }
                    });
                    break;
                case 'position':
                    positionValidator.execute(function (error, results, element) {
                        if (!error) {
                            $('#form-' + itemType).ajaxSubmit({
                                success: function (data) {
                                    if ($(data).find('.info-item').length >= 15) {
                                        $('div[itemtype="position"]').parent().css('display', 'none');
                                    }
                                    $('#section-' + itemType).find('.container').html(data);
                                    ResetActionBtnVisibility(itemType);
                                    locateInfoArea(itemType);
                                    $('.J_ActionBtn[itemtype="' + itemType + '"]').removeClass('add-info-btn').addClass('add-more-btn').show();
                                    //refreshSide(itemType);
                                    _this.css('background-color', '#7cbf59');
                                    _this.removeAttr("disabled");
                                }
                            });
                        } else {
                            _this.css({ 'background-color': '#7cbf59', 'border-color': '#7cbf59' });
                            _this.removeAttr("disabled");
                        }
                    });
                    break;
                case 'scholarship':
                    scholarshipValidator.execute(function (error, results, element) {
                        if (!error) {
                            $('#form-' + itemType).ajaxSubmit({
                                success: function (data) {
                                    if ($(data).find('.info-item').length >= 20) {
                                        $('div[itemtype="scholarship"]').parent().css('display', 'none');
                                    }
                                    $('#section-' + itemType).find('.container').html(data);
                                    ResetActionBtnVisibility(itemType);
                                    locateInfoArea(itemType);
                                    $('.J_ActionBtn[itemtype="' + itemType + '"]').removeClass('add-info-btn').addClass('add-more-btn').show();
                                    //refreshSide(itemType);
                                    _this.css('background-color', '#7cbf59');
                                    _this.removeAttr("disabled");
                                }
                            });
                        } else {
                            _this.css({ 'background-color': '#7cbf59', 'border-color': '#7cbf59' });
                            _this.removeAttr("disabled");
                        }
                    });
                    break;
                case 'it':
                    itValidator.execute(function (error, results, element) {
                        if (!error) {
                            $('#form-' + itemType).ajaxSubmit({
                                success: function (data) {
                                    $('#section-' + itemType).find('.container').html(data);
                                    ResetActionBtnVisibility(itemType);
                                    locateInfoArea(itemType);
                                    $('.J_ActionBtn[itemtype="' + itemType + '"]').removeClass('add-info-btn').addClass('add-more-btn').show();
                                    //refreshSide(itemType);
                                    _this.css('background-color', '#7cbf59');
                                    _this.removeAttr("disabled");
                                }
                            });
                        } else {
                            _this.css({ 'background-color': '#7cbf59', 'border-color': '#7cbf59' });
                            _this.removeAttr("disabled");
                        }
                    })
                    break;
                case 'language':
                    languageValidator.execute(function (error, results, element) {
                        if (!error) {
                            $('#form-' + itemType).ajaxSubmit({
                                success: function (data) {
                                    $('#section-' + itemType).find('.container').html(data);
                                    ResetActionBtnVisibility(itemType);
                                    locateInfoArea(itemType);
                                    $('.J_ActionBtn[itemtype="' + itemType + '"]').removeClass('add-info-btn').addClass('add-more-btn').show();
                                    //refreshSide(itemType);
                                    _this.css('background-color', '#7cbf59');
                                    _this.removeAttr("disabled");
                                }
                            });
                        } else {
                            _this.css({ 'background-color': '#7cbf59', 'border-color': '#7cbf59' });
                            _this.removeAttr("disabled");
                        }
                    })
                    break;
                case 'cert':
                    certValidator.execute(function (error, results, element) {
                        if (!error) {
                            $('#form-' + itemType).ajaxSubmit({
                                success: function (data) {
                                    $('#section-' + itemType).find('.container').html(data);
                                    ResetActionBtnVisibility(itemType);
                                    locateInfoArea(itemType);
                                    $('.J_ActionBtn[itemtype="' + itemType + '"]').removeClass('add-info-btn').addClass('add-more-btn').show();
                                    //refreshSide(itemType);
                                    _this.css('background-color', '#7cbf59');
                                    _this.removeAttr("disabled");
                                }
                            });
                        } else {
                            _this.css({ 'background-color': '#7cbf59', 'border-color': '#7cbf59' });
                            _this.removeAttr("disabled");
                        }
                    })
                    break;
                case 'eval':
                    evalValidator.execute(function (error, results, element) {
                        if (!error) {
                            $('#form-' + itemType).ajaxSubmit({
                                success: function (data) {
                                    $('#section-' + itemType).find('.container').html(data);
                                    $('.J_ActionBtn[itemtype="' + itemType + '"]').removeClass('add-info-btn').addClass('add-more-btn');
                                    ResetActionBtnVisibility(itemType);
                                    locateInfoArea(itemType);
                                    $('.J_ActionBtn[itemtype="' + itemType + '"]').show();
                                    // refreshSide(itemType);
                                    var searchStr = location.search.toLocaleLowerCase();
                                    if (!/posid=[1-9]/.test(searchStr)) {
                                        $.ajax({
                                            type: 'GET',
                                            url: '/resume/GetStuResumeStatus',
                                            success: function (r) {
                                                if (r.code == 1) {
                                                    switch (r.resumeStatus) {
                                                        case 0: break;
                                                            //头像
                                                        case 1:
                                                            $('.o-layer1').show(); break;
                                                            //职业锚
                                                        case 2:
                                                            $('.o-layer2').show(); break;
                                                            //未填写模块
                                                        case 3:
                                                            $.ajax({
                                                                url: '/resume/FindUnCompletedModule',
                                                                success: function (r) {
                                                                    if (!!r && r.length > 0) {
                                                                        var s = '';
                                                                        $.each(r, function (i, v) {
                                                                            s += '<a href="' + v.Value + '">' + v.Key + '</a>';
                                                                        });
                                                                        $('.o-layer3 .s-word2').empty().append(s);
                                                                        $('.o-layer3').show();
                                                                    }
                                                                }
                                                            })
                                                            //$('.o-layer3').show();
                                                            break;
                                                        default:;
                                                    }
                                                }
                                            }
                                        });
                                    }
                                    _this.css('background-color', '#7cbf59');
                                    _this.removeAttr("disabled");
                                }
                            });
                        } else {
                            _this.css({ 'background-color': '#7cbf59', 'border-color': '#7cbf59' });
                            _this.removeAttr("disabled");
                        }
                    })
                    break;
                case 'speciality':
                    specialityValidator.execute(function (error, results, element) {
                        if (!error) {
                            $('#form-speciality').ajaxSubmit({
                                success: function (data) {
                                    $('#section-' + itemType).find('.container').empty().html(data);
                                    $('.J_EditSpeciality[itemtype="' + itemType + '"]').removeClass('add-info-btn').addClass('add-more-btn');
                                    locateInfoAreaBase(itemType);
                                    $('.J_EditSpeciality[itemtype="' + itemType + '"]').show();
                                    //refreshSide(itemType);
                                    _this.css('background-color', '#7cbf59');
                                    _this.removeAttr("disabled");
                                }
                            });
                        } else {
                            _this.css({ 'background-color': '#7cbf59', 'border-color': '#7cbf59' });
                            _this.removeAttr("disabled");
                        }
                    });
                    break;
                case 'attachment':
                    resumeValidator.execute(function (error, results, element) {
                        if (!error) {
                            $('#form-attachment').ajaxSubmit({
                                beforeSubmit: function () {
                                    _this.val("上传中");
                                },
                                success: function (data) {
                                    $.ajax({
                                        url: "/resume/SaveAttachment",
                                        data: { attachName: data.name, attachType: 1, fileSize: data.size, fileType: data.extension },
                                        type: "post",
                                        success: function (data) {
                                            $('#section-' + itemType).find('.container').empty().html(data);
                                            locateInfoAreaBase(itemType);
                                            $('.resume-add-btn').show();
                                            //refreshSide(itemType);
                                            _this.css('background-color', '#7cbf59');
                                            _this.removeAttr("disabled");
                                        },
                                        error: function () {
                                            console.log("上传失败");
                                        }
                                    });
                                }
                            });
                        } else {
                            _this.css({ 'background-color': '#7cbf59', 'border-color': '#7cbf59' });
                            _this.removeAttr("disabled");
                        }
                    });
                    break;
                default:
                    break;
            }
            e.preventDefault();
        });
        //立即上传
        $('.o-layer1 .o-button1').click(function () {
            $('.o-layer1').hide();
            $('#uploadAvatar').trigger('click');
        });
        $('.upload-pic').click(function () {
            $('.o-layer1').hide();
            $('#uploadAvatar').trigger('click');
        });
        $('.o-layer1 .pointer').click(function () {
            $('.o-layer1').hide();
        });
        $('.o-layer1 .o-button2').click(function () {
            $('.o-layer1').hide();
        });
        //职业锚测评
        $('.o-layer2 .pointer').click(function () {
            $('.o-layer2').hide();
        });
        $('.o-layer2 .o-button2').click(function () {
            $('.o-layer2').hide();
        });
        //简历引导完善
        $('.o-layer3 .pointer').click(function () {
            $('.o-layer3').hide();
        });
        $('.o-layer3 .o-button1').click(function () {
            $('.o-layer3').hide();
        });
        $(document).on('click', '.o-layer3 a', function () {
            $('.o-layer3 .pointer').trigger('click');
        });
        $(document).on('click', '.J_Cancel', function () {
            var $this = $(this), itemType = $this.attr('itemtype');
            $('#section-' + itemType).find('.disable').removeClass('disable');
            switch (itemType) {
                case 'base':
                    $this.closest('.form-holder').remove();
                    $('#info-base').show();
                    $('.J_EditBase').show();
                    locateInfoArea(itemType);
                    break;
                case 'attachment':
                    $this.closest('.form-holder').remove();
                    $('#info-' + itemType).show();
                    $('.add-info-btn[itemtype="' + itemType + '"]').show();
                    locateInfoArea(itemType);
                    break;
                default:
                    //add 2014-12-28
                    $this.closest('.form-holder').siblings(".info-item:hidden").show();
                    $this.closest('.form-holder').remove();
                    $('#info-' + itemType).show();
                    $('.J_ActionBtn[itemtype="' + itemType + '"]').show();
                    locateInfoArea(itemType);
                    break;
            }
        });

        $(document).on('click', '.J_ActionBtn', function () {
            var $this = $(this),
                actionType = $this.attr('rel'),
                itemType = $this.attr('itemtype'),
                itemId = $this.attr('itemid'),
                itemRow = $this.parents('.info-item');
            switch (actionType) {
                case 'edit':
                    doEdit(itemType, itemId, itemRow, $this);
                    break;
                case 'add':
                    doAdd(itemType, $this);
                    break;
                case 'delete':
                    doDelete(itemType, itemId, itemRow, $this);
                    break;
            }
        });

        var arg = window.location.href.split('#');
        if (arg.length > 1) {
            if (arg[0].indexOf('?') > 0 && [1] != '') {
                var btn = $('a[itemtype=' + arg[1] + ']');
                $(btn).click();
            }
        }
    });

    function doEdit(itemType, itemId, itemRow, editBtn) {
        var $info = $('#info-' + itemType);
        switch (itemType) {
            case 'eval':
                //使当前简历模块编辑按钮失效隐藏
                $('.J_EditEval').addClass('disable').hide();

                $.ajax({
                    type: 'GET',
                    url: RootUrl + 'resume/editrecord?itemType=' + itemType + "&v=" + Date.parse(new Date()),
                    dataType: 'html',
                    beforeSend: function (XMLHttpRequest) {
                        editBtn.hide();
                        if (XMLHttpRequest.statusText != 'OK') {
                            $info.closest('.container').append($('<div class="loading"></div>'));
                        }
                    },
                    success: function (data) {
                        $('#info-' + itemType).after(data)
                        locateLayer(itemType);
                        $('#info-' + itemType).hide();
                    },
                    complete: function () {
                        $info.closest('.container').find('.loading').remove();
                    }
                });
                break;
            case 'speciality':
                //使当前简历模块编辑按钮失效隐藏
                $('.J_EditSpeciality').addClass('disable').hide();

                $.ajax({
                    type: 'GET',
                    url: RootUrl + 'resume/editrecord?itemType=' + itemType + "&v=" + Date.parse(new Date()),
                    dataType: 'html',
                    beforeSend: function (XMLHttpRequest) {
                        editBtn.hide();
                        if (XMLHttpRequest.statusText != 'OK') {
                            $info.closest('.container').append($('<div class="loading"></div>'));
                        }
                    },
                    success: function (data) {
                        $('#info-' + itemType).after(data)
                        locateLayer(itemType);
                        $('#info-' + itemType).hide();
                    },
                    complete: function () {
                        $info.closest('.container').find('.loading').remove();
                    }
                });
                break;
            case 'intention':
                //使当前简历模块编辑按钮失效隐藏
                $('.J_EditIntention').addClass('disable').hide();

                $.ajax({
                    type: 'GET',
                    url: RootUrl + 'resume/editrecord?itemType=' + itemType + "&v=" + Date.parse(new Date()),
                    dataType: 'html',
                    //data: {itemtype:itemType,itemid:itemId},
                    success: function (data) {
                        $('#info-' + itemType).after(data).hide();
                        locateLayer(itemType);
                    }
                });
                break;
            case 'mien':
                //使当前简历模块编辑按钮失效隐藏
                $('.J_EditMien').addClass('disable').hide();

                $.ajax({
                    type: 'GET',
                    url: RootUrl + 'resume/editrecord?itemType=' + itemType + "&v=" + Date.parse(new Date()),
                    dataType: 'html',
                    //data: {itemtype:itemType,itemid:itemId},
                    success: function (data) {
                        $('#info-' + itemType).after(data).hide();
                        locateLayer(itemType);
                    }
                });
                break;
            default:
                if (!editBtn.hasClass('disable')) {
                    if (itemType == 'it') {
                        editBtn.parent().siblings('.skillId').val('');
                    }
                    // start ajax call for edit form html
                    $.ajax({
                        type: 'GET',
                        url: RootUrl + 'resume/editrecord?itemType=' + itemType + '&itemId=' + itemId + "&v=" + Date.parse(new Date()),
                        dataType: 'html',
                        //data: {itemtype:itemType,itemid:itemId},
                        beforeSend: function (XMLHttpRequest) {
                            //使当前简历模块新增按钮失效
                            getAddbtn(itemType).addClass('disable').hide();
                            //使其他记录的编辑，删除按钮失效
                            $('#info-' + itemType).find('.J_ActionBtn').addClass('disable');
                            //隐藏显示模块，加载编辑模块
                            editBtn.parents(".info-item").hide(100, function () {
                                if (XMLHttpRequest.statusText != 'OK') {
                                    $info.append($('<div class="loading"></div>'));
                                }
                            });
                        },
                        success: function (data) {
                            $info.find('.loading').remove();
                            itemRow.after(data);
                            if (itemType == 'education') {
                                locateInfoAreaEducation(itemType);
                            } else {
                                locateLayer(itemType);
                            }
                        },
                        complete: function () {
                            $info.find('.loading').remove();
                            getAddbtn(itemType).removeClass('disable');
                        }
                    });
                }
                break;
        }
    }

    function doAdd(itemType, addBtn) {
        var $info = $('#info-' + itemType);
        // start ajax call for edit form html

        $.ajax({
            type: 'GET',
            url: RootUrl + 'resume/CreateRecord?itemType=' + itemType,
            dataType: 'html',
            beforeSend: function (XMLHttpRequest) {
                addBtn.hide();                                  //隐藏新增按钮
                if (XMLHttpRequest.statusText != 'OK') {
                    $info.closest('.container').append($('<div class="loading"></div>'));
                }
            },
            success: function (data) {
                $('#info-' + itemType).after(data);
                if (itemType == 'education') {
                    locateInfoAreaEducation(itemType);
                } else {
                    locateLayer(itemType);
                }
                $info.hide()
            },
            complete: function () {
                $info.closest('.container').find('.loading').remove();
            }
        });
    }

    function doDelete(itemType, itemId, itemRow, deleteBtn) {

        if (!deleteBtn.hasClass('disable')) {
            if (itemType == "education" && !itemRow.siblings().length) {
                var oConfirmDialog = deleteBtn.createDialog({
                    title: "来自新起点的提示：",
                    btnType: "confirm",
                    btnText: {
                        yes: "确定",
                        no: "取消"
                    },
                    text: "简历中至少要有一条教育经历，您可以对这条经历进行编辑，是否立即编辑这条教育经历？",
                    onHide: function () {
                        $(".pop-dialog").remove();
                    },
                    confirmCallback: function () {
                        doEdit(itemType, itemId, itemRow, deleteBtn.prev());
                    }
                });
                oConfirmDialog.showDialog();
            } else {
                var oConfirmDialog = deleteBtn.createDialog({
                    title: "来自新起点的提示：",
                    btnType: "confirm",
                    btnText: {
                        yes: "确定",
                        no: "取消"
                    },
                    text: "确定要删除这条记录吗？",
                    onHide: function () {
                        $(".pop-dialog").remove();
                    },
                    confirmCallback: function () {
                        $.ajax({
                            type: 'POST',
                            url: RootUrl + 'resume/deleterecord?itemType=' + itemType + '&itemId=' + itemId,
                            dataType: 'html',
                            success: function (data) {
                                $('div[itemtype="' + itemType + '"]').parent().css('display', 'block');
                                $('#info-' + itemType).parent().html(data);
                                if (itemRow.siblings().length == 0 && itemType === "attachment") {
                                    $('.resume-add-btn').hide();
                                } else if (itemRow.siblings().length !== 0) {
                                    //$('.J_ActionBtn[itemtype="' + itemType + '"]').removeClass('add-more-btn').addClass('add-info-btn');
                                } else {
                                    $('.J_ActionBtn[itemtype="' + itemType + '"]').removeClass('add-more-btn').addClass('add-info-btn');
                                }
                                //refreshSide(itemType);
                            }
                        });
                    }
                });
                oConfirmDialog.showDialog();
                // start ajax call for edit form html
            }
        }
    }

    function getAddbtn(itemType) {
        return $('[itemType=' + itemType + '][rel=add]');
    }

    function getEditbtn(itemType) {
        return $('[itemType=' + itemType + '][rel=edit]');
    }

    //Reset btn 可操作性
    function ResetActionBtnVisibility(itemType) {
        switch (itemType) {
            case "eval":
                if ($('#section-' + itemType).find('.container').find(".info-item").length == 0) {
                    //显示横向 的 add-info-btn
                    $('div.add-info-btn[itemType=' + itemType + '][rel=edit]').show().removeClass('disable');
                    $('h2 [itemType=' + itemType + '][rel=edit]').hide();
                }
                else {
                    //显示右上角的操作btn
                    $('h2 [itemType=' + itemType + '][rel=edit]').show().removeClass('disable');
                    $('div.add-info-btn[itemType=' + itemType + '][rel=edit]').hide();
                }
                break;
            case "intention":
                if ($('#section-' + itemType).find('.container').find(".intention-block").length == 0) {
                    //显示横向 的 add-info-btn
                    $('div.add-info-btn[itemType=' + itemType + '][rel=edit]').show().removeClass('disable');
                    $('h2 [itemType=' + itemType + '][rel=edit]').hide();
                }
                else {
                    //显示右上角的操作btn
                    $('h2 [itemType=' + itemType + '][rel=edit]').show().removeClass('disable');
                    $('div.add-info-btn[itemType=' + itemType + '][rel=edit]').hide();
                }
                break;
            case "mien":
                if ($('#section-' + itemType).find('.container').find(".mien-list .mien-icon").length == 0) {
                    //显示横向 的 add-info-btn
                    $('div.add-info-btn[itemType=' + itemType + '][rel=edit]').show().removeClass('disable');
                    $('h2 [itemType=' + itemType + '][rel=edit]').hide();
                }
                else {
                    //显示右上角的操作btn
                    $('h2 [itemType=' + itemType + '][rel=edit]').show().removeClass('disable');
                    $('div.add-info-btn[itemType=' + itemType + '][rel=edit]').hide();
                }
                break;
            case 'base':
                ;
                break;
            default:
                if ($('#section-' + itemType).find('.container').find(".info-item").length == 0) {
                    //如果当前没有记录 显示横向 的 add-info-btn
                    $('div.add-info-btn[itemType=' + itemType + '][rel=add]').show().removeClass('disable');
                    $('h2 [itemType=' + itemType + '][rel=add]').hide();
                }
                else {
                    //显示右上角的操作btn
                    $('h2 [itemType=' + itemType + '][rel=add]').show().removeClass('disable');
                    $('div.add-info-btn[itemType=' + itemType + '][rel=add]').hide();
                }
                break;
        }
    }

    function getPointY(obj) { //获取某元素以浏览器左上角为原点的坐标
        var top = obj.offsetTop; //获取该元素对应父容器的上边距
        //判断是否有父容器，如果存在则累加其边距
        while (obj = obj.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined)
            top += obj.offsetTop; //叠加父容器的上边距
        }
        return top;
    }
    //给base定位
    function locateInfoAreaBase(itemType) {
        if ($('div').hasClass('apply-div')) {
            var formHolder = $("#info-" + itemType).parent(".container").find(".form-holder");
            if (formHolder.length > 0) {
                //var top = formHolder.offset().top; // 编辑框距离body上边框的距离
                var top = getPointY(formHolder[0]);
                window.scroll(0, top - 245);
            }
        } else {
            var formHolder = $("#info-" + itemType).parent(".container").find(".form-holder");
            if (formHolder.length > 0) {
                //var top = formHolder.offset().top; // 编辑框距离body上边框的距离
                var top = getPointY(formHolder[0]);
                window.scroll(0, top - 74);
            }
        }
    }
    //给education定位
    function locateInfoAreaEducation(itemType) {
        if ($('div').hasClass('apply-div')) {
            if ($(document).scrollTop() > 102) {
                var formHolder = $("#info-" + itemType).parent(".container").find(".info-holder");
                if (formHolder.length > 0) {
                    //var top = formHolder.offset().top; // 编辑框距离body上边框的距离
                    var top = getPointY(formHolder[0]);
                    window.scroll(0, top - 186);
                }
            } else {
                var formHolder = $("#info-" + itemType).parent(".container").find(".info-holder");
                if (formHolder.length > 0) {
                    //var top = formHolder.offset().top; // 编辑框距离body上边框的距离
                    var top = getPointY(formHolder[0]);
                    window.scroll(0, top - 300);
                }
            }

        } else {
            var formHolder = $("#info-" + itemType).parent(".container").find(".info-holder");
            if (formHolder.length > 0) {
                //var top = formHolder.offset().top; // 编辑框距离body上边框的距离
                var top = getPointY(formHolder[0]);
                window.scroll(0, top - 74);
            }
        }
    }
    //给编辑框定位
    function locateLayer(itemType) {
        if ($('div').hasClass('apply-div')) {
            var formHolder = $("#info-" + itemType).parent(".container").find(".info-holder");
            if (formHolder.length > 0) {
                //var top = formHolder.offset().top; // 编辑框距离body上边框的距离
                var top = getPointY(formHolder[0]);
                window.scroll(0, top - 186);
            }
        } else {
            var formHolder = $("#info-" + itemType).parent(".container").find(".info-holder");
            if (formHolder.length > 0) {
                //var top = formHolder.offset().top; // 编辑框距离body上边框的距离
                var top = getPointY(formHolder[0]);
                window.scroll(0, top - 74);
            }
        }
    }

    //取消编辑框 时 信息区域 定位
    function locateInfoArea(itemType) {
        if ($('div').hasClass('apply-div')) {
            var formHolder = $("#info-" + itemType).parent(".container").find(".form-holder");
            if (formHolder.length > 0) {
                //var top = formHolder.offset().top; // 编辑框距离body上边框的距离
                var top = getPointY(formHolder[0]);
                window.scroll(0, top - 186);
            }
        } else {
            var formHolder = $("#info-" + itemType).parent(".container").find(".info-holder");
            if (formHolder.length > 0) {
                //var top = formHolder.offset().top; // 编辑框距离body上边框的距离
                var top = getPointY(formHolder[0]);
                window.scroll(0, top - 74);
            }
        }
    }

    function disableBtn() {
        $('.J_ActionBtn').toggleClass('disable');
    }

    function refreshSide(itemType) {
        $.get(RootUrl + 'resume/GetCompletion?time=' + Math.random(), function (data) {
            $('.sideCatalog-sidebar-start').text(data.val + '%');
            if ($("p.apply-info").length > 0) {
                var curcpltion = parseInt(data.val);
                var ndcpltion = parseInt($("p.apply-info span").attr("ndCpltion"));
                if (ndcpltion > curcpltion) {
                    //简历完成度未达要求
                    $("p.apply-info span").html((ndcpltion - curcpltion));
                    $("p.apply-info, .apply-operate").show();
                    $(".apply-operate.to-apply").parent("p").hide();
                } else {
                    $("p.apply-info, .apply-operate").hide();
                    $(".to-apply").show().parent("p").show();
                }
            }
        });
        var arr = ['base', 'eval', 'mien'];
        if ($.inArray(itemType, arr) < 0) {
            var len = $('#info-' + itemType).find('.info-item').length;
            if (len == 0) {
                $('#nav-' + itemType).removeClass('current');
            }
            else {
                $('#nav-' + itemType).addClass('current');
            }
        }
        else {
            $('#nav-' + itemType).addClass('current');
        }
    }

    window.setCaseTime = function ($select, type) {

        var $start = $('#StartDate'), $end = $('#EndDate');
        $select.change(function () {
            var startTime = $('#startYear').val() + '-' + $('#startMon').val() + '-1';
            if (!type || type == 2) {

                var endTime = $('#endYear').val() && $('#endMon').val() ? $('#endYear').val() + '-' + $('#endMon').val() + '-1' : '';
                $end.val(endTime);

            } else if (type == 1) {


            }
            $start.val(startTime);

        });



    }

    window.setCaseTimeV2 = function (type) {
        var $start = $('#StartDate'), $end = $('#EndDate');
        var startTime = $('#startYear').val() + '-' + $('#startMon').val() + '-1';
        $start.val(startTime);
        var endTime = $('#endYear').val() && $('#endMon').val() ? $('#endYear').val() + '-' + $('#endMon').val() + '-1' : '';
        $end.val(endTime);
    }
    //学生端简历学校选择
    $(document).on('click', '.m-school1', function (e) {
        e = e || event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        $('.m-school-list1').show();
    });
    $(document).on('click', '.m-school2', function (e) {
        e = e || event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        $('.m-school-list2').show();
    });
    $(document).on('click', '.m-school-list1 li', function () {
        $('.m-school1').val($(this).text());
    })
    $(document).on('click', '.m-school-list2 li', function () {
        $('.m-school2').val($(this).text());
    })
    $(document).on('click', function (e) {
        $('.m-school-list1').hide();
        $('.m-school-list2').hide();
    });


});