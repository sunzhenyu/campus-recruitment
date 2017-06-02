/*
*   Form表单方法集合
*
*   itemSwitch 各选择器状态切换方法
*       $(selector).itemSwitch({*
*            switchName     设置切换后的className，默认为selected
*            off            设置选中的元素再次被操作是否可以切换状态 默认为false
*            cleanSiblings  设置是否清除兄弟项目的选中状态，默认为true
*       })
*
*   radioBox 单选组件
*       $(selector).radioBox({
*           initNum         设置默认值，可以通过data-value设置
*           radioName       需要操作的子属性className
*           selectedVal     点击后的回调
*           callBack        组件回调
*       })
*   selectUi 下拉组件
*       $(selector).selectUi({
*           showText        默认缺省内容，默认为"请选择"
*           setFirst        根据索引设置默认显示的值
*           callback: 组件回调
*       })1
* */
(function($){
    $.fn.renderError = function(options){
        var opt = {
            flag : true
        }
        $.extend(opt,options);
        if(opt.flag){
            $(this).parentsUntil('.option').parent().removeClass('error').addClass('success');
        }else{
            $(this).parentsUntil('.option').parent().removeClass('success').addClass('error');
        }
    }
    $.fn.radioBox = function(option){//页面内单选事件
        var opt = {
            initNum: "",
            initType: "", // 默认为索引初始化，扩展了一个传值初始化value 可通过属性设置，并属性优先
            radioName: "radioOption",
            switchName: "selected",
            selectedVal : undefined ,
            callBack : undefined
        };
        $.extend(opt, option);
        var switchName = opt.switchName;
        $(this).each(function(radioIndex){
            var obj = $(this),
                item = obj.find("." + opt.radioName),
                initType = obj.data("init-type") ? obj.data("init-type") : opt.initType,
                i = opt.initNum[radioIndex] ? opt.initNum[radioIndex] : obj.data("value");
            if (initType == "value") {
                obj.find("." + opt.radioName + "[data-value='" + i + "']").addClass(switchName);
            } else {
                if (typeof (i) != 'number') {
                    i = -1;
                }
                if (i >= 0) {
                    item.eq(i).addClass(switchName);
                }
            }
            var str = '<input type="text" hidden value="'+i+'" data-required=" '+ obj.data("required") +'" name="'+obj.data("name")+'">';
            obj.append(str);
            item.each(function(index,element){
                $(this).click(function(){
                    //$(element).itemSwitch();
                    if (!$(this).hasClass(switchName)) {
                        item.removeClass(switchName);
                        $(this).addClass(switchName);
                        obj.find("input").val($(this).data("value"));
                        if (typeof (opt.selectedVal) != 'undefined') {
                            opt.selectedVal.apply(index, arguments);
                        }
                    }
                })
            });
        });
        if (typeof(opt.callBack) != 'undefined') {
            opt.callBack.apply(this, arguments);
        }
    };

    $.fn.itemSwitch = function(option){
        //封装状态切换方法
        var _this = {
            switchName : "selected",
            off:false,
            cleanSiblings : true
        };
        $.extend(_this,option);
        var switchName = _this.switchName
            ,off=_this.off
            ,cleanSiblings=_this.cleanSiblings;
        $(this).each(function(){
            var obj = $(this);
            if(obj.hasClass(switchName)){
                if(off){
                    obj.removeClass(switchName);
                }
            }else{
                if(cleanSiblings){
                    obj.siblings().removeClass(switchName);
                }
                obj.addClass(switchName);
            }
        })
    };
    $.fn.selectUi = function(val){
        var options = val || {};
        $(this).each(function(){
            options.el = $(this);
            new selectUi(options);
        })
    };

    // 构造函数
    var selectUi = function (option) {

        // 默认参数
        var defaults = {
            showText: '请选择',
            setFirst: -1,
            extendBtn :{
                template : "",
                event : undefined
            },
            onChange: undefined,
            callback: undefined
        };
        this.data=[];
        this.option = $.extend(defaults, option);
        //this.element = $(el);
        this._init();
        if (typeof(this.option.callBack) != 'undefined') {
            this.option.callBack.apply(this, arguments);
        }
    };

    selectUi.prototype = {
        //初始化
        _init: function () {
            var _self = this;
            //判断是否已经渲染过
            if(_self.option.el.hasClass("rendered")){
                return;
            }
            _self.option.el.addClass("rendered");
            this.element = typeof this.option.el == 'string' ? $(this.option.el) : this.option.el;
            //设置默认显示内容
            _self.option.placeholder = this.element.data("placeholder") || _self.option.showText;
            this.element.hide();
            this.element.find('option').each(function (index, value) {
                var DataOption = {};
                DataOption.name = value.innerHTML;
                DataOption.id = value.value;
                _self.data[index] = DataOption;
            });

            _self.option.defaultVal = "";
            if(this.element.data("default")){
                _self.option.setFirst = this.element.data("default");

            }
            if(_self.element.find('option[value="' + _self.option.setFirst + '"]').length){

                _self.option.defaultVal = _self.element.find('option[value="' + _self.option.setFirst + '"]').html();
            }

            _self.element.find('option[value="' + _self.option.setFirst + '"]').attr("selected", true).siblings().attr("selected",false);
            this._create();
            if(_self.option.setFirst == -1){
                _self.element.prepend('<option value="-1" selected>请选择</option>');
            }
            this._bind();
        },
        //创建下拉列表
        _create: function () {
            var _self = this;
            this.option.wrapper = $('<div class="selectUi" data-widget="selectUi"></div>');
            //创建表单项
            this.option.resultText = $('<input type="text" data-ignore="true" value="' + _self.option.defaultVal + '" placeholder="' + this.option.placeholder + '" readonly/>');
            this.option.list = $('<ul></ul>');
            var li;
            $(this.data).each(function (index, value) {
                li = $('<li>' + value.name + '</li>').attr('data-id', value.id);
                _self.option.list.append(li);
            });
            var extendBtn = $(this.option.extendBtn.template)
            _self.option.list.append(extendBtn);
            this.option.wrapper.append(this.option.resultText).append(this.option.list);

            if( typeof this.option.extendBtn.event != 'undefined'){
                this.option.extendBtn.event.apply(extendBtn,[this.element]);
            }
            this.element.after(this.option.wrapper);
        },
        //显示下拉列表
        _show: function () {
            this.option.list.show();
            this.option.wrapper.addClass("focus");
            if (this.option.setFirst) {
                this.option.list.scrollTop(this.option.setFirst * this.option.list.find('li').innerHeight() + 1);
                this.option.setFirst = '';
            } else {
                this.option.list.scrollTop(0);
            }
        },
        //隐藏下拉列表
        _hide: function () {
            this.option.list.hide();
            this.option.wrapper.removeClass("focus");
        },
        //绑定事件
        _bind: function () {
            var _self = this;
            this.option.wrapper.click(function () {
                _self.option.list.is(":hidden") ? _self._show() : _self._hide();
            });

            //选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）
            this.option.list.find("li").click(function () {
                if (!$(this).attr('data-disable')) {
                    if ($(this).children().is("a")) {
                        _self.option.resultText.val($(this).children("a").html());
                        _self.element.val($(this).attr('data-id'));
                    } else {
                        _self.option.resultText.val($(this).html());
                        _self.element.val($(this).attr('data-id'));
                    }
                    _self.element.find('option[value="' + $(this).attr('data-id') + '"]').attr("selected", true).siblings().attr("selected",false);

                    _self._hide();
                    if (typeof _self.option.onChange != 'undefined') {
                        _self.option.onChange.apply(_self.element, arguments);
                    }
                }
            });

            $(document).click(function (i) {
                (!$(i.target).parents('[data-widget="selectUi"]').is(_self.option.wrapper) && !$(i.target).first().is(_self.option.wrapper) || i.target.tagName.toLowerCase() == "li") ? _self._hide() : "";
            });

        }
    }
})(jQuery);