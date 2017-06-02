(function ($) {
    //高校级别选择器 start
    $.layerAlertMask = function (element, options) {
        var defaults = {
            title: '系统提示',
            closeIcon:true,
            setContent: '',
            width:'642',
            height:'384',
            onLayerMask: null // callback
        }
        var layerAlertMask = this;
        layerAlertMask.settings = {}
        //触发元素
        var $element = $(element);
        //初始化元素框
        layerAlertMask.init = function (options) {
            this.settings = $.extend({}, defaults, options);
            var $mask = $('<div id="layer-alert-mask"><div id="layer-alert-content"><div class="layer-alert-header">' + this.settings.title + this.closeIconFun() + '</div><div class="layer-alert-container"></div></div>');
            $('body').append($mask).show();
            $('.layer-alert-container').append(this.settings.setContent);
            if(this.settings.height === 'auto'){
                $('#layer-alert-content').css({ 'height': this.settings.height, 'width': this.settings.width, 'margin-left': -(this.settings.width / 2), 'margin-top': -($('#layer-alert-content').height() / 2 + 50) });
            }else{
                $('#layer-alert-content').css({ 'height': this.settings.height, 'width': this.settings.width, 'margin-left': -(this.settings.width / 2), 'margin-top': -(this.settings.height / 2 + 50) });
            }
            //设置初始化选中项
            this.bindEvent();
        }
        layerAlertMask.bindEvent = function () {
            var $layerContent = $('#layer-alert-mask'), _this = this;
            //取消按钮
            $layerContent.on('click', '.layer-alert-header i', function () {
                if (typeof _this.settings.onLayerMask === 'function') {
                    _this.settings.onLayerMask();
                }
                $('#layer-alert-mask').remove();
            })
        }
        layerAlertMask.closeIconFun = function () {
            return this.settings.closeIcon == true ? '<i></i>' : '';
        }
        layerAlertMask.init(options);
    }
    //高校级别选择器 end
    //高校级别调用
    $.fn.layerAlertMask = function (options) {
        return this.each(function () {
            new $.layerAlertMask(this, options);
        });
    }
})(jQuery);
