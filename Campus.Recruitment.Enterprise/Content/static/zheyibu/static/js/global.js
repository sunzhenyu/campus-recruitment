String.prototype.Trim = function () { return this.replace(/(^\s*)|(\s*$)/g, "") }; String.prototype.isMobile = function () { return this.match(/^1[3|4|5|7|8][0-9]\d{4,8}$/) && 11 == this.length && "" != this ? !0 : !1 }; String.prototype.isEmail = function () { return this.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/) && "" != this ? !0 : !1 }; String.prototype.isWords = function () { return this.match(/[A-Za-z0-9]+$/) != this || "" == this ? !1 : !0 }; String.prototype.isNumber = function () { return this.match(/\d+$/) != this || "" == this ? !1 : !0 };
String.prototype.getType = function () { var c; return ("object" == (c = typeof this) ? null == this && "null" || Object.prototype.toString.call(this).slice(8, -1) : c).toLowerCase() };
var Global = function () {
    function c(g) { return parseInt(g[1].split(".")[0]) } this.popMask = {}; $("body").append('<div id="dialogMask"></div>'); var k = Object.prototype.hasOwnProperty, f = {}, h = navigator.userAgent.toLowerCase(), a; (a = h.match(/msie ([\d.]+)/)) ? f.ie = c(a) : (a = h.match(/firefox\/([\d.]+)/)) ? f.firefox = c(a) : (a = h.match(/chrome\/([\d.]+)/)) ? f.chrome = c(a) : (a = h.match(/opera.([\d.]+)/)) ? f.opera = c(a) : (a = h.match(/version\/([\d.]+).*safari/)) ? f.safari = c(a) : 0; return {
        host: window.location.host, ua: navigator.userAgent.toLowerCase(),
        sys: f, userInfo: {}, loginSubmit: function (g) { }, isLogin: function () { }, quickLogin: function (g) { }, createDialog: function (g) {
            var e = this, b = { id: "", title: "\u63d0\u793a\u4fe1\u606f", text: "\u6ca1\u6709\u5f97\u5230\u60a8\u60f3\u8981\u7684\u5185\u5bb9\uff0c\u70b9\u51fb\u786e\u8ba4\u5173\u95ed\u8be5\u7a97\u53e3", template: void 0, btnDisplay: [], btnText: { yes: "\u786e\u8ba4", no: "\u53d6\u6d88" }, boxSize: { w: 0, h: 0 }, callback: void 0, submitCallback: void 0, cancelCallback: void 0, closeCallback: void 0 }; e.extend(b, g); var d = b.template ||
            b.text; if ("string" == d.getType() && "." == d[0] || "#" == d[0]) d = $(d).html(); var a = $('<div id="' + b.id + '" class="pop-dialog"><div class="pop-dialog-title"><h2>' + b.title + '</h2><div class="close"></div></div><div class="pop-dialog-content">' + d + "</div></div>"); $("body").append(a); a.find(".close").click(function () { e.popMask.css("display", "none"); a.remove() }); e.popMask.css("display", "block"); a.css("display", "block"); "undefined" != typeof b.callback && b.callback.apply(this, arguments)
        }, callLoginPop: function () {
            this.createDialog({
                id: "popReg",
                title: "\u8bf7\u586b\u5199\u4ee5\u4e0b\u57fa\u672c\u4fe1\u606f\uff0c\u4ee5\u4fbf\u730e\u5934\u4e0e\u60a8\u8054\u7cfb", template: "#quickLogin"
            }); $("#popReg .form").each(function () { $(this).quickLogin({ success: global.loginSubmit }) })
        }, showMask: function () { $("#dialogMask").css("display", "block") }, hideMask: function () { $("#dialogMask").css("display", "none") }, getCookie: function (a) {
            for (var e = document.cookie.split("; "), b = 0; b < e.length; b++) {
                var d = e[b].split("="); if (d[0] == a) return "Login" == a ? utf8to16(base64decode(decodeURIComponent(d[1]))) :
                d[1]
            } return ""
        }, extend: function (a, e) { var b = [].slice.call(arguments), d = 1, c, f = "boolean" === typeof b[b.length - 1] ? b.pop() : !0; for (1 === b.length && (a = this.window ? {} : this, d = 0) ; e = b[d++];) for (c in e) !k.call(e, c) || !f && c in a || (a[c] = e[c]); return a }
    }
}, global = new Global; $(function () { $("body").append('<div id="dialogMask"></div>'); global.popMask = $("#dialogMask") });