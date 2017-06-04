(function ($) {
    $.fn.extend({
        //downslide||view the downslide
        downslide: function (options) {
            var defaults = {
                trigger: '',//触发元素，根据触发元素设置城市选择器位置，append到触发元素最后
                inputVal: '',//显示的元素
                hiddenInput: '',
                positionElement: '',//位置确定元素
                target: '',//内容
                callback: function () { }
            };
            $.extend(defaults,options);
            return this.each(function () {
                //全局模块渲染参数
                init();
                function init() {
                    domReady();
                    bindEvent();
                }
                function domReady() {
                    show();
                    $(defaults.positionElement).append(defaults.target);
                }
                function show() {
                    var left = -1, //$(defaults.trigger).position().left,
                        top = $(defaults.trigger).outerHeight(true) - 1;
                    $(defaults.target).css({'position':'absolute','left': left, 'top': top }).show();
                }
                function bindEvent() {
                    $(defaults.target).on('click','li',function () {
                        $(defaults.inputVal).text($(this).text());
                        $(defaults.hiddenInput).val($(this).attr('data-id'));
                        defaults.callback();
                        $(defaults.target).remove();
                    })
                }
            });
        }
    });
})(jQuery);
