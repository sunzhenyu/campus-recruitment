define(function (require, exports, module) {

    var $ = require('$');

    function Prompt(option) {
        this.setting = {
            name: "T" + new Date().getTime(),
            trigger: '',                        //触发元素
            content: '',                        //显示的消息
            time: 400,                          //提示层显示的时间
            speed:800,
            created:false,
            timer:{
                stc:null,
                clear:function(){
                    if (this.timer.stc) clearTimeout(this.timer.stc);
                }
            },
            type: ''                           //提示类型（1、success 2、error 3、warning）
        }
        this.ops = $.extend({}, this.setting, option);
        this.ops.trigger = typeof this.ops.trigger == 'string' ? $(this.ops.trigger) : this.ops.trigger;
        this.init();
    }

    Prompt.prototype = {
        init: function () {
            if (!this.ops.created) {
                this.create();
            }
            this._show();
        },
        create: function () {
            this.ops.created = true;
            this.wrapper = $('<div class="Prompt_floatBox" id="' + this.ops.name + '"></div>').css({
                position: 'absolute'
            });
            this.content = $('<div class="Prompt_content"></div>');
            this.icon = $('<i></i>');
            this.gips = $('<div class="gips-icon"><i></i></div>');
            this.content.html(this.ops.content);

            if (this.ops.type != '') {
                this.icon.addClass('Prompt_icon_' + this.ops.type);
                this.content.prepend(this.icon);
            }

            this.wrapper.append(this.content).append(this.gips);

            $("body").append(this.wrapper);
            this.Ds = Ds = {
                width: this.content.outerWidth(true),
                height: this.content.outerHeight(true),
                left: this.ops.trigger.offset().left - Math.floor(this.wrapper.innerWidth() / 2) + Math.floor(this.ops.trigger.innerWidth() / 2),
                top: this.ops.trigger.offset().top
            };

            this.wrapper.css({
                width: Ds.width,
                height: Ds.height,
                left: Ds.left,
                top: Ds.top,
                opacity:0
            });

        },
        _show: function () {
            var _self = this;

            this.wrapper.animate({
                opacity: 1,
                top: _self.Ds.top - _self.wrapper.innerHeight()-12
            }, _self.ops.speed, function () {
                _self.wrapper.show();
            });
            
            this.ops.timer.stc = setTimeout(function () {       //自动消失
                _self._hide();
            }, _self.ops.time);
        },
        _hide: function () {
            var _self = this;
            var mt = this.wrapper.offset().top - 50;
            this.wrapper.animate({
                opacity: '0',
                top: mt
            }, _self.ops.speed, function (){
                _self.wrapper.hide();
            });
        }
    }

    module.exports = Prompt;
})