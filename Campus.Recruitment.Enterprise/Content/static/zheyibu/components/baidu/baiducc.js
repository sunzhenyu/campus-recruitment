﻿(function () {
    var h = {}, mt = {}, c = { id: "5c290cd349d6acaa931db7afc950e4f1", dm: ["zheyibu.com"], js: "tongji.baidu.com/hm-web/js/", etrk: [], icon: '', ctrk: false, align: -1, nv: -1, vdur: 1800000, age: 31536000000, rec: 0, rp: [], trust: 1, vcard: 4241555, qiao: 0, lxb: 0, conv: 0, med: 0, cvcc: '', apps: '' }; var r = void 0, s = !0, t = null, w = !1; mt.i = {}; mt.i.U = /msie (\d+\.\d+)/i.test(navigator.userAgent); mt.i.xa = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? document.documentMode || +RegExp.$1 : r; mt.i.cookieEnabled = navigator.cookieEnabled; mt.i.javaEnabled = navigator.javaEnabled(); mt.i.language = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || ""; mt.i.Ca = (window.screen.width || 0) + "x" + (window.screen.height || 0); mt.i.colorDepth = window.screen.colorDepth || 0; mt.cookie = {};
    mt.cookie.set = function (a, b, f) { var d; f.I && (d = new Date, d.setTime(d.getTime() + f.I)); document.cookie = a + "=" + b + (f.domain ? "; domain=" + f.domain : "") + (f.path ? "; path=" + f.path : "") + (d ? "; expires=" + d.toGMTString() : "") + (f.Ya ? "; secure" : "") }; mt.cookie.get = function (a) { return (a = RegExp("(^| )" + a + "=([^;]*)(;|$)").exec(document.cookie)) ? a[2] : t }; mt.s = {}; mt.s.ia = function (a) { return document.getElementById(a) }; mt.s.Ra = function (a, b) { for (b = b.toUpperCase() ; (a = a.parentNode) && 1 == a.nodeType;) if (a.tagName == b) return a; return t };
    (mt.s.Z = function () {
        function a() { if (!a.D) { a.D = s; for (var b = 0, e = d.length; b < e; b++) d[b]() } } function b() { try { document.documentElement.doScroll("left") } catch (d) { setTimeout(b, 1); return } a() } var f = w, d = [], e; document.addEventListener ? e = function () { document.removeEventListener("DOMContentLoaded", e, w); a() } : document.attachEvent && (e = function () { "complete" === document.readyState && (document.detachEvent("onreadystatechange", e), a()) }); (function () {
            if (!f) if (f = s, "complete" === document.readyState) a.D = s; else if (document.addEventListener) document.addEventListener("DOMContentLoaded",
            e, w), window.addEventListener("load", a, w); else if (document.attachEvent) { document.attachEvent("onreadystatechange", e); window.attachEvent("onload", a); var d = w; try { d = window.frameElement == t } catch (n) { } document.documentElement.doScroll && d && b() }
        })(); return function (b) { a.D ? b() : d.push(b) }
    }()).D = w; mt.event = {}; mt.event.c = function (a, b, f) { a.attachEvent ? a.attachEvent("on" + b, function (b) { f.call(a, b) }) : a.addEventListener && a.addEventListener(b, f, w) };
    mt.event.preventDefault = function (a) { a.preventDefault ? a.preventDefault() : a.returnValue = w }; mt.l = {}; mt.l.parse = function () { return (new Function('return (" + source + ")'))() };
    mt.l.stringify = function () {
        function a(a) { /["\\\x00-\x1f]/.test(a) && (a = a.replace(/["\\\x00-\x1f]/g, function (a) { var b = f[a]; if (b) return b; b = a.charCodeAt(); return "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16) })); return '"' + a + '"' } function b(a) { return 10 > a ? "0" + a : a } var f = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }; return function (d) {
            switch (typeof d) {
                case "undefined": return "undefined"; case "number": return isFinite(d) ? String(d) : "null"; case "string": return a(d); case "boolean": return String(d);
                default: if (d === t) return "null"; if (d instanceof Array) { var e = ["["], f = d.length, n, g, k; for (g = 0; g < f; g++) switch (k = d[g], typeof k) { case "undefined": case "function": case "unknown": break; default: n && e.push(","), e.push(mt.l.stringify(k)), n = 1 } e.push("]"); return e.join("") } if (d instanceof Date) return '"' + d.getFullYear() + "-" + b(d.getMonth() + 1) + "-" + b(d.getDate()) + "T" + b(d.getHours()) + ":" + b(d.getMinutes()) + ":" + b(d.getSeconds()) + '"'; n = ["{"]; g = mt.l.stringify; for (f in d) if (Object.prototype.hasOwnProperty.call(d, f)) switch (k =
                d[f], typeof k) { case "undefined": case "unknown": case "function": break; default: e && n.push(","), e = 1, n.push(g(f) + ":" + g(k)) } n.push("}"); return n.join("")
            }
        }
    }(); mt.lang = {}; mt.lang.e = function (a, b) { return "[object " + b + "]" === {}.toString.call(a) }; mt.lang.Va = function (a) { return mt.lang.e(a, "Number") && isFinite(a) }; mt.lang.Xa = function (a) { return mt.lang.e(a, "String") }; mt.localStorage = {};
    mt.localStorage.G = function () { if (!mt.localStorage.g) try { mt.localStorage.g = document.createElement("input"), mt.localStorage.g.type = "hidden", mt.localStorage.g.style.display = "none", mt.localStorage.g.addBehavior("#default#userData"), document.getElementsByTagName("head")[0].appendChild(mt.localStorage.g) } catch (a) { return w } return s };
    mt.localStorage.set = function (a, b, f) { var d = new Date; d.setTime(d.getTime() + f || 31536E6); try { window.localStorage ? (b = d.getTime() + "|" + b, window.localStorage.setItem(a, b)) : mt.localStorage.G() && (mt.localStorage.g.expires = d.toUTCString(), mt.localStorage.g.load(document.location.hostname), mt.localStorage.g.setAttribute(a, b), mt.localStorage.g.save(document.location.hostname)) } catch (e) { } };
    mt.localStorage.get = function (a) { if (window.localStorage) { if (a = window.localStorage.getItem(a)) { var b = a.indexOf("|"), f = a.substring(0, b) - 0; if (f && f > (new Date).getTime()) return a.substring(b + 1) } } else if (mt.localStorage.G()) try { return mt.localStorage.g.load(document.location.hostname), mt.localStorage.g.getAttribute(a) } catch (d) { } return t };
    mt.localStorage.remove = function (a) { if (window.localStorage) window.localStorage.removeItem(a); else if (mt.localStorage.G()) try { mt.localStorage.g.load(document.location.hostname), mt.localStorage.g.removeAttribute(a), mt.localStorage.g.save(document.location.hostname) } catch (b) { } }; mt.sessionStorage = {}; mt.sessionStorage.set = function (a, b) { if (window.sessionStorage) try { window.sessionStorage.setItem(a, b) } catch (f) { } };
    mt.sessionStorage.get = function (a) { return window.sessionStorage ? window.sessionStorage.getItem(a) : t }; mt.sessionStorage.remove = function (a) { window.sessionStorage && window.sessionStorage.removeItem(a) }; mt.O = {}; mt.O.log = function (a, b) { var f = new Image, d = "mini_tangram_log_" + Math.floor(2147483648 * Math.random()).toString(36); window[d] = f; f.onload = f.onerror = f.onabort = function () { f.onload = f.onerror = f.onabort = t; f = window[d] = t; b && b(a) }; f.src = a }; mt.P = {};
    mt.P.qa = function () { var a = ""; if (navigator.plugins && navigator.mimeTypes.length) { var b = navigator.plugins["Shockwave Flash"]; b && b.description && (a = b.description.replace(/^.*\s+(\S+)\s+\S+$/, "$1")) } else if (window.ActiveXObject) try { if (b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) (a = b.GetVariable("$version")) && (a = a.replace(/^.*\s+(\d+),(\d+).*$/, "$1.$2")) } catch (f) { } return a };
    mt.P.Pa = function (a, b, f, d, e) { return '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="' + a + '" width="' + f + '" height="' + d + '"><param name="movie" value="' + b + '" /><param name="flashvars" value="' + (e || "") + '" /><param name="allowscriptaccess" value="always" /><embed type="application/x-shockwave-flash" name="' + a + '" width="' + f + '" height="' + d + '" src="' + b + '" flashvars="' + (e || "") + '" allowscriptaccess="always" /></object>' }; mt.url = {};
    mt.url.k = function (a, b) { var f = a.match(RegExp("(^|&|\\?|#)(" + b + ")=([^&#]*)(&|$|#)", "")); return f ? f[3] : t }; mt.url.Ta = function (a) { return (a = a.match(/^(https?:)\/\//)) ? a[1] : t }; mt.url.ma = function (a) { return (a = a.match(/^(https?:\/\/)?([^\/\?#]*)/)) ? a[2].replace(/.*@/, "") : t }; mt.url.S = function (a) { return (a = mt.url.ma(a)) ? a.replace(/:\d+$/, "") : a }; mt.url.Sa = function (a) { return (a = a.match(/^(https?:\/\/)?[^\/]*(.*)/)) ? a[2].replace(/[\?#].*/, "").replace(/^$/, "/") : t };
    h.p = { Ua: "http://tongji.baidu.com/hm-web/welcome/ico", Y: "hm.baidu.com/hm.gif", ba: "baidu.com", ua: "hmmd", va: "hmpl", ta: "hmkw", ra: "hmci", wa: "hmsr", sa: "hmcu", r: 0, m: Math.round(+new Date / 1E3), protocol: "https:" === document.location.protocol ? "https:" : "http:", Wa: 0, Ma: 6E5, Na: 10, Oa: 1024, La: 1, A: 2147483647, $: "cc cf ci ck cl cm cp cu cw ds ep et fl ja ln lo lt nv rnd si st su v cv lv api tt u".split(" ") };
    (function () { var a = { o: {}, c: function (a, f) { this.o[a] = this.o[a] || []; this.o[a].push(f) }, B: function (a, f) { this.o[a] = this.o[a] || []; for (var d = this.o[a].length, e = 0; e < d; e++) this.o[a][e](f) } }; return h.w = a })();
    (function () { function a(a, d) { var e = document.createElement("script"); e.charset = "utf-8"; b.e(d, "Function") && (e.readyState ? e.onreadystatechange = function () { if ("loaded" === e.readyState || "complete" === e.readyState) e.onreadystatechange = t, d() } : e.onload = function () { d() }); e.src = a; var m = document.getElementsByTagName("script")[0]; m.parentNode.insertBefore(e, m) } var b = mt.lang; return h.load = a })();
    (function () { function a() { var a = ""; h.b.a.nv ? (a = encodeURIComponent(document.referrer), window.sessionStorage ? f.set("Hm_from_" + c.id, a) : b.set("Hm_from_" + c.id, a, 864E5)) : a = (window.sessionStorage ? f.get("Hm_from_" + c.id) : b.get("Hm_from_" + c.id)) || ""; return a } var b = mt.localStorage, f = mt.sessionStorage; return h.Q = a })();
    (function () {
        var a = mt.s, b = h.p, f = h.load, d = h.Q; h.w.c("pv-b", function () {
            c.rec && a.Z(function () {
                for (var e = 0, m = c.rp.length; e < m; e++) {
                    var n = c.rp[e][0], g = c.rp[e][1], k = a.ia("hm_t_" + n); if (g && !(2 == g && !k || k && "" !== k.innerHTML)) k = "", k = Math.round(Math.random() * b.A), k = 4 == g ? "http://crs.baidu.com/hl.js?" + ["siteId=" + c.id, "planId=" + n, "rnd=" + k].join("&") : "http://crs.baidu.com/t.js?" + ["siteId=" + c.id, "planId=" + n, "from=" + d(), "referer=" + encodeURIComponent(document.referrer), "title=" + encodeURIComponent(document.title), "rnd=" +
                    k].join("&"), f(k)
                }
            })
        })
    })(); (function () { var a = h.p, b = h.load, f = h.Q; h.w.c("pv-b", function () { if (c.trust && c.vcard) { var d = a.protocol + "//trust.baidu.com/vcard/v.js?" + ["siteid=" + c.vcard, "url=" + encodeURIComponent(document.location.href), "source=" + f(), "rnd=" + Math.round(Math.random() * a.A)].join("&"); b(d) } }) })();
    (function () {
        function a() { return function () { h.b.a.nv = 0; h.b.a.st = 4; h.b.a.et = 3; h.b.a.ep = h.H.oa() + "," + h.H.la(); h.b.j() } } function b() { clearTimeout(y); var a; x && (a = "visible" == document[x]); z && (a = !document[z]); g = "undefined" == typeof a ? s : a; if ((!n || !k) && g && l) u = s, p = +new Date; else if (n && k && (!g || !l)) u = w, q += +new Date - p; n = g; k = l; y = setTimeout(b, 100) } function f(a) {
            var k = document, p = ""; if (a in k) p = a; else for (var b = ["webkit", "ms", "moz", "o"], q = 0; q < b.length; q++) {
                var e = b[q] + a.charAt(0).toUpperCase() + a.slice(1); if (e in k) {
                    p =
                    e; break
                }
            } return p
        } function d(a) { if (!("focus" == a.type || "blur" == a.type) || !(a.target && a.target != window)) l = "focus" == a.type || "focusin" == a.type ? s : w, b() } var e = mt.event, m = h.w, n = s, g = s, k = s, l = s, v = +new Date, p = v, q = 0, u = s, x = f("visibilityState"), z = f("hidden"), y; b(); (function () {
            var a = x.replace(/[vV]isibilityState/, "visibilitychange"); e.c(document, a, b); e.c(window, "pageshow", b); e.c(window, "pagehide", b); "object" == typeof document.onfocusin ? (e.c(document, "focusin", d), e.c(document, "focusout", d)) : (e.c(window, "focus", d),
            e.c(window, "blur", d))
        })(); h.H = { oa: function () { return +new Date - v }, la: function () { return u ? +new Date - p + q : q } }; m.c("pv-b", function () { e.c(window, "unload", a()) }); return h.H
    })();
    (function () { var a = mt.lang, b = h.p, f = h.load, d = { ya: function (e) { if ((window._dxt === r || a.e(window._dxt, "Array")) && "undefined" !== typeof h.b) { var d = h.b.J(); f([b.protocol, "//datax.baidu.com/x.js?si=", c.id, "&dm=", encodeURIComponent(d)].join(""), e) } }, Ja: function (b) { if (a.e(b, "String") || a.e(b, "Number")) window._dxt = window._dxt || [], window._dxt.push(["_setUserId", b]) } }; return h.ea = d })();
    (function () {
        function a(k) { for (var b in k) if ({}.hasOwnProperty.call(k, b)) { var d = k[b]; f.e(d, "Object") || f.e(d, "Array") ? a(d) : k[b] = String(d) } } function b(a) { return a.replace ? a.replace(/'/g, "'0").replace(/\*/g, "'1").replace(/!/g, "'2") : a } var f = mt.lang, d = mt.l, e = h.p, m = h.w, n = h.ea, g = {
            z: [], F: 0, W: w, init: function () { g.d = 0; m.c("pv-b", function () { g.fa(); g.ga() }); m.c("pv-d", g.ha); m.c("stag-b", function () { h.b.a.api = g.d || g.F ? g.d + "_" + g.F : "" }); m.c("stag-d", function () { h.b.a.api = 0; g.d = 0; g.F = 0 }) }, fa: function () {
                var a = window._hmt ||
                []; if (!a || f.e(a, "Array")) window._hmt = { id: c.id, cmd: {}, push: function () { for (var a = window._hmt, k = 0; k < arguments.length; k++) { var p = arguments[k]; f.e(p, "Array") && (a.cmd[a.id].push(p), "_setAccount" === p[0] && (1 < p.length && /^[0-9a-f]{32}$/.test(p[1])) && (p = p[1], a.id = p, a.cmd[p] = a.cmd[p] || [])) } } }, window._hmt.cmd[c.id] = [], window._hmt.push.apply(window._hmt, a)
            }, ga: function () {
                var a = window._hmt; if (a && a.cmd && a.cmd[c.id]) for (var b = a.cmd[c.id], d = /^_track(Event|MobConv|Order|RTEvent)$/, p = 0, q = b.length; p < q; p++) {
                    var e = b[p];
                    d.test(e[0]) ? g.z.push(e) : g.M(e)
                } a.cmd[c.id] = { push: g.M }
            }, ha: function () { if (0 < g.z.length) for (var a = 0, b = g.z.length; a < b; a++) g.M(g.z[a]); g.z = t }, M: function (a) { var b = a[0]; if (g.hasOwnProperty(b) && f.e(g[b], "Function")) g[b](a) }, _setAccount: function (a) { 1 < a.length && /^[0-9a-f]{32}$/.test(a[1]) && (g.d |= 1) }, _setAutoPageview: function (a) { if (1 < a.length && (a = a[1], w === a || s === a)) g.d |= 2, h.b.T = a }, _trackPageview: function (a) {
                if (1 < a.length && a[1].charAt && "/" === a[1].charAt(0)) {
                    g.d |= 4; h.b.a.et = 0; h.b.a.ep = ""; h.b.K ? (h.b.a.nv = 0, h.b.a.st =
                    4) : h.b.K = s; var b = h.b.a.u, d = h.b.a.su; h.b.a.u = e.protocol + "//" + document.location.host + a[1]; g.W || (h.b.a.su = document.location.href); h.b.j(); h.b.a.u = b; h.b.a.su = d
                }
            }, _trackEvent: function (a) { 2 < a.length && (g.d |= 8, h.b.a.nv = 0, h.b.a.st = 4, h.b.a.et = 4, h.b.a.ep = b(a[1]) + "*" + b(a[2]) + (a[3] ? "*" + b(a[3]) : "") + (a[4] ? "*" + b(a[4]) : ""), h.b.j()) }, _setCustomVar: function (a) {
                if (!(4 > a.length)) {
                    var d = a[1], e = a[4] || 3; if (0 < d && 6 > d && 0 < e && 4 > e) {
                        g.F++; for (var p = (h.b.a.cv || "*").split("!"), q = p.length; q < d - 1; q++) p.push("*"); p[d - 1] = e + "*" + b(a[2]) +
                        "*" + b(a[3]); h.b.a.cv = p.join("!"); a = h.b.a.cv.replace(/[^1](\*[^!]*){2}/g, "*").replace(/((^|!)\*)+$/g, ""); "" !== a ? h.b.setData("Hm_cv_" + c.id, encodeURIComponent(a), c.age) : h.b.Ba("Hm_cv_" + c.id)
                    }
                }
            }, _setReferrerOverride: function (a) { 1 < a.length && (h.b.a.su = a[1].charAt && "/" === a[1].charAt(0) ? e.protocol + "//" + window.location.host + a[1] : a[1], g.W = s) }, _trackOrder: function (b) { b = b[1]; f.e(b, "Object") && (a(b), g.d |= 16, h.b.a.nv = 0, h.b.a.st = 4, h.b.a.et = 94, h.b.a.ep = d.stringify(b), h.b.j()) }, _trackMobConv: function (a) {
                if (a = {
                    webim: 1,
                    tel: 2, map: 3, sms: 4, callback: 5, share: 6
                }[a[1]]) g.d |= 32, h.b.a.et = 93, h.b.a.ep = a, h.b.j()
            }, _trackRTPageview: function (b) { b = b[1]; f.e(b, "Object") && (a(b), b = d.stringify(b), 512 >= encodeURIComponent(b).length && (g.d |= 64, h.b.a.rt = b)) }, _trackRTEvent: function (b) {
                b = b[1]; if (f.e(b, "Object")) {
                    a(b); b = encodeURIComponent(d.stringify(b)); var l = function (a) { var b = h.b.a.rt; g.d |= 128; h.b.a.et = 90; h.b.a.rt = a; h.b.j(); h.b.a.rt = b }, m = b.length; if (900 >= m) l.call(this, b); else for (var m = Math.ceil(m / 900), p = "block|" + Math.round(Math.random() *
                    e.A).toString(16) + "|" + m + "|", q = [], u = 0; u < m; u++) q.push(u), q.push(b.substring(900 * u, 900 * u + 900)), l.call(this, p + q.join("|")), q = []
                }
            }, _setUserId: function (a) { a = a[1]; n.ya(); n.Ja(a) }
        }; g.init(); h.ca = g; return h.ca
    })();
    (function () {
        function a() { "undefined" === typeof window["_bdhm_loaded_" + c.id] && (window["_bdhm_loaded_" + c.id] = s, this.a = {}, this.T = s, this.K = w, this.init()) } var b = mt.url, f = mt.O, d = mt.P, e = mt.lang, m = mt.cookie, n = mt.i, g = mt.localStorage, k = mt.sessionStorage, l = h.p, v = h.w; a.prototype = {
            L: function (a, b) { a = "." + a.replace(/:\d+/, ""); b = "." + b.replace(/:\d+/, ""); var d = a.indexOf(b); return -1 < d && d + b.length === a.length }, X: function (a, b) { a = a.replace(/^https?:\/\//, ""); return 0 === a.indexOf(b) }, C: function (a) {
                for (var d = 0; d < c.dm.length; d++) if (-1 <
                c.dm[d].indexOf("/")) { if (this.X(a, c.dm[d])) return s } else { var e = b.S(a); if (e && this.L(e, c.dm[d])) return s } return w
            }, J: function () { for (var a = document.location.hostname, b = 0, d = c.dm.length; b < d; b++) if (this.L(a, c.dm[b])) return c.dm[b].replace(/(:\d+)?[\/\?#].*/, ""); return a }, R: function () { for (var a = 0, b = c.dm.length; a < b; a++) { var d = c.dm[a]; if (-1 < d.indexOf("/") && this.X(document.location.href, d)) return d.replace(/^[^\/]+(\/.*)/, "$1") + "/" } return "/" }, pa: function () {
                if (!document.referrer) return l.m - l.r > c.vdur ? 1 : 4; var a =
                w; this.C(document.referrer) && this.C(document.location.href) ? a = s : (a = b.S(document.referrer), a = this.L(a || "", document.location.hostname)); return a ? l.m - l.r > c.vdur ? 1 : 4 : 3
            }, getData: function (a) { try { return m.get(a) || k.get(a) || g.get(a) } catch (b) { } }, setData: function (a, b, d) { try { m.set(a, b, { domain: this.J(), path: this.R(), I: d }), d ? g.set(a, b, d) : k.set(a, b) } catch (e) { } }, Ba: function (a) { try { m.set(a, "", { domain: this.J(), path: this.R(), I: -1 }), k.remove(a), g.remove(a) } catch (b) { } }, Ha: function () {
                var a, b, d, e, f; l.r = this.getData("Hm_lpvt_" +
                c.id) || 0; 13 === l.r.length && (l.r = Math.round(l.r / 1E3)); b = this.pa(); a = 4 !== b ? 1 : 0; if (d = this.getData("Hm_lvt_" + c.id)) { e = d.split(","); for (f = e.length - 1; 0 <= f; f--) 13 === e[f].length && (e[f] = "" + Math.round(e[f] / 1E3)); for (; 2592E3 < l.m - e[0];) e.shift(); f = 4 > e.length ? 2 : 3; for (1 === a && e.push(l.m) ; 4 < e.length;) e.shift(); d = e.join(","); e = e[e.length - 1] } else d = l.m, e = "", f = 1; this.setData("Hm_lvt_" + c.id, d, c.age); this.setData("Hm_lpvt_" + c.id, l.m); d = l.m === this.getData("Hm_lpvt_" + c.id) ? "1" : "0"; if (0 === c.nv && this.C(document.location.href) &&
                ("" === document.referrer || this.C(document.referrer))) a = 0, b = 4; this.a.nv = a; this.a.st = b; this.a.cc = d; this.a.lt = e; this.a.lv = f
            }, Fa: function () { for (var a = [], b = 0, d = l.$.length; b < d; b++) { var e = l.$[b], f = this.a[e]; "undefined" !== typeof f && "" !== f && a.push(e + "=" + encodeURIComponent(f)) } b = this.a.et; this.a.rt && (0 === b ? a.push("rt=" + encodeURIComponent(this.a.rt)) : 90 === b && a.push("rt=" + this.a.rt)); return a.join("&") }, Ia: function () {
                this.Ha(); this.a.si = c.id; this.a.su = document.referrer; this.a.ds = n.Ca; this.a.cl = n.colorDepth + "-bit";
                this.a.ln = n.language; this.a.ja = n.javaEnabled ? 1 : 0; this.a.ck = n.cookieEnabled ? 1 : 0; this.a.lo = "number" === typeof _bdhm_top ? 1 : 0; this.a.fl = d.qa(); this.a.v = "1.1.18"; this.a.cv = decodeURIComponent(this.getData("Hm_cv_" + c.id) || ""); 1 === this.a.nv && (this.a.tt = document.title || ""); var a = document.location.href; this.a.cm = b.k(a, l.ua) || ""; this.a.cp = b.k(a, l.va) || ""; this.a.cw = b.k(a, l.ta) || ""; this.a.ci = b.k(a, l.ra) || ""; this.a.cf = b.k(a, l.wa) || ""; this.a.cu = b.k(a, l.sa) || ""
            }, init: function () {
                try {
                    this.Ia(), 0 === this.a.nv ? this.Ea() :
                    this.N(".*"), h.b = this, this.da(), v.B("pv-b"), this.Da()
                } catch (a) { var b = []; b.push("si=" + c.id); b.push("n=" + encodeURIComponent(a.name)); b.push("m=" + encodeURIComponent(a.message)); b.push("r=" + encodeURIComponent(document.referrer)); f.log(l.protocol + "//" + l.Y + "?" + b.join("&")) }
            }, Da: function () { function a() { v.B("pv-d") } this.T ? (this.K = s, this.a.et = 0, this.a.ep = "", this.j(a)) : a() }, j: function (a) {
                var b = this; b.a.rnd = Math.round(Math.random() * l.A); v.B("stag-b"); var d = l.protocol + "//" + l.Y + "?" + b.Fa(); v.B("stag-d"); b.aa(d);
                f.log(d, function (d) { b.N(d); e.e(a, "Function") && a.call(b) })
            }, da: function () {
                var a = document.location.hash.substring(1), d = RegExp(c.id), e = -1 < document.referrer.indexOf(l.ba), f = b.k(a, "jn"), g = /^heatlink$|^select$/.test(f); a && (d.test(a) && e && g) && (this.a.rnd = Math.round(Math.random() * l.A), a = document.createElement("script"), a.setAttribute("type", "text/javascript"), a.setAttribute("charset", "utf-8"), a.setAttribute("src", l.protocol + "//" + c.js + f + ".js?" + this.a.rnd), f = document.getElementsByTagName("script")[0], f.parentNode.insertBefore(a,
                f))
            }, aa: function (a) { var b = k.get("Hm_unsent_" + c.id) || "", d = this.a.u ? "" : "&u=" + encodeURIComponent(document.location.href), b = encodeURIComponent(a.replace(/^https?:\/\//, "") + d) + (b ? "," + b : ""); k.set("Hm_unsent_" + c.id, b) }, N: function (a) { var b = k.get("Hm_unsent_" + c.id) || ""; b && (a = encodeURIComponent(a.replace(/^https?:\/\//, "")), a = RegExp(a.replace(/([\*\(\)])/g, "\\$1") + "(%26u%3D[^,]*)?,?", "g"), (b = b.replace(a, "").replace(/,$/, "")) ? k.set("Hm_unsent_" + c.id, b) : k.remove("Hm_unsent_" + c.id)) }, Ea: function () {
                var a = this,
                b = k.get("Hm_unsent_" + c.id); if (b) for (var b = b.split(","), d = function (b) { f.log(l.protocol + "//" + decodeURIComponent(b), function (b) { a.N(b) }) }, e = 0, g = b.length; e < g; e++) d(b[e])
            }
        }; return new a
    })();
    (function () {
        var a = mt.s, b = mt.event, f = mt.url, d = mt.l; try {
            if (window.performance && performance.timing && "undefined" !== typeof h.b) {
                var e = +new Date, m = function (a) { var b = performance.timing, d = b[a + "Start"] ? b[a + "Start"] : 0; a = b[a + "End"] ? b[a + "End"] : 0; return { start: d, end: a, value: 0 < a - d ? a - d : 0 } }, n = t; a.Z(function () { n = +new Date }); var g = function () {
                    var a, b, g; g = m("navigation"); b = m("request"); g = {
                        netAll: b.start - g.start, netDns: m("domainLookup").value, netTcp: m("connect").value, srv: m("response").start - b.start, dom: performance.timing.domInteractive -
                        performance.timing.fetchStart, loadEvent: m("loadEvent").end - g.start
                    }; a = document.referrer; var k = a.match(/^(http[s]?:\/\/)?([^\/]+)(.*)/) || [], u = t; b = t; if ("www.baidu.com" === k[2] || "m.baidu.com" === k[2]) u = f.k(a, "qid"), b = f.k(a, "click_t"); a = u; g.qid = a != t ? a : ""; b != t ? (g.bdDom = n ? n - b : 0, g.bdRun = e - b, g.bdDef = m("navigation").start - b) : (g.bdDom = 0, g.bdRun = 0, g.bdDef = 0); h.b.a.et = 87; h.b.a.ep = d.stringify(g); h.b.j()
                }; b.c(window, "load", function () { setTimeout(g, 500) })
            }
        } catch (k) { }
    })();
    (function () { var a = h.p, b = { init: function () { try { if ("http:" === a.protocol) { var b = document.createElement("IFRAME"); b.setAttribute("src", "http://boscdn.bpc.baidu.com/v1/holmes-moplus/mp-cdn.html"); b.style.display = "none"; b.style.width = "1"; b.style.height = "1"; b.Qa = "0"; document.body.appendChild(b) } } catch (e) { } } }, f = navigator.userAgent.toLowerCase(); -1 < f.indexOf("android") && -1 === f.indexOf("micromessenger") && b.init() })();
    (function () {
        var a = mt.i, b = mt.lang, f = mt.event, d = mt.l; if ("undefined" !== typeof h.b && (c.med || (!a.U || 7 < a.xa) && c.cvcc)) {
            var e, m, n, g, k = function (a) { if (a.item) { for (var b = a.length, d = Array(b) ; b--;) d[b] = a[b]; return d } return [].slice.call(a) }, l = function (a, b) { for (var d in a) if (a.hasOwnProperty(d) && b.call(a, d, a[d]) === w) return w }, v = function (a, f) {
                var g = {}; g.n = e; g.t = "clk"; g.v = a; g.x = 1; if (f) {
                    var m = f.getAttribute("href"), k = f.getAttribute("onclick") ? "" + f.getAttribute("onclick") : t, l = f.getAttribute("id") || ""; n.test(m) ? (g.sn =
                    "mediate", g.snv = m) : b.e(k, "String") && n.test(k) && (g.sn = "wrap", g.snv = k); g.id = l
                } h.b.a.et = 86; h.b.a.ep = d.stringify(g); h.b.j(); for (g = +new Date; 400 >= +new Date - g;);
            }; if (c.med) m = "/zoosnet", e = "swt", n = /swt|zixun|call|chat|zoos|business|talk|kefu|openkf|online|\/LR\/Chatpre\.aspx/i, g = {
                click: function () {
                    for (var a = [], b = k(document.getElementsByTagName("a")), b = [].concat.apply(b, k(document.getElementsByTagName("area"))), b = [].concat.apply(b, k(document.getElementsByTagName("img"))), d, e, f = 0, g = b.length; f < g; f++) d = b[f], e =
                    d.getAttribute("onclick"), d = d.getAttribute("href"), (n.test(e) || n.test(d)) && a.push(b[f]); return a
                }
            }; else if (c.cvcc) {
                m = "/other-comm"; e = "other"; n = c.cvcc.q || r; var p = c.cvcc.id || r; g = {
                    click: function () {
                        for (var a = [], b = k(document.getElementsByTagName("a")), b = [].concat.apply(b, k(document.getElementsByTagName("area"))), b = [].concat.apply(b, k(document.getElementsByTagName("img"))), d, e, f, g = 0, m = b.length; g < m; g++) d = b[g], n !== r ? (e = d.getAttribute("onclick"), f = d.getAttribute("href"), p ? (d = d.getAttribute("id"), (n.test(e) ||
                        n.test(f) || p.test(d)) && a.push(b[g])) : (n.test(e) || n.test(f)) && a.push(b[g])) : p !== r && (d = d.getAttribute("id"), p.test(d) && a.push(b[g])); return a
                    }
                }
            } if ("undefined" !== typeof g && "undefined" !== typeof n) {
                var q; m += /\/$/.test(m) ? "" : "/"; var u = function (a, d) { if (q === d) return v(m + a, d), w; if (b.e(d, "Array") || b.e(d, "NodeList")) for (var e = 0, f = d.length; e < f; e++) if (q === d[e]) return v(m + a + "/" + (e + 1), d[e]), w }; f.c(document, "mousedown", function (a) {
                    a = a || window.event; q = a.target || a.srcElement; var d = {}; for (l(g, function (a, e) {
                    d[a] = b.e(e,
                    "Function") ? e() : document.getElementById(e)
                    }) ; q && q !== document && l(d, u) !== w;) q = q.parentNode
                })
            }
        }
    })(); (function () { var a = mt.event, b = mt.l; if (c.med && "undefined" !== typeof h.b) { var f = +new Date, d = { n: "anti", sb: 0, kb: 0, clk: 0 }, e = function () { h.b.a.et = 86; h.b.a.ep = b.stringify(d); h.b.j() }; a.c(document, "click", function () { d.clk++ }); a.c(document, "keyup", function () { d.kb = 1 }); a.c(window, "scroll", function () { d.sb++ }); a.c(window, "unload", function () { d.t = +new Date - f; e() }); a.c(window, "load", function () { setTimeout(e, 5E3) }) } })();
    (function () {
        function a() { this.f = t } var b = mt.O, f = mt.i; a.prototype = {
            za: function (a) { if (this.f) this.h(a, 0); else if (this.isSupported()) { try { this.f = new ActiveXObject("BDEXIE.BDExExtension.1"), this.V = s } catch (b) { this.V = w } this.V ? this.h(a, 0) : this.h(a, -1) } else this.h(a, -1) }, Ka: function () { this.f && delete this.f; this.f = t }, Ga: function (a, b, d) { if (this.f && "SetLocalCache" in this.f) try { this.f.SetLocalCache(a, b) === r && this.h(d, 0) } catch (f) { this.h(d, -1) } else this.h(d, -1) }, na: function (a, b) {
                if (this.f && "GetLocalCache" in this.f) try {
                    this.h(b,
                    this.f.GetLocalCache(a))
                } catch (d) { this.h(b, "") } else this.h(b, "")
            }, ka: function (a) { if (this.f && "GetCryptStr" in this.f) try { this.h(a, this.f.GetCryptStr("strEncryptID1")) } catch (b) { this.h(a, "") } else this.h(a, "") }, h: function (a, b) { "function" === typeof a && a(b, this) }, isSupported: function () { if (window.ActiveXObject || "ActiveXObject" in window) try { return !!new ActiveXObject("BDEXIE.BDExExtension.1") } catch (a) { } return w }, Aa: function () {
                var a = this; this.ka(function (d) {
                    d !== r && "" !== d && (b.log("//datax.baidu.com/x.gif?dm=" +
                    encodeURIComponent("datax.baidu.com/webadapter/guid") + "&ac=" + encodeURIComponent(d) + "&v=hm-webadapter-0.0.1&rnd=" + Math.round(2147483647 * Math.random())), a.Ga("hmKey", +new Date, function () { a.Ka() }))
                })
            }
        }; if (f.U && /^http(s)?:$/.test(document.location.protocol)) { var d = new a; d.za(function (a) { 0 === a && d.na("hmKey", function (a) { a = +a; (isNaN(a) || 6048E5 < +new Date - a) && d.Aa() }) }) }
    })();
})();
