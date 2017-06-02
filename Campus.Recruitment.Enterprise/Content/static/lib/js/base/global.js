var Global = function () {
    //浏览器判断封装
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var browserVer;
    (browserVer = ua.match(/msie ([\d.]+)/)) ? Sys.ie = formatVer(browserVer) :
        (browserVer = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = formatVer(browserVer) :
            (browserVer = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = formatVer(browserVer) :
                (browserVer = ua.match(/opera.([\d.]+)/)) ? Sys.opera = formatVer(browserVer) :
                    (browserVer = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = formatVer(browserVer) : 0;
    function formatVer(val) {
        return parseInt(val[1].split(".")[0])
    }
    return {
        host: window.location.host,
        ua: navigator.userAgent.toLowerCase(),
        sys: Sys,
        //获取指定名称的cookie的值
        getCookie: function (name) {
            var strCookie = document.cookie;
            var arrCookie = strCookie.split("; ");
            for (var i = 0; i < arrCookie.length; i++) {
                var arr = arrCookie[i].split("=");
                if (arr[0] == name) {
                    if (name == "Login")//登录信息单独加密
                    {
                        var loginInfo = utf8to16(base64decode(decodeURIComponent(arr[1])));//添加coding.js加密，需引入coding.js
                        return loginInfo;
                    }
                    return arr[1];
                }
            }
            return "";
        },
        //获取URL查询字符串，返回json格式数据
        toJSON: function () {
            var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
                args = {},
                items = qs.length ? qs.split("&") : [],
                item = null,
                name = null,
                value = null,
                i = 0,
                len = items.length;
            for (i; i < len; i++) {
                item = items[i].split('=');
                name = decodeURIComponent(item[0]);
                value = decodeURIComponent(item[1]);
                if (!!name.length) {
                    args[name] = value;
                }
            }
            return args;
        },
        UUID: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
};
var global = new Global();