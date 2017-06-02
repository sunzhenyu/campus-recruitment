define('corp/confirm/1.0.0/confirm', ['$', 'arale/dialog/1.3.0/confirmbox', 'seajs/seajs-style/1.0.2/seajs-style', './confirm.css'], function (require, exports, module) {
    var $ = require('$');
    var ConfirmBox = require('arale/dialog/1.3.0/confirmbox');
    require("./confirm.css");
    var Confirm = ConfirmBox.extend({
        attrs: {
            classPrefix: 'corp-confirm',
            title: "",
            hasMask: false,
            width: 250,
            closeTpl: '',
            confirmTpl: '<a href="javascript:;">确定</a>',
            cancelTpl: '<a href="javascript:;">取消</a>',
        }
    });

    module.exports = Confirm;
});

define("corp/confirm/1.0.0/confirm.css", [], function () {
    seajs.importStyle(".confirm-done{color: #2466b2;}");
});