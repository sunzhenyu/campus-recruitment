﻿//(function (a) {
//    a.loginLayer = function (d, e) {
//        var f = { title: "学生用户登录", closeIcon: !0, reUrl: {}, onLayerMask: function () { } },
//            c = this;
//        c.settings = {};
//        a(d);
//        c.init = function (b) {
//            this.settings = a.extend({}, f, b);
//            b = a('<div id="login-layer-mask">\r\n                                <div id="login-layer-content">\r\n                                    <div class="login-layer-header">' + this.settings.title + '<i></i></div>\r\n                                    <div class="login-layer-container">\r\n                                        <form>\r\n                                            <input type="text" name="UserName" placeholder="手机号或邮箱" />\r\n                                            <div class="login-alert-warning email-warning"><i></i><span></span></div>\r\n                                            <input type="password" name="Password" placeholder="密码" />\r\n                                            <div class="login-alert-warning passwd-warning"><i></i><span></span></div>\r\n                                            <div class="auto-login active">\r\n                                                <i></i>\r\n                                                <span>自动登录</span>\r\n                                                <input type="hidden" name="RememberMe" value="true"/>\r\n                                            </div>\r\n                                            <a href="http://www.zheyibu.com/account/mobileforgetpwd" class="forget-passwd-link">忘记密码</a>\r\n                                            <p class="login-submit">立即登录</p>\r\n                                        </form>\r\n                                        <div class="fake-reg-btn">\r\n                                            <p>还没有新起点帐号？<a href="http://www.zheyibu.com/account/register/" class="fake-reg-link">立即注册<i></i></a></p>\r\n                                        </div>\r\n                                        <div class="fake-link-btn">\r\n                                            <p>使用以下帐号登录</p>\r\n                                            <a href="https://api.weibo.com/oauth2/authorize?client_id=3565412927&redirect_uri=http%3A%2F%2Fwww.zheyibu.com%2Fhome%2FStuThirdLogin&response_type=code&display=default" class="fake-weibo-link"></a>\r\n                                            <a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=100503934&redirect_uri=http://www.zheyibu.com/home/StuThirdLogin/&state=8532329630d24cd5b3f1628cc33db069&scope=get_user_info,add_share,list_album,upload_pic,check_page_fans,add_t,add_pic_t,del_t,get_repost_list,get_info,get_other_info,get_fanslist,get_idolist,add_idol,del_idol,add_one_blog,add_topic,get_tenpay_addr" class="fake-qq-link"></a>\r\n                                            <a href="https://open.weixin.qq.com/connect/qrconnect?appid=wxc22d029b45177211&redirect_uri=http%3A%2F%2Fwww.zheyibu.com%2Fhome%2FWeChatLogin&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect" class="fake-wechat-link"></a>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                           </div>');
//            this.settings.reUrl && (b.find(".fake-reg-link").attr("href", "http://www.zheyibu.com/account/register?operationName=" + this.settings.reUrl.operationName + "&positionId=" + this.settings.reUrl.PositionId + "&companyId=" + this.settings.reUrl.EtpId), b.find(".fake-weibo-link").attr("href", "https://api.weibo.com/oauth2/authorize?client_id=3565412927&redirect_uri=" + this.settings.reUrl.weiboLoginRediretUri + "&response_type=code&display=default"), b.find(".fake-qq-link").attr("href", "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=100503934&redirect_uri=" +
//                this.settings.reUrl.qqLoginRediretUri + "&state=8532329630d24cd5b3f1628cc33db069&scope=get_user_info,add_share,list_album,upload_pic,check_page_fans,add_t,add_pic_t,del_t,get_repost_list,get_info,get_other_info,get_fanslist,get_idolist,add_idol,del_idol,add_one_blog,add_topic,get_tenpay_addr"), b.find(".fake-wechat-link").attr("href", "https://open.weixin.qq.com/connect/qrconnect?appid=wxc22d029b45177211&redirect_uri=" + this.settings.reUrl.wechatLoginRediretUri + "&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect"));
//            a("body").append(b);
//            this.bindEvent()
//        };
//        c.bindEvent = function () {
//            a("#login-layer-mask").on("click", ".login-layer-header i", function () { a("#login-layer-mask").remove() }).on("click", ".auto-login", function () { a(this).hasClass("active") ? (a(this).removeClass("active"), a('input[name="RememberMe"]').val("false")) : (a(this).addClass("active"), a('input[name="RememberMe"]').val("true")) }).on("input focus", 'input[name="UserName"]', function () {
//                "" === a(this).val() ? (a(".email-warning").children("span").text("账号不能为空"), a(".email-warning").css("visibility",
//                    "visible")) : a(".email-warning").css("visibility", "hidden")
//            }).on("input focus", 'input[name="Password"]', function () { "" === a(this).val() ? (a(".passwd-warning").children("span").text("密码不能为空"), a(".passwd-warning").css("visibility", "visible")) : a(".passwd-warning").css("visibility", "hidden") }).on("click", ".login-submit", function () {
//                "" !== a('input[name="UserName"]').val() && "" !== a('input[name="Password"]').val() && a.ajax({
//                    type: "POST",
//                    url: "/account/sign-in-check",
//                    data: {
//                        Mobile: a('input[name="UserName"]').val(),
//                        Password: a('input[name="Password"]').val(),
//                        RememberMe: a('input[name="RememberMe"]').val()
//                    },
//                    success: function (b) {
//                        if (1 == b.code) a(".passwd-warning").children("span").text("账号或密码不正确"), a(".passwd-warning").css("visibility", "visible");
//                        else c.settings.onLayerMask()
//                    }
//                });
//                "" === a('input[name="UserName"]').val() && (a(".email-warning").children("span").text("账号不能为空"), a(".email-warning").css("visibility", "visible"));
//                "" === a('input[name="Password"]').val() && (a(".passwd-warning").children("span").text("密码不能为空"), a(".passwd-warning").css("visibility", "visible"))
//            })
//        };
//        c.init(e)
//    };
//    a.fn.loginLayer = function (d) {
//        return this.each(function () { new a.loginLayer(this, d) })
//    }
//})(jQuery);
