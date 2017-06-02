define('module/layer/plugin/pick/1.0.3/layer-pick', function (require, exports, module) {

    var $ = require('$');
    var Layer = require('module/layer/1.0.4/layer');
    var topucdialogdata = require('module/layer/1.0.3/dialog-data');
    var slimscroll = require('jquery/slimscroll/jquery.slimscroll');
    var autoComplete = require('jquery/autocomplete/1.11.4/autoComplete')($);

    (function (window, $, undefined) {
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
                    width: that.option.width
                });

                this.content = $('<div class="zyb-Pick"></div>');
                this.getValue();
                this.content.html('');

                if (this.option.type == 'multi') {
                    that.createSelected();
                }

                this.contentWrap = $('<div class="contentWrap"></div>').appendTo(this.content);
                if (this.option.showMode) {
                    if (this.option.showMode == 'table') {
                        this.table = $('<table></table>').css({
                            borderCollapse: 'collapse',
                            borderSpacing: 0
                        }).appendTo($('<div class="show-mode-table ' + this.option.tableClass + '"></div>').appendTo(this.contentWrap));
                    } else if(this.option.showMode == 'list') {
                        this.contentWrap.css({
                            height: 288,
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: '#eaeaea'
                        })
                        if (that.option.isSearch) {
                            this.searchContainer = $('<div class="m-search"></div>').appendTo(this.contentWrap);
                            this.searchItem = $('<input type="text" id="dialog-search" class="dialog-search" placeholder="输入专业关键词快速选择">').appendTo(this.searchContainer);
                        }
                        this.leftListWrap = $('<div class="listWrap"></div>').appendTo(this.contentWrap);
                        this.leftList = $('<ul class="list"></ul>').appendTo(this.leftListWrap);
                        var majorDefault;
                        $(this.option.data).each(function (index, value) {
                            var li = $('<li></li>').attr('data-id', value.id);
                            if (index == 0) {
                                majorDefault = value;
                                li.addClass('active');
                            }
                            var a = $('<a href="javascript:;"></a>').html(value.name).data('item', value).appendTo(li);
                            that.selectedList.find('li').each(function (i, v) {
                                if ($(v).attr('data-id').substring(0, 2) == value.id) {
                                    li.addClass('hasChoose');
                                }
                            })
                            that.leftList.append(li);
                        })
                        if (majorDefault) {
                            this.option.data = majorDefault;
                        }
                    }
                }
               
                this.createItemList();
                this.layer.setContent(this.content);
                this.layer.show();
                this.bindEvent();
                if (this.option.showMode == 'table') {
                    this.contentWrap.children().slimscroll({
                        height: 'auto',
                        alwaysVisible: true,
                        railVisible: true   //是否 显示轨道
                    })
                }
            },
            //创建一级数据
            createItemList: function () {
                var that = this;
                $(this.option.data).each(function (index, value) {
                    that.box = $('<div class="dialog-data-container"></div>');
                    that.boxWrap = $('<div class="box-wrap"></div>').appendTo(that.box);
                    if (that.option.showMode != 'table') {
                        if (value.name != '') {
                            if (that.option.showMode == 'list') {
                                that.box.css({
                                    width: '654px',
                                    float: 'right',
                                    borderLeftWidth: 1,
                                    borderLeftStyle: 'solid',
                                    borderLeftColor: '#eaeaea'
                                })
                                that.boxTitle = $('<h3 class="dialog-subTitle"></h3>').append($('<p></p>').attr('data-id', value.id).append('<span>' + value.name + '</span>')).appendTo(that.boxWrap);
                                if (that.selectedList) {
                                    that.selectedList.find('li').each(function (i, v) {
                                        if (value.id == $(v).attr('data-id')) {
                                            that.boxTitle.find('[data-id=' + value.id + ']').children().addClass('active');
                                        }
                                    })
                                }
                            } else {
                                that.boxTitle = $('<h3 class="dialog-subTitle"></h3>').html(value.name).appendTo(that.boxWrap);
                            }
                        }
                    }
                    that.boxUL = $('<ul class="dialog-data-list clearfix"></ul>');
                    $(value.items).each(function (i, v) {
                        var num = 0;
                        var li = $('<li></li>').attr('data-id', v.id).width(that.option.showConfig.dataListItemWidth);
                        var span = $('<span></span>').html(v.name).data('items', v.items).appendTo(li);
                        if (that.selectedList) {
                            that.selectedList.find('li').each(function (index, value) {
                                if ($(value).attr('data-id') == v.id) {
                                    span.addClass('active');
                                } else if ($(value).attr('data-id').substring(0, 4) == v.id) {
                                    num++;
                                }
                            })
                        }
                        num > 0 ? span.addClass('hasListItem').append($('<label></label>').text(num)) : '';
                        that.boxUL.append(li);
                    })
                    that.boxUL.appendTo(that.boxWrap);
                    if (that.option.showMode == 'table') {
                        var tr = $('<tr class="item-row"></tr>');
                        var td1 = $('<td class="item-title"></td>').appendTo(tr);
                        var rowTitle = $('<h3></h3>').attr('data-id', value.id).html(value.name).appendTo(td1);
                        //var rowTitleSpan = $('<span></span>').html(value.name).appendTo(rowTitle);
                        var td2 = $('<td></td>').append(that.box);
                        tr.append(td2);
                        that.table.append(tr);
                    } else {
                        that.box.appendTo(that.contentWrap);
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
                this.unlimited = $('<button class="dialog-unlimited-btn">不限</button>').appendTo(selectedWrap).on('click', function () {
                    that.option.values = 0;
                    that.option.text = $(this).text();
                    that.setValue();
                });

                this.confirmBtn.on('click', function (e) {
                    that.idArr = [], that.txtArr = [];
                    that.selectedList.find('.active').each(function (index, value) {
                        that.idArr.push($(value).parent().attr('data-id'));
                        that.txtArr.push($(value).text().substring(0, $(value).text().length - 1));
                    })
                    that.option.values = that.idArr.join(',');
                    that.option.text = that.txtArr.join('+');

                    that.setValue();
                })

                this.emptyBtn.on('click', function () {
                    that.selectedList.empty();
                    that.boxUL.find('.active').removeClass('active');
                    if (that.option.showMode == 'list') {
                        that.leftList.find('.hasChoose').removeClass('hasChoose');
                        that.checkItemHasListItem();
                    }  
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
                    $('<p></p>').attr('data-id', this.currentId).append($('<span></span>').text(this.currentTxt)).appendTo(this.subsetTitle);
                } else {
                    this.subsetTitle.html(this.currentTxt);
                }

                $(this.option.data).each(function (index, value) {
                    var li = $('<li></li>').attr('data-id', value.id).width(that.option.showConfig.subItemWidth);
                    var span = $('<span></span>').data('items', value.items).html(value.name).appendTo(li);
                    if (that.selectedList) {
                        that.selectedList.find('li').each(function (i, v) {
                            if ($(v).attr('data-id') == that.currentId) {
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
                this.subsetItem.append(this.subsetList).appendTo(this.box);

                var w = 'auto';
                var n = 4;
                if (this.option.showMode == 'list') {
                    w = this.subsetItem.find('li').length > 2 ? 456 : 'auto';
                    n = 3;
                } else {
                    w = this.subsetItem.find('li').length > 4 ? 324 : 'auto';
                    n = 4;
                }
                var rowItemCount = this.subsetItem.find('li').length >= n ? n : this.subsetItem.find('li').length;
                //this.subsetList.width(this.subsetItem.find('li').eq(0).width() * rowItemCount);
                var t = this.currentEle.position().top;
                var left;
                if (this.currentEle.offset().left + this.subsetItem.width() > $(window).width()) {
                    left = this.currentEle.position().left - this.subsetItem.width() + 12;
                    this.subsetTitle.css('textAlign', 'right');
                } else {
                    left = this.currentEle.position().left - 16
                }
                this.subsetItem.css({
                    width: w,
                    position: 'absolute',
                    left: left,
                    top: t,
                    'z-index':1111
                })
                //if (this.subsetList.height() > (this.subsetItem.find('li').eq(0).height() + 10) * 4) {
                //    this.subsetList.slimscroll({
                //        alwaysVisible: true,
                //        railVisible: true   //是否 显示轨道
                //    });
                //}

                this.subsetItem.on("mouseleave", function (ev) {
                    $(this).remove();
                });
            },
            //绑定事件
            bindEvent: function () {
                var that = this;
                if(that.option.isSearch){
                    var autoCompleteItems = [{ "id": "010101", "label": "哲学" }, { "id": "010102", "label": "逻辑学" }, { "id": "010103K", "label": "宗教学" }, { "id": "010104T", "label": "伦理学" }, { "id": "020101", "label": "经济学" }, { "id": "020102", "label": "经济统计学" }, { "id": "020103T", "label": "国民经济管理" }, { "id": "020104T", "label": "资源与环境经济学" }, { "id": "020105T", "label": "商务经济学" }, { "id": "020106T", "label": "能源经济" }, { "id": "020201K", "label": "财政学" }, { "id": "020202", "label": "税收学" }, { "id": "020301K", "label": "金融学" }, { "id": "020302", "label": "金融工程" }, { "id": "020303", "label": "保险学" }, { "id": "020304", "label": "投资学" }, { "id": "020305T", "label": "金融数学" }, { "id": "020306T", "label": "信用管理" }, { "id": "020307T", "label": "经济与金融" }, { "id": "020401", "label": "国际经济与贸易" }, { "id": "020402", "label": "贸易经济" }, { "id": "030101K", "label": "法学" }, { "id": "030102T", "label": "知识产权" }, { "id": "030103T", "label": "监狱学" }, { "id": "030201", "label": "政治学与行政学" }, { "id": "030202", "label": "国际政治" }, { "id": "030203", "label": "外交学" }, { "id": "030204T", "label": "国际事务与国际关系" }, { "id": "030205T", "label": "政治学、经济学与哲学" }, { "id": "030301", "label": "社会学" }, { "id": "030302", "label": "社会工作" }, { "id": "030303T", "label": "人类学" }, { "id": "030304T", "label": "女性学" }, { "id": "030305T", "label": "家政学" }, { "id": "030401", "label": "民族学" }, { "id": "030501", "label": "科学社会主义" }, { "id": "030502", "label": "中国共产党历史" }, { "id": "030503", "label": "思想政治教育" }, { "id": "030601K", "label": "治安学" }, { "id": "030602K", "label": "侦查学" }, { "id": "030603K", "label": "边防管理" }, { "id": "030604TK", "label": "禁毒学" }, { "id": "030605TK", "label": "警犬技术" }, { "id": "030606TK", "label": "经济犯罪侦查" }, { "id": "030607TK", "label": "边防指挥" }, { "id": "030608TK", "label": "消防指挥" }, { "id": "030609TK", "label": "警卫学" }, { "id": "030610TK", "label": "公安情报学" }, { "id": "030611TK", "label": "犯罪学" }, { "id": "030612TK", "label": "公安管理学" }, { "id": "030613TK", "label": "涉外警务" }, { "id": "030614TK", "label": "国内安全保卫" }, { "id": "030615TK", "label": "警务指挥与战术" }, { "id": "040101", "label": "教育学" }, { "id": "040102", "label": "科学教育" }, { "id": "040103", "label": "人文教育" }, { "id": "040104", "label": "教育技术学" }, { "id": "040105", "label": "艺术教育" }, { "id": "040106", "label": "学前教育" }, { "id": "040107", "label": "小学教育" }, { "id": "040108", "label": "特殊教育" }, { "id": "040109T", "label": "华文教育" }, { "id": "040201", "label": "体育教育" }, { "id": "040202K", "label": "运动训练" }, { "id": "040203", "label": "社会体育指导与管理" }, { "id": "040204K", "label": "武术与民族传统体育" }, { "id": "040205", "label": "运动人体科学" }, { "id": "040206T", "label": "运动康复" }, { "id": "040207T", "label": "休闲体育" }, { "id": "050101", "label": "汉语言文学" }, { "id": "050102", "label": "汉语言" }, { "id": "050103", "label": "汉语国际教育" }, { "id": "050104", "label": "中国少数民族语言文学" }, { "id": "050105", "label": "古典文献学" }, { "id": "050106T", "label": "应用语言学" }, { "id": "050107T", "label": "秘书学" }, { "id": "050201", "label": "英语" }, { "id": "050202", "label": "俄语" }, { "id": "050203", "label": "德语" }, { "id": "050204", "label": "法语" }, { "id": "050205", "label": "西班牙语" }, { "id": "050206", "label": "阿拉伯语" }, { "id": "050207", "label": "日语" }, { "id": "050208", "label": "波斯语" }, { "id": "050209", "label": "朝鲜语" }, { "id": "050210", "label": "菲律宾语" }, { "id": "050211", "label": "梵语巴利语" }, { "id": "050212", "label": "印度尼西亚语" }, { "id": "050213", "label": "印地语" }, { "id": "050214", "label": "柬埔寨语" }, { "id": "050215", "label": "老挝语" }, { "id": "050216", "label": "缅甸语" }, { "id": "050217", "label": "马来语" }, { "id": "050218", "label": "蒙古语" }, { "id": "050219", "label": "僧伽罗语" }, { "id": "050220", "label": "泰语" }, { "id": "050221", "label": "乌尔都语" }, { "id": "050222", "label": "希伯来语" }, { "id": "050223", "label": "越南语" }, { "id": "050224", "label": "豪萨语" }, { "id": "050225", "label": "斯瓦希里语" }, { "id": "050226", "label": "阿尔巴尼亚语" }, { "id": "050227", "label": "保加利亚语" }, { "id": "050228", "label": "波兰语" }, { "id": "050229", "label": "捷克语" }, { "id": "050230", "label": "斯洛伐克语" }, { "id": "050231", "label": "罗马尼亚语" }, { "id": "050232", "label": "葡萄牙语" }, { "id": "050233", "label": "瑞典语" }, { "id": "050234", "label": "塞尔维亚语" }, { "id": "050235", "label": "土耳其语" }, { "id": "050236", "label": "希腊语" }, { "id": "050237", "label": "匈牙利语" }, { "id": "050238", "label": "意大利语" }, { "id": "050239", "label": "泰米尔语" }, { "id": "050240", "label": "普什图语" }, { "id": "050241", "label": "世界语" }, { "id": "050242", "label": "孟加拉语" }, { "id": "050243", "label": "尼泊尔语" }, { "id": "050244", "label": "克罗地亚语" }, { "id": "050245", "label": "荷兰语" }, { "id": "050246", "label": "芬兰语" }, { "id": "050247", "label": "乌克兰语" }, { "id": "050248", "label": "挪威语" }, { "id": "050249", "label": "丹麦语" }, { "id": "050250", "label": "冰岛语" }, { "id": "050251", "label": "爱尔兰语" }, { "id": "050252", "label": "拉脱维亚语" }, { "id": "050253", "label": "立陶宛语" }, { "id": "050254", "label": "斯洛文尼亚语" }, { "id": "050255", "label": "爱沙尼亚语" }, { "id": "050256", "label": "马耳他语" }, { "id": "050257", "label": "哈萨克语" }, { "id": "050258", "label": "乌兹别克语" }, { "id": "050259", "label": "祖鲁语" }, { "id": "050260", "label": "拉丁语" }, { "id": "050261", "label": "翻译" }, { "id": "050262", "label": "商务英语" }, { "id": "050301", "label": "新闻学" }, { "id": "050302", "label": "广播电视学" }, { "id": "050303", "label": "广告学" }, { "id": "050304", "label": "传播学" }, { "id": "050305", "label": "编辑出版学" }, { "id": "050306T", "label": "网络与新媒体" }, { "id": "050307T", "label": "数字出版" }, { "id": "060101", "label": "历史学" }, { "id": "060102", "label": "世界史" }, { "id": "060103", "label": "考古学" }, { "id": "060104", "label": "文物与博物馆学" }, { "id": "060105T", "label": "文物保护技术" }, { "id": "060106T", "label": "外国语言与外国历史" }, { "id": "070101", "label": "数学与应用数学" }, { "id": "070102", "label": "信息与计算科学" }, { "id": "070103T", "label": "数理基础科学" }, { "id": "070201", "label": "物理学" }, { "id": "070202", "label": "应用物理学" }, { "id": "070203", "label": "核物理" }, { "id": "070204T", "label": "声学" }, { "id": "070301", "label": "化学" }, { "id": "070302", "label": "应用化学" }, { "id": "070303T", "label": "化学生物学" }, { "id": "070304T", "label": "分子科学与工程" }, { "id": "070401", "label": "天文学" }, { "id": "070501", "label": "地理科学" }, { "id": "070502", "label": "自然地理与资源环境" }, { "id": "070503", "label": "人文地理与城乡规划" }, { "id": "070504", "label": "地理信息科学" }, { "id": "070601", "label": "大气科学" }, { "id": "070602", "label": "应用气象学" }, { "id": "070701", "label": "海洋科学" }, { "id": "070702", "label": "海洋技术" }, { "id": "070703T", "label": "海洋资源与环境" }, { "id": "070704T", "label": "军事海洋学" }, { "id": "070801", "label": "地球物理学" }, { "id": "070802", "label": "空间科学与技术" }, { "id": "070901", "label": "地质学" }, { "id": "070902", "label": "地球化学" }, { "id": "070903T", "label": "地球信息科学与技术" }, { "id": "070904T", "label": "古生物学" }, { "id": "071001", "label": "生物科学" }, { "id": "071002", "label": "生物技术" }, { "id": "071003", "label": "生物信息学" }, { "id": "071004", "label": "生态学" }, { "id": "071101", "label": "心理学" }, { "id": "071102", "label": "应用心理学" }, { "id": "071201", "label": "统计学" }, { "id": "071202", "label": "应用统计学" }, { "id": "080101", "label": "理论与应用力学" }, { "id": "080102", "label": "工程力学" }, { "id": "080201", "label": "机械工程" }, { "id": "080202", "label": "机械设计制造及其自动化" }, { "id": "080203", "label": "材料成型及控制工程" }, { "id": "080204", "label": "机械电子工程" }, { "id": "080205", "label": "工业设计" }, { "id": "080206", "label": "过程装备与控制工程" }, { "id": "080207", "label": "车辆工程" }, { "id": "080208", "label": "汽车服务工程" }, { "id": "080209T", "label": "机械工艺技术" }, { "id": "080210T", "label": "微机电系统工程" }, { "id": "080211T", "label": "机电技术教育" }, { "id": "080212T", "label": "汽车维修工程教育" }, { "id": "080301", "label": "测控技术与仪器" }, { "id": "080401", "label": "材料科学与工程" }, { "id": "080402", "label": "材料物理" }, { "id": "080403", "label": "材料化学" }, { "id": "080404", "label": "冶金工程" }, { "id": "080405", "label": "金属材料工程" }, { "id": "080406", "label": "无机非金属材料工程" }, { "id": "080407", "label": "高分子材料与工程" }, { "id": "080408", "label": "复合材料与工程" }, { "id": "080409T", "label": "粉体材料科学与工程" }, { "id": "080410T", "label": "宝石及材料工艺学" }, { "id": "080411T", "label": "焊接技术与工程" }, { "id": "080412T", "label": "功能材料" }, { "id": "080413T", "label": "纳米材料与技术" }, { "id": "080414T", "label": "新能源材料与器件" }, { "id": "080501", "label": "能源与动力工程" }, { "id": "080502T", "label": "能源与环境系统工程" }, { "id": "080503T", "label": "新能源科学与工程" }, { "id": "080601", "label": "电气工程及其自动化" }, { "id": "080602T", "label": "智能电网信息工程" }, { "id": "080603T", "label": "光源与照明" }, { "id": "080604T", "label": "电气工程与智能控制" }, { "id": "080701", "label": "电子信息工程" }, { "id": "080702", "label": "电子科学与技术" }, { "id": "080703", "label": "通信工程" }, { "id": "080704", "label": "微电子科学与工程" }, { "id": "080705", "label": "光电信息科学与工程" }, { "id": "080706", "label": "信息工程" }, { "id": "080707T", "label": "广播电视工程" }, { "id": "080708T", "label": "水声工程" }, { "id": "080709T", "label": "电子封装技术" }, { "id": "080710T", "label": "集成电路设计与集成系统" }, { "id": "080711T", "label": "医学信息工程" }, { "id": "080712T", "label": "电磁场与无线技术" }, { "id": "080713T", "label": "电波传播与天线" }, { "id": "080714T", "label": "电子信息科学与技术" }, { "id": "080715T", "label": "电信工程及管理" }, { "id": "080716T", "label": "应用电子技术教育" }, { "id": "080801", "label": "自动化" }, { "id": "080802T", "label": "轨道交通信号与控制" }, { "id": "080901", "label": "计算机科学与技术" }, { "id": "080902", "label": "软件工程" }, { "id": "080903", "label": "网络工程" }, { "id": "080904K", "label": "信息安全" }, { "id": "080905", "label": "物联网工程" }, { "id": "080906", "label": "数字媒体技术" }, { "id": "080907T", "label": "智能科学与技术" }, { "id": "080908T", "label": "空间信息与数字技术" }, { "id": "080909T", "label": "电子与计算机工程" }, { "id": "081001", "label": "土木工程" }, { "id": "081002", "label": "建筑环境与能源应用工程" }, { "id": "081003", "label": "给排水科学与工程" }, { "id": "081004", "label": "建筑电气与智能化" }, { "id": "081005T", "label": "城市地下空间工程" }, { "id": "081006T", "label": "道路桥梁与渡河工程" }, { "id": "081101", "label": "水利水电工程" }, { "id": "081102", "label": "水文与水资源工程" }, { "id": "081103", "label": "港口航道与海岸工程" }, { "id": "081104T", "label": "水务工程" }, { "id": "081201", "label": "测绘工程" }, { "id": "081202", "label": "遥感科学与技术" }, { "id": "081203T", "label": "导航工程" }, { "id": "081204T", "label": "地理国情监测" }, { "id": "081301", "label": "化学工程与工艺" }, { "id": "081302", "label": "制药工程" }, { "id": "081303T", "label": "资源循环科学与工程" }, { "id": "081304T", "label": "能源化学工程" }, { "id": "081305T", "label": "化学工程与工业生物工程" }, { "id": "081401", "label": "地质工程" }, { "id": "081402", "label": "勘查技术与工程" }, { "id": "081403", "label": "资源勘查工程" }, { "id": "081404T", "label": "地下水科学与工程" }, { "id": "081501", "label": "采矿工程" }, { "id": "081502", "label": "石油工程" }, { "id": "081503", "label": "矿物加工工程" }, { "id": "081504", "label": "油气储运工程" }, { "id": "081505T", "label": "矿物资源工程" }, { "id": "081506T", "label": "海洋油气工程" }, { "id": "081601", "label": "纺织工程" }, { "id": "081602", "label": "服装设计与工程" }, { "id": "081603T", "label": "非织造材料与工程" }, { "id": "081604T", "label": "服装设计与工艺教育" }, { "id": "081701", "label": "轻化工程" }, { "id": "081702", "label": "包装工程" }, { "id": "081703", "label": "印刷工程" }, { "id": "081801", "label": "交通运输" }, { "id": "081802", "label": "交通工程" }, { "id": "081803K", "label": "航海技术" }, { "id": "081804K", "label": "轮机工程" }, { "id": "081805K", "label": "飞行技术" }, { "id": "081806T", "label": "交通设备与控制工程" }, { "id": "081807T", "label": "救助与打捞工程" }, { "id": "081808TK", "label": "船舶电子电气工程" }, { "id": "081901", "label": "船舶与海洋工程" }, { "id": "081902T", "label": "海洋工程与技术" }, { "id": "081903T", "label": "海洋资源开发技术" }, { "id": "082001", "label": "航空航天工程" }, { "id": "082002", "label": "飞行器设计与工程" }, { "id": "082003", "label": "飞行器制造工程" }, { "id": "082004", "label": "飞行器动力工程" }, { "id": "082005", "label": "飞行器环境与生命保障工程" }, { "id": "082006T", "label": "飞行器质量与可靠性" }, { "id": "082007T", "label": "飞行器适航技术" }, { "id": "082101", "label": "武器系统与工程" }, { "id": "082102", "label": "武器发射工程" }, { "id": "082103", "label": "探测制导与控制技术" }, { "id": "082104", "label": "弹药工程与爆炸技术" }, { "id": "082105", "label": "特种能源技术与工程" }, { "id": "082106", "label": "装甲车辆工程" }, { "id": "082107", "label": "信息对抗技术" }, { "id": "082201", "label": "核工程与核技术" }, { "id": "082202", "label": "辐射防护与核安全" }, { "id": "082203", "label": "工程物理" }, { "id": "082204", "label": "核化工与核燃料工程" }, { "id": "082301", "label": "农业工程" }, { "id": "082302", "label": "农业机械化及其自动化" }, { "id": "082303", "label": "农业电气化" }, { "id": "082304", "label": "农业建筑环境与能源工程" }, { "id": "082305", "label": "农业水利工程" }, { "id": "082401", "label": "森林工程" }, { "id": "082402", "label": "木材科学与工程" }, { "id": "082403", "label": "林产化工" }, { "id": "082501", "label": "环境科学与工程" }, { "id": "082502", "label": "环境工程" }, { "id": "082503", "label": "环境科学" }, { "id": "082504", "label": "环境生态工程" }, { "id": "082505T", "label": "环保设备工程" }, { "id": "082506T", "label": "资源环境科学" }, { "id": "082507T", "label": "水质科学与技术" }, { "id": "082601", "label": "生物医学工程" }, { "id": "082602T", "label": "假肢矫形工程" }, { "id": "082701", "label": "食品科学与工程" }, { "id": "082702", "label": "食品质量与安全" }, { "id": "082703", "label": "粮食工程" }, { "id": "082704", "label": "乳品工程" }, { "id": "082705", "label": "酿酒工程" }, { "id": "082706T", "label": "葡萄与葡萄酒工程" }, { "id": "082707T", "label": "食品营养与检验教育" }, { "id": "082708T", "label": "烹饪与营养教育" }, { "id": "082801", "label": "建筑学" }, { "id": "082802", "label": "城乡规划" }, { "id": "082803", "label": "风景园林" }, { "id": "082804T", "label": "历史建筑保护工程" }, { "id": "082901", "label": "安全工程" }, { "id": "083001", "label": "生物工程" }, { "id": "083002T", "label": "生物制药" }, { "id": "083101K", "label": "刑事科学技术" }, { "id": "083102K", "label": "消防工程" }, { "id": "083103TK", "label": "交通管理工程" }, { "id": "083104TK", "label": "安全防范工程" }, { "id": "083105TK", "label": "公安视听技术" }, { "id": "083106TK", "label": "抢险救援指挥与技术" }, { "id": "083107TK", "label": "火灾勘查" }, { "id": "083108TK", "label": "网络安全与执法" }, { "id": "083109TK", "label": "核生化消防" }, { "id": "090101", "label": "农学" }, { "id": "090102", "label": "园艺" }, { "id": "090103", "label": "植物保护" }, { "id": "090104", "label": "植物科学与技术" }, { "id": "090105", "label": "种子科学与工程" }, { "id": "090106", "label": "设施农业科学与工程" }, { "id": "090107T", "label": "茶学" }, { "id": "090108T", "label": "烟草" }, { "id": "090109T", "label": "应用生物科学" }, { "id": "090110T", "label": "农艺教育" }, { "id": "090111T", "label": "园艺教育" }, { "id": "090201", "label": "农业资源与环境" }, { "id": "090202", "label": "野生动物与自然保护区管理" }, { "id": "090203", "label": "水土保持与荒漠化防治" }, { "id": "090301", "label": "动物科学" }, { "id": "090302T", "label": "蚕学" }, { "id": "090303T", "label": "蜂学" }, { "id": "090401", "label": "动物医学" }, { "id": "090402", "label": "动物药学" }, { "id": "090403T", "label": "动植物检疫" }, { "id": "090501", "label": "林学" }, { "id": "090502", "label": "园林" }, { "id": "090503", "label": "森林保护" }, { "id": "090601", "label": "水产养殖学" }, { "id": "090602", "label": "海洋渔业科学与技术" }, { "id": "090603T", "label": "水族科学与技术" }, { "id": "090701", "label": "草业科学" }, { "id": "100101K", "label": "基础医学" }, { "id": "100201K", "label": "临床医学" }, { "id": "100202TK", "label": "麻醉学" }, { "id": "100203TK", "label": "医学影像学" }, { "id": "100204TK", "label": "眼视光医学" }, { "id": "100205TK", "label": "精神医学" }, { "id": "100206TK", "label": "放射医学" }, { "id": "100301K", "label": "口腔医学" }, { "id": "100401K", "label": "预防医学" }, { "id": "100402", "label": "食品卫生与营养学" }, { "id": "100403TK", "label": "妇幼保健医学" }, { "id": "100404TK", "label": "卫生监督" }, { "id": "100405TK", "label": "全球健康学" }, { "id": "100501K", "label": "中医学" }, { "id": "100502K", "label": "针灸推拿学" }, { "id": "100503K", "label": "藏医学" }, { "id": "100504K", "label": "蒙医学" }, { "id": "100505K", "label": "维医学" }, { "id": "100506K", "label": "壮医学" }, { "id": "100507K", "label": "哈医学" }, { "id": "100601K", "label": "中西医临床医学" }, { "id": "100701", "label": "药学" }, { "id": "100702", "label": "药物制剂" }, { "id": "100703TK", "label": "临床药学" }, { "id": "100704T", "label": "药事管理" }, { "id": "100705T", "label": "药物分析" }, { "id": "100706T", "label": "药物化学" }, { "id": "100707T", "label": "海洋药学" }, { "id": "100801", "label": "中药学前教育" }, { "id": "100802", "label": "中药资源与开发" }, { "id": "100803T", "label": "藏药学" }, { "id": "100804T", "label": "蒙药学" }, { "id": "100805T", "label": "中药制药" }, { "id": "100806T", "label": "中草药栽培与鉴定" }, { "id": "100901K", "label": "法医学" }, { "id": "101001", "label": "医学检验技术" }, { "id": "101002", "label": "医学实验技术" }, { "id": "101003", "label": "医学影像技术" }, { "id": "101004", "label": "眼视光学" }, { "id": "101005", "label": "康复治疗学" }, { "id": "101006", "label": "口腔医学技术" }, { "id": "101007", "label": "卫生检验与检疫" }, { "id": "101008T", "label": "听力与言语康复学" }, { "id": "101101", "label": "护理学" }, { "id": "120101", "label": "管理科学社会主义" }, { "id": "120102", "label": "信息管理与信息系统" }, { "id": "120103", "label": "工程管理" }, { "id": "120104", "label": "房地产开发与管理" }, { "id": "120105", "label": "工程造价" }, { "id": "120106TK", "label": "保密管理" }, { "id": "120201K", "label": "工商管理" }, { "id": "120202", "label": "市场营销" }, { "id": "120203K", "label": "会计学" }, { "id": "120204", "label": "财务管理" }, { "id": "120205", "label": "国际商务" }, { "id": "120206", "label": "人力资源管理" }, { "id": "120207", "label": "审计学" }, { "id": "120208", "label": "资产评估" }, { "id": "120209", "label": "物业管理" }, { "id": "120210", "label": "文化产业管理" }, { "id": "120211T", "label": "劳动关系" }, { "id": "120212T", "label": "体育经济与管理" }, { "id": "120213T", "label": "财务会计教育" }, { "id": "120214T", "label": "市场营销教育" }, { "id": "120301", "label": "农林经济管理" }, { "id": "120302", "label": "农村区域发展" }, { "id": "120401", "label": "公共事业管理" }, { "id": "120402", "label": "行政管理" }, { "id": "120403", "label": "劳动与社会保障" }, { "id": "120404", "label": "土地资源管理" }, { "id": "120405", "label": "城市管理" }, { "id": "120406TK", "label": "海关管理" }, { "id": "120407T", "label": "交通管理" }, { "id": "120408T", "label": "海事管理" }, { "id": "120409T", "label": "公共关系学" }, { "id": "120501", "label": "图书馆学" }, { "id": "120502", "label": "档案学" }, { "id": "120503", "label": "信息资源管理" }, { "id": "120601", "label": "物流管理" }, { "id": "120602", "label": "物流工程" }, { "id": "120603T", "label": "采购管理" }, { "id": "120701", "label": "工业工程" }, { "id": "120702T", "label": "标准化工程" }, { "id": "120703T", "label": "质量管理工程" }, { "id": "120801", "label": "电子商务" }, { "id": "120802T", "label": "电子商务及法律" }, { "id": "120901K", "label": "旅游管理" }, { "id": "120902", "label": "酒店管理" }, { "id": "120903", "label": "会展经济与管理" }, { "id": "120904T", "label": "旅游管理与服务教育" }, { "id": "130101", "label": "艺术史论" }, { "id": "130201", "label": "音乐表演" }, { "id": "130202", "label": "音乐学" }, { "id": "130203", "label": "作曲与作曲技术理论" }, { "id": "130204", "label": "舞蹈表演" }, { "id": "130205", "label": "舞蹈学" }, { "id": "130206", "label": "舞蹈编导" }, { "id": "130301", "label": "表演" }, { "id": "130302", "label": "戏剧学" }, { "id": "130303", "label": "电影学" }, { "id": "130304", "label": "戏剧影视文学" }, { "id": "130305", "label": "广播电视编导" }, { "id": "130306", "label": "戏剧影视导演" }, { "id": "130307", "label": "戏剧影视美术设计" }, { "id": "130308", "label": "录音艺术" }, { "id": "130309", "label": "播音与主持艺术" }, { "id": "130310", "label": "动画" }, { "id": "130311T", "label": "影视摄影与制作" }, { "id": "130401", "label": "美术学" }, { "id": "130402", "label": "绘画" }, { "id": "130403", "label": "雕塑" }, { "id": "130404", "label": "摄影" }, { "id": "130405T", "label": "书法学" }, { "id": "130406T", "label": "中国画" }, { "id": "130501", "label": "艺术设计学" }, { "id": "130502", "label": "视觉传达设计" }, { "id": "130503", "label": "环境设计" }, { "id": "130504", "label": "产品设计" }, { "id": "130505", "label": "服装与服饰设计" }, { "id": "130506", "label": "公共艺术" }, { "id": "130507", "label": "工艺美术" }, { "id": "130508", "label": "数字媒体艺术" }, { "id": "130509T", "label": "艺术与科技" }];
                    var autoC = $("#dialog-search").autocomplete({
                        source: autoCompleteItems,
                        select: function (event, ui) {
                            //判断是否有重复问题
                            var isall = true;//默认没有重复
                            that.selectedList.find('li').each(function (i, v) {
                                if ($(v).data('id') == ui.item.id) {
                                    isall = false;
                                }
                            });
                            if(isall){
                                that.addSearchItem(ui.item.label, ui.item.id);
                                that.leftList.find('li').each(function (i, v) {
                                if (ui.item.id.substring(0, 2) == $(v).attr('data-id')) {
                                    $(v).addClass('hasChoose');
                                }
                            });
                            //消除warning的提示信息
                            that.warningC.removeClass('m-warningactive');
                            }
                            
                        },
                        open: function () {
                            $('.ui-widget-content').css({ 'line-height': '28px', 'z-index': '11', 'background-color': '#fff', 'font-size': '14px', 'font-family': 'microsoft yahei', 'max-height': '280px', 'overflow-y': 'auto', 'overflow-x': 'hidden','border':'1px solid #ededed' });
                        },
                        focus: function (event, ui) {
                            $('#dialog-search').val(ui.item.label);
                        }  
                    });
                    that.warningC = $('<div class="m-waringC">无匹配专业</div>').appendTo('.m-search');
                    $("#dialog-search").on("autocompleteresponse", function (event, ui) {
                        if (!ui.content.length) {
                            that.warningC.addClass('m-warningactive');
                        }
                    });
                    $('#dialog-search').blur(function () {
                        that.warningC.removeClass('m-warningactive');
                    });
                }
               
                this.content.on('click', 'span', function (e) {
                    //e.stopPropagation();
                    that.currentEle = $(this);
                    that.currentTxt = $(this).clone()    //克隆元素
                                        .children() //选择所有的子元素
                                        .remove()   //删除所有的子元素
                                        .end()  //再返回到选定的元素
                                        .text();    //获取文本的元素;
                    that.currentId = $(this).parent().attr('data-id');
                    if ($(this).data('items') && $(this).data('items') != '' && that.option.showMode != 'table') {
                        that.option.data = $(this).data('items');
                        that.createSubsetItem();
                    } else {
                        if (that.option.type == 'single') {
                            that.option.values = that.currentId;
                            that.option.text = that.currentTxt;
                            that.setValue();
                        } else if (that.option.type == 'multi') {
                            if ($(this).hasClass('active')) {
                                that.removeSelectedItem();
                            } else {
                                if (that.option.isChooseTitle) {
                                    if (that.currentId == that.boxTitle.find('p').eq(0).attr('data-id')) {
                                        that.selectedList.find('.active').each(function (index, value) {
                                            if (that.currentId == $(value).parent().attr('data-id').substring(0, 2)) {
                                                $(value).parent().remove();
                                            }
                                        })
                                        that.boxUL.find('.active').removeClass('active');
                                        that.checkItemHasListItem();
                                    }
                                    if (that.subsetTitle && that.currentId == that.subsetTitle.find('p').eq(0).attr('data-id')) {
                                        that.subsetList.find('.active').each(function (index, value) {
                                            if (that.currentId == $(value).parent().attr('data-id').substring(0, 4)) {
                                                that.selectedList.find('[data-id=' + $(value).parent().attr('data-id') + ']').remove();
                                                $(value).removeClass('active');
                                            }
                                        })
                                        that.checkItemHasListItem();
                                    }
                                    var title;
                                    that.selectedList.find('li').each(function (index, value) {
                                        if (that.boxTitle.find('p').eq(0).attr('data-id') == $(value).attr('data-id')) {
                                            title = that.boxTitle;
                                        } else if (that.subsetTitle && that.subsetTitle.find('p').eq(0).attr('data-id') == $(value).attr('data-id')) {
                                            title = that.subsetTitle;
                                        }
                                        if (title) {
                                            title.find('p').eq(0).children().removeClass('active');
                                            $(value).remove();
                                        }
                                    })
                                }
                                if (that.option.mostSelectCount) {
                                    if (that.selectedList.find('li').length >= that.option.mostSelectCount) {
                                        alert('最多只能选择' + that.option.mostSelectCount + '个!');
                                        return;
                                    }
                                }
                                that.addSelectedItem();
                                $(this).addClass('active');
                                if (that.option.showMode == 'list') {
                                    that.boxUL.find('span').each(function (i, v) {
                                        if (that.currentId.substring(0, 4) == $(v).parent().attr('data-id')) {
                                            if (that.subsetTitle && that.currentId == that.subsetTitle.find('p').eq(0).attr('data-id')) {
                                                $(v).addClass('active');
                                                return;
                                            }
                                            if ($(v).has('label').length == 0) {
                                                $(v).removeClass('active');
                                                $(v).addClass('hasListItem').append($('<label></label>').text(1));
                                            } else {
                                                $(v).children('label').text(parseInt($(v).children('label').text()) + 1);
                                            }
                                        }
                                    })
                                    that.leftList.find('li').each(function (i, v) {
                                        if (that.currentId.substring(0, 2) == $(v).attr('data-id')) {
                                            $(v).addClass('hasChoose');
                                        }
                                    })
                                }
                                if (that.option.isCity == true) {
                                    that.boxUL.find('span').each(function (i, v) {
                                        if (that.currentId.substring(0, 4) == $(v).parent().attr('data-id')) {
                                            if (that.subsetTitle && that.currentId == that.subsetTitle.find('p').eq(0).attr('data-id')) {
                                                $(v).addClass('active');
                                                return;
                                            }
                                            if ($(v).has('label').length == 0) {
                                                $(v).removeClass('active');
                                                $(v).addClass('hasListItem').append($('<label></label>').text(1));
                                            } else {
                                                $(v).children('label').text(parseInt($(v).children('label').text()) + 1);
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    }
                })

                if (this.option.showMode == 'list') {

                    this.leftList.slimscroll({
                        height: 'auto',
                        alwaysVisible: true,
                        railVisible: true   //是否 显示轨道
                    })
                    this.leftListWrap.on('click', 'a', function () {
                        $(this).parent().addClass('active').siblings().removeClass('active');
                        if ($(this).data('item') && $(this).data('item') != '') {
                            that.option.data = $(this).data('item');
                            that.box.remove();
                            that.createItemList();
                            that.boxUL.slimscroll({
                                height: '208'
                            })
                        }
                    })
                }
            },
            //添加自动匹配选中项
            addSearchItem: function (label, value) {
                var numcount =$('.dialog-selected-list').children().length;
                if (numcount<8) {
                    var li = $('<li></li>').attr('data-id', value);
                    var span = $('<span></span>').html(label).addClass('active').append('<i>×</i>').appendTo(li);
                    this.selectedList.append(li);
                    $('#dialog-search').val('');
                } else {
                    alert("最多只能选择8个！");
                }
            },
            //添加选中项
            addSelectedItem: function () {
                var that = this;
                var li = $('<li></li>').attr('data-id', this.currentId);
                var span = $('<span></span>').html(this.currentTxt).addClass('active').append('<i>×</i>').appendTo(li);
                this.selectedList.append(li);
                if (that.option.isCity == true) {
                    $('.dialog-data-list').find('li').each(function (m, n) {
                        if (that.currentId == $(n).attr('data-id')) {
                            $(n).find('span').addClass('active');
                        }
                    });
                }     
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
                this.checkItemHasListItem();
            },
            checkItemHasListItem: function () {
                var that = this;
                this.boxUL.find('.hasListItem').each(function (i, v) {
                    var listItemNum = 0;
                    that.selectedList.find('li').each(function (index, value) {
                        if ($(v).parent().attr('data-id') == $(value).attr('data-id').substring(0, 4)) {
                            listItemNum++;
                        }
                    })
                    if (listItemNum == 0) {
                        $(v).removeClass('hasListItem').children('label').remove();
                    } else {
                        $(v).children('label').text(listItemNum);
                    }
                })
                if (that.leftList) {
                    that.leftList.find('li').each(function (i, v) {
                        var chooseItemNum = 0;
                        that.selectedList.find('li').each(function (index, value) {
                            if ($(v).attr('data-id') == $(value).attr('data-id').substring(0, 2)) {
                                chooseItemNum++;
                            }
                        })
                        if (chooseItemNum == 0) {
                            $(v).removeClass('hasChoose');
                        }
                    })
                }
            },
            //存储值
            setValue: function () {
                this.option.trigger.val(this.option.text);
                this.option.hidden.val(this.option.values);
                this.option.trigger.blur();                      //失去焦点
                this.option.callback && this.option.callback.call(this.option.trigger);
                this.layer.remove();
                //销毁
                delete this.selectedList;
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
                    width: 650, //宽度
                    title: '选择期望工作的城市', //标题
                    selectedTitle: '已选择城市', //选中标题
                    showConfig: { dataListItemWidth: 70, subItemWidth: 60 },
                    isSearch: false,
                    type: 'single'
                }, options));

            },
            areaPick: function (options) {
                return this.init($.extend({
                    data: topucdialogdata.topucDataCityTable, //数据
                    height: 'auto', //高度
                    width: 645, //宽度
                    showMode: 'table',
                    tableClass: 'area',
                    title: '选择期望工作的城市', //标题
                    selectedTitle: '已选择城市', //选中标题
                    isSearch: false,
                    showConfig: { dataListItemWidth: 60 },
                    type: 'multi'
                }, options));
            },
            industryPick: function (options) {

                return this.init($.extend({
                    data: topucdialogdata.topucDataIndustry, //数据
                    height: 'auto', //高度
                    width: 720, //宽度
                    showMode: 'table',
                    title: '选择行业分类', //标题
                    selectedTitle: '已选择行业', //选中标题
                    isSearch: false,
                    showConfig: { dataListItemWidth: 225 },
                    type: 'single'
                }, options))

            },
            majorPick: function (options) {

                return this.init($.extend({
                    data: topucdialogdata.topucDataMajor, //数据
                    height: 'auto', //高度
                    width: 800, //宽度
                    title: '选择专业', //标题
                    selectedTitle: '已选择专业', //选中标题
                    showConfig: { dataListItemWidth: 155, subItemWidth: 145 },
                    isChooseTitle: true,
                    isSearch : true,
                    type: 'single'
                }, options))

            },
            functionsPick: function (options) {

                return this.init($.extend({
                    data: topucdialogdata.topucDataFunctions, //数据
                    height: 'auto', //高度
                    width: 700, //宽度
                    title: '选择职能', //标题
                    selectedTitle: '已选择职能', //选中标题
                    isSearch: false,
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
                    isSearch: false,
                    type: 'single'
                }, options))

            },
            schoolLvl: function (options) {

                return this.init($.extend({
                    data: topucdialogdata.topucDataSchLvl, //数据
                    height: 'auto', //高度
                    width: 600, //宽度
                    title: '选择学校级别', //标题
                    selectedTitle: '已选择学校级别', //选中标题
                    isSearch: false,
                    type: 'multi',
                    showConfig: { dataListItemWidth: 120 }
                }, options))

            }
        }

        window.Pick = Pick;

    })(window, $);

    module.exports = window.Pick;

});