(function (b) {
    var e = function (a, c) { this.option = b.extend({ inputHidden: "", showText: "\u4e0d\u9650", setFirst: "", callback: null, scroll: { isScroll: !1, height: "auto" } }, c); this.element = b(a); this.isShowDropdown && !this.element.attr("disabled") && (this._globalKeydown = b.proxy(this._globalKeydown, this)); this._init() }; e.prototype = {
        isShowDropdown: !0, _init: function () {
            var a = this; this.element.hide(); this.data = []; this.element.find("option").each(function (c, b) {
                var d = {}; d.name = b.innerHTML; d.id = b.value; -1 < b.outerHTML.indexOf("selected") &&
                (a.option.setFirst = c); a.data[c] = d
            }); this._create(); this._bind()
        }, _create: function () {
            var a = this, c = !1; this.wrapper = b('<div class="ui-select" data-widget="ui-select" data-index="select"></div>').addClass("ui-hide"); this.resultText = b('<div class="ui-select-result"></div>'); this.list = b('<ul class="mCustomScrollbar" data-mcs-theme="minimal-dark"></ul>'); b(this.data).each(function (f, d) {
                var e = b("<li>" + d.name + "</li>").attr("data-id", d.id); f === a.option.setFirst && (a.resultText.text(d.name), e.addClass("selected"),
                c = !0); a.list.append(e)
            }); 1 == a.option.scroll.isScroll && 5 < a.list.children().length && a.list.css("height", a.option.scroll.height); c || a.resultText.text(a.option.showText); this.wrapper.append(this.resultText).append(this.list); this.element.after(this.wrapper)
        }, _bind: function () {
            var a = this; this.wrapper.on("mouseover", function (c) { a.wrapper.removeClass("ui-hide"); a.wrapper.addClass("selected-input"); a.wrapper.parent().find("i").addClass("animationR"); c.preventDefault() }); this.wrapper.on("mouseout", function (c) {
                a.wrapper.addClass("ui-hide");
                a.wrapper.removeClass("selected-input"); a.wrapper.parent().find("i").removeClass("animationR")
            }); this.list.on("click", "li", function (c) { var f = b(this).index(); b(a.option.inputHidden).val(b(this).attr("data-id")); a._selected(f); a.wrapper.addClass("ui-hide"); a.wrapper.removeClass("selected-input"); a.wrapper.parent().find("i").removeClass("animationR"); "function" == typeof a.option.callback ? a.option.callback() : null; c.preventDefault() })
        }, _selected: function (a) {
            if (this._getOption(a).attr("disabled")) return !1;
            this.list.find("li").eq(a).addClass("selected").focus().siblings().removeClass("selected"); this.resultText.text(this._getOption(a).text()); this.element[0].selectedIndex = a; return !0
        }, _getOption: function (a) { a = void 0 === a ? this.element[0].selectedIndex : a; return this.element.find("option").eq(a) }, _move: function (a) { console.log(a); var c = this.element[0].length - 1, b = this.element[0].selectedIndex + a; 0 <= b && b <= c && (this._selected(b) || this._move(a + a)) }, _globalKeydown: function (a) {
            var b; switch (a.keyCode) {
                case 8: b = !0;
                    break; case 9: case 27: case 13: this.toggle(); b = !0; break; case 38: this._move(-1); b = !0; break; case 40: this._move(1), b = !0
            } b && a.preventDefault()
        }
    }; b.fn.selectui = function (a) { b(this).each(function () { new e(this, a) }) }
})(jQuery);