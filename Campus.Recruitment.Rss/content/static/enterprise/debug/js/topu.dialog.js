$.fn.createDialog = function(defaults){

    var preinstall = {
        none:{
            title: "",
            text: "",
            btnText: {
                yes: "",
                no: ""
            }
        },
        error:{
            title: "错误",
            text: "遇到一个错误，请您确认您的操作",
            btnText: {
                yes: "确认",
                no: ""
            }
        },
        warning:{
            title: "警告",
            text: "该操作可能带来一定风险，请确认您的操作",
            btnText: {
                yes: "确认",
                no: "取消"
            }
        },
        confirm:{
            title: "确认",
            text: "您完成了一项操作",
            btnText: {
                yes: "确认",
                no: ""
            }
        }
    };

    var isLIE = $.browser.msie ? parseInt($.browser.version) < 9 ? true : false : false;
    var _this = this;
    // 默认参数
    var opt = {
        id : "",
        title : "提示信息",
        text : "没有得到您想要的内容，点击确认关闭该窗口",
        template : undefined,
        btnType : "none", // error warning confirm
        btnText : {
            yes : "确认",
            no : "取消"
        },
        boxSize : {
            w : 500,
            h : 0
        },
        callback : undefined,
        confirmCallback : undefined,
        cancelCallback : undefined,
        onShow : undefined,
        onHide : undefined
    };
    // 继承自定义参数

    $.extend(opt,preinstall[opt.btnType]);
    $.extend(opt,defaults);

    if(!$("#dialogMask").length){
        $("body").append('<div id="dialogMask"></div>');
    }
    var mask = $("#dialogMask");
    var obj, showDialog, hideDialog, destoryDialog;

    var hideDialog = function(){
        obj.add(mask).css("display","none");
        if (typeof opt.onHide != 'undefined') {
            opt.onHide.apply($(this), [obj]);
        }
    };
    var showDialog = function(){
        obj.find(".pop-dialog-title>h2").html(_this.data("title") || opt.title);
        obj.add(mask).css("display", "block");
        if (typeof opt.onShow != 'undefined') {
            opt.onShow.apply($(this), [obj]);
        }
    };
    var destoryDialog = function(){
        obj.add(mask).css("display","none");
        if (typeof opt.onHide != 'undefined') {
            opt.onHide.apply($(this), arguments);
        }
        obj.remove();
    };
    // 判断是否已经建立了弹出框
    var created = 0;
    if(!created){
        created = 1;
        var content = "";
        // 判断content是否带入了一个dom
        if(opt.template){
            content = $(opt.template);
            $(opt.template).remove();
        }else{
            content = $('<div class="simple-text">' + opt.text + '</div>');
        }
        var str = '<div id="'+opt.id+'" class="pop-dialog">' +
            '<div class="pop-dialog-title">' +
            '<h2></h2>' +
            '<div class="close"></div>' +
            '</div>' +
            '<div class="pop-dialog-content">' +
            '<div class="default-btn-bar">' +
            (opt.btnText.yes?('<button class="btn btn-confirm popDialogConfirm">' + opt.btnText.yes + '</button>'):"") +
            (opt.btnText.no?('<button class="btn btn-cancel btn-less popDialogCancel">' + opt.btnText.no + '</button>'):"") +
            '</div>'+
            '</div>' +
            '</div>';
        obj = $(str);
        
        obj.find(".pop-dialog-content").prepend(content);
        $("body").append(obj);

        if (!-[1, ]) {
            var iHeight = obj.height();
            obj.css({ 'top': ($(window).height() - iHeight) / 2, 'left': ($(window).width() - opt.width) / 2 });
            obj.find('.pop-dialog-title').width(opt.width);
        }
        obj.find(".close").click(function(){
            if(typeof opt.cancelCallback != 'undefined'){
                opt.cancelCallback.apply(this,arguments);
            }
            hideDialog();
        });
        obj.find(".popDialogCancel").click(function(){
            // 如果有回调,在这里执行
            if(typeof opt.cancelCallback != 'undefined'){
                opt.cancelCallback.apply(this,arguments);
            }
            hideDialog();
        });
        obj.find(".popDialogConfirm").click(function(){
            // 如果有回调,在这里执行
            if(typeof opt.confirmCallback != 'undefined'){
                opt.confirmCallback.apply(this,arguments);
            }
            hideDialog();
        });
        // 为目标绑定事件
        _this.click(function (e) {
            e = e || event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            showDialog.apply($(this),arguments);
        })
    }

    // 如果有回调,在这里执行
    if(typeof opt.callback != 'undefined'){
        opt.callback.apply($(this),[obj]);
    }

    return {
        showDialog : showDialog,
        destoryDialog : destoryDialog,
        hideDialog : hideDialog,
        target : obj,
        body : _this
    }
}