(function (a) {
    a.func = function (d, f) {
        var g = { title: "", content: "", onFoo: function () { } }; this.settings = {}; var b = a(d); this.init = function (c) { this.settings = a.extend({}, g, c); var e = a('input[name="func"]').val(); e ? a.each(b.find("li"), function (b, c) { if (a(c).attr("data-id") == e) return a("#func").html(a(c).text()), !1 }) : a("#func").html("\u804c\u80fd"); this.show(); this.bindEvent() }; this.show = function () { b.appendTo(".selectO") }; this.hide = function () { }; this.bindEvent = function () {
            var c = this; b.on("click", "li", function (b) {
                a(this).parent().siblings(".input-select").text(a(this).text());
                a('input[name="func"]').val(a(this).attr("data-id")); a(this).parent().hide(); "function" == typeof c.settings.onFoo ? c.settings.onFoo() : null; b = window.event || b; b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0
            }); a(".selectO").on("mouseover", function () { a(this).find("ul").show(); b.siblings(".input-select").addClass("selected-input"); b.siblings("i").addClass("animationR") }); a(".selectO").on("mouseout", function () { a(this).find("ul").hide(); b.siblings(".input-select").removeClass("selected-input"); b.siblings("i").removeClass("animationR") })
        };
        this.init(f)
    }; a.fn.func = function (d) { return this.each(function () { new a.func(this, d) }) }
})(jQuery);