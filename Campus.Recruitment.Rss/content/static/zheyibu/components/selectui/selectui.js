(function (b) {
    var f = function (a, c) { this.option = b.extend({ showText: "\u8bf7\u9009\u62e9", setFirst: 0 }, c); this.element = b(a); this.isShowDropdown && !this.element.attr("disabled") && (this._globalKeydown = b.proxy(this._globalKeydown, this)); this._init() }; f.prototype = {
        isShowDropdown: !0, _init: function () {
            var a = this; this.element.hide(); this.data = []; this.element.find("option").each(function (c, b) { var e = {}; e.name = b.text; e.id = b.value; -1 < b.outerHTML.indexOf("selected") && (a.option.setFirst = c); a.data[c] = e }); this._create();
            this._bind()
        }, _create: function () { var a = this, c = !1; this.wrapper = b('<div class="selectUi" data-widget="selectUi"></div>').addClass("fn-hide"); this.resultText = b('<div class="select-result"></div>'); this.list = b("<ul></ul>"); b(this.data).each(function (d, e) { var f = b("<li>" + e.name + "</li>").attr("data-id", e.id); d === a.option.setFirst && (a.resultText.text(e.name), f.addClass("selected"), c = !0); a.list.append(f) }); c || a.resultText.text(a.option.showText); this.wrapper.append(this.resultText).append(this.list); this.element.after(this.wrapper) },
        toggle: function () { this.wrapper.hasClass("fn-hide") ? (b('[data-widget="selectUi"]').addClass("fn-hide"), this.wrapper.removeClass("fn-hide"), b(document).on("keydown", this._globalKeydown)) : (b('[data-widget="selectUi"]').addClass("fn-hide"), b(document).off("keydown", this._globalKeydown)) }, _bind: function () {
            var a = this; this.resultText.on("click", function (c) { c.stopPropagation(); a.wrapper.focus(); a.toggle() }); this.list.on("click", "li", function (c) { var d = b(this).index(); a._selected(d); a.toggle(); c.preventDefault() });
            b(document).on("click", function (a) { a = a || window.event; for (a = a.srcElement || a.target; a;) { if ("selectUi" == b(a).attr("data-widget")) return; a = a.parentNode } b('[data-widget="selectUi"]').addClass("fn-hide"); b(document).off("keydown") })
        }, _selected: function (a) { if (this._getOption(a).attr("disabled")) return !1; this.list.find("li").eq(a).addClass("selected").focus().siblings().removeClass("selected"); this.resultText.text(this._getOption(a).text()); this.element[0].selectedIndex = a; this.element.trigger("blur"); return !0 },
        _getOption: function (a) { a = void 0 === a ? this.element[0].selectedIndex : a; return this.element.find("option").eq(a) }, _move: function (a) { var b = this.element[0].length - 1, d = this.element[0].selectedIndex + a; 0 <= d && d <= b && (this._selected(d) || this._move(a + a)) }, _globalKeydown: function (a) { var b; switch (a.keyCode) { case 8: b = !0; break; case 9: case 27: case 13: this.toggle(); b = !0; break; case 38: this._move(-1); b = !0; break; case 40: this._move(1), b = !0 } b && a.preventDefault() }
    }; b.fn.selectui = function (a) {
        b(this).each(function () {
            new f(this,
            a)
        })
    }
})(jQuery);