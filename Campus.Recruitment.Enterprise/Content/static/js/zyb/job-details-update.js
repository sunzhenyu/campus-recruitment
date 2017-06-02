seajs.use("$ zyb/prompt/1.0.0/prompt module/checkbox-ui/checkui validate/jquery.validate.min zyb/datePicker/datePicker.new module/selectui/selectui module/layer/1.0.3/layer jquery/autocomplete/1.1.0/autocomplete".split(" "), function (a, u, y, z, w, A, B, q) {
    q(a); var p, m; p = a("#EtpId").val(); a.fn.serializeJSON = function () { var c = {}; a(this).find("input,textarea,select").each(function () { var h = a(this).attr("name"), f = a(this).val(); h && (c[h] = f) }); return c }; a.validator.addMethod("validPassword", function (a, c, f) { return !0 },
    "\u8bf7\u8f93\u51656-16\u4f4d\u5bc6\u7801"); a.validator.addMethod("isCharacter", function (a, c, f) { f = /^[\u4e00-\u9fa5]{2,5}$/; return this.optional(c) || f.test(a) }, "\u8bf7\u586b\u5199\u771f\u5b9e\u59d3\u540d\uff0c2-5\u4e2a\u6c49\u5b57"); a.validator.addMethod("isPhone", function (a, c, f) { f = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/; return this.optional(c) || f.test(a) }, "\u8bf7\u586b\u5199\u6709\u6548\u7684\u624b\u673a\u53f7\u7801");
    a.validator.addClassRules({ required: { required: !0 } }); var c = !1; a(function () {
        function r(b) { b.addClass("disabled"); var e = b.position().left, d = b.position().top - 5, n = b.width(), c = b.height(); b.parent().css("position", "relative").end().after('<div class="applyLoadding"></div>'); a(".applyLoadding").css({ left: e, top: d, width: n, height: c }) } function h(b) { b.removeClass("disabled"); a(".applyLoadding").remove() } function f(b) {
            b.addClass("disabled"); var e = b.position().left, d = b.position().top, c = b.width(), g = b.height(); b.parent().end().after('<div class="applyLoadding"></div>');
            a(".applyLoadding").css({ left: e, top: d, width: c, height: g })
        } function v() {
            var b = a(this); a.get("/Pop/PltViewGoApplyPos?posId=" + m + "&t=" + +new Date, function (e) {
                h(b); g.setContent(e).show(); a(".ui-layer").customRadioCheckbox(); var d = a("#applyForm"), n = d.serializeJSON(), x = d.attr("action"); e = a(".btn-has-applied"); e.length && e.click(function () { g.close() }); d.submit(function (b) {
                    b.preventDefault(); f(a(".btn-submit input")); c || (c = !0, d.find("[name=IsWithVideoResume]").length ? n.IsWithVideoResume = d.find("[name=IsWithVideoResume]").is(":checked") ?
                    "true" : "false" : n.IsWithVideoResume = "false", a.ajax({ url: x, type: "post", data: n, success: function (b) { h(a(".btn-submit input")); c = !1; b.redirecturl && (location.href = b.redirecturl) } }))
                })
            })
        } function t(b) {
            var e = a(this), d = "/Pop/PtlViewLogin"; "apply" == b && (d += "?posId=" + m); a.get(d, function (d) {
                h(e); g.setContent(d).center().show(); a(".ui-layer").customRadioCheckbox(); var f = a("#loginForm"); f.validate({
                    errorElement: "p", errorClass: "errorInfo", submitHandler: function (d) {
                        c || (c = !0, d = a(d).serializeJSON(), d.RememberMe = a("[name=RememberMe]").is(":checked") ?
                        "true" : "false", a.ajax({
                            url: "/Pop/PtlViewLoginSubmit", type: "POST", data: d, success: function (d) {
                                c = !1; d.redirecturl && (location.href = d.redirecturl); if (1 == d.code) f.find(".mail-error").append('<p class="errorInfo">' + d.msg + "</p>"), f.find(".mail-error").find("input").on("focus", function () { f.find(".mail-error").find(".errorInfo").remove() }); else switch (GLOBAL.IsLogin = !0, a.get("/Account/UserInfoR", function (b) { a(".top-account").html(b) }), b) {
                                    case "apply": v(); break; case "collect": window.collect(e); g.close(); window.location.href =
                                    window.location.href; break; case "follow": window.attention(e), g.close(), window.location.href = window.location.href
                                }
                            }
                        }))
                    }, rules: { UserName: { required: !0, email: !0 }, Password: { required: !0, rangelength: [6, 16], validPassword: !0 } }, messages: { UserName: { required: "\u8bf7\u586b\u5199\u90ae\u7bb1\u5730\u5740", email: "\u8bf7\u586b\u5199\u6709\u6548\u7684\u90ae\u7bb1\u5730\u5740" }, Password: { required: "\u8bf7\u586b\u5199\u5bc6\u7801", rangelength: "\u8bf7\u8f93\u51656-16\u4f4d\u5bc6\u7801" } }
                }); a(".ui-layer").customRadioCheckbox()
            })
        }
        function k(a) { for (var e = document.cookie.split("; "), d = 0; d < e.length; d++) { var c = e[d].split("="); if (c[0] == a) return "Login" == a ? utf8to16(base64decode(decodeURIComponent(c[1]))) : c[1] } return "" } p = a("#EtpId").val(); m = a("#PositionId").val(); a(".J_BottomApply").data("pid"); a(".J_BottomApply").data("ptype"); var g, l = ""; a(".J_BottomApply").on("click", function () {
            var b = a(this); a(this).hasClass("disabled") || (r(a(this)), l = a(this).attr("data-type"), g = new Layer, k("Login") && "Student" == k("Login").split(",")[3] ? v.call(a(this)) :
            t.call(b, l))
        }); a("#linkCollect").click(function () { if (!a(this).hasClass("disabled")) { var b = a(this); l = a(this).attr("data-type"); g = new Layer; k("Login") && "Student" == k("Login").split(",")[3] ? window.collect(b) : (r(a(this)), t.call(b, l)) } }); a("#linkFollowEtp").click(function () { if (!a(this).hasClass("disabled")) { var b = a(this); l = a(this).attr("data-type"); g = new Layer; k("Login") && "Student" == k("Login").split(",")[3] ? window.attention(b) : (r(a(this)), t.call(b, l)) } }); a(document).on("focusin", "#StartDate,#EndDate", function (b) {
            a(this).prop("readonly",
            !0)
        }); a(document).on("focusout", "#StartDate,#EndDate", function (b) { a(this).prop("readonly", !1) }); a("#J_CloseBtnTips").click(function () { a(this).parent().remove() }); window.attention = function (b) { a.ajax({ url: "/Pop/PtlViewFollowEtp?etpId=" + p, type: "POST", dataType: "json", data: { id: p }, success: function (c) { new u({ trigger: b, time: 1200, content: "\u5173\u6ce8\u6210\u529f!", type: "succee" }); c = a(b).parent(); a(b).remove(); c.append(a("<a></a>").html('<i class="tick"></i>\u5df2\u5173\u6ce8').attr("id", "linkFollowEd").addClass("btn-flwd-mini")) } }) };
        window.collect = function (b) { a.ajax({ url: "/Pop/PtlViewCollectPosition?posId=" + m, type: "POST", dataType: "json", data: { id: m }, success: function (c) { new u({ trigger: b, time: 1200, content: "\u6536\u85cf\u6210\u529f!", type: "succee" }); c = a(b).parent(); a(b).remove(); c.append(a("<span></span>").html("\u5df2\u6536\u85cf").addClass("buttom-collect")) } }) }; if ("true" == a("#hfNeedShowEducationEdit").val()) {
            g = new Layer; var q = a(this); a.get("/Pop/PtlViewFillLastEducation?t=" + new Date, function (b) {
                h(q); g.setContent(b).show(); a(".ui-layer").customRadioCheckbox();
                b = a("#regForm"); var e = b.attr("action"); a('[data-widget="select"]').selectui(); var d = (new Date).getFullYear(); b.validate({
                    debug: !0, errorElement: "p", errorClass: "errorInfo", rules: { SchoolName: { required: !0 }, Major: { required: !0 }, ignore1: { required: !0 }, degree: { required: !0 } }, messages: { SchoolName: { required: "\u8bf7\u586b\u5199\u5927\u5b66\u540d\u79f0" }, Major: { required: "\u8bf7\u586b\u5199\u4e13\u4e1a\u540d\u79f0" }, ignore1: { required: "\u8bf7\u9009\u62e9\u5c31\u8bfb\u65f6\u95f4" }, degree: { required: "\u8bf7\u9009\u62e9\u5b66\u5386" } },
                    submitHandler: function (b) { b = a(b).serializeJSON(); c || (c = !0, a.ajax({ url: e, type: "post", data: b, success: function (a) { c = !1; 1 != a.code && (location.href = "/mystep") } })) }
                }); new w({ start: { dateName: "#StartDate", dateId: "#StartDateId", startYear: d - 15, currentYear: d - 3, currentMon: 9 }, end: { dateName: "#EndDate", dateId: "#EndDateId", startYear: d - 10, endYear: 5, currentMon: 6 } })
            })
        } a("#job-ideal-sub").on("click", function () {
            var b = a("#form-intention"), e = b.attr("action"); b.validate({
                focusCleanup: !0, submitHandler: function (b) {
                    b = a(b).serializeJSON();
                    c || (c = !0, a.ajax({
                        url: e, type: "post", data: b, success: function (b) {
                            c = !1; 2 == b.code ? (a("#ObjectLocationError").hide(), a("#InternShipLocationError").show()) : 1 == b.code ? (a("#ObjectLocationError").show(), a("#InternShipLocationError").hide()) : 3 == b.code ? (a("#ObjectLocationError").show(), a("#InternShipLocationError").show()) : (g = new Layer, a.get("/Pop/PtlViewObjectiveSaveFinishd?t=" + new Date, function (b) {
                                g.setContent(b).show(); a("#hide-head").remove(); a(".btn-a1").on("click", function () {
                                    a(".mask").remove(); a(".zyb-Layer-show").remove();
                                    a("#InternShipLocationError").hide(); a("#ObjectLocationError").hide()
                                })
                            }))
                        }
                    }))
                }
            })
        })
    })
});