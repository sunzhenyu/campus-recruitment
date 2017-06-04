/*********
 * 弹窗选择组件  依赖弹窗
 * 
 * 调用方式
 * Pick.init({
 *  ... options
 * })
 * 
 * 配置说明
 * width    宽度
 * data     数据
 * type     选择类型（单选、多选）
 * trigger  触发器
 * hidden   存值元素
 * title    标题
 * showConfig   layer配置    dataListItemWidth 第一层数据宽度    subItemWidth 第二层数据宽度    
 * showMode 'table'    
 * mostSelectCount  最多选项(不填代表无效) 
 * isChooseTitle    是否能选择大类
 * callback 回调函数
 *********/
; (function (window, $, undefined) {

    var Pick = {
        defaults: {
            values: null,           //存储选择的id
            text: null,             //存储选择的内容
            showMode: '',           //显示模式
            tableClass: '',   //
            callback: null,         //回调函数
            showConfig: {}          //item配置
        },
        //初始化方法
        init: function (option) {
            var that = this;
            option.trigger = typeof option.trigger == 'string' ? $(option.trigger) : option.trigger;
            option.hidden = typeof option.hidden == 'string' ? $(option.hidden) : option.hidden;

            this.option = $.extend({}, this.defaults, option);
            this.option.trigger.focusin(function () {
                $(this).attr('readonly', 'readonly');
            }).focusout(function () {
                $(this).removeAttr('readonly');
            })

            this.layer = new Layer({
                title: that.option.title,
                width: this.option.width
            });

            this.content = $('<div class="zyb-Pick"></div>');
            this.getValue();
            this.createItemList();
            this.layer.setContent(this.content);
            this.layer.show();
            this.bindEvent();
        },
        //创建一级数据
        createItemList: function () {
            var that = this;
            this.content.html('');
            if (this.option.type == 'multi') {
                that.createSelected();
            }
            if (this.option.showMode == 'table') {
                this.table = $('<table></table>').css({
                    borderCollapse: 'collapse',
                    borderSpacing: 0
                }).appendTo($('<div class="show-mode-table ' + this.option.tableClass + '"></div>').appendTo(this.content));
            }
            $(this.option.data).each(function (index, value) {

                that.box = $('<div class="dialog-data-container"></div>');
                if (that.option.showMode != 'table') {
                    if (value.name != '') {
                        that.boxTitle = $('<h3 class="dialog-subTitle"></h3>').html(value.name).appendTo(that.box);
                    }
                }
                that.boxUL = $('<ul class="dialog-data-list clearfix"></ul>');
                $(value.items).each(function (i, v) {
                    var li = $('<li></li>').attr('data-id', v.id).width(that.option.showConfig.dataListItemWidth);
                    var span = $('<span></span>').html(v.name).data('items', v.items).appendTo(li);
                    $(that.idArr).each(function (id, val) {
                        if (v.id == val) {
                            span.addClass('active');
                        }
                    })
                    that.boxUL.append(li);
                })
                that.boxUL.appendTo(that.box);
                if (that.option.showMode == 'table') {
                    var tr = $('<tr class="item-row"></tr>');
                    var td1 = $('<td class="item-title"></td>').appendTo(tr);
                    var rowTitle = $('<h3></h3>').attr('data-id', value.id).html(value.name).appendTo(td1);
                    //var rowTitleSpan = $('<span></span>').html(value.name).appendTo(rowTitle);
                    var td2 = $('<td></td>').append(that.box);
                    tr.append(td2);
                    that.table.append(tr);
                } else {
                    that.box.appendTo(that.content);
                }
            })
        },
        //创建已选中区域
        createSelected: function () {
            var that = this;
            this.selectedWrap = selectedWrap = $('<div class="dialog-selected-container"></div>');
            this.confirmBtn = $('<button class="dialog-confirm-btn">确定</button>').appendTo(selectedWrap);
            this.emptyBtn = $('<button class="dialog-reset-btn">清空</button>').appendTo(selectedWrap);
            this.selectedTitle = $('<h3 class="dialog-subTitle"></h3>').text('已选择' + this.option.title.substring(this.option.title.length - 2, this.option.title.length)).appendTo(selectedWrap);
            this.selectedList = $('<ul class="dialog-selected-list clearfix">').appendTo(selectedWrap);
            if (that.idArr != null && that.txtArr != null) {
                $(that.idArr).each(function (id, val) {
                    var li = $('<li></li>').attr('data-id', val);
                    var span = $('<span></span>').html(that.txtArr[id]).addClass('active').append('<i>×</i>').appendTo(li);
                    that.selectedList.append(li);
                })
            }
            this.content.prepend(selectedWrap);
            if (!this.option.mostSelectCount) {
                this.unlimited = $('<button class="dialog-unlimited-btn">不限</button>').appendTo(selectedWrap).on('click', function () {
                    that.option.values = 0;
                    that.option.text = $(this).text();
                    that.setValue();
                    that.layer.remove();
                });
            }
            this.confirmBtn.on('click', function (e) {
                that.idArr = [], that.txtArr = [];
                that.selectedList.find('.active').each(function (index, value) {
                    that.idArr.push($(value).parent().attr('data-id'));
                    that.txtArr.push($(value).text().substring(0, $(value).text().length - 1));
                })
                that.option.values = that.idArr.join(',');
                that.option.text = that.txtArr.join('+');

                that.setValue();
                that.layer.remove();
            })

            this.emptyBtn.on('click', function () {
                that.selectedList.empty();
                that.content.find('.active').removeClass('active');
            })
        },
        //创建二级数据
        createSubsetItem: function () {
            var that = this;
            this.subsetItem = $('<div class="dialog-subData-wrap"></div>');
            this.subsetTitle = $('<h3 class="dialog-subData-title"></h3>');
            this.subsetList = $('<ul class="dialog-subData-list clearfix"></ul>');

            if (this.option.isChooseTitle) {
                $('<li></li>').attr('data-id', this.currentId).width(this.option.showConfig.subItemWidth).append(this.currentEle.clone()).appendTo(this.subsetTitle);
            } else {
                this.subsetTitle.html(this.currentTxt);
            }

            $(this.option.data).each(function (index, value) {
                var li = $('<li></li>').attr('data-id', value.id).width(that.option.showConfig.subItemWidth);
                var span = $('<span></span>').html(value.name).appendTo(li);
                $(that.idArr).each(function (id, val) {
                    if (val == that.currentId) {
                        that.subsetTitle.find('[data-id=' + that.currentId + ']').addClass('active');
                        return false;
                    } else {
                        if (value.id == val) {
                            span.addClass('active');
                        }
                    }
                })
                if (that.selectedList) {
                    that.selectedList.find('li').each(function (i, v) {
                        if ($(v).attr('data-id') == that.currentId) {
                            console.log(that.currentId);
                            that.subsetTitle.find('[data-id=' + that.currentId + ']').children().addClass('active');
                            return false;
                        } else {
                            if (value.id == $(v).attr('data-id')) {
                                span.addClass('active');
                            }
                        }
                    })
                }
                that.subsetList.append(li);
            })

            this.subsetItem.append(this.subsetTitle);

            this.subsetItem.append(this.subsetList).appendTo(this.content);
            var rowItemCount = this.subsetItem.find('li').length >= 4 ? 4 : this.subsetItem.find('li').length;

            this.subsetItem.width(this.subsetItem.find('li').eq(0).width() * rowItemCount - parseInt(this.subsetList.css('marginRight')) + 12);

            var left;
            if (this.currentEle.offset().left + this.subsetItem.width() > $(window).width()) {
                left = this.currentEle.position().left - this.subsetItem.width() + 12;
                this.subsetTitle.css('textAlign', 'right');
            } else {
                left = this.currentEle.position().left - 16
            }

            this.subsetItem.css({
                position: 'absolute',
                left: left,
                top: this.currentEle.position().top
            })

            this.subsetItem.on("mouseleave", function (ev) {
                $(this).remove();
            });
        },
        //绑定事件
        bindEvent: function () {
            var that = this;
            this.content.on('click', 'span', function (e) {
                e.stopPropagation();

                that.currentEle = $(this);
                that.currentTxt = $(this).html();
                that.currentId = $(this).parent().attr('data-id');

                if ($(this).data('items') && $(this).data('items') != '' && that.option.showMode != 'table') {
                    that.option.data = $(this).data('items');
                    that.createSubsetItem();
                } else {
                    if (that.option.type == 'single') {
                        that.option.values = that.currentId;
                        that.option.text = that.currentTxt;
                        that.setValue();
                        that.layer.remove();
                    } else if (that.option.type == 'multi') {
                        if ($(this).hasClass('active')) {
                            that.removeSelectedItem();
                        } else {
                            if (that.option.isChooseTitle) {
                                that.selectedList.find('li').each(function (index, value) {
                                    if (that.subsetTitle.find('li').eq(0).attr('data-id') == $(value).attr('data-id')) {
                                        that.subsetTitle.find('li').eq(0).children().removeClass('active');
                                        $(value).remove();
                                    }
                                })
                                if (that.currentId == that.subsetTitle.find('li').eq(0).attr('data-id')) {
                                    that.subsetList.find('.active').each(function (index, value) {
                                        that.selectedList.find('[data-id=' + $(value).parent().attr('data-id') + ']').remove();
                                        $(value).removeClass('active');
                                    })
                                }
                            }
                            if (that.option.mostSelectCount) {
                                if (that.selectedList.find('li').length >= that.option.mostSelectCount) {
                                    alert('最多只能选择' + that.option.mostSelectCount + '个!');
                                    return;
                                }
                            }
                            that.addSelectedItem();
                            $(this).addClass('active');
                        }
                    }
                }
            })
        },
        //添加选中项
        addSelectedItem: function () {
            var li = $('<li></li>').attr('data-id', this.currentId);
            var span = $('<span></span>').html(this.currentTxt).addClass('active').append('<i>×</i>').appendTo(li);
            this.selectedList.append(li);
        },
        //移除选中项
        removeSelectedItem: function () {
            var that = this;
            this.content.find('.active').each(function (index, value) {
                if (that.currentId == $(value).parent().attr('data-id')) {
                    $(value).removeClass('active');
                }
            })
            this.selectedList.find('li').each(function (index, value) {
                if (that.currentId == $(value).attr('data-id')) {
                    $(value).remove();
                }
            })
        },
        //存储值
        setValue: function () {
            this.option.trigger.val(this.option.text);
            this.option.hidden.val(this.option.values);
            this.option.trigger.blur();                      //失去焦点
            this.option.callback && this.option.callback.call(this.option.trigger);
        },
        //获取值
        getValue: function () {
            this.option.text = this.option.trigger.val();
            this.option.values = this.option.hidden.val();
            if (this.option.values != '' && this.option.values != 0) {
                this.idArr = this.option.values.split(",");
                this.txtArr = this.option.text.split("+");
            } else {
                this.idArr = [];
                this.txtArr = [];
            }
        },
        cityPick: function (options) {

            return this.init($.extend({
                data: topucdialogdata.topucDataCity, //数据
                height: 'auto', //高度
                width: 640, //宽度
                title: '选择期望工作的城市', //标题
                selectedTitle: '已选择城市', //选中标题
                showConfig: { dataListItemWidth: 80, subItemWidth: 60 },
                type: 'single'
            }, options));

        },
        areaPick: function (options) {
            return this.init($.extend({
                data: topucdialogdata.topucDataCityTable, //数据
                height: 'auto', //高度
                width: 680, //宽度
                showMode: 'table',
                tableClass: 'area',
                title: '选择期望工作的城市', //标题
                selectedTitle: '已选择城市', //选中标题
                showConfig: { dataListItemWidth: 60 },
                type: 'multi'
            }, options));
        },
        industryPick: function (options) {

            return this.init($.extend({
                data: topucdialogdata.topucDataIndustry, //数据
                height: 'auto', //高度
                width: 715, //宽度
                showMode: 'table',
                title: '选择行业分类', //标题
                selectedTitle: '已选择行业', //选中标题
                showConfig: { dataListItemWidth: 225 },
                type: 'multi'
            }, options))

        },
        majorPick: function (options) {

            return this.init($.extend({
                data: topucdialogdata.topucDataMajor, //数据
                height: 'auto', //高度
                width: 700, //宽度
                title: '选择专业', //标题
                selectedTitle: '已选择专业', //选中标题
                showConfig: { subItemWidth: 135 },
                isChooseTitle: true,
                type: 'single'
            }, options))

        },
        functionsPick: function (options) {

            return this.init($.extend({
                data: topucdialogdata.topucDataFunctions, //数据
                height: 'auto', //高度
                width: 730, //宽度
                title: '选择职能', //标题
                selectedTitle: '已选择职能', //选中标题
                type: 'single'
            }, options))

        },
        skillPick: function (options) {

            return this.init($.extend({
                data: topucdialogdata.topucDataComputerSkill, //数据
                height: 'auto', //高度
                width: 740, //宽度
                showMode: 'table',
                title: '选择IT技能', //标题
                selectedTitle: '已选择IT技能', //选中标题
                type: 'single'
            }, options))

        }
    }

    window.Pick = Pick;

})(window, $);

