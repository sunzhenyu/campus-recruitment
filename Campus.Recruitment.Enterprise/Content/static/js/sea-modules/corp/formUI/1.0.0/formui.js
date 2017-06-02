define('corp/formUI/1.0.0/formui', ['$'], function (require, exports, module) {
    var $ = require("$");

    (function ($) {

        $.fn.select = function (options) {
            var opts = $.extend({}, options);

            return this.each(function () {

                $beforeAfter(this);                     //IE7、8下拉图标生成

                var $this = $(this);
                var $ul = $(this).children("ul");
                var $result = $(this).children(".select-result");
                $result.attr("readonly", true);
                $result.click(function () {
                    $ul.is(":hidden") ? _show() : _hide();
                });
                //选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）
                $ul.find("li").click(function () {
                    if (!$(this).attr('data-disable')) {
                        if ($(this).children().is("a")) {
                            $result.val($(this).children("a").html());
                        } else {
                            $result.val($(this).children(':first-child').contents().filter(function () {
                                return this.nodeType === 3;
                            }).text());
                        }
                        $result.focus();
                        $this.find('input[type=hidden]').val($(this).attr('data-id'));
                        if ($(this).find('div').length == 0) {
                            $this.find('.cur').val($(this).html());
                        }
                        _hide();
                        if (opts.callback !== undefined && typeof opts.callback === 'function') {
                            opts.callback();
                        }
                    }
                });
                $(document).click(function (i) {
                    !$(i.target).parents(".select").first().is($this) ? _hide() : "";
                });  
                //展开效果
                var _show = function () {
                    $ul.show();
                    $result.addClass("cur");
                };
                //关闭效果
                var _hide = function () {
                    $ul.hide();
                    $result.removeClass("cur");
                };
            });
        }

        var $beforeAfter = function (dom) {
            if (document.querySelector || !dom && dom.nodeType !== 1) return;
            var content = dom.getAttribute("data-content") || '';
            var before = document.createElement("before")
                , after = document.createElement("after");
            // 内部HTML
            before.innerHTML = content;
            after.innerHTML = content;
            // 前后分别插入节点
            dom.insertBefore(before, dom.firstChild);
            dom.appendChild(after);
        };

    })(jQuery);
})