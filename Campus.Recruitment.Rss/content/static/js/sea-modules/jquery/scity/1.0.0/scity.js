define('jquery/scity/1.0.0/scity', [], function (require, exports, module) {
    return function (jQuery) {
        /*
* @author Rex
* city selector for top search
* - 使用绝对定位内嵌层
* - 也适用于密码域
* 目标浏览器: IE 6~9, FF 3.5
*/
        ; (function ($) {
            var isIE6 = $.browser.msie && (parseInt($.browser.version) < 7) ? true : false;
            $.fn.sCity = function (options) {
                return this.each(function () {
                    var defaults = {
                        cityLayerId: 'cityLayer',
                        closeId: 'Sclose',
                        sortSecClass: 'sort-sec',
                        sortThirdClass: 'sort-third',
                        sortThirdHide: 'hide',
                        isCenter: false,
                        directSearch: false, //点击城市直接去搜索结果页
                        searchUrl: '',
                        isFixed: false
                    };
                    var opt = $.extend('', defaults, options || {});
                    var $input = $(this);
                    var $hidden = $(this).next();
                    var $doc = $(document),
                        $win = $(window),
                        $cityLayer = $('#' + opt.cityLayerId),
                        $close = $('#' + opt.closeId),
                        $hotCityChk = $('.Scity-hot').find('a'),
                        $cityChk = $('.sort-third-in').find('label'),
                        $sortSecChk = $('.' + opt.sortSecClass).find('label'),
                        $sortThird = $('.' + opt.sortThirdClass),
                        inputX = $input.width(), inputY = $input.height();
                    var _callCityLayer = function () {
                        $.ajax({
                            type: 'get',
                            url: '/home/GetCityLayer',
                            //                data: { id: 1 },
                            dataType: 'html',
                            //                    beforeSend: function (data) {
                            //                        $('#J_RmdJobs').html("<strong> 数据读取中.....</strong>");
                            //                        //取回数据前
                            //                        //$("#itemTree").html('<span style="padding:5">数据加载中...</span>');
                            //                    },
                            error: function (response) { //发生错误时
                                //console.log("error" + response);
                                //debugger;
                            },
                            success: function (response) { //成功返回时

                                if (!document.getElementById(opt.cityLayerId)) {
                                    $('body').append(response);
                                    _setLayerPos()
                                    $('#' + opt.cityLayerId).show();
                                }

                            }
                        });


                    }
                    var _show = function () {
                        _callCityLayer();
                        _setLayerPos()
                        $('#' + opt.cityLayerId).show();
                    };
                    var _hide = function () {
                        _hideThird();
                        $('#' + opt.cityLayerId).hide();
                    };
                    var _showThird = function (idNum, secEle) {
                        var curThird = $("#s" + idNum);
                        _hideThird(idNum, secEle);
                        curThird.removeClass('hide');
                        _setSlideTop(curThird, secEle);
                    };
                    var _hideThird = function (idNum, secEle) {
                        if (typeof idNum == "undefined") {

                            $('.' + opt.sortSecClass).find('label').parent().removeClass('selectedL');
                        } else {
                            //console.log($("[rel="+idNum+"]"));
                            $('.' + opt.sortSecClass).find('label').not(secEle).parent().removeClass('selectedL');
                        }

                        $('.' + opt.sortThirdClass).addClass('hide');
                    };
                    var _setValue = function ($cityCheck) {
                        $input.val($.trim($cityCheck.html()));
                        $hidden.val($cityCheck.attr('rel'));
                        _hide();
                    };
                    var _goSearch = function ($cityCheck) {
                        var cityId = $cityCheck.attr('rel'),
                            url = opt.searchUrl + cityId;
                        ///处理搜索url

                        //alert(url);
                        window.location.href = 'http://' + url;
                        _hide();
                    };
                    var _setLayerPos = function () {
                        var $cityLayer = $('#' + opt.cityLayerId);
                        var layerX = $cityLayer.outerWidth(),
                            //layerY = 315
                            layerY = $cityLayer.outerHeight();

                        if (opt.isCenter) {
                            if (isIE6) {
                                var scrollY = $win.scrollTop(),
                                    winY = $win.height(),
                                    t = scrollY + (winY - layerY) / 2;
                                $cityLayer.css({
                                    position: 'absolute',
                                    top: t,
                                    left: '50%',
                                    marginLeft: -layerY / 2

                                });
                            } else {

                                $cityLayer.css({
                                    position: 'fixed',
                                    top: '50%',
                                    left: '50%',
                                    marginLeft: -layerY / 2,
                                    marginTop: -layerX / 2
                                });
                            }
                        } else {
                            var inputOffsetBottom = $win.height() - $input.offset().top - inputY,
                                inputLeft = $input.offset().left,
                                inputTop = $input.offset().top;

                            if (!opt.isFixed) {
                                if (inputOffsetBottom < layerY) {
                                    $cityLayer.css({
                                        left: inputLeft,
                                        bottom: $win.height() - inputTop
                                    });
                                } else {
                                    $cityLayer.css({

                                        "left": inputLeft,
                                        "top": inputTop + inputY
                                    });
                                }
                            } else {
                                $cityLayer.css({
                                    position: 'fixed',
                                    left: inputLeft,
                                    top: 29   //计算input底部到导航顶部的距离
                                });
                            }


                        }

                    };
                    var _setSlideTop = function (curThird, secEle) {
                        var $top = curThird.find('.silde-top');
                        var $oP = secEle.offsetParent();
                        var bgpLeft = secEle.offset().left - $oP.offset().left - 61 + secEle.width() / 2 - 1000;

                        $top.css({ 'backgroundPosition': bgpLeft + "px 0" });
                    };
                    $input.bind('click', function () {
                        _show();


                    });
                    $input.keydown(function (e) {
                        _hide();
                    });

                    $doc.on('click', '#' + opt.closeId, function () {

                        _hide();

                    });

                    $hotCityChk.click(function () {
                        if (!opt.directSearch) {
                            _setValue($(this));
                        } else {
                            _goSearch($(this));
                        }

                    });

                    $doc.on('click', '.sort-third-in label,.Scity-hot a', function () {
                        if (!opt.directSearch) {
                            _setValue($(this));
                        } else {
                            _goSearch($(this));
                        }
                    });

                    $doc.on('click', '.' + opt.sortSecClass + ' label', function () {

                        var $this = $(this);
                        var num = $this.attr('rel');
                        $this.parent().addClass('selectedL');
                        _showThird(num, $this);
                    });

                    //hide city layer when click doc
                    $doc.click(function (e) {
                        if (e.target == $input[0]) return false;
                        _hide();
                    });

                    $doc.on('click', '#' + opt.cityLayerId, function (e) {

                        e.stopPropagation();
                    });

                });
            };
        })(jQuery);
    };
});