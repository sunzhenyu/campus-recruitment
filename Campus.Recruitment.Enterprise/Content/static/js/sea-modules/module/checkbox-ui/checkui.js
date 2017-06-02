/*!
 * Custom Radio Checkbox
 */
define('module/checkbox-ui/checkui', function (require, exports, module) {
    var $ = require("$");
    (function ($) {

        $.fn.customRadioCheckbox = function (options) {

            if (!this[0]) {
                return;
            }

            // 后缀
            var checkedSuffix = '-checked';

            // 隐藏inputs 样式
            var hiddenInputClass = 'rc-hidden';

            //强制更改
            var forceChange = function () {
                var $this = $(this);
                if (!$this.closest('label')[0]) {
                    $this.prev().trigger('change', [true]);
                }
            };

            //插入伪造的的checkbox 和 radio
            var insertFakeInput = function (inputs) {
                var type = inputs.type;
                var l = inputs.length;
                var fakeInputElem, input;

                while (l--) {
                    input = inputs[l];
                    $(input).is(':hidden') ? '' : $(input).addClass(hiddenInputClass);     //如果元素本身已经隐藏则不添加隐藏class
                    var i = $(input).next().is('i') ? $(input).next() : $('<i>');          //如果有则不生成
                    if (!i.hasClass(type)) {                                               //如果没有样式则添加
                        i.addClass(type);
                    }
                    if (!i.hasClass(type + checkedSuffix) && input.checked) {       //如果没有选中样式，并且input选中，添加选中状态
                        i.addClass(type + checkedSuffix);
                    }
                    fakeInputElem = i;
                    !$(input).is(":disabled") && fakeInputElem.bind('click', forceChange);   
                    if (!$(input).next().is('i')) {                                        //如果有则不添加
                        input.parentNode.insertBefore(fakeInputElem[0], input.nextSibling);
                    }
                }
            };

            return this.each(function () {

                var $context = $(this);

                //找到原生控件并添加隐藏class
                var radios = $context.find('input[type=radio]:not(.' + hiddenInputClass + ')');
                var checkboxs = $context.find('input[type=checkbox]:not(.' + hiddenInputClass + ')');

                var rdsCache = {};

                var radiosLength = radios.length;
                var radio;

                //radio
                if (radios.length) {
                    radios.type = 'radio';
                    insertFakeInput(radios);

                    while (radiosLength--) {
                        radio = radios[radiosLength];
                        if (radio.checked) {
                            (rdsCache[radio.name] = {}).checked = $(radio.nextSibling);
                        }
                    }
                    radios.bind('change', function (e, force) {

                        if (!force || !this.checked) {

                            if (!rdsCache[this.name]) {
                                rdsCache[this.name] = {};
                            }
                            if (rdsCache[this.name].checked) {
                                rdsCache[this.name].checked.removeClass(radios.type + checkedSuffix);
                            }
                            rdsCache[this.name].checked = $(this.nextSibling).addClass(radios.type + checkedSuffix);
                        }

                        if (force && !this.checked) {
                            this.checked = true;
                        }
                    });
                }

                if (checkboxs.length) {
                    checkboxs.type = 'checkbox';

                    insertFakeInput(checkboxs);
                    checkboxs.bind('change', function (e, force) {
                        if (force) {
                            this.checked = !this.checked;
                        }
                        $(this.nextElementSibling).toggleClass(checkboxs.type + checkedSuffix);
                    });
                }
            });
        };

    }(jQuery));
});