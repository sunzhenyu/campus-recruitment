define('corp/schoolLayer/1.0.1/schoollayer', ['$', 'corp/schoolLayer/1.0.0/schoolfilterdata', 'corp/formUI/1.0.0/formui'], function (require, exports, module) {
    var $ = require("$");

    var filterdata = require('corp/schoolLayer/1.0.0/schoolfilterdata');

    Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    function schoolLayer(options) {

        var defaults = {
            MaxCheckedNum: 15,
            $this: null,
            selectedList: [],
            hiddenIds:'',
            schoollist: null,
            filterCity: '0',
            filterLevel: '0',
            filterMajor: '0',
            schoolApiUrl: ''
        }
        this.opts = $.extend({}, defaults, options);

        this.$this = $this = typeof this.opts.$el == 'string' ? $(this.opts.$el) : this.opts.$el;

        var that = this;

        this.init();
    }

    schoolLayer.prototype = {
        init: function () {
            var that = this;
            //浮动层
            this.$Layer = $("<div id='FloatingLayer'></div>");
            //将已选中的放入selectedList数组
            if (this.$this.find('input[type=hidden]').attr('data-first')) {
                this.isFirst = true;
                this.$this.find('input[type=hidden]').removeAttr('data-first');
            } else {
                this.isFirst = false;
            }
            if (this.$this.find('input[type=hidden]').val()) {
                this.opts.selectedList = this.$this.find('input[type=hidden]').val().split(',');
            }
            //创建头部元素,包含下拉选项，地区，学校级别，专业
            this.$this.after(this.$Layer);
            this.createHead();
            this.createContent();
            this.createfoot();
        },
        createHead: function () {
            var that = this;
            this.$head = $("<div class='FloatingLayerHead clearfix'></div>");
            //this.OkBtn = $('<input type="button" name="ok" class="ui-btn ui-btn-primary" value="确定" />').appendTo(this.$head);

            //前面所选的多选数据，用来筛选学校
            var filterCityData,
                filterLevelData,
                filterMajorData;
            if (typeof this.opts.filterCityData === 'function') {
                filterCityData = this.opts.filterCityData.call(this);
                if (!filterCityData) {
                    filterCityData = filterdata.filterCity;
                }
            } else {
                filterCityData = filterdata.filterCity;
            }

            if (typeof this.opts.filterLevelData === 'function') {
                filterLevelData = this.opts.filterLevelData.call(this);
                if (!filterLevelData) {
                    filterLevelData = filterdata.filterLevel;
                }
            } else {
                filterLevelData = filterdata.filterLevel;
            }

            if (typeof this.opts.filterMajorData === 'function') {
                filterMajorData = this.opts.filterMajorData.call(this);
                if (!filterMajorData) {
                    filterMajorData = filterdata.filterMajor;
                }
            } else {
                filterMajorData = filterdata.filterMajor;
            }

            //创建学校地区下拉
            this.createFilter(filterCityData);
            //创建学校级别下拉
            this.createFilter(filterLevelData);
            //创建学校专业下拉
            this.createFilter(filterMajorData);

            //将头部元素添加到浮动层
            this.$Layer.append(this.$head);
        },
        updateFilter: function (obj) {
            var that = this;
            var ids = '';
            var isfor, currentSelect;
            if (!obj) {
                return false;
            }
            if (obj.id == 0) {
                isfor = obj.items.length == filterdata.filterCity.items.length;
                currentSelect = this.$head.find('.select').eq(0);
            }
            else if (obj.id == 1) {
                isfor = obj.items.length == filterdata.filterLevel.items.length;
                currentSelect = this.$head.find('.select').eq(1);
            }
            else if (obj.id == 2) {
                isfor = obj.items.length == filterdata.filterMajor.items.length;
                currentSelect = this.$head.find('.select').eq(2);
            }
            currentSelect.empty();
            currentSelect.append($("<input class='select-result fire' value='" + obj.name + "'/>"));
            var $input = $("<input type='hidden' value='' id='filter_" + obj.id + "'/>");
            var $UL = $("<ul><li data-id='0'>" + obj.name + "</li></ul>");

            $(obj.items).each(function (index, item) {
                var $LI = $("<li>" + item.name + "</li>").attr("data-id", item.id);
                $UL.append($LI);
                if (!isfor) {
                    ids += ',' + item.id;
                }
            })
            if (ids == '') {
                ids = '0';
            } else {
                ids = ids.substr(1)
            }
            $input.val(ids);
            $UL.find('li:first').attr('data-id', ids);
            currentSelect.append($input);
            currentSelect.append($UL);
            currentSelect.select();
            currentSelect.find("li").on("click", function () {
                that.$itemList.empty();                         //清空学校
                that.getSchoolList();
                setTimeout(function () {
                    $('.updateClass').find('em').text($('.itemContent .item').length);
                }, 100);
            })
        },
        createfoot: function () {
            var that = this, defaultNum = $('#schoolCount').text();
            this.$foot = $('<div class="FloatingLayerFoot"></div>');
            var footP = $('<p class="updateClass">全选  已选择<em>全部</em>所院校(系统将向您已选院校的学生用户推送该职位)</p>').appendTo(this.$foot);
            this.$checkAll = $('<input type="checkbox" id="checkAll" class="checkAll" >').click(function () {
                if ($(this).attr('checked')) {
                    that.$itemList.find('input').attr('checked', true);
                    $(that.opts.schoollist).each(function (index, item) {
                        var i = $.inArray(parseInt(item.id), that.opts.selectedList);
                        if (i == -1) {
                            that.opts.selectedList.push(parseInt(item.id));
                        }
                    })
                    that.assignHidden();
                    footP.find('em').text(that.opts.schoollist.length);
                } else {
                    that.$itemList.find('input').attr('checked', false);
                    that.$itemList.find('input').each(function (index, item) {
                        that.opts.selectedList.remove($(item).val());
                    })
                    that.assignHidden();
                    footP.find('em').text('0');
                }
            });

            this.$checkAll.attr('checked', this.isCheckAll);

            footP.prepend(this.$checkAll);
            this.$Layer.append(this.$foot);
        },
        //创建select容器
        createFilter: function (obj) {
            var that = this;
            var ids = '';
            var $select = $("<div class='select'></div>");
            $select.append($("<input class='select-result fire' value='" + obj.name + "'/>"));
            var $input = $("<input type='hidden' value='' id='filter_" + obj.id + "'/>");
            var $UL = $("<ul><li data-id='0'>" + obj.name + "</li></ul>");
            var isfor
            if (obj.id == 0) {
                isfor = obj.items.length == filterdata.filterCity.items.length;
            }
            else if (obj.id == 1) {
                isfor = obj.items.length == filterdata.filterLevel.items.length;
            }
            else if (obj.id == 2) {
                isfor = obj.items.length == filterdata.filterMajor.items.length;
            }
            $(obj.items).each(function (index, item) {
                var $LI = $("<li>" + item.name + "</li>").attr("data-id", item.id);
                $UL.append($LI);
                if (!isfor) {
                    ids += ',' + item.id;
                }
            })
            if (ids == '') {
                ids = '0';
            } else {
                ids = ids.substr(1)
            }
            $input.val(ids);
            $UL.find('li:first').attr('data-id', ids);
            $select.append($input);
            $select.append($UL);
            this.$head.append($select);
            //绑定下拉方法
            $select.select();
            $select.find("li").on("click", function () {
                that.$itemList.empty();                         //清空学校
                that.getSchoolList();
            })
        },
        getSchoolList: function () {
            var that = this;
            if ($('#filter_0')) {
                that.opts.filterCity = $('#filter_0').val();
                that.opts.filterLevel = $('#filter_1').val();
                that.opts.filterMajor = $('#filter_2').val();
            }
            var apiUrl = that.opts.schoolApiUrl + that.opts.filterCity + '/' + that.opts.filterLevel + '/' + that.opts.filterMajor;
            $.ajax({
                type: "get",
                url: apiUrl,
                dataType: 'jsonp',
                data: "",
                async: false,
                jsonpCallback: 'list',
                success: function (data) {
                    that.opts.schoollist = data;
                    that.createItem();
                },
                error: function (data) {
                    alert('出错了！')
                }
            });
        },
        //创建schoolContent
        createContent: function () {
            var $contentDIV = $("<div class='itemContentWrap'></div>");
            this.$itemList = $("<div class='itemContent clearfix'></div>");
            $contentDIV.append(this.$itemList);
            this.$Layer.append($contentDIV);
            this.getSchoolList();
        },
        updateContent: function () {
            var that = this;
            this.$itemList.empty();
            this.isFirst = true;
            this.opts.selectedList = [];
            this.getSchoolList();
            
        },
        //创建学校的Item
        createItem: function () {
            var that = this;
            var flag = false;
            this.isCheckAll = true;
            
            if (that.isFirst) {                             //第一次选默认全选中
                flag = true;
            }
            $(this.opts.schoollist).each(function (index, item) {
                //初始化学校时看是否有已经选择的
                if (that.isFirst) {                         //第一次选默认全选中
                    that.opts.selectedList.push(parseInt(item.id));
                } else {
                    $.each(that.opts.selectedList, function (index, value) {
                        if (item.id == value) {             //如果有,则为true,选中,跳出本次循环
                            flag = true;
                            return false;
                        } else {                            //如果没有,则为false,不选中
                            flag = false;
                        }
                    });
                }
                if (!flag) {                                //如果有一个为false,则不为全选
                    that.isCheckAll = false;
                }
                that.$item = $("<div class='item'></div>").appendTo(that.$itemList);
                that.createCheckBox(item, flag);
            });
            this.assignHidden();
            if (this.$checkAll) {
                this.$checkAll.attr('checked', this.isCheckAll);
            }
            this.isFirst = false;                           //第一次加载完成isFirst为false
            $('.updateClass').find('em').text(that.opts.selectedList.length);
        },
        createCheckBox: function (obj, IsCheck) {
            //IsCheck  表示是否选中
            var that = this;
            var $Label = $("<label>" + obj.name + "</label>");
            var EventNode = $Label;

            var CheckBox = $("<input type='checkbox' value='" + obj.id + "'/>").attr("data", obj.name);
            $Label.prepend(CheckBox);

            CheckBox.attr("checked", IsCheck);

            EventNode = CheckBox;

            this.$item.append($Label);

            EventNode.on("click", function (e) {
                e.stopPropagation();
                that.changeHiddens($(this));
            })
        },
        changeHiddens: function (obj) {
            var that = this;
            if (obj.attr('checked')) {
                this.isCheckAll = true;
                //值加ID
                this.$itemList.find('input').each(function (i, v) {
                    if (!$(v).attr('checked')) {
                        that.isCheckAll = false;
                        return false;
                    }
                })
                this.opts.selectedList.push(parseInt(obj.val()));
                $('.updateClass').find('em').text(this.opts.selectedList.length);
            } else {
                this.opts.selectedList.remove(obj.val());
                that.isCheckAll = false;
                $('.updateClass').find('em').text(this.opts.selectedList.length);
            }
            this.$checkAll.attr('checked', that.isCheckAll);
            this.assignHidden();
        },
        checkItem: function (obj) {
            //是否超过规定数量
            var isExceed = this.createCheckedItem(obj);
            if (!isExceed) {
                //撤销勾选，并提示
                this.$item.find("input").each(function () {
                    $(this).attr("checked", false);
                });
                alert("最多能选择" + this.opts.MaxCheckedNum + "项");
            }
        },
        createCheckedItem: function (obj) {
            var that = this;
            //统计已选中数量
            var checkedCount = this.$this.find("span").length;

            //查找选中容器中与之相符合的项
            var temp = this.$this.find("span[data-id='" + obj.id + "']");
            if (temp.length < 1) {                          //未选中
                if (this.opts.MaxCheckedNum > checkedCount) {    //未超过
                    $spanItem = $("<span>" + obj.name + "<a></a></span>").attr("data-id", obj.id);
                    this.$this.children().append($spanItem);        //将新建的span添加到容器中
                    this.assignHidden();
                    this.bindTrigger($spanItem);
                    return true;
                } else {
                    return false;
                }
            } else {                                        //选中了
                temp.remove();
                this.assignHidden();
                return true;
            }
        },
        //为存储SchoolIds的Hidden元素赋值
        assignHidden: function () {
            var that = this;
            //this.opts.selectedList = [];
            //this.$this.find("span").each(function () {
            //    that.opts.selectedList.push($(this).attr("data-id"));
            //});
            var vals = this.opts.selectedList ? this.opts.selectedList.join(',') : '';
            this.$this.find('input[type=hidden]').val(vals);
        },
        //给选择学校绑定删除事件
        bindTrigger: function (element) {
            var that = this;
            element.children("a").on("click", function (e) {
                e.stopPropagation();
                var id = element.attr("data-id");
                var related = that.$Layer.find("input[value='" + id + "']");
                related.each(function () {
                    $(this).attr("checked", false);
                });
                element.remove();
                that.assignHidden();
            })
        },
        destroy: function () {
            this.$Layer.remove();
        }
    }

    module.exports = schoolLayer;

})