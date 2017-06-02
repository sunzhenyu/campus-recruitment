(function (a) {
    a.fn.shortcut = function (c) {
        var e = { gotop: true, feedBackLink: true, weChat: true };
        var f = function () {
            this.config = { isLeanRight: false, pageWidth: 1000, nodeId: "go-top", nodeWidth: 74, distanceToBottom: 130, hideRegionHeight: 130, distanceToPage: 41, text: "" };
            this.cache = { topLinkThread: null }
        };
        f.prototype = {
            constructor: f,
            init: function (h) {
                var i = this.config;
                this.config = a.extend("", i, h);
                var g = this;
                var j = a(window);
                this.method_Id = null;
                this.timer = null;
                this.isTop = false;
                j.scroll(function () { g._throttle() });
                j.resize(function () { g._resizeWindow({ _self: g }) });
                g._insertNode({ _self: g });
                if (a(document).scrollTop() > g.config.hideRegionHeight) { g._scrollScreen({ _self: g }) }
            },
            _throttle: function () {
                var h = this;
                var g = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
                clearTimeout(h.method_Id);
                h.method_Id = setTimeout(function () {
                    h._scrollScreen({ _self: h });
                    switch (g) {
                        case "wheel":
                            window.onwheel = function (i) { clearInterval(h.timer) };
                            break;
                        case "mousewheel":
                            window.onmousewheel = function (i) { clearInterval(h.timer) };
                            break;
                        default:
                            window.onDOMMouseScroll = function (i) { clearInterval(h.timer) }
                    }
                }, 100)
            },
            _insertNode: function (i) {
                var l = this;
                var g = i._self;
                var k = a(window);
                var h = a('<a id="' + g.config.nodeId + '">' + g.config.text + "</a>");
                h.click(function () {
                    l.timer = setInterval(function () {
                        var m = document.documentElement.scrollTop || document.body.scrollTop;
                        var n = Math.floor(-m / 4);
                        document.documentElement.scrollTop = document.body.scrollTop = m + n;
                        l.isTop = true;
                        if (m == 0) { clearInterval(l.timer) }
                    }, 30)
                }).appendTo(a("body"));
                var j = g._getDistanceToBottom({ _self: g });
                if (/MSIE 6/i.test(navigator.userAgent)) { h.css({ "display": "none", "position": "absolute", "right": j + "px" }) } else { h.css({ "display": "none", "position": "fixed", "right": j + "px", "top": (k.height() - g.config.distanceToBottom) - 5 + "px" }) }
            },
            _scrollScreen: function (i) {
                var g = i._self;
                var k = a(document);
                var j = a(window);
                var h = a("#" + g.config.nodeId);
                if (k.scrollTop() <= g.config.hideRegionHeight) {
                    clearTimeout(g.cache.topLinkThread);
                    h.hide();
                    return
                }
                if (/MSIE 6/i.test(navigator.userAgent)) {
                    clearTimeout(g.cache.topLinkThread);
                    g.cache.topLinkThread = setTimeout(function () {
                        var l = k.scrollTop() + j.height() - g.config.distanceToBottom;
                        h.css({ "top": l + "px" }).fadeIn("150")
                    }, 200)
                } else {
                    this.osTop = document.documentElement.scrollHeight || document.body.scrollHeight;
                    h.show()
                }
            },
            _resizeWindow: function (i) {
                var g = i._self;
                var m = a(window);
                var l = a(document);
                var h = a("#" + g.config.nodeId);
                var j = g._getDistanceToBottom({ _self: g });
                var k = m.height() - g.config.distanceToBottom;
                if (/MSIE 6/i.test(navigator.userAgent)) { k += l.scrollTop() }
                h.css({ "right": j + "px", "top": k - 5 + "px" })
            },
            _getDistanceToBottom: function (h) {
                var g = h._self;
                var j = a(window);
                var i = parseInt((j.width() - g.config.pageWidth + 1) / 2 - g.config.nodeWidth - g.config.distanceToPage, 10);
                if (/MSIE 6/i.test(navigator.userAgent)) { i = parseInt((j.width() - g.config.pageWidth + 1) / 2 - g.config.nodeWidth - g.config.distanceToPage - 10, 10) }
                if (i < 10) { i = 10 }
                if (g.config.isLeanRight === true) { i = 0 }
                return i
            }
        };
        var d = function () {
            this.defaults = { distanceToBottom: 334, nodeId: "GoFeedBack", pageWidth: 1000, distanceToPage: 41, nodeWidth: 74, isLeanRight: false };
            this.cache = { thread: null }
        };
        d.prototype = {
            constructor: d,
            init: function (i) {
                var k = this,
                    l = k.defaults;
                k.defaults = a.extend("", l, i);
                var h = k.getLocation();
                var j = k.getDistanceToRight(k.defaults);
                var g = a("<a></a>").append('<div class="specialLine"><p>产品经理专线：</p><h3>189-1815-9903</h3><i><em></em></i></div>').appendTo("body").attr({ "id": k.defaults.nodeId, target: "_blank", "href": h });
                g.attr("href", h).css("right", j);
                a(window).resize(function () {
                    j = k.getDistanceToRight(k.defaults);
                    g.css("right", j)
                })
            },
            getLocation: function () {
                var g = window.location.href;
                var h = "/feedback";
                var i = h + "?url=" + g;
                return i
            },
            getDistanceToRight: function (h) {
                var i = a(h.selector);
                var j = a(window);
                var g = parseInt((j.width() - h.pageWidth + 1) / 2 - h.nodeWidth - h.distanceToPage, 10);
                if (/MSIE 6/i.test(navigator.userAgent)) { g = parseInt((j.width() - h.pageWidth + 1) / 2 - h.nodeWidth - h.distanceToPage - 10, 10) }
                if (g < 10) { g = 10 }
                if (h.isLeanRight === true) { g = 0 }
                return g
            }
        };
        var b = function () {
            this.defaults = { distanceToBottom: 334, nodeId: "WeChat", pageWidth: 1000, distanceToPage: 41, nodeWidth: 74, isLeanRight: false };
            this.cache = { thread: null }
        };
        b.prototype = {
            constructor: b,
            init: function (h) {
                var k = this,
                    l = k.defaults;
                k.defaults = a.extend("", l, h);
                var j = k.getDistanceToRight(k.defaults);
                var i = "";
                if (h == null || h == "") { i = '<img src="' + h.img_path + '" alt="">' } else { i = '<img style="width:165px;height:165px;" src="' + h.img_path + '" alt="">' }
                var g = a('<div><div class="left">' + '<p class="server">联系方式</p>' + i + '<em class="wechat-triangle1"></em>' + '<em class="wechat-triangle2"></em>' + '</div><div class="right"></div></div>').appendTo("body").attr({ "id": k.defaults.nodeId });
                g.css("right", j);
                g.children(".right").hover(function () { g.children(".left").fadeIn("slow") }, function () { g.children(".left").fadeToggle("slow") });
                a(window).resize(function () {
                    j = k.getDistanceToRight(k.defaults);
                    g.css("right", j)
                })
            },
            getDistanceToRight: function (h) {
                var i = a(h.selector);
                var j = a(window);
                var g = parseInt((j.width() - h.pageWidth + 1) / 2 - h.nodeWidth - h.distanceToPage, 10);
                if (/MSIE 6/i.test(navigator.userAgent)) { g = parseInt((j.width() - h.pageWidth + 1) / 2 - h.nodeWidth - h.distanceToPage - 10, 10) }
                if (g < 10) { g = 10 }
                if (h.isLeanRight === true) { g = 0 }
                return g
            }
        };
        return ({ gotop: new f(), feedbacklink: new d(), wechat: new b() })
    }
})(jQuery);
