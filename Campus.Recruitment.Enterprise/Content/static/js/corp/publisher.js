seajs.use(['$', 'dialog', 'placeholder', 'arale/widget/1.1.1/widget', 'validator', 'corp/formUI/1.0.0/formui', 'corp/schoolLayer/1.0.1/schoollayer', 'arale/dialog/1.2.3/dialog', 'module/layer/plugin/pick/1.0.3/layer-pick-com', 'corp/dialog/dialog'],
function ($, Dialog, Placeholder, Widget, Core, FormUI, schoolLayer, Dialog, Pick, dialogHide) {
    Placeholder($);

    $(function () {

        $(".select").select();                          //避免职位编辑select初始化两次，点击无法生效

        var flag = true;
        var schoolwrap;
        var sType = '';

        if ($('#PositionId').val() != '' && $('#PositionId').val() != '0') {
            sType = 'single';
        } else {
            sType = 'multi';
        }

        //专业选择
        $('#J_Major').click(function () {
            Pick.majorPick({
                trigger: $(this),
                hidden: $('#MajorIds'),
                type: 'multi',
                isChooseTitle: true,
                mostSelectCount:8,
                showMode: 'list'
            })
        }) 

        //学校地区
        $('#J_SchoolCity').click(function () {
            Pick.areaPick({
                trigger: $(this),
                hidden: $('#SchoolCityIds'),
                title: '请选择学校地区',
                mostSelectCount: 12,
                type: 'multi'
            })
        })

        //学校级别
        $('#J_SchoolLvl').click(function () {
            Pick.schoolLvl({
                trigger: $(this),
                hidden: $('#SchoolLevelIds'),
                title: '请选择学校级别',
                type: 'multi'
            })
        })

        //职能选择
        $('#J_Func').click(function () {
            Pick.functionsPick({
                trigger: $(this),
                hidden: $('#FunctionIds'),
                type: 'single'
            })
        })

        //城市选择
        $('#J_JobCity').click(function () {
            Pick.cityPick({
                trigger: $(this),
                hidden: $('#CityIds'),
                type: sType,
                mostSelectCount: 100,
                title: '请选择城市',
                isCity: true,
                isUnlimited: false,
                mostSelectCount:10
            });
        })

        $('#J_Func').blur(function () {
            Core.query('#FunctionIds').execute();
        });

        $('#J_JobCity').blur(function () {
            Core.query('#CityIds').execute();
        });

        //if ($('input[name="SchoolIds"]').val().length > 0 && $('input[name="SchoolIds"]').val() != '0') {
        //    initSchool();
        //    flag = false;
        //}

        var oldCityValue = '',
            newCityValue = '',
            oldLvlValue = '',
            newLvlValue = '',
            oldMajorVlue = '',
            newMajorValue = '';

        $('#J_Major').blur(function () {
            Core.query('#J_Major').execute();
            newMajorValue = $(this).val();
            $('#J_Major').siblings('span').click();                             //ie7 隐藏模拟的placeholder
            //if ($('[name="SchoolCityIds"]').val() != 0 || $('[name="SchoolLevelIds"]').val() != 0) {
            //    if (newMajorValue != oldMajorVlue) {
            //        $('#assignSchool').find('input:hidden').val('');
            //        getSchoolCount();
            //        if (schoolwrap) {
            //            var data = getmajordata();
            //            schoolwrap.updateFilter(data);
            //            schoolwrap.updateContent();
            //        }
            //    }
            //} else {
            //    if (schoolwrap) {
            //        schoolwrap.destroy();
            //        $('#chooseAssign').addClass('dN');
            //        schoolwrap = null;
            //        flag = true;
            //    }
            //}
        });

        $('#J_Major').focus(function () {
            oldMajorVlue = $(this).val();
        });

        $('#J_SchoolCity').blur(function () {
            Core.query('#J_SchoolCity').execute();
            newCityValue = $(this).val();
            //if ($('[name="SchoolCityIds"]').val() != 0 || $('[name="SchoolLevelIds"]').val() != 0) {
            //    $('#J_SchoolCity').siblings('span').click();                        //ie7 隐藏模拟的placeholder
            //    //如果学校地区 或者 学校级别 不等于不限   就去获取学校列表
            //    if (flag) {                                                         //组件只需生成一次
            //        $('#chooseAssign').removeClass('dN');
            //        initSchool();
            //        flag = false;
            //    } else {
            //        //如果学校城市发生变化，去更新学校列表
            //        if (newCityValue != oldCityValue) {
            //            $('#assignSchool').find('input:hidden').val('');
            //            getSchoolCount();
            //            if (schoolwrap) {
            //                var data = getcitydata();
            //                schoolwrap.updateFilter(data);
            //                schoolwrap.updateContent();
            //            }
            //        }
            //    }
            //} else {
            //    if (schoolwrap) {
            //        schoolwrap.destroy();
            //        $('#chooseAssign').addClass('dN');
            //        schoolwrap = null;
            //        flag = true;
            //    }
            //}
        });

        $('#J_SchoolCity').focus(function () {
            oldCityValue = $(this).val();
        })

        $('#J_SchoolLvl').blur(function () {
            Core.query('#J_SchoolLvl').execute();
            newLvlValue = $(this).val();

            //if ($('[name="SchoolCityIds"]').val() != 0 || $('[name="SchoolLevelIds"]').val() != 0) {
            //    $('#J_SchoolLvl').siblings('span').click();                         //ie7 隐藏模拟的placeholder
            //    //如果学校地区 或者 学校级别 不等于不限   就去获取学校列表
            //    if (flag) {                                                         //组件只需生成一次
            //        $('#chooseAssign').removeClass('dN');
            //        initSchool();
            //        flag = false;
            //    } else {
            //        //如果学校城市发生变化，去更新学校列表
            //        if (newLvlValue != oldLvlValue) {
            //            $('#assignSchool').find('input:hidden').val('');
            //            getSchoolCount();
            //            if (schoolwrap) {
            //                var data = getlvldata();
            //                schoolwrap.updateFilter(data);
            //                schoolwrap.updateContent();
            //            }
            //        }
            //    }
            //} else {
            //    if (schoolwrap) {
            //        schoolwrap.destroy();
            //        $('#chooseAssign').addClass('dN');
            //        schoolwrap = null;
            //        flag = true;
            //    }
            //}
        });

        $('#J_SchoolLvl').focus(function () {
            oldLvlValue = $(this).val();
        })

        function getmajordata() {
            var filterMajorData = {
                id: 2,
                name: '专业',
                items: []
            };
            if ($('[name="MajorIds"]').val() != '') {
                var majorIds = $('[name="MajorIds"]').val().split(',');
                var majorNames = $('[name="MajorName"]').val().split('+');
                $(majorIds).each(function (index, value) {
                    var item = {};
                    item.id = value;
                    item.name = majorNames[index];
                    filterMajorData.items.push(item);
                }); 
            } 
            return filterMajorData;
        }

        function getcitydata() {
            var filterCityData = {
                id: 0,
                name: '学校地区',
                items: []
            };
            if ($('[name="SchoolCityIds"]').val() != '') {
                var scityIds = $('[name="SchoolCityIds"]').val().split(',');
                var scityNames = $('[name="SchoolCityNames"]').val().split('+');
                $(scityIds).each(function (index, value) {
                    var item = {};
                    item.id = value;
                    item.name = scityNames[index];
                    filterCityData.items.push(item);
                });
            }
            return filterCityData;
        }

        function getlvldata() {
            var filterLevelData = {
                id: 1,
                name: '学校级别',
                items: []
            };
            if ($('[name="SchoolLevelIds"]').val() != '') {
                var slvlIds = $('[name="SchoolLevelIds"]').val().split(',');
                var slvlNames = $('[name="SchoolLevelNames"]').val().split('+');
                $(slvlIds).each(function (index, value) {
                    var item = {};
                    item.id = value;
                    item.name = slvlNames[index];
                    filterLevelData.items.push(item);
                })
            } 
            return filterLevelData;
        }

        //function getSchoolCount() {
        //    var data = {};
        //    data.city = $('[name="SchoolCityIds"]').val();
        //    data.level = $('[name="SchoolLevelIds"]').val();
        //    data.major = $('[name="MajorIds"]').val();

        //    $.ajax({
        //        type: "get",
        //        url: 'http://api.zheyibu.com/school/SchoolsCount?t=' + new Date().getTime(),
        //        dataType: 'jsonp',
        //        data: data,
        //        jsonpCallback: 'count',
        //        success: function (data) {
        //            $('#schoolCount').text(data.count);
        //        }
        //    });
        //}

        //function initSchool() {
        //    getSchoolCount();
        //    //schoolwrap = null;
        //    schoolwrap = new schoolLayer({
        //        $el: $("#assignSchool"),
        //        filterCityData: function () {
        //            return getcitydata();
        //        },
        //        filterLevelData: function () {
        //            return getlvldata();
        //        },
        //        filterMajorData: function () {
        //            return getmajordata();
        //        },
        //        schoolApiUrl: $("#assignSchool").attr('data-url'),
        //        MaxCheckedNum: 15
        //    });
        //}

        //第一步
        var validatorStep1 = new Core({
            element: '#position-form',
            failSilently: true,
            triggerType: false,
            autoFocus: false,
            autoSubmit:false
        });
        
        validatorStep1.addItem({                    //职位名称
            element: '#position',
            required: true
        })
        .addItem({                    //学历要求
            element: '#DegreeIds',
            required: true
        })
        .addItem({                                  //专业要求
            element: '#J_Major',
            required: true
        })
        .addItem({                                  //学校地区
            element: '#J_SchoolCity',
            required: true
        })
        .addItem({                                  //学校级别
            element: '#J_SchoolLvl',
            required: true
        });

        //第二步
        var validatorStep2 = new Core({
            element: '#position-form',
            failSilently: true,
            triggerType: false,
            autoFocus: false,
            autoSubmit: false
        });

        validatorStep2.addItem({
            element: '#FunctionIds',
            required: true
        })
        .addItem({
            element: '#CityIds',
            required: true
        })
        .addItem({
            element: '#RecruitNum',
            required: true
        })
        .addItem({
            element: '#desc',
            required: true,
            rule: 'minlength{min:30}'
        });

        var jobtype = $(".positiontype:checked").val();
        checkJobType(jobtype);

        //name - 校验规则名称
        //operator - 检验执行规则。它可以是正则表达式或者一个函数。对于一般的函数校验规则，在校验结束时请返回布尔值作为校验结果；对于异步校验规则，使用第二个参数提交校验结果。
        //message - 提示消息。提示信息中可以使用 {{}} 来引用检验规则中接收到的 options 对象中的字段

        Core.addRule('compareSalary', function (options) {
            var v = Number(options.element.val());
            var min = Number($(options.target).val());
            return v > min
        }, '{{display}}必须大于最低月薪');

        Core.addRule('restrictSalary', function (options) {
            var max = parseInt(options.element.val());
            var min = parseInt($(options.target).val());
            return min * 2 >= max
        }, '{{display}}不能大于最低月薪的2倍');

        Core.addRule('integer', function (options) {
            var v = Number(options.element.val());
            if (v && Math.floor(v) === v) {
                return true;
            }
            return false;
        }, '{{display}}必须为整数');

        $("#ckRNegotiable").change(function () {
            var $this = $(this);
            if ($this[0].checked) {
                //选中
                $("#RecruitNum").val("").attr("disabled", "disabled").addClass('ui-disabled');
                Core.query('#RecruitNum').execute(function (error, results, element) {
                    if (!error) {
                        $this.closest('.ui-form-item').removeClass('ui-form-item-error');
                    }
                });
            } else {
                $("#RecruitNum").removeAttr("disabled").removeClass('ui-disabled');
            }
        });

        $("#ckFNegotiable").change(function () {
            var $this = $(this);
            if ($this[0].checked) {
                //选中
                $("#salaryStart,#salaryEnd").val("").attr("disabled", "disabled").addClass('ui-disabled');
                Core.query('#salaryStart').execute();
                Core.query('#salaryEnd').execute();
                $this.closest('.ui-form-item').removeClass('ui-form-item-error');
            }
            else {
                $("#salaryStart,#salaryEnd").removeAttr("disabled").removeClass('ui-disabled');
            }
        });

        $("#ckPNegotiable").change(function () {
            if ($(this)[0].checked) {
                //选中
                $("#mon-salay input,#day-salay input,#hour-salay input").val("").attr("disabled", "disabled").removeClass('ui-disabled');
                validatorStep2.execute();
            }
            else {
                $("#mon-salay input,#day-salay input,#hour-salay input").removeAttr("disabled").removeClass('ui-disabled');
            }
        });

        $('#salary').change(function () {
            var $sel = $(this);
            if ($sel.val() == '-1') {
                $('#Select1').attr({ disabled: 'disabled' }).addClass('ui-disabled');
            } else {
                $('#Select1').attr({ disabled: false }).removeClass('ui-disabled');
            }
        });
        //20140505 增加判断薪资结算方式
        $('.positiontype').change(function () {
            var $this = $(this),
                v = $this.val();
            checkJobType(v);
            if (v == 2) {                    //实习
                $('.internship-item').show();
                $('.fulltime-item').hide();
                validatorStep2.removeItem("#salaryStart").removeItem("#salaryEnd");
                validatorStep2.removeItem("#salaryStart").removeItem("#salaryEnd");
            } else {                         //全职
                $('.internship-item ').hide();
                $('.fulltime-item').show();
                validatorStep2.removeItem("#InternLength").removeItem("#InternDays").removeItem("#InternSalaryMin").removeItem("#InternSalaryMax").removeItem("#DailySalary").removeItem("#HourSalay");
            }
        });

        function checkJobType(type){
            if (type == 2) {
                validatorStep2.addItem({
                    element: '#InternLength',
                    required: true
                })
                .addItem({
                    element: '#InternDays',
                    required: true
                })
                .addItem({
                    element: "#InternSalaryMin",
                    required: true
                })
                .addItem({
                    element: '#InternSalaryMax',
                    required: true,
                    showMessage: function (message, element) {
                        // 结束日期出错后会调用这个函数。如果前面的开始日期没有出错的时候才显示自己的出错消息。
                        var startErr = $.trim(this.getExplain(element).html());
                        if (!startErr) {
                            this.getExplain(element).html(message);
                            this.getItem(element).addClass(this.get('itemErrorClass'));
                        }
                    },
                    hideMessage: function (message, element) {
                        // 结束日期校验通过后会调用这个函数。如果前面的开始日期没有出错的时候才清空消息。
                        var startErr = $.trim(this.getExplain(element).html());
                        if (!startErr) {
                            this.getExplain(element).html(element.attr('data-explain') || ' ');
                            this.getItem(element).removeClass(this.get('itemErrorClass'));
                        }
                    }
                })
            } else {
                validatorStep2.addItem({
                    element: '#salaryStart',
                    required: true
                })
                .addItem({
                    element: '#salaryEnd',
                    required: true,
                    showMessage: function (message, element) {
                        // 结束日期出错后会调用这个函数。如果前面的开始日期没有出错的时候才显示自己的出错消息。
                        var startErr = $.trim(this.getExplain(element).html());
                        if (!startErr) {
                            this.getExplain(element).html(message);
                            this.getItem(element).addClass(this.get('itemErrorClass'));
                        }
                    },
                    hideMessage: function (message, element) {
                        // 结束日期校验通过后会调用这个函数。如果前面的开始日期没有出错的时候才清空消息。
                        var startErr = $.trim(this.getExplain(element).html());
                        if (!startErr) {
                            this.getExplain(element).html(element.attr('data-explain') || ' ');
                            this.getItem(element).removeClass(this.get('itemErrorClass'));
                        }
                    }
                });
            }
        }
       
        //20140505 增加判断月薪/日薪/时薪
        $('.internship-salary-type').change(function () {
            var $this = $(this);
            var i = $this.parent().index();
            $('.internship-salary-value').eq(i).show().siblings().hide();

            if (i == 0) {
                validatorStep2.addItem({
                    element: "#InternSalaryMin",
                    required: true
                })
                .addItem({
                    element: "#InternSalaryMax",
                    required: true,
                    showMessage: function (message, element) {
                        // 结束日期出错后会调用这个函数。如果前面的开始日期没有出错的时候才显示自己的出错消息。
                        var startErr = $.trim(this.getExplain(element).html());
                        if (!startErr) {
                            this.getExplain(element).html(message);
                            this.getItem(element).addClass(this.get('itemErrorClass'));
                        }
                    },
                    hideMessage: function (message, element) {
                        // 结束日期校验通过后会调用这个函数。如果前面的开始日期没有出错的时候才清空消息。
                        var startErr = $.trim(this.getExplain(element).html());
                        if (!startErr) {
                            this.getExplain(element).html(element.attr('data-explain') || ' ');
                            this.getItem(element).removeClass(this.get('itemErrorClass'));
                        }
                    }

                })
                .removeItem("#DailySalary").removeItem("#HourSalay");
            } else if (i == 1) {
                validatorStep2.addItem({
                    element: "#DailySalary",
                    required: true
                }).removeItem("#InternSalaryMin").removeItem("#InternSalaryMax").removeItem("#HourSalay");
            } else {
                validatorStep2.addItem({
                    element: "#HourSalay",
                    required: true
                }).removeItem("#InternSalaryMin").removeItem("#InternSalaryMax").removeItem("#DailySalary");
            }
        });
        if ($('input[name="PositionType"]:checked').val() == '2' && $('.internship-salary-block .top-row').find('input[name="InternSalaryType"]:checked').length) {
            $('.internship-salary-type').eq($('.internship-salary-block .top-row').find('input[name="InternSalaryType"]:checked').parent().index()).trigger('change');
        }
        $('#J_PubTags > span').click(function () {
            var $tag = $(this),
                $hidden = $tag.siblings(':hidden'),
                value = [];
            $tag.toggleClass('active');

            $('#J_PubTags > span').each(function () {
                var $this = $(this);
                if ($this.hasClass('active')) {
                    value.push($this.html());
                }
            })
            $hidden.val(value);
        });
        //$('#J_MoreTag').toggle(function () {
        //    $('#J_PubTags > .hide').css({ display: 'inline-block' });
        //    $(this).html('收起')
        //}, function () {
        //    $('#J_PubTags > .hide').css({ display: 'none' });
        //    $(this).html('更多')
        //});

        var citySelectMode = 'Multi';
        if ($('#isEditPage').length > 0) {
            //通过页面是否有id为isEditPage的元素判断当前城市选择器的单选或多选模式
            citySelectMode = 'Single';
        }

        // 2015-02-09新增 企业发布职位要求全为“不限”时加入判断
        $("#zyb-submit-btn").click(function () {
            if (checkPositionType()) {
                validatorStep2.execute(function (error, results, element) {
                    if (!error) {
                        if (submitCheck()) {
                            $('#position-form')[0].submit();
                            //$.ajax({
                            //    type: 'post',
                            //    sync: false,
                            //    url: '/Position/CheckIsHasRepeatedPublishPosition',
                            //    data: {
                            //        positionId: $('#PositionId').val(),
                            //        position: $('#position').val(),
                            //        cityIds: $('#CityIds').val(),
                            //        posDescription: $('#desc').val()
                            //    },
                            //    success: function (r) {
                            //        if (!r.isHasRepeated) {
                            //            $.alert("发布成功！");
                            //            setTimeout(function () { $('#position-form')[0].submit(); }, 500);
                            //        } else {
                            //            var cs = '<p>亲，您已经发布过该职位了。请不要发布重复职位，谢谢您的配合。</p>\
                            //                <p>若有疑问，请拨打服务热线：021-58360268-572</p>';
                            //            var layer = new Layer({
                            //                content: cs,
                            //                title: '提示'
                            //            });
                            //            layer.show();
                            //        }
                            //    }
                            //});
                        }
                    }
                })
            }
        });

        function checkPositionType() {
            var value = $('input[name="PositionType"]:checked').val();
            if (value > 0) {
                return true;
            } else {
                $('input[name="PositionType"]').on('click', function () {
                    $('.form-item-workNature').removeClass('ui-form-item-error');
                    $('.form-item-workNature .ui-form-explain').empty();
                });
                $('.form-item-workNature').addClass('ui-form-item-error');
                $('.form-item-workNature .ui-form-explain').html("请选择工作性质");
                return false;
            }
        }

        function submitCheck() {
            var onOff = true;
            var message = "您已经设置该职位的职位要求、学历要求、学校级别都为不限，这可能会导致您的职位无法精准推送给目标学生，也可能无法收到系统的推荐简历。您是否要保存这样的设置，立即发布职位？";
            $("#divStep2 > .publish-section").find(":text").each(function (i, elem) {
                if ($(elem).val() != "不限") {
                    onOff = false;
                }
            });
            if (onOff) {
                if (confirm(message)) {
                    $(window).unbind('beforeunload.pub');
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }

        //2014-12-29 新增
        $('#boyonly').click(function () {
            $('#girlonly').attr('class', '');
        });
        $('#girlonly').click(function () {
            $('#boyonly').attr('class', '');
        });
        $(".close-tips-btn").click(function () {
            $(this).parent().hide(1000);
        });

        $("#nextBtn").click(function () {
            var $btn = $(this);
            validatorStep1.execute(function (error, results, element) {
                if (!error) {
                    $("#divStep1").addClass("dN").siblings().removeClass("dN").parent().siblings('.publish-wrap-hd').children('.current').removeClass('current').next().addClass('current');
                    $('.perfect-home-tips').addClass('dN');
                    $(window).scrollTop(0);
                    $('.position-step').text($('#position').val());
                }
            });
        })

        $("#prevBtn").click(function () {
            $("#divStep2").addClass("dN").siblings().removeClass("dN").parent().siblings('.publish-wrap-hd').children('.current').removeClass('current').prev().addClass('current');
            $('.perfect-home-tips').removeClass('dN');
            $(window).scrollTop(0);
        })

        $(document).on('click', '.perfect-home-tips .close-tips', function () {
            var $this = $(this);
            $.ajax({
                type: 'post',
                data: {},
                url: '/Position/RemoveCookieOfFlagCorpInfoSetGuide',
                complete: function () {
                    $this.parent().remove();
                }
            })
        })

        $("#DegreeId").next().find("li").slice(1).click(function () {
            Core.query('#DegreeId').execute();
        })

        window.result = $('#PositionTags').val();
        window.labelDialog = new Dialog({
            width: 500,
            trigger: '#PositionTags',
            closeTpl: ' ',
            content: $('#PositionTags').attr('data-url'),
            initialHeight: 500
        }).after('hide', function () {
            $('#PositionTags').val(window.result);
        });

        $('.degree-sel label').on('click', function () {
            if ($(this).hasClass('unlimit')) {
                $(this).addClass('d-sel').siblings('label').removeClass('d-sel');
                $('#DegreeIds').val($(this).attr('data-id'));
                $('#DegreeNames').val($(this).text());
            } else {
                if ($(this).hasClass('d-sel')) {
                    $(this).removeClass('d-sel');
                    if ($('.degree-sel .d-sel').length == 0) {
                        $('.degree-sel .unlimit').addClass('d-sel');
                    }
                } else {
                    $(this).addClass('d-sel');
                    $(this).siblings('.unlimit').removeClass('d-sel');
                }
                var degreeIds = "";
                var degreeNames = "";
                $('.degree-sel label').each(function (num, obj) {
                    if($(obj).hasClass('d-sel')){
                        degreeIds += $(obj).attr('data-id') + ",";
                        degreeNames += $(obj).text() + "、";
                    }
                });
                $('#DegreeIds').val(degreeIds.substring(0, degreeIds.length - 1));
                $('#DegreeNames').val(degreeNames.substring(0, degreeNames.length - 1));
            }
            
        });

    });
    //职位发布须知
    template = '<div style="font-size:14px;color:#333;border-radius:3px;">'
            + '<div id="m-header" style="width:600px;line-height:44px;color:#fff;font-size:16px;background-color:#85b0dc;padding-left:20px;">职位发布须知</div>'
            + '<p style="margin:12px 22px;">在本站发布的招聘信息必须是大学应届生、在校生可以应聘的职位，严禁发布以下几类职位：</p>'
            + '<p style="color:#A46C3B;margin:10px 22px;">1. 公关、校园推广代理类、加盟类、论坛专职发帖类；</p>'
            + '<p style="color:#A46C3B;margin:10px 22px;">2. 无学历要求的低端类职位，如淘宝客服、工厂普工、传单派发、修理工、搬运工、杂工、保安、保洁工、仓管员等职位；</p>'
            + '<p style="color:#A46C3B;margin:10px 22px;">3. 只要求工作经验的职位（没有应届生/在校生需求）；</p>'
            + '<p style="color:#A46C3B;margin:10px 22px;">4. 招聘信息中包含不良信息的职位；</p>'
            + '<p style="color:#A46C3B;margin:10px 22px;">5. 第三方招聘发布的职位（如中介、劳务派遣）；</p>'
            + '<p style="color:#A46C3B;margin:10px 22px;">6. 培训机构招收学员进行有偿培训，再分配到合作的公司工作。</p>'
            + '<p style="margin:12px 0 24px 22px;">以上类别职位一经发现，本站将立即屏蔽或删除</p></div>';
    window.noticeDialog = new Dialog({
        width: 620,
        closeTpl: ' ',
        trigger: $('.m-notice span'),
        content: template
    });
    $('.template-up').on('click','i',function () {
        $('.template-up').remove();
    })
    .on('click', '.no-more-tip', function () {
        $.post("/Position/CloseTheCreateTemplateTips",            
        {
            __RequestVerificationToken : $('input[name=__RequestVerificationToken]').val()
        });
        $('.template-up').remove();
    });
    var firstFire = $('#HasPublishPos').val();
    if (firstFire == 'false') {
        $('.m-notice span').click();
    }
});
