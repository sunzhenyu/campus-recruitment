$(function () {

    $.validator.setDefaults({
        ignore: ""
    })
    $.validator.addMethod("stringCheck", function (value, element) {
        var urlString = new RegExp('^(((ht|f)tp(s?))\://)?(www.|[a-zA-Z].)[a-zA-Z0-9\-\.]+\.(cn|com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk|fr|au|kr|jp|ru|in|it|pro|cc|tv|fm|io|hk|tw)(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))*$');
        return this.optional(element) || urlString.test(value);
    });
    $('#reg-step1').validate({
        debug: false,
        errorClass: 'error-explain',
        errorElement:'div',
        rules: {
            AccountName: {
                required: true,
                truename: true,
                remote: {
                    url: "/account/is-exist-account-name",     //后台处理程序
                    type: "post",               //数据发送方式
                    dataType: "json",           //接受数据格式   
                    data: {                     //要传递的数据
                        AccountName: function () {
                            return $("[name=AccountName]").val();
                        }
                    }
                }
            },
            Email: {
                required: true,
                checkEmail: true
            },
            Password: {
                required: true,
                checkpwd:true
            },
            ValidateCode: "required"
        },
        messages: {
            AccountName: {
                required: "用户名不能为空",
                remote: "该用户名已被注册，请使用其他用户名"
            },
            Email: {
                required: "邮箱不能为空"
            },
            Password: {
                required: "密码不能为空"
            },
            ValidateCode: "验证码不为空"
        }
    });

    //$('.ui-text').focusin(function () {
    //    $(this).siblings('.error-explain').hide();
    //    $(this).siblings('.input-tip').show();
    //}).focusout(function () {
    //    $(this).siblings('.error-explain').show();
    //    $(this).siblings('.input-tip').hide();
    //}).keyup(function () {
    //    $(this).siblings('.input-tip').hide();
    //});

    $('#reg-step2').validate({
        debug: false,
        errorClass: 'error-explain',
        errorElement: 'div',
        groups: {
            username: "ContactAreaCode ContactTelephone"
        },
        errorPlacement: function (error, element) {
            if (element.attr("id") == "areacode" || element.attr("id") == "telphone"){
                error.insertAfter("#ext");
            } else if (element.attr("data-widget") == 'selectui') {
                error.insertAfter($(element).next());
            }else{
                error.insertAfter(element);
            }  
        },
        rules: {
            Name: {
                required: true,
                remote: {
                    url: "/account/is-exist-enterprise-name",     //后台处理程序
                    type: "post",               //数据发送方式
                    dataType: "json",           //接受数据格式   
                    data: {                     //要传递的数据
                        etpName: function () {
                            return $("#name").val();
                        },
                        accountId: function () {
                            return $("#AccountId").val();
                        }
                    }
                }
            },
            showIndustry: {
                required: true
            },
            Scale: {
                required: true
            },
            Mode:{
                required:true
            },
            WebSite :{
                required: true,
                stringCheck: true
            },
            showCity: {
                required: true
            },
            ContactMan: {
                required: true,
                checkContactName:true
            },
            ContactAreaCode: {
                required: true,
                checkAreaCode:true
            },
            ContactTelephone: {
                required: true,
                checkTelphone:true
            }
        },
        messages: {
            Name: {
                required: "公司名不能为空",
                remote: "公司名称已被注册，请更换公司名称或联系客服寻求帮助。客服联系电话：021-58360268-572"
            },
            showIndustry: {
                required: "请选择所属行业"
            },
            Scale: {
                required: "请选择公司规模"
            },
            Mode: {
                required: "请选择企业性质"
            },
            WebSite :{
                required: "请输入企业网址",
                stringCheck: "请输入正确的网址"
            },
            showCity: {
                required:"请选择公司所在地区"
            },
            ContactMan: {
                required:"联系人不能为空"
            },
            ContactAreaCode: {
                required: "区号不能为空"
            },
            ContactTelephone: {
                required: "号码不能为空"
            }
        }
    });
})