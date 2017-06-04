define('module/selectui/selectui', function (require, exports, module) {
    var $ = require("$");

    (function ($) {
    
        // 构造函数
        var selectUi = function (el,options) {

            // 默认参数
            var defaults = {
                showText: '请选择',
                setFirst: 0,                                             //默认选中第一个
                callback: null
            }
            this.option = $.extend(defaults, options);
            this.element = $(el);
            if (this.isShowDropdown && !this.element.attr('disabled')) {
                this._globalKeydown = $.proxy(this._globalKeydown, this);
            }
            this._init();
        }

        selectUi.prototype = {
            isShowDropdown:true,
            _init: function () {
                var that = this;

                this.element.hide();
                this.data = [];

                this.element.find('option').each(function (index, value) {
                    var DataOption = {};
                    DataOption.name = value.innerHTML;
                    DataOption.id = value.value;
                    if (value.outerHTML.indexOf("selected")>-1) {
                        that.option.setFirst = index;                   //找到已选中值
                    }
                    that.data[index] = DataOption;
                })
            
                this._create();
                this._bind();
            },
            _create: function () {
                var that = this;
                var flag = false;
                this.wrapper = $('<div class="selectUi" data-widget="selectUi"></div>').addClass('fn-hide');
                this.resultText = $('<div class="select-result"></div>');
                this.list = $('<ul></ul>');

                $(this.data).each(function (index, value) {
                    var li = $('<li>' + value.name + '</li>').attr('data-id', value.id);
                    if (index === that.option.setFirst) {
                        that.resultText.text(value.name);
                        li.addClass('selected');
                        flag = true;
                    } 
                    that.list.append(li);
                })
                if (!flag) {
                    that.resultText.text(that.option.showText);
                }
                this.wrapper.append(this.resultText).append(this.list);
                this.element.after(this.wrapper);
            },
            toggle: function () {
                if (this.wrapper.hasClass('fn-hide')) {
                    $('[data-widget="selectUi"]').addClass('fn-hide');
                    this.wrapper.removeClass('fn-hide');
                    $(document).on('keydown', this._globalKeydown);
                } else {
                    $('[data-widget="selectUi"]').addClass('fn-hide');
                    $(document).off('keydown', this._globalKeydown);
                }
            },
            _bind: function () {
                var that = this;

                this.resultText.on('click', function (e) {
                    that.wrapper.focus();
                    that.toggle();
                });
                //选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）
                this.list.on('click','li',function (e) {
                    var index = $(this).index();
                    that._selected(index);
                    that.toggle();
                    typeof (that.option.callback) == 'function' ? that.option.callback($(this).attr("data-id")) : null;
                    e.preventDefault();
                });

                $(document).on('click', function (event) {
                    var e = event || window.event;
                    var elem = e.srcElement || e.target;
                    while (elem) {
                        if ($(elem).attr('data-widget') == "selectUi") {
                            return;
                        }
                        elem = elem.parentNode;
                    }
                    $('[data-widget="selectUi"]').addClass('fn-hide');
                    $(document).off('keydown');
                })
            },
            _selected:function(index){
                if (this._getOption(index).attr('disabled')) {
                    return false;
                }
                this.list.find('li').eq(index).addClass('selected').focus().siblings().removeClass('selected');
                this.resultText.text(this._getOption(index).text());
                this.element[0].selectedIndex = index;
                return true;
            },
            _getOption:function(index){
                index = index === undefined ? this.element[0].selectedIndex : index;
                return this.element.find('option').eq(index);
            },
            // 上下移动
            _move: function (n) {
                var min = 0;
                console.log(n);
                var max = this.element[0].length - 1;
                var index = this.element[0].selectedIndex + n;
                if (index >= min && index <= max) {
                    // 跳过带有 disabled 属性的选项
                    if (!this._selected(index)) {
                        this._move(n + n);
                    }
                }
            },
            // 全局键盘监听
            _globalKeydown: function (event) {

                var p;

                switch (event.keyCode) {
                    // backspace
                    case 8:
                        p = true;
                        break;
                        // tab
                    case 9:
                        // esc
                    case 27:
                        // enter
                    case 13:
                        this.toggle();
                        p = true;
                        break;
                        // up
                    case 38:
                        this._move(-1);
                        p = true;
                        break;
                        // down
                    case 40:
                        this._move(1);
                        p = true;
                        break;
                }

                if (p) {
                    event.preventDefault();
                }
            }
        }


        $.fn.selectui = function(options){
            $(this).each(function(){
                new selectUi(this,options);
            })
        }


        $.fn.selectuiParam= function (options) {
            return  new selectUi(this, options);
        }

    })(jQuery)

})





