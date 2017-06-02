$(function () {
    window.clickNum = 0;
    $(document).on("click", ".search-job", function (b) {
        if ($(".s-job").hasClass("dN")) {
            if (!$(".hot-link").hasClass("dN")) { $(".hot-link").addClass("dN") }
            $(".s-job").removeClass("dN");
            $(".search-job i").addClass("animationR")
        } else {
            $(".search-job i").removeClass("animationR");
            $(".s-job").addClass("dN")
        }
        return false
    }).on("click", ".search-location", function () {
        var options = { trigger: "#cityName", inputVal: "#cityName", hinput: "#hCity", numLimit: 5 };
        $(this).city_picker(options)
    }).on("click", "#keys", function (b) {
        if (!$(".s-job").hasClass("dN")) {
            $(".s-job").addClass("dN");
            $(".search-job i").removeClass("animationR")
        }
        $(".s-key .hot-link").removeClass("dN");
        return false
    }).on("click", function (c) {
        var d = c || window.event;
        var b = d.srcElement || d.target;
        if ($(b).attr("id") != "keys") { $(".s-key .hot-link").addClass("dN") }
        if ($(b).attr("id") != "search-job") {
            $(".search-job i").removeClass("animationR");
            $(".s-job").addClass("dN")
        }
    }).on("keydown", ".s-key input", function (b) {
        if (b.keyCode == "13") { a() }
    });
    $(".s-job").on("click", "li", function () {
        $("#search-job").html($(this).html());
        $("#J_Type").val($(this).attr("data-id"))
    });
    $(".hot-link a").on("click", function (b) {
        $(".s-key .hot-link").addClass("dN");
        $(".s-key input").val($(this).html());
        a()
    });
    $(".s-btn").on("click", function () { a() });

    function a() {
        var d = $("#J_Type").val();
        var f = $("#hCity").val() === "" ? 0 : $("#hCity").val();
        var e = $("#keys").val();
        var b = "0";
        var c = "/sou/" + 0 + "-" + 0 + "-" + 0 + "-" + 0 + "-" + 0 + "-" + 0 + "-" + 0 + "-" + d + "-" + 0 + "-" + 1;
        c = c + "-" + f;
        if (e.length > 0) { c += "?q=" + e }
        location.href = "/job/full-time";//c
    };
    $(".homepage-part4").on("click", ".link-part1 .iClick", function () {
        $(this).toggleClass("animationR");
        $(".link-part2").slideToggle(300)
    }).on("click", ".link-part3 .iClick", function () {
        $(this).toggleClass("animationR");
        $(".link-part4").slideToggle(300)
    });
    (function (d) {
        function h(v) {
            var n = d(this),
                g = null,
                m = [],
                p = null,
                e = null,
                c = d.extend({ rowSelector: "> li", submenuSelector: "*", submenuDirection: "right", tolerance: 75, enter: d.noop, exit: d.noop, activate: d.noop, deactivate: d.noop, exitMenu: d.noop }, v),
                t = function (b) { b != g && (g && c.deactivate(g), c.activate(b), g = b) },
                u = function (b) {
                    var a = h();
                    a ? e = setTimeout(function () { u(b) }, a) : t(b)
                },
                h = function () {
                    function b(a, b) {
                        return (b.y - a.y) / (b.x - a.x)
                    }
                    if (!g || !d(g).is(c.submenuSelector)) return 0;
                    var a = n.offset(),
                        e = { x: a.left, y: a.top - c.tolerance },
                        q = { x: a.left + n.outerWidth(), y: e.y },
                        h = { x: a.left, y: a.top + n.outerHeight() + c.tolerance },
                        r = { x: a.left + n.outerWidth(), y: h.y },
                        k = m[m.length - 1],
                        f = m[0];
                    if (!k) return 0;
                    f || (f = k);
                    if (f.x < a.left || f.x > r.x || f.y < a.top || f.y > r.y || p && k.x == p.x && k.y == p.y) return 0;
                    var l = q,
                        a = r;
                    "left" == c.submenuDirection ? (l = h, a = e) : "below" == c.submenuDirection ? (l = r, a = h) : "above" == c.submenuDirection && (l = e, a = q);
                    e = b(k, l);
                    q = b(k, a);
                    l = b(f, l);
                    f = b(f, a);
                    if (e < l && q > f) return p = k, 300;
                    p = null;
                    return 0
                };
            n.mouseleave(function () {
                e && clearTimeout(e);
                c.exitMenu(this) &&
                    (g && c.deactivate(g), g = null)
            }).find(c.rowSelector).mouseenter(function () {
                e && clearTimeout(e);
                c.enter(this);
                u(this)
            }).mouseleave(function () { c.exit(this) }).click(function () { t(this) });
            d(document).mousemove(function (b) {
                m.push({ x: b.pageX, y: b.pageY });
                3 < m.length && m.shift()
            })
        }
        d.fn.menuAim = function (d) {
            this.each(function () { h.call(this, d) });
            return this
        }
    })(jQuery);
    var $menu = $(".nav-left");
    $menu.menuAim({ activate: activateSubmenu, deactivate: deactivateSubmenu, exitMenu: exitMenu });

    function activateSubmenu(row) {
        var $row = $(row),
            submenuId = $row.attr("data-items"),
            $submenu = $("#" + submenuId);
        $submenu.css({ display: "block" });
        $row.addClass("cur")
    }

    function deactivateSubmenu(row) {
        var $row = $(row),
            submenuId = $row.attr("data-items"),
            $submenu = $("#" + submenuId);
        $submenu.css("display", "none");
        $row.removeClass("cur")
    }
    $(".nav-left li").click(function (e) { e.stopPropagation() });

    function exitMenu(row) {
        var subId = $(row).find('.cur').removeClass('cur').attr('data-items');
        $('#' + subId).hide();
        return true
    }
    (function (a) {
        a.fn.slide = function (l) {
            var f = { affect: 4, time: 3000, speed: 500, dot_text: false, };
            var b = a.extend(f, l);
            var i = a(this);
            var j = a("<div class='dot'><p></p></div>");
            var c = i.find("ul");
            var h = c.find("li");
            var d = null;
            var g = 0;
            i.append(j);
            c.find("li").each(function (m) {
                j.find("p").append(a("<b></b>"));
                if (b.dot_text) { j.find("b").eq(m).html(m + 1) }
            });
            j.find("b").eq(0).addClass("cur");
            c.find("li").css("display", "none");
            c.find("li").eq(0).show(0);
            j.find("b").mouseover(function () {
                clearTimeout(d);
                g = a(this).index();
                if (g == a(".dot .cur").index()) {
                    return
                }
                e()
            });
            d = setTimeout(k, b.time);

            function k() {
                (g < c.find("li").length - 1) ? g++ : g = 0;
                e()
            }

            function e() {
                j.find("b").eq(g).addClass("cur").siblings().removeClass("cur");
                c.find("li").css({ "position": "absolute" });
                c.find("li").stop(false, true).fadeOut(b.speed).eq(g).fadeIn(b.speed);
                d = setTimeout(k, b.time)
            }
            i.mouseover(function () { clearTimeout(d) });
            i.mouseout(function () {
                clearTimeout(d);
                d = setTimeout(k, b.time)
            })
        }
    })(jQuery);
    $(".aft").slide({ time: 5000, speed: 500 });
    $('img.lazy').lazyload({ threshold: 200, effect: "fadeIn" });
    var wholeMax = $(".part1-container").css('height', 'auto').height();
    $(".part1-container").css('height', '374px');
    $(".homepage-part1").on("click", ".read-more", function () {
        $(this).remove();
        $(".part1-container").animate({ "height": wholeMax }, 500, function () { $(".read-more").find("span").text("收起专业").end().find("i").addClass("active"); });
    });
});
