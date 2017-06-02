(function (e) {
    var d = {
        init: function (b, a) { d.fillHtml(b, a); d.bindEvent(b, a) }, fillHtml: function (b, a) {
            b.empty(); 1 < a.current ? b.append('<a href="javascript:;" class="prevPage">\u4e0a\u4e00\u9875</a>') : (b.remove(".prevPage"), b.append('<span class="disabled">\u4e0a\u4e00\u9875</span>')); 1 != a.current && 4 <= a.current && 4 != a.pageCount && b.append('<a href="javascript:;" class="tcdNumber">1</a>'); 2 < a.current - 2 && a.current <= a.pageCount && 5 < a.pageCount && b.append("<span>...</span>"); var c = a.current - 2, d = a.current + 2; (1 < c &&
            4 > a.current || 1 == a.current) && d++; for (a.current > a.pageCount - 4 && a.current >= a.pageCount && c--; c <= d; c++) c <= a.pageCount && 1 <= c && (c != a.current ? b.append('<a href="javascript:;" class="tcdNumber">' + c + "</a>") : b.append('<span class="current">' + c + "</span>")); a.current + 2 < a.pageCount - 1 && 1 <= a.current && 5 < a.pageCount && b.append("<span>...</span>"); a.current != a.pageCount && a.current < a.pageCount - 2 && 4 != a.pageCount && b.append('<a href="javascript:;" class="tcdNumber">' + a.pageCount + "</a>"); a.current < a.pageCount ? b.append('<a href="javascript:;" class="nextPage">\u4e0b\u4e00\u9875</a>') :
            (b.remove(".nextPage"), b.append('<span class="disabled">\u4e0b\u4e00\u9875</span>'))
        }, bindEvent: function (b, a) {
            return function () {
                b.on("click", "a.tcdNumber", function () { var c = parseInt(e(this).text()); d.fillHtml(b, { current: c, pageCount: a.pageCount }); "function" == typeof a.backFn && a.backFn(c) }); b.on("click", "a.prevPage", function () { var c = parseInt(b.children("span.current").text()); d.fillHtml(b, { current: c - 1, pageCount: a.pageCount }); "function" == typeof a.backFn && a.backFn(c - 1) }); b.on("click", "a.nextPage", function () {
                    var c =
                    parseInt(b.children("span.current").text()); d.fillHtml(b, { current: c + 1, pageCount: a.pageCount }); "function" == typeof a.backFn && a.backFn(c + 1)
                })
            }()
        }
    }; e.fn.createPage = function (b) { b = e.extend({ pageCount: 10, current: 1, backFn: function () { } }, b); d.init(this, b) }
})(jQuery);