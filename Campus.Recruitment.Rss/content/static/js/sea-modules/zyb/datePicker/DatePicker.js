define('zyb/datePicker/DatePicker', function (require, exports, module) {
    var $ = require('jquery/jquery/1.7.2/jquery');
    $.fn.extend({
        datePick: function (opts) {
            var oDate = new DatePicker($(this));
            $(this).click(function (ev) {
                oDate.datePick(opts);
                ev.stopPropagation();
                ev.cancelBubble = true;
            });
        }
    });

    function DatePicker(trigger) {
        this._config = {
            // 隐藏域id
            hiddenField: '',
            // 触发器id
            trigger: '',
            // 开始年份,默认为1970
            startYear: 1970,
            // 结束年份,默认为当前年份
            endYear: '',
            // 缺省年份,默认为当前年份
            defaultYear: '',
            // 缺省月份,默认为当前月份
            defaultMon: '',
            // 是否禁止日期,默认为0,表示不禁止,若该值正值,则设置referDate之后的日期不可用,该值为负,则设置referDate之前的日期不可用
            disableDate: 0,
            /* 设置不可用日期的参考点,格式与所传format格式相同,
             * 比如结束日期的referDate为开始日期,也可以传递一个function,返回值为开始日期
             * el: disabledDate: function (){ return $("#startDateInput").val(); }
             */
            referDate: '',
            // 日期的格式,只支持'yyyy-mm-dd','yyyy.mm.dd','yyyy/mm/dd'三种,默认为第一种
            format: 'yyyy-mm-dd'
        }
        this._config.trigger = trigger;
        // 设置结束年份和默认高亮年份为当前年份
        this._config.endYear = this._config.defaultYear = new Date().getFullYear();
        //this._config.defaultMon = new Date().getMonth();
    }

    DatePicker.prototype = {
        constructor: DatePicker,
        datePick: function (opts) {
            $.extend(this._config, opts);
            if (this.obj) {
                this.destroy();
            } else {
                this.renderUI();
                this.bindUI();
                this.syncUI();
            }
        },
        // 初始化UI
        renderUI: function () {
            var template = "",  // 组件的HTML模板
                strYear = "";

            for (var i = this._config.endYear; i >= this._config.startYear; i--) {
                strYear += '<li data=' + i + '>' + i + '</li>';
            };
            if (this._config.endYearText) {
                strYear = '<li data=' + new Date().getFullYear() + '>至今</li>' + strYear;
            }

            template = '<div class="date-wrap">\
                            <ul class="date-year">'+ strYear + '</ul>\
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
            this.obj = $(template).appendTo($('body'));
        },
        // 绑定事件
        bindUI: function () {
            var that = this,
                hiddenField = $(this._config.hiddenField),
                trigger = $(this._config.trigger),
                spliter = this._config.format.match(/[\-,\.,\/]/) ? this._config.format.match(/[\-,\.,\/]/)[0] : '-',
                oYearBord,
                oMonBord,
                sDate,
                sDateVal;

            oYearBord = that.obj.find('.date-year');
            oMonBord = that.obj.find('.date-mon');
            oYearBord.on("click", "li", function (ev) {
                if ($(this).text() == '至今') {
                    sDateVal = new Date().getFullYear() + spliter + (new Date().getMonth() + 1) + spliter + new Date().getDate() + ' 00:00:00';
                    hiddenField.val(sDateVal);
                    trigger.val('至今');
                    that.destroy();
                    return;
                }
                if (!$(this).hasClass("disabled")) {
                    $(this).addClass("active").siblings().removeClass("active");

                    // 不同年份间切换时重新计算disabledDate
                    if (!$(this).hasClass('.active')) {
                        oMonBord.find('li').removeClass('disabled');
                        that.setDisable();
                    }
                }
                ev.stopPropagation();
                ev.cancelBubble = true;
            });
            oMonBord.on('click', 'li', function (ev) {
                ev.stopPropagation();
                ev.cancelBubble = true;
                if (!$(this).hasClass("disabled")) {
                    var sYear = oYearBord.find('li.active').text();
                    if (sYear == '至今') return;
                    // 小于10的月份前面补0
                    var sMon = parseInt($(this).text()) < 10 ? '0' + parseInt($(this).text()) : parseInt($(this).text());
                    // 设置时间输出格式, 传到后台的时间sDateVal会自动补足 ‘日（01）’ 和时间 ‘00：00：00’
                    sDate = that._config.format.replace(/\w+([\-,\.,\/])\w+([\-,\.,\/])\w+/i, function (str, $1, $2) {
                        return sYear + $1 + sMon;
                    });
                    sDateVal = that._config.format.replace(/\w+([\-,\.,\/])\w+([\-,\.,\/])\w+/i, function (str, $1, $2) {
                        return sYear + $1 + sMon + $2 + '01 00:00:00';
                    });
                    hiddenField.val(sDateVal);
                    trigger.val(sDate);
                    that.destroy();
                }
            });
            $(document).on('click', function () {
                that.obj && that.destroy();
            });
        },
        // 设置组件的位置,初始状态
        syncUI: function () {
            var rel = /(\w+)[\-,\.,\/](\w+)([\-,\.,\/]\w+)?/;
            var oYearBord = this.obj.find('.date-year');
            var oMonBord = this.obj.find('.date-mon');
            var sDefaultDate = this._config.trigger.val();
            var iDefaultMon = sDefaultDate.match(rel) ? sDefaultDate.match(rel)[2] : this._config.defaultMon;
            var iDefaultYear, Index;

            this.obj.css({ left: $(this._config.trigger).offset().left, top: $(this._config.trigger).offset().top + $(this._config.trigger).outerHeight() });
            if (sDefaultDate && sDefaultDate.match(rel)) {
                iDefaultYear = sDefaultDate.match(rel)[1];
            } else if (sDefaultDate && !sDefaultDate.match(rel)) {
                iDefaultYear = sDefaultDate;
            } else {
                iDefaultYear = this._config.defaultYear;
            }
            oYearBord.children().each(function (index, elem) {
                if ($(this).text() == iDefaultYear) {
                    Index = $(this).index();
                }
            });
            Index > 4 && oYearBord.scrollTop((Index - 2) * oYearBord.find('li').height());
            oYearBord.find('li').eq(Index).addClass('active');
            iDefaultMon && oMonBord.find('li').eq(iDefaultMon - 1).addClass('active');
            this.setDisable();
        },
        setDisable: function () {
            var oYearBord = this.obj.find('.date-year');
            var oMonBord = this.obj.find('.date-mon');
            var rel = /(\w+)[\-,\.,\/](\w+)([\-,\.,\/]\w+)?/;
            if (this._config.disableDate === 0) {
                return;
            } else {
                var referDate = typeof this._config.referDate === 'function' ? this._config.referDate() : typeof this._config.referDate === 'string' ? this._config.referDate : null;
                if (!referDate) return;

                var indexY = this._config.endYear - (referDate.match(rel) ? referDate.match(rel)[1] : new Date().getFullYear());
                var indexM = referDate.match(rel) ? referDate.match(rel)[2] : (new Date().getMonth() + 1);

                if (this._config.endYearText) {
                    indexY = indexY + 1;
                }
                if (this._config.disableDate < 0) {

                    oYearBord.find('li:gt(' + indexY + ')').removeClass('active').addClass('disabled');
                    oYearBord.find('.active').index() === indexY && oMonBord.find('li:lt(' + (indexM - 1) + ')').removeClass('active').addClass('disabled');
                } else {
                    if (this._config.endYearText && indexY > 1) {
                        oYearBord.find('li:lt(' + indexY + ')').removeClass('active').addClass('disabled');
                    }
                    oYearBord.find('.active').index() === indexY && oMonBord.find('li:gt(' + (indexM - 1) + ')').removeClass('active').addClass('disabled');
                }
            }
        },
        destructor: function () {
            this.mask && this.mask.remove();
        },
        destroy: function () {
            this.destructor();
            this.obj.off();
            this.obj.remove();
            this.obj = null;
        }
    };

});