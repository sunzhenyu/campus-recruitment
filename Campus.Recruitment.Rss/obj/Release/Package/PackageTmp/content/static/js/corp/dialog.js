(function (k, b, m) {
    b.fn.Dialog = function (a) { var e = []; b(this).each(function () { var d = new l, c = b.extend({ trigger: b(this) }, a); d.init(c); e.push(d) }); return e }; b.Dialog = function (a) {
        if ("alert" === a.type) {
            var e = new l, d = '<div class="ui-alert-title">' + a.content + "</div>", c = ""; a.button ? ("boolean" == typeof a.button && (a.button = "\u786e\u5b9a"), c = '<p class="ui-dialog-action"><button class="ui-alert-submit  js-dialog-close">' + a.button + "</button></p>") : a.timer || (a.timer = 1400); d = b.extend({
                target: d + c, animate: !0, show: !0, mask: !0,
                className: "ui-alert", afterHide: function (b) { this.dispose(); a.callback && a.callback() }
            }, a); e.init(d); a.timer && setTimeout(function () { e.hide(); a.callback && a.callback() }, a.timer); e.touch(e.mask, function () { e.dispose(); a.callback && a.callback() })
        } if ("confirm" === a.type) {
            var f = new l, d = '<div class="ui-confirm-title">' + a.content + "</div>", c = ""; a.buttons || (a.buttons = [{ yes: "\u786e\u5b9a" }, { no: "\u53d6\u6d88" }]); for (var c = "", g = 0, k = a.buttons.length; g < k; g++) {
                var h = a.buttons[g]; h.yes && (c += '<td><button class="ui-confirm-submit " data-type="yes">' +
                h.yes + "</button></td>"); h.no && (c += '<td><button class="ui-confirm-no" data-type="no">' + h.no + "</button></td>"); h.close && (c += '<td><button class="ui-confirm-close js-dialog-close" data-type="close">' + h.close + "</button></td>")
            } d += '<table class="ui-dialog-action"><tr>' + c + "</tr></table>"; d = b.extend({
                target: d, animate: !0, show: !0, mask: !0, className: "ui-alert", afterHide: function (a) { this.dispose() }, beforeShow: function (c) {
                    f.touch(b(".ui-confirm-submit", c), function () { a.callback && a.callback.call(f, "yes", c) }); f.touch(b(".ui-confirm-no",
                    c), function () { a.callback && a.callback.call(f, "no", c) }); f.touch(b(".ui-confirm-close", c), function () { a.callback && a.callback.call(f, "close", c) })
                }
            }, a); f.init(d)
        }
    }; b.alert = function (a, e, d, c, f) { var g = {}, g = { zIndex: 100, type: "alert" }, g = "object" == typeof a ? b.extend(g, a) : b.extend(g, { content: a, button: e, timer: c, callback: d }); b.Dialog(b.extend(g, f)) }; b.confirm = function (a, e, d, c) {
        var f = {}, f = { zIndex: 100, type: "confirm" }, f = "object" == typeof a ? b.extend(f, a) : b.extend(f, { content: a, buttons: e, callback: d }); b.Dialog(b.extend(f,
        c))
    }; var l = function () { this.id = "dialog_" + Math.random().toString().replace(".", ""); this.settings = {}; this.settings.closeTpl = b('<span class="ui-dialog-close js-dialog-close"></span>'); this.settings.titleTpl = b('<div class="ui-dialog-title"></div>'); this.timer = null; this.showed = !1; this.mask = b() }; l.prototype = {
        init: function (a) {
            this.settings = b.extend({}, this.settings, a); this.settings.mask && (this.mask = b('<div class="ui-dialog-mask"/>'), b("body").append(this.mask)); b("body").append('<div class="ui-dialog" id="' +
            this.id + '"></div>'); this.dialogContainer = b("#" + this.id); a = this.settings.zIndex || 10; this.dialogContainer.css({ zIndex: a }); this.settings.className && this.dialogContainer.addClass(this.settings.className); this.mask.css({ zIndex: a - 1 }); this.settings.closeTpl && this.dialogContainer.append(this.settings.closeTpl); this.settings.title && (this.dialogContainer.append(this.settings.titleTpl), this.settings.titleTpl.html(this.settings.title)); "string" === typeof this.settings.target ? /^(\.|\#\w+)/gi.test(this.settings.target) ?
            this.dailogContent = b(this.settings.target) : this.dailogContent = b('<div class="ui-dialog-content">' + this.settings.target + "</div>") : this.dailogContent = this.settings.target; this.dialogContainer.append(this.dailogContent); this.bindEvent(); this.settings.show && this.show()
        }, touch: function (a, e) { var d; b(a).on("click", function (a) { return e.call(this, a) }); b(a).on("touchmove", function (a) { d = !0 }).on("touchend", function (a) { a.preventDefault(); d || e.call(this, a, "touch") || (a.preventDefault(), a.stopPropagation()); d = !1 }) },
        bindEvent: function () { var a = this; this.settings.trigger && (b(this.settings.trigger).click(function () { a.show() }), a.touch(b(this.settings.trigger), function () { a.show() })); b(this.dialogContainer).on("click", ".js-dialog-close", function () { try { return b(".hfilter").getNiceScroll() && b(".hfilter").getNiceScroll().hide(), a.dispose(), !1 } catch (e) { return a.dispose(), !1 } }); b(k).resize(function () { a.setPosition() }); b(k).keydown(function (b) { 27 === b.keyCode && a.showed && a.dispose() }) }, dispose: function () {
            this.dialogContainer.remove();
            this.mask.remove(); this.timer && clearInterval(this.timer)
        }, hide: function () {
            var a = this; a.settings.beforeHide && a.settings.beforeHide.call(a, a.dialogContainer); this.showed = !1; this.mask.hide(); this.timer && clearInterval(this.timer); this.settings.animate ? (this.dialogContainer.removeClass("zoomIn").addClass("zoomOut"), setTimeout(function () { a.dialogContainer.hide(); "object" === typeof a.settings.target && b("body").append(a.dialogContainer.hide()); a.settings.afterHide && a.settings.afterHide.call(a, a.dialogContainer) },
            500)) : (this.dialogContainer.hide(), "object" === typeof this.settings.target && b("body").append(this.dialogContainer), this.settings.afterHide && this.settings.afterHide.call(this, this.dialogContainer))
        }, show: function () {
            this.mask.show(); this.height = this.settings.height || "auto"; this.width = this.settings.width || "auto"; this.dialogContainer.css({ height: this.height, width: this.width }).show(); this.settings.beforeShow && this.settings.beforeShow.call(this, this.dialogContainer); this.showed = !0; b(this.settings.trigger).blur();
            this.setPosition(); this.timer && clearInterval(this.timer); this.settings.animate && this.dialogContainer.addClass("zoomIn").removeClass("zoomOut").addClass("animated")
        }, setPosition: function () {
            if (this.showed) {
                this.dialogContainer.show(); this.height = this.settings.height; this.width = this.settings.width; isNaN(this.height) && (this.height = this.dialogContainer.outerHeight && this.dialogContainer.outerHeight() || this.dialogContainer.height()); isNaN(this.width) && (this.width = this.dialogContainer.outerWidth && this.dialogContainer.outerWidth() ||
                this.dialogContainer.width()); var a = Math.floor((this.settings.clientWidth || document.documentElement.clientWidth || document.body.clientWidth) / 2) - Math.floor(this.width / 2), b = Math.floor((this.settings.clientHeight || document.documentElement.clientHeight || document.body.clientHeight) / 2) - Math.floor(this.height / 2), a = Math.max(0, a), b = Math.max(0, b); this.dialogContainer.css({ position: "fixed", top: b, left: a })
            }
        }
    }; k.Dialog = l
})(window, jQuery);