define('module/layer/1.0.3/layer', function (require, exports, module) {
    var $ = require("$");
    (function (window, $, undefined) {

        var Layer = function(option) {
            this.config = {
                // 宽度
                width: '',
                //高度
                height: 'auto',
                // 对话框叠加高度值(重要：此值不能超过浏览器最大限制)
                zIndex: 10,
                // 消息内容
                content: '<div class="ui-layer-loading">Loading..</div>',
                // 标题
                title: '',
                // 自定义按钮
                button: null,
                // 确定按钮回调函数
                ok: null,
                // 取消按钮回调函数
                cancel: null,
                // 对话框自定义 className
                className: 'zyb-Layer',
                // css 文件路径，留空则不会使用 js 自动加载样式
                // 注意：css 只允许加载一个
                cssUri: '',
                //是否创建遮罩层
                isMask: true,
                //模板
                tplHtml: '<div class="ui-layer">' +
                            '<div class="ui-layer-container">' +
                                //'<div class="ui-layer-header" data-role="header">' +
                                //    '<div class="ui-layer-title" data-role="title"></div>' +
                                //    '<button class="ui-layer-close" data-role="close">×</button>' +
                                //'</div>' +
                                '<div class="ui-layer-content" data-role="content">' +
                                '</div>' +
                                '<div class="ui-layer-footer" data-role="footer">' +
                                    '<div class="ui-layer-button" data-role="button"></div>'+
                                '</div>' +
                            '</div>' +
                        '</div>',
                callBack: null
            }

            this.options = $.extend({}, this.config, option);

            this.destroyed = false;

            this.create();

            this._header = this.wrap.find('[data-role=header]');
            this._title = this.wrap.find('[data-role=title]').html(this.options.title);
            this._content = this.wrap.find('[data-role=content]').css({
                width: this.options.width,
                height: this.options.height
            });
            this._button = this.wrap.find('[data-role=button]');
            this._close = this.wrap.find('[data-role=close]');
            this.setContent(this.options.content);
            this.button();
            this.bindEvent();
        }

        Layer.prototype = {
            //构造函数
            constructor: Layer,
            destroyed: true,
            //创建结构
            create: function () {
                var that = this;
                this.wrap = !this.wrap ? $('<div />')
                            .attr({
                                tabindex: '-1'
                            })
                            .css({
                                display: 'none',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 'auto',
                                right: 'auto',
                                margin: 0,
                                padding: 0,
                                outline: 0,
                                border: '0 none',
                                background: 'transparent'
                            })
                            .html(that.options.tplHtml)
                            .appendTo($('body')) : this.wrap;

                this.wrap.css({
                    zIndex: this.options.zIndex
                })

                this.mask = this.createMask() ;    //是否创建遮罩 
            },
            //创建遮罩
            createMask: function () {
                return !this.mask ? $('<div class="mask"></div>').css({
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    backgroundColor: '#000',
                    opacity: 0.5,
                    zIndex: this.options.zIndex - 1,
                    display: 'none'
                }) : this.mask;
            },
            //设置内容
            setContent: function (html) {
                if (typeof html === 'object') {
                    this._content.empty().append($(html));
                } else {
                    this._content.html(html);
                }
                this.callBack();
                return this;
            },
            //绑定事件
            bindEvent: function () {
                var that = this;
                $(window).resize(function () {
                    that.center();
                })

                $(document).on('keydown', function (e) {
                    var target = event.target;
                    var nodeName = target.nodeName;
                    var rinput = /^input|textarea$/i;
                    var keyCode = event.keyCode;

                    // 避免输入状态中 ESC 误操作关闭
                    if (rinput.test(nodeName) && target.type !== 'button') {
                        return;
                    }
                    if (keyCode === 27) {
                        that.remove();
                    }
                })

                //this.move(this._header);          //暂时关闭拖动

                this.wrap.on('click', '[data-role=close]', function () {
                    that.remove();
                });

            },
            button: function () { 
                var that = this;
                var args = this.options.button || [];

                $.each(args,function(name,value){
                    $('<button data-id="' + value.id + '"></button>').text(value.value).appendTo(that._button).click(function () {
                        //if (that.options.ok) {
                        //    if (value.id == 'ok' && typeof that.options.ok === 'function') {
                        //        that.options.ok.call(that);
                        //    }
                        //}
                        //if (that.options.cancel) {
                        //    if (value.id == 'cancel' && typeof that.options.cancel === 'function') {
                        //        that.options.cancel.call(that);
                        //    }
                        //}
                        if (value.id == 'ok' && typeof that.options.ok === 'function') {
                            that.options.ok.call(that);
                        }else if(value.id == 'cancel' && typeof that.options.cancel === 'function'){
                            that.options.cancel.call(that);
                        }
                        that.remove();
                    });
                })
            },
            //拖拽方法
            move: function (movedom) {
                var that = this,
                    config = that.option,
                    conf = {};

                movedom && movedom.attr('move', 'ok');
                movedom ? movedom.css({ cursor: 'move' }) : movedom.css({ cursor: 'auto' });

                movedom.on('mousedown', function (e) {
                    var e = e || window.event;
                    e.preventDefault();
                    if ($(this).attr('move') === 'ok') {
                        conf.ismove = true;
                        conf.wrap = that.wrap;
                        conf.moveX = e.pageX - conf.wrap.offset().left;
                        conf.moveY = e.pageY - conf.wrap.offset().top;
                    }
                });

                $(document).mousemove(function (e) {
                    var e = e || window.event;
                    e.preventDefault();

                    var mouseX = e.pageX;                           //当前X位置
                    var mouseY = e.pageY;                           //当前Y位置

                    var offsetX = 0;
                    var offsetY = 0;

                    if (conf.ismove) {

                        offsetX = mouseX - conf.moveX;              //容器到窗口左边的距离
                        offsetY = mouseY - conf.moveY - $(window).scrollTop();              //容器到窗口顶部的距离

                        var maxX = $(window).width() - conf.wrap.width(),
                            maxY = $(window).height() - conf.wrap.height();

                        //限定范围
                        //offsetX > 0 并且 offsetX < （页面最大宽度 - 浮层的宽度）
                        //offsetY > 0 并且 offsetY < （页面最大高度 - 浮层的高度）

                        offsetX = Math.min(maxX, Math.max(0, offsetX));
                        offsetY = Math.min(maxY, Math.max(0, offsetY));

                        conf.wrap.css({ left: offsetX, top: offsetY });
                    }
                }).mouseup(function () {
                    conf.ismove = false;
                });
            },
            //show方法
            show: function () {
                if (this.destroyed) {
                    return this;
                }
                if (this.options.isMask) {
                    this.mask.insertBefore(this.wrap);
                }
                this.wrap
                    .addClass(this.options.className + '-show')
                    .show();
                this.mask.show();
                this.center();
                return this;
            },
            callBack: function (callback) {
                typeof callback === "function" && callback.call(this.wrap, arguments);
                return this;
            },
            //remove方法
            remove: function () {
                if (this.destroyed) {
                    return this;
                }
                this.wrap.remove();
                this.mask.remove();

                $(window).off('resize');
                $(document).off('keydown');

                for (var i in this) {
                    delete this[i];
                }
                return this;
            },
            //关闭弹窗
            close: function () {
                if (!this.destroyed) {
                    this.mask.hide();
                    this.wrap.hide();
                }
            },
            // 居中浮层
            center: function (transition) {
                var wrap = this.wrap;
                var $window = $(window);
                var $document = $(document);
                var fixed = this.fixed;
                var dl = fixed ? 0 : $document.scrollLeft();
                var dt = fixed ? 0 : $document.scrollTop();
                var left = ($window.width() - wrap.width()) / 2 + dl;
                var top = ($window.height() - wrap.height()) / 2 + dt; // 黄金比例
                //var style = wrap[0].style;
                wrap.css({ left: Math.max(parseInt(left), dl), top: Math.max(parseInt(top), dt) });
                //style.left = Math.max(parseInt(left), dl) + 'px';
                //style.top = Math.max(parseInt(top), dt) + 'px';
                return this;
            },
            setTitle: function (title) {
                title && this._title.empty().append($(title));
                return this;
            },
            animate: function () {
                this.wrap.css("transition", "all .15s ease-in-out");
            }
        }

        window.Layer = Layer;

    })(window, $);
    module.exports = window.Layer;
});








