$.fn.select = function (options) {
    var opts = $.extend({}, $.fn.select.defaults, options);

    return this.each(function () {
        var $this = $(this);

        var $ul = $(this).children("ul");
        var $result = $(this).children(".select-result");
        var $searchTitle = $(this).children('.search-temp-title');
        $result.attr("readonly", true);
        var $zIndex = parseInt($this.css("z-index"));
        opts.zIndex = $zIndex;
        $result.click(function () {
            $ul.is(":hidden") ? _show() : _hide();
        });
        //选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）
        if (!$this.hasClass('flag')) {
            $ul.find("li").click(function () {
                if (!$(this).attr('data-disable')) {
                    if ($(this).children().is("a")) {
                        $result.val($(this).children("a").html());
                    } else {
                        $result.val($(this).children(':first-child').contents().filter(function () {
                            return this.nodeType === 3;
                        }).text());
                    }
                    $this.find('input[type=hidden]').val($(this).attr('data-id'));
                    _hide();
                }
            });
        }
        $(document).click(function (i) {
            !$(i.target).parents(".select").first().is($this) ? _hide() : "";
        });
        //展开效果
        var _show = function () {
            $ul.show();
            $searchTitle.show();
            $result.addClass("cur");
            $this.css("z-index", opts.zIndex + 1);
            if ($this.hasClass('flag')) {
                var posId = $('#posId').val();
                if (!!posId) {
                    if ($('.backlight').length) {
                        return false;
                    } else {
                        $('.u-bg').each(function (i, v) {
                            if ($(v).attr('data-id') == posId) {
                                var ptop = $(v).position().top;
                                $(v).addClass('backlight');
                                $ul.scrollTop(ptop - 154);
                                return false;
                            }
                        })
                    }
                }
            }
        };
        //关闭效果
        var _hide = function () {
            $ul.hide();
            $searchTitle.hide();
            $result.removeClass("cur");
            $this.css("z-index", opts.zIndex);
        };
    });
}

$.fn.select.defaults = {
    zIndex: 0,
    scroll : false
}