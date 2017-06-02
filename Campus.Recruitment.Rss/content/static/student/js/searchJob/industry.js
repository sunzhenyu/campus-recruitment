(function (a) {
    a.industry = function (d, l) {
        var m = { hiddenInput: "", onFoo: function () { } }, k = [{ id: 0, items: [{ id: 0, items: [], name: "\u4e0d\u9650" }], name: "\u4e0d\u9650" }, {
            id: 1, items: [{ id: 1001, items: [], name: "\u8ba1\u7b97\u673a\u8f6f\u4ef6", pid: 1 }, { id: 1003, items: [], name: "\u8ba1\u7b97\u673a\u786c\u4ef6", pid: 1 }, { id: 1005, items: [], name: "\u8ba1\u7b97\u673a\u670d\u52a1\uff08\u7cfb\u7edf\u3001\u6570\u636e\u3001\u7ef4\u4fee\uff09", pid: 1 }, { id: 1006, items: [], name: "\u901a\u4fe1/\u7535\u4fe1/\u7f51\u7edc\u8bbe\u5907", pid: 1 }, {
                id: 1008,
                items: [], name: "\u901a\u4fe1/\u7535\u4fe1\u8fd0\u8425\u3001\u589e\u503c\u670d\u52a1", pid: 1
            }, { id: 1010, items: [], name: "\u4e92\u8054\u7f51/\u7535\u5b50\u5546\u52a1", pid: 1 }, { id: 1011, items: [], name: "\u7f51\u7edc\u6e38\u620f", pid: 1 }, { id: 1013, items: [], name: "\u7535\u5b50\u6280\u672f/\u534a\u5bfc\u4f53/\u96c6\u6210\u7535\u8def", pid: 1 }, { id: 1014, items: [], name: "\u4eea\u5668\u4eea\u8868/\u5de5\u4e1a\u81ea\u52a8\u5316", pid: 1 }], name: "\u8ba1\u7b97\u673a/\u4e92\u8054\u7f51/\u901a\u4fe1/\u7535\u5b50", pid: 0
        }, {
            id: 2, items: [{
                id: 2001,
                items: [], name: "\u4f1a\u8ba1/\u5ba1\u8ba1", pid: 2
            }, { id: 2003, items: [], name: "\u91d1\u878d/\u6295\u8d44/\u8bc1\u5238", pid: 2 }, { id: 2005, items: [], name: "\u94f6\u884c", pid: 2 }, { id: 2007, items: [], name: "\u4fdd\u9669", pid: 2 }], name: "\u4f1a\u8ba1/\u91d1\u878d/\u94f6\u884c/\u4fdd\u9669", pid: 0
        }, {
            id: 3, items: [{ id: 3001, items: [], name: "\u8d38\u6613/\u8fdb\u51fa\u53e3", pid: 3 }, { id: 3003, items: [], name: "\u6279\u53d1/\u96f6\u552e", pid: 3 }, {
                id: 3005, items: [], name: "\u5feb\u6d88\u54c1\uff08\u98df\u54c1\u3001\u996e\u6599\u3001\u5316\u5986\u54c1\uff09",
                pid: 3
            }, { id: 3006, items: [], name: "\u670d\u88c5/\u7eba\u7ec7/\u76ae\u9769", pid: 3 }, { id: 3008, items: [], name: "\u5bb6\u5177/\u5bb6\u7535/\u5de5\u827a\u54c1/\u73a9\u5177/\u73e0\u5b9d", pid: 3 }, { id: 3010, items: [], name: "\u5962\u4f88\u54c1/\u6536\u85cf\u54c1", pid: 3 }, { id: 3011, items: [], name: "\u529e\u516c\u7528\u54c1\u53ca\u8bbe\u5907", pid: 3 }, { id: 3013, items: [], name: "\u673a\u68b0/\u8bbe\u5907/\u91cd\u5de5", pid: 3 }, { id: 3015, items: [], name: "\u6c7d\u8f66\u53ca\u96f6\u914d\u4ef6", pid: 3 }], name: "\u8d38\u6613/\u6d88\u8d39/\u5236\u9020/\u8425\u8fd0",
            pid: 0
        }, { id: 4, items: [{ id: 4001, items: [], name: "\u5236\u836f/\u751f\u7269\u5de5\u7a0b", pid: 4 }, { id: 4003, items: [], name: "\u533b\u7597/\u62a4\u7406/\u536b\u751f", pid: 4 }, { id: 4005, items: [], name: "\u533b\u7597\u8bbe\u5907/\u5668\u68b0", pid: 4 }], name: "\u5236\u836f/\u533b\u7597", pid: 0 }, {
            id: 5, items: [{ id: 5001, items: [], name: "\u5e7f\u544a", pid: 5 }, { id: 5003, items: [], name: "\u516c\u5173/\u5e02\u573a\u63a8\u5e7f/\u4f1a\u5c55", pid: 5 }, {
                id: 5005, items: [], name: "\u5f71\u89c6/\u5a92\u4f53/\u827a\u672f/\u6587\u5316\u4f20\u64ad",
                pid: 5
            }, { id: 5008, items: [], name: "\u6587\u5b57\u5a92\u4f53/\u51fa\u7248", pid: 5 }, { id: 5010, items: [], name: "\u5370\u5237/\u5305\u88c5/\u9020\u7eb8", pid: 5 }], name: "\u5e7f\u544a/\u5a92\u4f53", pid: 0
        }, {
            id: 6, items: [{ id: 6001, items: [], name: "\u623f\u5730\u4ea7\u5f00\u53d1", pid: 6 }, { id: 6003, items: [], name: "\u5efa\u7b51/\u5efa\u6750/\u5de5\u7a0b", pid: 6 }, { id: 6005, items: [], name: "\u5bb6\u5c45/\u5ba4\u5185\u8bbe\u8ba1/\u88c5\u6f62", pid: 6 }, { id: 6006, items: [], name: "\u7269\u4e1a\u7ba1\u7406/\u5546\u4e1a\u4e2d\u5fc3", pid: 6 }],
            name: "\u623f\u5730\u4ea7/\u5efa\u7b51", pid: 0
        }, {
            id: 7, items: [{ id: 7001, items: [], name: "\u4e2d\u4ecb\u670d\u52a1", pid: 7 }, { id: 7003, items: [], name: "\u4e13\u4e1a\u670d\u52a1\uff08\u54a8\u8be2\u3001\u8d22\u4f1a\u3001\u7ffb\u8bd1\uff09", pid: 7 }, { id: 7004, items: [], name: "\u5916\u5305\u670d\u52a1", pid: 7 }, { id: 7005, items: [], name: "\u68c0\u6d4b\uff0c\u8ba4\u8bc1", pid: 7 }, { id: 7007, items: [], name: "\u6cd5\u5f8b", pid: 7 }, { id: 7009, items: [], name: "\u6559\u80b2/\u57f9\u8bad/\u9662\u6821", pid: 7 }, {
                id: 7011, items: [], name: "\u5b66\u672f/\u79d1\u7814",
                pid: 7
            }], name: "\u4e13\u4e1a\u670d\u52a1/\u6559\u80b2/\u57f9\u8bad", pid: 0
        }, { id: 8, items: [{ id: 8001, items: [], name: "\u9910\u996e\u4e1a", pid: 8 }, { id: 8003, items: [], name: "\u9152\u5e97/\u65c5\u6e38", pid: 8 }, { id: 8005, items: [], name: "\u5a31\u4e50/\u4f11\u95f2/\u4f53\u80b2", pid: 8 }, { id: 8007, items: [], name: "\u7f8e\u5bb9/\u4fdd\u5065", pid: 8 }, { id: 8009, items: [], name: "\u751f\u6d3b\u670d\u52a1", pid: 8 }], name: "\u670d\u52a1\u4e1a", pid: 0 }, {
            id: 9, items: [{ id: 9001, items: [], name: "\u4ea4\u901a/\u8fd0\u8f93/\u7269\u6d41", pid: 9 }, {
                id: 9003,
                items: [], name: "\u822a\u5929/\u822a\u7a7a", pid: 9
            }], name: "\u7269\u6d41/\u8fd0\u8f93", pid: 0
        }, { id: 10, items: [{ id: 10001, items: [], name: "\u77f3\u6cb9/\u5316\u5de5/\u77ff\u4ea7/\u5730\u8d28", pid: 10 }, { id: 10003, items: [], name: "\u91c7\u6398\u4e1a/\u51b6\u70bc", pid: 10 }, { id: 10005, items: [], name: "\u7535\u529b/\u6c34\u5229", pid: 10 }, { id: 10006, items: [], name: "\u65b0\u80fd\u6e90", pid: 10 }, { id: 10008, items: [], name: "\u539f\u6750\u6599\u548c\u52a0\u5de5", pid: 10 }], name: "\u80fd\u6e90/\u539f\u6750\u6599", pid: 0 }, {
            id: 11, items: [{
                id: 11001,
                items: [], name: "\u653f\u5e9c/\u516c\u5171\u4e8b\u4e1a", pid: 11
            }, { id: 11003, items: [], name: "\u975e\u76c8\u5229\u673a\u6784", pid: 11 }, { id: 11005, items: [], name: "\u73af\u4fdd", pid: 11 }, { id: 11007, items: [], name: "\u519c/\u6797/\u7267/\u6e14", pid: 11 }, { id: 11008, items: [], name: "\u591a\u5143\u5316\u4e1a\u52a1\u96c6\u56e2\u516c\u53f8", pid: 11 }, { id: 11010, items: [], name: "\u5176\u4ed6\u884c\u4e1a", pid: 11 }], name: "\u653f\u5e9c/\u975e\u8425\u5229\u673a\u6784/\u5176\u4ed6", pid: 0
        }], b = this; b.settings = {}; var f = a(d); b.init = function (g) {
            this.settings =
            a.extend({}, m, g); this.industrySelect = a('<div class="industry-select" data-target="industry"><div id="m-mask"></div><div id="industry-left"><ul><li data-id="0">\u4e0d\u9650</li><li data-id="1">\u8ba1\u7b97\u673a/\u4e92\u8054\u7f51/\u901a\u4fe1/\u7535\u5b50</li><li data-id="2">\u4f1a\u8ba1/\u91d1\u878d/\u94f6\u884c/\u4fdd\u9669</li><li data-id="3">\u8d38\u6613/\u6d88\u8d39/\u5236\u9020/\u8425\u8fd0</li><li data-id="4">\u5236\u836f/\u533b\u7597</li><li data-id="5">\u5e7f\u544a/\u5a92\u4f53</li><li data-id="6">\u623f\u5730\u4ea7/\u5efa\u7b51</li><li data-id="7">\u4e13\u4e1a\u670d\u52a1/\u6559\u80b2/\u57f9\u8bad</li><li data-id="8">\u670d\u52a1\u4e1a</li><li data-id="9">\u7269\u6d41/\u8fd0\u8f93</li><li data-id="10">\u80fd\u6e90/\u539f\u6750\u6599</li><li data-id="11">\u653f\u5e9c/\u975e\u8425\u5229\u673a\u6784/\u5176\u4ed6</li></ul></div><div id="industry-right"><ul></ul></div></div>');
            var e = a(this.settings.hiddenInput).val(); if (0 == e) f.html("\u884c\u4e1a"), a(b.industrySelect.find("li")[0]).addClass("backgroundH"), a(b.industrySelect.find("#industry-right ul")).html(this.rightInit(f, 0)); else { var c = 0; a.each(k, function (n, g) { a.each(g.items, function (g, d) { if (d.id == e) { c = 1; var h = b.industrySelect.find("li")[n]; a(h).siblings().removeClass("backgroundH"); a(h).addClass("backgroundH"); h = b.rightInit(a(h)); b.industrySelect.find("#industry-right ul").html(h); f.html(d.name); return !1 } }); if (c) return !1 }) } this.show()
        };
        b.show = function () { f.after(this.industrySelect); this.bindEvent() }; b.hide = function () { a(".industry-select").hide() }; b.bindEvent = function () {
            function g() { setTimeout(function () { a("#m-mask").hide() }, 300) } var e = this; a(".industry-select").on("mouseover", "#industry-left li", function () { a("#m-mask").show(); var c = a(this).siblings(), b = e.rightInit(a(this)); a("#industry-right ul").html(b); a.each(c, function (c, b) { a(b).hasClass("backgroundH") && a(b).removeClass("backgroundH") }); a(this).addClass("backgroundH"); g() });
            a(".industry-select").on("click", "#industry-right li", function () { f.html(a(this).html()); a(b.settings.hiddenInput).val(a(this).attr("data-id")); "function" == typeof e.settings.onFoo ? e.settings.onFoo() : null; e.hide() }); a(document).on("click", function (c) { c = window.event || c; obj = c.srcElement ? c.srcElement : c.target; "industry" != a(obj).attr("data-target") && a(obj).attr("id") != f[0].id && (a(".industry-select").hide(), a("#Occupation").siblings("i").removeClass("animationR"), a("#Occupation").removeClass("selected-input")) });
            a("#industry-left").click(function (a) { a = window.event || a; a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0 })
        }; b.rightInit = function (b, e) { var c = b.attr("data-id") || e, d = ""; a.each(k[c].items, function (a, b) { d += '<li data-id="' + b.id + '">' + b.name + "</li>" }); return d }; b.init(l)
    }; a.fn.industry = function (d) { return this.each(function () { new a.industry(this, d) }) }
})(jQuery);