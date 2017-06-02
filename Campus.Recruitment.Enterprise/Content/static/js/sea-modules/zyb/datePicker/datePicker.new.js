/*
2015.05.15
依赖： jquery, datePicker.new.css
使用 ： 
new DatePicker({
    start: {
        dateName: "",
        dateId: "",
        startYear: "", //开始年份,默认为1975
        endYear: "", //结束年份,注意这里不传具体年份,而是在当年的基础上多几年,默认为0
        currentMon: "",  //当前月份
        currentYear: "", // 当前年份
        onShow: function (){},  // 显示时的回调
        onHide: function (){},  // 关闭时的回调,默认会触发input的trigger事件
    },
    end: {
        dateName: "",
        dateId: "",
        startYear: "", //开始年份,默认为1975
        endYear: "", //结束年份,注意这里不传具体年份,而是在当年的基础上多几年,默认为0
        currentMon: "",  //高亮月份
        currentYear: "", // 高亮年份
        onShow: function (){},  // 显示时的回调
        onHide: function (){},  // 关闭时的回调,默认会触发input的trigger事件
    }
});
*/
define('zyb/datePicker/datePicker.new', function (require, exports, module) {
    var $ = require('jquery/jquery/1.7.2/jquery');
    
    function DatePicker(opts) {
        var defaults = {
            start: {
                dateName: "",
                dateId: "",
                startYear: "1975",
                endYear: 0,
                currentMon: "",
                currentYear: "",
                onHide: function () {
                }
            },
            end: {
                dateName: "",
                dateId: "",
                startYear: "1975",
                endYear: 0,
                currentMon: "",
                currentYear: "",
                onHide: function () {
                }
            },
            callBack: function () { }
        };
        $.extend(true, defaults, opts);

        var oStart = $(defaults.start.dateName);
        var oEnd = $(defaults.end.dateName);
        oStart.data("type", "end");
        oEnd.data("type", "start");

        oStart.length && oStart.each(function () {
            $(this).initDate(defaults.start, oEnd);
        });
        oEnd.length && oEnd.each(function () {
            $(this).initDate(defaults.end, oStart);
        });
    }

    $.fn.initDate = function (opts, oInput) {
        var oTrigger = $(this).siblings(".selectui-drop");
        var defaults = {
            onHide: function () {
                $(this).trigger("blur");
            }
        };
        $.extend(defaults, opts);
        var obj = null;
        var oSelf = $(this);
        var arr1 = [];
        oTrigger.add($(this)).click(function (ev) {
            var degree = $("#degree").val();
            var gap = 0;
            switch (+degree) {
                case 1:
                    gap = 3;
                    break;
                case 2:
                    gap = 4;
                    break;
                case 3:
                    gap = 2;
                    break;
                default:
                    gap = 4;
            };
            defaults.gap = gap;
            arr1 = oSelf.val().split(".");
            $(".date-wrap").not(obj).hide();
            //if (!obj) {
                create();
            //} else {
                //toggleObj();
            //};
            ev.stopPropagation();
            ev.cancelBubble = true;
        });
        function create() {
            var template = '<div class="date-wrap">\
                                <ul class="date-year"></ul>\
                                <ul class="date-mon">\
                                    <li><span>1月</span></li>\
                                    <li><span>2月</span></li>\
                                    <li><span>3月</span></li>\
                                    <li><span>4月</span></li>\
                                    <li><span>5月</span></li>\
                                    <li><span>6月</span></li>\
                                    <li><span>7月</span></li>\
                                    <li><span>8月</span></li>\
                                    <li><span>9月</span></li>\
                                    <li><span>10月</span></li>\
                                    <li><span>11月</span></li>\
                                    <li><span>12月</span></li>\
                                </ul>\
                            </div>';
            obj = $(template).appendTo($("body"));
            obj.css({ "left": oSelf.offset().left, "top": oSelf.offset().top + oSelf.height() + 1 });
            var oYear = obj.find(".date-year");
            var nowYear = new Date().getFullYear();
            var nowMonth = new Date().getMonth() + 1;
            var endYear = nowYear + +defaults.endYear;
            var iNum = endYear - defaults.startYear;
            var iYear = defaults.startYear;
            var iScrollTop = 0;
            for (var i = 0; i <= iNum; i++) {
                var oLi = $("<li>" + iYear + "</li>");
                oLi.prependTo(oYear);
                iYear++;
            };
            oYear.find("li:eq(0)").addClass("active");
            bindEvent();
            (defaults.currentYear || defaults.currentMon) ? setCurrent(obj) : oYear.find("li:eq(0)").addClass("active");
            //showObj();
        };
        function showObj() {
            obj.css({ "left": oSelf.offset().left, "top": oSelf.offset().top + oSelf.height() + 1 });
            var arr = [];
            var type = oInput.length ? oInput.data("type"): "start";
            arr = oInput.length && oInput.val().split(".");

            setDisable(arr, type);
            setCurrent(obj)
            obj.show();
            defaults.onShow && defaults.onShow.call(obj, arguments);
        };

        function hideObj() {
            obj.remove();
            defaults.onHide && defaults.onHide.call(obj, arguments);
        };

        //function toggleObj() {
        //    obj.is(":visible") ? hideObj() : showObj();
        //}

        function setCurrent(obj) {
            var currentYear;
            var arr = oSelf.val().split(".");
            var prev = oInput.val();
            var nowYear = new Date().getFullYear();
            var nowMon = new Date().getMonth() + 1;
            var oYear = obj.find(".date-year");
            var oMon = obj.find(".date-mon");
            if (!arr[0] && prev) {
                if (oSelf.data('type') == 'end') {
                    currentYear = +prev.substring(0, 4) - defaults.gap;
                } else {
                    currentYear = +prev.substring(0, 4) + defaults.gap;
                }
            } else if (arr[0]) {
                currentYear = arr[0];
            } else {
                currentYear = defaults.currentYear ? defaults.currentYear : nowYear;
            }
            var iHeight = oYear.find("li").height();
            var iCount = 0, iScrollTop = 0;

            oYear.find("li").each(function () {
                if (currentYear == $(this).text()) {
                    $(this).addClass("active").siblings().removeClass("active");
                    iCount = $(this).index() - 2;
                    iScrollTop = (iCount) * iHeight;
                    oYear.scrollTop(iScrollTop);
                    return false;
                };
            });
            var currentMon = arr[1] ? arr[1] : oYear.find(".active").text() == nowYear ? defaults.currentMon > nowMon ? nowMon : defaults.currentMon : defaults.currentMon;
            oMon.find("li").each(function () {

                if (currentMon == parseInt($(this).text())) {
                    $(this).addClass("active").siblings().removeClass("active");
                    return false;
                }
            });
        };

        function bindEvent() {
            var oYear = obj.find(".date-year");
            var oMon = obj.find(".date-mon");
            var iY, iM;
            var type = oInput.data("type");
            oYear.on("click", "li", function (ev) {
                var nowYear = arr1[0];
                var nowMon = arr1[1];
                var arr = oInput.length ? oInput.val().split(".") : [];
                if (!$(this).hasClass("disabled")) {
                    $(this).addClass("active").siblings().removeClass("active");
                    setDisable(arr, type);
                }
                if (!$(this).hasClass(".active") && $(this).text() !=nowYear) {
                    oMon.find("li").removeClass("active");
                } else if ($(this).text() == nowYear) {
                    oMon.find("li").each(function () {
                        if (parseInt($(this).text()) == nowMon) {
                            $(this).addClass("active");
                            return false;
                        }
                    });
                }
                ev.stopPropagation();
                ev.cancelBubble = true;
            });
            oMon.on("click", "li", function (ev) {
                if (!$(this).hasClass("disabled")) {
                    var str = "";
                    var aDate = []; 
                    str = oYear.find("li.active").text() + "." + parseInt($(this).text());
                    defaults.dateNam ? $(defaults.dateName).val(str) : oSelf.val(str);
                    aDate = str.split(".");
                    $(defaults.dateId).val(new Date(aDate[0], aDate[1] - 1, 01, "", "", "").Format('yyyy-MM-dd'));
                    hideObj();
                }
                ev.stopPropagation();
                ev.cancelBubble = true;
            });
            
            $(document).click(function () {
                obj.is(":visible") && hideObj();
            });
        };

        function setDisable(arr, type) {
            var nowYear = new Date().getFullYear();
            var nowMon = new Date().getMonth() + 1;
            var oYear = obj.find(".date-year");
            var oMon = obj.find(".date-mon");
            oYear.add(oMon).find("li").removeClass("disabled");
            oYear.find("li").each(function () {
                if (arr[0]) {
                    if (type == "start") {
                        if ($(this).text() > arr[0]) {
                            $(this).addClass("disabled");
                        }
                    } else {
                        if ($(this).text() < arr[0]) {
                            $(this).addClass("disabled");
                        }
                    }
                }
            });
            oMon.find("li").each(function () {
                if (arr[0]) {
                    if (type == "start") {
                        if (oYear.find(".active").text() == arr[0] && parseInt($(this).text()) > arr[1]) {
                            $(this).addClass("disabled");
                        }
                    } else {
                        if (oYear.find(".active").text() == arr[0] && parseInt($(this).text()) < arr[1]) {
                            $(this).addClass("disabled");
                        }
                    }

                }
                if (oYear.find(".active").text() == nowYear && parseInt($(this).text()) > nowMon) {
                    if (type == 'end' && defaults.endYear > 0) {
                        return false;
                    }
                    $(this).addClass("disabled");
                }
            });
        };

        Date.prototype.Format = function (fmt) { //author: meizz 
            var o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

        defaults.callBack && defaults.callBack.call(obj, arguments);
        return oSelf;
    }
    module.exports = DatePicker;
});
