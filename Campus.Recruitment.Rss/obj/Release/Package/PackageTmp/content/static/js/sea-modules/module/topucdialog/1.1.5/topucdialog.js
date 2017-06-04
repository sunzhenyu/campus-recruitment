define('module/topucdialog/1.1.5/topucdialog', ['$', 'module/jqueryui/1.10.4/jqueryui', './topucdialogdata', './topucdialog.css'], function (require, exports, module) {
    var $ = require('$');
    require("./topucdialog.css");
    require('module/topucdialog/1.1.5/storage');
    (require('module/jqueryui/1.10.4/jqueryui'))($);
    var topucdialogdata = require('./topucdialogdata');

    return function (jQuery) {
/**
 * topuc.Dialog Plugin
 * Copyright 2013, Rex Zhao
 * 依赖jquery-ui-1.10.4.custom.min.js 中的dialog模块
 * 用法 $('input').topucDialog(CitySingle());
 * 通each方法同时为多个input绑定各自的dialog，在寻找dialog内部的元素时，通过container.find()替代jQuery选择器来保证每个dialog功能独立。
 * 在click事件之前生成dialog的dom，并初始化选中状态。在click后，调用JQuery UI的dialog()来显示dialog。这样做是为了避免反复渲染dom，每生成一次下次打开还是原来那个dialog。提高性能。
 * 整合了topuc.Dialog.Config.js
 * 依赖 ./topucdialog.css
 */   

        (function ($) {
            //组件

            $.fn.topucDialog = topucDialog = function (options) {
                return this.each(function () {
                    //合并参数
                    var opts = $.extend({}, $.fn.topucDialog.defaults, options);
                    var $input = $(this);
                    $input.attr("readonly", "true");
                    opts.input = $input;
                    
                    //获取:hidden jQuery对象
                    if ($input.attr('class') && $input.attr('class').toLowerCase().indexOf('jq_watermark') != -1) {
                        opts.hidden = $input.parent().siblings('input[type=hidden]');
                    }
                    else {
                        opts.hidden = $input.siblings('input[type=hidden]');
                    }

                    $input.bind('selected', function (event, val, id) {
                        opts.onSelected.call(this, val, id);
                    });

                    //容器
                    var topucContainer = $("<div id='" + opts.topucDialogId + "' class='topucContainer'></div>").
                        css({
                            width: "100%",
                            height: "100%"
                        });

                    if(!opts.toolTipItemWidth){ 
                    	opts.toolTipItemWidth = "auto";
                    }
                        
                    //顶部
                    CreateTopucDialogTop(topucContainer, opts);
                    //初始化选中项
                    InitSelected(topucContainer, opts);

                    //  }
                    //中部
                    CreateTopucDialogMid(topucContainer, opts);

                    if (opts.topucDialogType != "Single") {//单选时，不添加底部
                        //底部
                        CreateTopucDialogBottom(topucContainer, opts);

                    }

                    opts.arrCityCookie = new Array();
                    opts.arrCityIdCookie = new Array();
                    $input.click(function () {
                        //ie6fix
                        if ($.browser.msie && (parseInt($.browser.version) <= 6)) {
                            var $iframe = $('<iframe><html><head><title></title></head><body></body></html></iframe>');
                            var windowX = $('body').width();
                            var windowY = $('body').height();
                            $(window).resize(function () {
                                windowX = $('body').width();
                                windowY = $('body').height();
                                $iframe.width(windowX).height(windowY);
                            });
                            $iframe.css({ border: 'none', position: 'absolute', top: 0, left: 0, backgroundColor: 'white', zIndex: 99 }).width(windowX).height(windowY);
                            $('body').append($iframe);
                        }
                        var selectedTips = $(".topucDialogTopSelectedTips");
                        if (opts.topucDialogType != "Single" && $(".topSelectedUl").length) {
                            $(".topSelectedUl").empty();
                            var oldSelected = $(this).val().split("+");
                            var odlSelectedVal = $(this).next().val().split(",");
                            if (odlSelectedVal[0] != "") {
                                if (selectedTips.length) {
                                    selectedTips.hide();
                                }
                                for (var i = 0; i < oldSelected.length; i++) {
                                    var oldSelectedLi = $('<li class="topucDialogItemLi" sel="Sel" liid=' + odlSelectedVal[i] + '><label><input type="checkbox" id="topucDialogCB' + odlSelectedVal[i] + 'itemitem" inputid="' + odlSelectedVal[i] + '" checked="checked">' + oldSelected[i] + '</label></li>').appendTo($(".topSelectedUl"));
                                    if (oldSelectedLi.find("input").length) {
                                        oldSelectedLi.find("input").click(function () {
                                            if (!$(this).attr("checked")) {
                                                $(this).parents("li").remove();
                                            }
                                        });
                                    }
                                }
                            } else {
                                if (selectedTips.length) {
                                    selectedTips.show();
                                }
                            }
                        }
                        // 弹出对话框
                        var overLays = createOverLays();
                        topucContainer.dialog({
                            closeText: '',
                            height: opts.topucDialogHeight,
                            resizable: false,
                            title: opts.topucDialogTile,
                            width: opts.topucDialogWidth,
                            //modal: true,
                            hide: { effect: "fade", duration: 300 },
                            appendTo: overLays,
                            close: function () {
                                //$(".topucDialogOverLays").removeClass("isVisible");
                                overLays.removeClass("isVisible");
                                if ($iframe) {
                                    $iframe.remove();
                                }

                                //获得焦点，去掉水印
                                $input.focus();
                                //释放资源
                                //topucContainer.empty();
                                //
                                $input.blur();
                            }
                        });
                        overLays.addClass("isVisible");
                        //return false;
                    });
                });
            };

            //必须写在$.fn.topucDialog下面
            $.fn.topucDialog.defaults = {
                input: null, //input:text 传递
                hidden: null, //input:hidden 传递
                TargetButtonId: 'btnSingle', //目标按钮
                TargetHiddenFieldId: 'hfSingle', //目标隐藏域
                topucDialogId: 'CityMulti',
                topucDialogType: 'Single', //Single,Multi
                topucDialogMode: { Mode: "Table", TitleWidth: "100px", ContentWidth: "" }, //Table
                topucDialogData: [], //数据
                topucDialogHeight: 300, //高度
                topucDialogWidth: 468, //宽度
                topucDialogTile: '所在城市(最多选择5项)', //标题
                SelectedLimit: 5, //最多选择几项
                SelectedTitle: '已选城市', //选中标题
                SelectedItemWidth: 88, //选中项的宽度
                ItemWidth: 88, //项宽度
                toolTipItemWidth: 60, //弹出层项宽度
                toolTipCountPerLine: 4, //弹出层项每页行数量
                toolTipWordMaxCount: 5, //弹出层项最大字数
                Config: { itemTitle: false, itemitem: false, toolTipTitle: false, toolTipitem: false }
            };

            //创建遮罩
            function createOverLays() {
                var overLays = $(".topucDialogOverLays");
                if (!overLays[0]) {
                    overLays = $("<div class='topucDialogOverLays'>").appendTo($("body"));
                }
                return overLays;
            }


            //按钮
            function CreateTopucDialogButton($Parent, $Container, opts) {
                var btnDiv = $("<div class ='topucDialogBtnDiv'></div>"), //层
                    btnClear = $("<a class ='dialog-reset'></a>"), //清空
                    btnSure = $("<a class ='dialog-done'>确定</a> "); //确定;
                // 有时候你可能需要用别的词语来代替‘清空’，比如‘不限’
                btnClear.html(opts.clearBtnText || '清空');
                if (opts.topucDialogType != "Single") {
                    btnClear.bind("click", function () {
                        ClearSelected($Container, opts);
                        //SaveSelected($Container, opts);
                        //$Container.dialog("close");
                    }); //清空事件
                } else {
                    btnClear.bind("click", function () {
                        ClearSelected($Container, opts);
                        //SaveSelected($Container, opts);
                        //$Container.dialog("close");
                    });

                }
                btnSure.bind("click", function () { SaveSelected($Container, opts); $Container.dialog("close"); }); //确定事件


                if (opts.topucDialogType != "Single") {
                    btnDiv.append(btnClear);
                    btnDiv.append(btnSure);
                } else if (opts.hasClearBtn) {
                    btnDiv.append(btnClear.html('不限'));
                }
                $Parent.append(btnDiv);
            }

            //标题
            function CreateItemTitle($Parent, $Container, opts, obj, Type, IsCheck) {
                var topucDialogTopTitle = $("<div class ='topucDialogItemTitle'></div>").appendTo($Parent),
                    topucDialogItemUl = $("<ul class='topucDialogItemUl'></ul>").appendTo(topucDialogTopTitle),
                    topucDialogItemLi = $("<li class='topucDialogItemLi' liFlag='topucDialogItemTitle'></li>").prependTo(topucDialogItemUl);
                if (opts.topucDialogId == 'IndustryMulti') {
                    topucDialogTopTitle.addClass('topucDialogIndustryItemTitle');
                }
                	CreateCheckBox(topucDialogItemLi, $Container, opts, obj, Type, IsCheck);
            }

            function CreateRecentSelected($Container , $Parent , opts , arrName , arrId){ 
            	var recentSelectedTitle = $("<p class='topucDialogRecentSelTitle'>我最近选择过的城市</p>"),
	            	recentSelectedList = $("<ul class='topucDialogRecentSelUl'>");
	            	//console.log(str);
	            	//console.log(str.length);
            	for (var i = 0, j = arrName.length; i < j; i++) {
            	    if (recentSelectedList.children().length == 5) {
            	        recentSelectedList.find("li:last").remove();
            	    }
            			$("<li class='topucDialogRecentSelLi' liid = "+ arrId[i] +"><label>" +arrName[i]+ "</label></li>").prependTo(recentSelectedList);
            		}
            	recentSelectedTitle.add(recentSelectedList).appendTo($Parent);
            	recentSelectedList.on("click","li",function (){ 
            		SaveRecentSelected($Container , opts , $(this).text() ,$(this).attr("liid"));
            	});
            	
            }

            function SaveRecentSelected($Container , opts , dataName , dataId ){ 
                var $input = opts.input, $hidden = opts.hidden;
                $input.val(dataName).
                attr('title', dataName); //增加title
                $hidden.val(dataId);
                $Container.dialog("close");
            }

            //顶部
            function CreateTopucDialogTop($Container, opts) {

                var topucDialogTop = $("<div class ='topucDialogTop'></div>");
                if(getCookie("RecentCityName")){ 
                	var arrCityCookie = getCookie("RecentCityName").split(","),
                		arrCityIdCookie = getCookie("RecentCityId").split(",")
                }else{ 
                	arrCityCookie = arrCityIdCookie = [];
                }

                if (opts.topucDialogId == 'IndustryMulti') {
                    topucDialogTop.addClass("topucDialogIndustryTop");
                }
                //标题
                if (opts.topucDialogType != "Single") {
                    var topucDialogTopTitle = $("<div class ='topucDialogItemTitle'></div>");
                    topucDialogTopTitle.html(opts.SelectedTitle);
                    topucDialogTop.append(topucDialogTopTitle);
                    //按钮
                    CreateTopucDialogButton(topucDialogTop, $Container, opts);
                    //清除浮动
                    Clear(topucDialogTop);
                    //选中项容器
                    var topucDialogTopSelected = $("<div class ='topucDialogTopSelected'></div>").appendTo(topucDialogTop);
                    //选中项容器中UL
                    var topucDialogItemUl = $("<ul class='topucDialogItemUl topSelectedUl'></ul>").appendTo(topucDialogTopSelected);
                    var topucDialogTopSelectedTips = $("<p class='topucDialogTopSelectedTips' >" + opts.selectedTips + "</p>").appendTo(topucDialogTopSelected);
                    //添加到父节点
                    $Container.append(topucDialogTop);
                } else {
                    //按钮
                    //CreateTopucDialogButton(topucDialogTop, $Container, opts);
                    if(opts.hasRecentCity && arrCityCookie.length>0){
                        CreateRecentSelected($Container, topucDialogTop, opts, arrCityCookie, arrCityIdCookie);
                        //添加到父节点
                        $Container.append(topucDialogTop);
                    }
                }
                
            }

            //中部
            function CreateTopucDialogMid($Container, opts) {
                var topucDialogMid = $("<div id='topucDialogMid' class ='topucDialogMid'></div>");
                if (opts.topucDialogId == 'IndustryMulti') {
                    topucDialogMid.addClass("topucDialogIndustry");
                }
                //第一层数据

                //循环遍历
                $(opts.topucDialogData).each(function (index, obj) {
                    //标题
                    var Count = 0;
                    if (opts.topucDialogMode && opts.topucDialogMode.Mode && opts.topucDialogMode.Mode == "Table") {
                        Count += 1;
                        var table = $("<table></table>").appendTo(topucDialogMid);
                        table.css({"border-collapse": "collapse", "border-spacing": 0 });
                        var tr = $("<tr></tr>").appendTo(table);
                        //.hover(function () { $(this)._addClass("topucDialogTRHover"); }, function () { $(this).removeClass("topucDialogTRHover"); });
                        if (Count % 2 == 0) {
                            tr.addClass("topucDialogTREven");
                        }
                        else {
                            tr.addClass("topucDialogTROdd");
                        }
                        var td1 = $("<td></td>").appendTo(tr).css({ "width": opts.topucDialogMode.TitleWidth }).attr("valign", "top");
                        CreateItemTitle(td1, $Container, opts, obj, "itemTitle", opts.Config.itemTitle)
                        var td2 = $("<td></td>").appendTo(tr);
                        if (opts.topucDialogMode.ContentWidth && opts.topucDialogMode.ContentWidth != "") {
                            td2.css({ "width": opts.topucDialogMode.ContentWidth })
                        }
                        if (opts.topucDialogId == 'IndustryMulti') {
                            td1.addClass('topucDialogIndustryTD');
                            td2.addClass('topucDialogIndustryTD')
                        }
                        CreateItem(td2, $Container, opts, obj.items, "itemitem", opts.Config.itemitem);
                    }
                    else {
                        var itemContainer = $("<div class='itemContainer'></div>").appendTo(topucDialogMid);
                        if (opts.topucDialogMode != "Major" && opts.topucDialogMode !="Functions") {
                            CreateItemTitle(itemContainer, $Container, opts, obj, "itemTitle", opts.Config.itemTitle )
                        }
                        CreateItem(itemContainer, $Container, opts, obj.items, "itemitem", opts.Config.itemitem);
                        Clear(itemContainer);
                    }
                });

                $Container.append(topucDialogMid);

                //初始化选中项,必须在topucDialogMid apppendto之后 
                if (opts.topucDialogType != "Single") {
                    var topucDialogTopSelectedUl = $Container.find(".topSelectedUl"); //选中项容器UL
                    topucDialogTopSelectedUl.find("li").each(function () {
                        topucDialogMid.find("li[liid=" + $(this).attr('liid') + "]").each(function () {
                            $(this).find("input").attr("checked", true);
                        });
                    });
                }

            }
            //底部
            function CreateTopucDialogBottom($this) {
                var topucDialogBottom = $("<div id='topucDialogBottom' class ='topucDialogBottom'></div>");
                //标题
                $this.append(topucDialogBottom);
            }

            //遍历Li
            function LoopLi($Li, $Container, IsCheck, opts, Type) {
                //如果是一个父亲节点
                var $DialogTopSelected = $Container.find('.topucDialogTopSelected'),
                    $DialogMid = $Container.find('.topucDialogMid'),
                    $DialogToolTip = $('#topucDialogToolTip');
                if ($Li.data("original") && $Li.data("original").items && $Li.data("original").items != "") {

                    var flag = IsCheck;

                    $($Li.data("original").items).each(function (index, obj) {
                        if ($DialogMid.find($Li)) {
                            //                            if (!flag) {
                            $DialogTopSelected.find("li[liid='" + obj.id + "']").remove();
                            //                            }
                            $DialogMid.find("li[liid='" + obj.id + "']").each(function () {
                                $(this).find("input").each(function () {
                                    $(this).attr("checked", (flag ? true : false));
                                    $(this).attr("disabled", (flag ? true : false));
                                });
                                LoopLi($(this), $Container, flag, opts, Type);
                            });
                        }
                        if ($DialogToolTip.find($Li)) {
                            //if (!flag) {
                            $DialogTopSelected.find("li[liid='" + obj.id + "']").remove();
                            //}
                            $DialogToolTip.find("li[liid='" + obj.id + "']").each(function () {
                                $(this).find("input").each(function () {
                                    $(this).attr("checked", (flag ? true : false));
                                    $(this).attr("disabled", (flag ? true : false));
                                });
                                LoopLi($(this), $Container, flag, opts, Type);
                            });
                        }
                    });
                }
            }
            //改变父亲Input的状态，从选中容器中移除父亲节点
            function LoopParent($Li, $Container) {
                var $DialogTopSelected = $Container.find('.topucDialogTopSelected'),
                    $DialogMid = $Container.find('.topucDialogMid'),
                    $DialogToolTip = $('#topucDialogToolTip');
                var original = $Li.data("original");
                if (original && original.pid != 0 && original.pid != "") {
                    if ($DialogMid.find($Li)) {
                        $DialogTopSelected.find("li[liid='" + original.pid + "']").remove();
                        $DialogMid.find("li[liid='" + original.pid + "']").each(function () {
                            $(this).find("input").each(function () {
                                $(this).attr("checked", false);
                                $(this).attr("disabled", false);
                            });
                            LoopParent($(this), $Container);
                        });
                    }
                    if ($DialogToolTip.find($Li)) {
                        $DialogTopSelected.find("li[liid='" + original.pid + "']").remove();
                        $DialogToolTip.find("li[liid='" + original.pid + "']").each(function () {
                            $(this).find("input").each(function () {
                                $(this).attr("checked", false);
                                $(this).attr("disabled", false);
                            });
                            LoopParent($(this), $Container);
                        });
                    }
                }
            }

            //返回孩子的个数
            function LoopCount($Li) {
                return 0;
            }

            function CheckItem($Li, $Container, $obj, opts, Type) {

                var $DialogToolTip = $("#topucDialogToolTip"),
                    $DialogTopSelected = $Container.find(".topucDialogTopSelected"),
                    $DialogTopSelectedUl = $Container.find(".topSelectedUl"),
                    $DialogTopSelectedTips = $Container.find(".topucDialogTopSelectedTips"),
                    $DialogMid = $Container.find('.topucDialogMid');
                //$DialogTopSelectedUl.html(1);
                //第一级不能选的情况
                if (Type == "itemTitle" && !opts.Config.itemTitle) {
                    return;
                }
                //如果是单选
                if (opts.topucDialogType == "Single") {
                    var SingleData = $Li.data("original");
                    var SingleStr = '{ "id": ' + SingleData.id + ', "items": null, "name": "' + SingleData.name + '", "pid": ' + SingleData.pid + '}';
                    var SingleSelId = SingleData.id;
                    var $input = opts.input, $hidden = opts.hidden;
                    var cookieName = "";
                    var cookieId = "";
                    $input.val(SingleData.name).
                    attr('title', SingleData.name). //增加title
                    data("original", $Li.data("original"));
                    if (opts.topucDialogId == 'CitySingle') {
                        if (opts.topucDialogId == 'CitySingle' && getCookie("RecentCityName")) {
                            cookieName = getCookie("RecentCityName") + "," + SingleData.name;
                            cookieId = getCookie("RecentCityId") + "," + SingleData.id;
                            opts.arrCityCookie.unshift({ "key": cookieName });
                            opts.arrCityIdCookie.unshift({ "key": cookieId });
                            setCookie("RecentCityName", opts.arrCityCookie, 100);
                            setCookie("RecentCityId", opts.arrCityIdCookie, 100);
                        } else if (!getCookie("RecentCityName")) {
                            opts.arrCityCookie.unshift({ "key": SingleData.name });
                            opts.arrCityIdCookie.unshift({ "key": SingleData.id });
                            setCookie("RecentCityName", opts.arrCityCookie, 100);
                            setCookie("RecentCityId", opts.arrCityIdCookie, 100);
                        }
                        opts.arrCityCookie.length = opts.arrCityIdCookie.length = 0;
                    }
                    $hidden.val(SingleSelId);
                    $DialogToolTip.remove();
                    $Container.dialog("close");
                }
                else {//如果是多选
                    LoopParent($Li, $Container); //是否需要考虑产生tooltip的情况


                    //查找选中容器中与之相符合的项
                    var temp = $DialogTopSelected.find("li[liid='" + $Li.attr("liid") + "']");
                    //如果选中容器中没有符合的，且不是选中容器的Input
                    if (temp.length < 1 && $Li.attr("Sel") != "Sel") {
                        //数量统计
                        var Count = $DialogTopSelectedUl.find("li").length - LoopCount($Li);
                        //判断是否超过规定数量
                        if (opts.SelectedLimit > Count) {//未超过
                            //产生
                            var topucDialogItemLi = $("<li class='topucDialogItemLi' Sel='Sel'></li>").appendTo($DialogTopSelectedUl);
                            $DialogTopSelectedTips.hide();
                            topucDialogItemLi.css("width", opts.SelectedItemWidth); //设置宽度
                            CreateCheckBox(topucDialogItemLi, $Container, opts, $Li.data("original"), Type, true); //**********************
                            //选中子项
                            if (Type == "itemTitle" || Type == "toolTipTitle") {
                                LoopLi($Li, $Container, true, opts, Type); //递归check
                            }
                            //绑定Sel的事件
                            topucDialogItemLi.find("input").bind("click", function () {
                                //CheckItem($Li, $Container, $obj, opts, "Sel"); //"Sel"表明选中项的事件
                                
                            });
                        }
                        else {//超过
                            //撤销勾选，并提示
                            $Li.find("input").each(function () {
                                $(this).attr("checked", false);
                            });
                            alert("最多能选择" + opts.SelectedLimit + "项");
                        }
                    }
                    else if ($Li.attr("Sel") != "Sel") {//如果选中容器中有符合的，且不是选中容器的Input，则移除选中容器中相符的Input
                        temp.remove(); //删除
                        LoopLi($Li, $Container, false, Type); //递归uncheck
                    }
                    else {//如果选中容器中有符合的，且是选中容器中的Input，则移除本身，以及uncheck所有相符合的。
                        if ($DialogTopSelected.find($Li)) {
                            //移除本身
                            temp.remove();
                            //找到选择区域中与之对应的节点
                            var relative = $DialogMid.find("li[liid=" + $Li.attr("liid") + "]");
                            if (relative.length == 0) {
                                relative = $DialogToolTip.find("li[liid=" + $Li.attr("liid") + "]");
                            }
                            //遍历
                            relative.each(function () {
                                $(this).find("input").attr("checked", false); //LoopLi这里漏掉了。缺陷
                                LoopLi($(this), $Container, false, opts, Type);
                            });
                        }
                    }
                }
            }

            function CreateCheckBox($Li, $Container, opts, obj, Type, IsCheckBox) {
                var Label = $("<label>" + obj.name + "</label>");
                var EvenNode = Label;
                if (IsCheckBox) {
                    var CheckBox = $("<input type='checkbox' id='topucDialogCB" + obj.id + Type + "' inputid='" + obj.id + "'/>");
                    CheckBox.prependTo(Label);
                    if ($Li.attr("Sel") == "Sel") {
                        CheckBox.attr("checked", true);
                        //$Li.find('input').attr("checked",true);
                    }
                    if ($.browser.msie && (parseInt($.browser.version) <= 6)) {
                        Label.attr("for", CheckBox.attr("id"));
                    }
                    EvenNode = CheckBox;
                }
                Label.appendTo($Li);
                EvenNode.on("click", function (e) {
	                $(this).data("top" , EvenNode.offset().top);
	                $(this).data("left" , EvenNode.offset().left);
                    if (Type == "itemitem" && opts.Config.itemitem == false && obj.items && obj.items != null) {//并且还有下层数据
                        CreateItemToolTip(e, $Li, $Container, opts, obj, Type , $(this));
                    }
                    else {
                        CheckItem($Li, $Container, obj, opts, Type);
                    }
                })
                //集中在此处设置Li的属性
                $Li.attr("liid", obj.id);
                $Li.data("original", obj); 
            }

            function CreateItemToolTip(e, $Parent, $Container, opts, itemsParent, Type , $this) {
                var $win = $(window);
                //移除可能已经存在的ToolTip。
                $("#topucDialogToolTip").remove();
                //在选中容器中，移除$Li的父亲节点
                LoopParent($Parent, $Container); //（wait）

                var ToolTip = $("<div id='topucDialogToolTip' class='topucDialogToolTip'></div>");

                //则产生toolTip内容
                if (itemsParent.items) {
                    CreateItemTitle(ToolTip, $Container, opts, itemsParent, "toolTipTitle", opts.Config.toolTipTitle);
                    CreateItem(ToolTip, $Container, opts, itemsParent.items, "toolTipitem", opts.Config.toolTipitem);
                }

                var left = $this.data("left")-6;
                var top = $this.data("top") - 10; 


                ToolTip.appendTo(document.body).css({
                    "position": "absolute",
                    "display": "block"
                });

                if ($.browser.msie && (parseInt($.browser.version) <= 7)) {
                    ToolTip.css({
                        width: opts.toolTipItemWidth * 4 + 12 + "px"
                    });
                }
                if (top + ToolTip.outerHeight() >= $win.height()) {
                    var t = top - ToolTip.outerHeight();
                    if (t >= 0)
                        top = t + 50;
                }

                if (left + ToolTip.width() >= $win.width()) {
                    left -= ToolTip.width();
                }
                ToolTip.css({
                    "left": left,
                    "top": top,
                    zIndex: 100000
                }).hover(function () {
                    $(this).show()
                }, function () {
                   $(this).remove();
                });


                //初始化选中项,必须在ToolTop apppendTo之后
                var topucDialogTopSelectedUl = $Container.find(".topSelectedUl"); //选中项容器UL
                topucDialogTopSelectedUl.find("li").each(function () {
                    ToolTip.find("li[liid=" + $(this).attr('liid') + "]").each(function () {
                        if (opts.topucDialogType != "Single") {
                            if ($(this).attr("liFlag") == 'topucDialogItemTitle') {
                                $(this).find("input").attr("checked", true);
                                LoopLi($Parent, $Container, true, opts, Type); //递归check
                            }
                            else {
                                $(this).find("input").attr("checked", true); //rex
                                LoopLi($(this), $Container, true, opts, Type); //递归check
                            }
                        } else { //单选 给备选的li加class

                        }
                    });
                });
            }
            //
            function CreateItem($Parent, $Container, opts, items, Type, IsCheck) {

                if (items) {
                    var topucDialogItemDiv = $("<div class='topucDialogItemDiv'></div>").appendTo($Parent);
                    var topucDialogItemUl = $("<ul class='topucDialogItemUl'></ul>").appendTo(topucDialogItemDiv);
                    var addCount = 0;
                    if (opts.topucDialogId == "IndustryMulti") {
                        topucDialogItemDiv.addClass('topucDialogIndustryItemTitle');
                    }
                    $(items).each(function (index, obj) {
                        var topucDialogItemLi = $("<li class='topucDialogItemLi'></li>");
                        if (Type == "itemitem") {
                            topucDialogItemLi.css({ "width": opts.ItemWidth }); //设置宽度
                        }
                        else if (Type == "Sel") {
                            topucDialogItemLi.css("width", opts.SelectedItemWidth); //设置宽度
                        }
                        else if (Type == "toolTipitem") {
                            if (obj.name.length <= 5) {
                                topucDialogItemLi.css({ "width": opts.toolTipItemWidth }); //设置宽度
                            } else {
                                topucDialogItemLi.css({ "width": opts.toolTipItemWidth*2  });
                            }
                        }
                        CreateCheckBox(topucDialogItemLi, $Container, opts, obj, Type, IsCheck);
                        topucDialogItemUl.append(topucDialogItemLi);
                    });
                    if (Type == "toolTipitem") {
                        if ((items.length + addCount) > opts.toolTipCountPerLine) {
                            topucDialogItemDiv.css("width", opts.toolTipItemWidth * 4); /*删除 + 8*/
                        }
                    }
                }
            }

            function SaveSelected($Container, opts) {
                var $input = opts.input, $hidden = opts.hidden,
                    $DialogTopSelectedUl = $Container.find(".topSelectedUl"); //选中项容器UL

                //保存值
                var Result = "";
                var IdResult = "";
                var originals = [];
                $DialogTopSelectedUl.find("li").each(function () {
                    var original = {};
                    original.name = $(this).text();
                    original.id = $(this).attr("liid");
                    originals.push(original);
                    if (Result != "") {
                        Result += "+" + original.name
                    } else {
                        Result += original.name
                    };
                    if (IdResult != "") {
                        IdResult += ',' + original.id
                    } else {
                        IdResult += original.id;
                    }
                });
                if (Result == "") {
                    Result = opts.clearBtnText;
                    //清空动作时的Value
                    if (opts.clearBtnValue != undefined)
                    {
                        IdResult = opts.clearBtnValue;
                    }
                }
                $input.val(Result).
                attr('title', Result).//增加已选的title属性
                data("original", originals);
                $hidden.val(IdResult);
                if (opts.onSelected) $input.trigger('selected', [Result, IdResult]);
            }
            function InitSelected($Container, opts) {
                var $input = opts.input;
                var $DialogTopSelectedUl = $Container.find(".topSelectedUl"); //选中项容器UL
                var $DialogTopSelectedTips = $Container.find(".topucDialogTopSelectedTips");
                var originals = $input.data("original");

                if (!originals) {
                    originals = GetOriginalsData($input.val(), opts);
                }

                if (originals) {
                    $(originals).each(function (index, obj) {
                        var topucDialogItemLi = $("<li class='topucDialogItemLi'  Sel='Sel'></li>").appendTo($DialogTopSelectedUl);
                        $DialogTopSelectedTips.hide();
                        topucDialogItemLi.css("width", opts.SelectedItemWidth); //设置宽度
                        topucDialogItemLi.attr("liid", obj.id);
                        //console.log(obj.name); ///选中的学校名称 rex
                        CreateCheckBox(topucDialogItemLi, $Container, opts, obj, "Sel", true); //**********************
                    });
                } 
            }

            function GetOriginalsData(Text, opts) {
                var originals = [];
                if (Text != "") {
                    Text = "+" + Text + "+"; //特殊处理 为index
                    if (opts.topucDialogData) {
                        $(opts.topucDialogData).each(function (index, obj) {
                            if (Text.indexOf("+" + obj.name + "+") > -1) {
                                originals.push(obj);
                            }
                            else if(index===1){}
                            else {
                                LoopTopucDialogData(Text, obj, originals);
                            }
                        });
                    }
                }
                return originals;
            }

            function LoopTopucDialogData(Text, ParentData, originals) {
                if (ParentData && ParentData.items && ParentData.items != "") {
                    $(ParentData.items).each(function (index, obj) {
                        if (Text.indexOf("+" + obj.name + "+") > -1) {
                            originals.push(obj);
                        }
                        else {
                            LoopTopucDialogData(Text, obj, originals);
                        }
                    });
                }
            }

            function ClearSelected($Container, opts) {
                var $input = opts.input, $hidden = opts.hidden;
                var $DialogToolTip = $("#topucDialogToolTip");
                    $TopSelectedUl = $Container.find(".topSelectedUl");
                if ($DialogToolTip) {
                    $DialogToolTip.remove();
                }
                //选中项容器UL
                $TopSelectedUl.empty();
                $Container.find('#topucDialogMid :checkbox').attr("checked", false); //Mid 中的checkbox也需要去掉勾选
                //$input.val("").
                //attr('title', '').
                //data("original", []);
                //$hidden.val("");
            }
            function Clear($Target) {
                var clear = $("<div></div>");
                clear.css({ clear: "both", height: 0, "font-size": 0 });
                $Target.append(clear);
            }
            function SetResult($Container, opts) {
            }

            // 闭包结束     

        })(jQuery);

        function setCookie(cookiename, cookievalue, hours) {
			var date = new Date(),
				cookieStr = "";
			date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
			if($.type(cookievalue)=="array"&&cookievalue.length>0){ 
				for(var i=0,j=cookievalue.length; i<j; i++){             //{"name" : SingleData.name , "id" : SingleData.id}
					cookieStr += cookievalue[i]["key"] + ",";
				}
			}
			cookieStr = cookieStr.substring(0, cookieStr.length - 1);
			document.cookie = cookiename + "=" + cookieStr + ";path=/;expires = " + date.toGMTString();
		}
		function getCookie(name) {
		    var strCookie = document.cookie;  //RecentCity=[object Object]
	        var arrCookie = strCookie.split(";");
	        var arr = [];
	        for (var i = 0; i < arrCookie.length; i++) {
	           	arr = arrCookie[i].split("=");
	           	if ($.trim(arr[0]) == name){
	           		return arr[1];
	           	} 
	       	}
	        return "";
	    }

        window.topucDialogOptions = {
            MajorMulti: function () {
                return {
                    topucDialogId: 'MajorMulti',
                    topucDialogMode: 'Major',
                    topucDialogType: 'Multi', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataMajor, //数据
                    topucDialogHeight: 'auto', //高度
                    topucDialogWidth: 524, //宽度
                    topucDialogTile: '专业', //标题
                    SelectedLimit: 100, //最多选择几项
                    SelectedTitle: '已选专业', //选中标题
                    SelectedItemWidth: 100, //选中项的宽度
                    ItemWidth: 94, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 6, //弹出层项最大字数
                    clearBtnValue: 0,
                    selectedTips:"尚未选择专业，请从下方专业列表选择",
                    Config: { itemTitle: false, itemitem: false, toolTipTitle: true, toolTipitem: true }
                };
            },
            FunctionsMulti: function () {
                return {
                    topucDialogId: 'FunctionsMulti',
                    topucDialogMode: 'Functions',
                    topucDialogType: 'Multi', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataFunctions, //数据
                    topucDialogHeight: 'auto', //高度
                    topucDialogWidth: 652, //宽度
                    topucDialogTile: '所属职能', //标题
                    SelectedLimit: 20, //最多选择几项
                    SelectedTitle: '已选职能', //选中标题
                    SelectedItemWidth: "", //选中项的宽度
                    ItemWidth: 120, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 5, //弹出层项最大字数
                    selectedTips: "尚未选择职能，请从下方职能列表选择",
                    Config: { itemTitle: false, itemitem: true, toolTipTitle: true, toolTipitem: true }
                };
            },
            FunctionsSingle: function () {
                return {
                    topucDialogId: 'FunctionsSingle',
                    topucDialogMode: '',
                    topucDialogType: 'Single', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataFunctions, //数据
                    topucDialogHeight: 'auto', //高度
                    topucDialogWidth: 750, //宽度
                    topucDialogTile: '所属职能', //标题
                    SelectedLimit: 5, //最多选择几项
                    SelectedTitle: '已选职能', //选中标题
                    SelectedItemWidth: 100, //选中项的宽度
                    ItemWidth: 120, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 5, //弹出层项最大字数
                    Config: { itemTitle: false, itemitem: false, toolTipTitle: true, toolTipitem: true }
                };
            },
            MinInduMulti: function () {
                return {
                    topucDialogId: 'MinInduMulti',
                    topucDialogMode: '',
                    topucDialogType: 'Multi', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataMinIndu, //数据
                    topucDialogHeight: 'auto', //高度
                    topucDialogWidth: 750, //宽度
                    topucDialogTile: '所属行业(最多选择5项)', //标题
                    SelectedLimit: 5, //最多选择几项
                    SelectedTitle: '已选行业', //选中标题
                    SelectedItemWidth: 150, //选中项的宽度
                    ItemWidth: 240, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 5, //弹出层项最大字数
                    selectedTips: "尚未选择行业，请从下方行业列表选择",
                    Config: { itemTitle: false, itemitem: true, toolTipTitle: true, toolTipitem: true }
                };
            },
            MajorSingle: function () {
                return {
                    topucDialogId: 'MajorMulti',
                    topucDialogMode: 'Major',
                    topucDialogType: 'Single', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataMajor, //数据
                    topucDialogHeight: 'auto', //高度
                    topucDialogWidth: 524, //宽度
                    topucDialogTile: '专业', //标题
                    SelectedTitle: '已选专业', //选中标题
                    SelectedItemWidth: 100, //选中项的宽度
                    ItemWidth: 94, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 6, //弹出层项最大字数
                    Config: { itemTitle: false, itemitem: false, toolTipTitle: false, toolTipitem: false }
                };
            },
            CitySingle: function () {
                return {
                    topucDialogId: 'CitySingle',
                    topucDialogMode: '',
                    topucDialogType: 'Single', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataCity, //数据
                    topucDialogHeight: 'auto', //高度
                    topucDialogWidth: 526, //宽度
                    topucDialogTile: '选择期望工作的城市', //标题
                    //SelectedLimit: 5, //最多选择几项
                    SelectedTitle: '已选择城市', //选中标题
                    SelectedItemWidth: 100, //选中项的宽度
                    ItemWidth: 78, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 6 //弹出层项最大字数
                };
            },
            CityMulti: function () {
                return {
                    topucDialogId: 'CityMulti',
                    topucDialogMode: '',
                    topucDialogType: 'Multi', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataCity, //数据
                    topucDialogHeight: 'auto', //高度
                    topucDialogWidth: 526, //宽度
                    topucDialogTile: '选择期望工作的城市', //标题
                    SelectedLimit: 20, //最多选择几项
                    SelectedTitle: '已选择城市', //选中标题
                    SelectedItemWidth: '', //选中项的宽度
                    ItemWidth: 78, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 6, //弹出层项最大字数
                    selectedTips: "尚未选择城市，请从下方城市列表选择",
                    Config: { itemTitle: false, itemitem: false, toolTipTitle: true, toolTipitem: true }
                };
            },
            IndustryMulti: function () {
                return {
                    topucDialogId: 'IndustryMulti',
                    topucDialogMode: { Mode: "Table", TitleWidth: "205px", ContentWidth: "" }, //Table
                    topucDialogType: 'Multi', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataIndustry, //数据
                    topucDialogHeight: 580, //高度 600
                    topucDialogWidth: 760, //宽度
                    topucDialogTile: '选择行业分类', //标题
                    SelectedLimit: 20, //最多选择几项
                    SelectedTitle: '已选择的行业', //选中标题
                    SelectedItemWidth: '', //选中项的宽度
                    ItemWidth: 240, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 5, //弹出层项最大字数
                    selectedTips: "尚未选择行业，请从下方行业列表选择",
                    Config: { itemTitle: false, itemitem: true, toolTipTitle: false, toolTipitem: false }
                };
            },
            IndustrySingle: function () {
                return {
                    topucDialogId: 'IndustryMulti',
                    topucDialogMode: { Mode: "Table", TitleWidth: "180px", ContentWidth: "" }, //Table
                    topucDialogType: 'Single', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataIndustry, //数据
                    topucDialogHeight: 'auto', //高度 600
                    topucDialogWidth: 740, //宽度
                    topucDialogTile: '所属行业', //标题
                    SelectedLimit: 5, //最多选择几项
                    SelectedTitle: '已选行业', //选中标题
                    SelectedItemWidth: '', //选中项的宽度
                    ItemWidth: 240, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 5, //弹出层项最大字数
                    Config: ''
                };
            },
            SchoolSingle: function () {
                return {
                    topucDialogId: 'SchoolSingle',
                    topucDialogMode: { Mode: "Table", TitleWidth: "80px", ContentWidth: "" }, //Table
                    topucDialogType: 'Single', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataSchool, //数据
                    topucDialogHeight: 'auto', //高度
                    topucDialogWidth: 480, //宽度
                    topucDialogTile: '所在大学', //标题
                    SelectedLimit: 5, //最多选择几项
                    SelectedTitle: '已选大学', //选中标题
                    SelectedItemWidth: 88, //选中项的宽度
                    ItemWidth: 50, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 6 //弹出层项最大字数

                };
            },
            SchoolMulti: function () {
                return {
                    topucDialogId: 'SchoolMulti',
                    topucDialogMode: { Mode: "Table", TitleWidth: "100px", ContentWidth: "" }, //Table
                    topucDialogType: 'Multi', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataSchool, //数据
                    topucDialogHeight: 'auto', //高度
                    topucDialogWidth: 480, //宽度
                    topucDialogTile: '大学', //标题
                    SelectedLimit: 5, //最多选择几项
                    SelectedTitle: '已选大学', //选中标题
                    SelectedItemWidth: 88, //选中项的宽度
                    ItemWidth: 50, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 6, //弹出层项最大字数
                    selectedTips: "尚未选择学校，请从下方学校列表选择",
                    Config: { itemTitle: false, itemitem: false, toolTipTitle: true, toolTipitem: true }
                };
            },
            ComputerSkillSingle: function () {
                return {
                    topucDialogId: 'ComputerSkillSingle',
                    topucDialogMode: { Mode: "Table", TitleWidth: "100px", ContentWidth: "" }, //Table
                    topucDialogType: 'Single', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataComputerSkill, //数据
                    topucDialogHeight: 500, //高度
                    topucDialogWidth: 600, //宽度
                    topucDialogTile: 'IT技能', //标题
                    SelectedLimit: 5, //最多选择几项
                    SelectedTitle: '已选IT技能', //选中标题
                    SelectedItemWidth: 88, //选中项的宽度
                    ItemWidth: 120, //项宽度
                    toolTipItemWidth: 60, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 5 //弹出层项最大字数
                };
            },
            ComputerSkillMulti: function () {
                return {
                    topucDialogId: 'ComputerSkillMulti',
                    topucDialogMode: { Mode: "Table", TitleWidth: "100px", ContentWidth: "" }, //Table
                    topucDialogType: 'Multi', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataComputerSkill, //数据
                    topucDialogHeight: 420, //高度
                    topucDialogWidth: 640, //宽度
                    topucDialogTile: 'IT技能', //标题
                    SelectedLimit: 5, //最多选择几项
                    SelectedTitle: '已选IT技能', //选中标题
                    SelectedItemWidth: 120, //选中项的宽度
                    ItemWidth: 120, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 5, //弹出层项最大字数
                    Config: { itemTitle: false, itemitem: true, toolTipTitle: false, toolTipitem: false }
                };
            },
            ProfessionalSingle: function () {
                return {
                    topucDialogId: 'ProfessionalSingle',
                    topucDialogMode: { Mode: "Table", TitleWidth: "100px", ContentWidth: "" }, //Table
                    topucDialogType: 'Single', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataProfessional, //数据
                    topucDialogHeight: 'auto', //高度
                    topucDialogWidth: 640, //宽度
                    topucDialogTile: '专业类别', //标题
                    //SelectedLimit: 5, //最多选择几项
                    SelectedTitle: '已选专业', //选中标题
                    SelectedItemWidth: 120, //选中项的宽度
                    ItemWidth: 120, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 5 //弹出层项最大字数
                };
            },
            ProfessionalMulti: function () {
                return {
                    topucDialogId: 'ProfessionalMulti',
                    topucDialogMode: { Mode: "Table", TitleWidth: "100px", ContentWidth: "" }, //Table
                    topucDialogType: 'Multi', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataProfessional, //数据
                    topucDialogHeight: 'auto', //高度
                    topucDialogWidth: 640, //宽度
                    topucDialogTile: '专业类别(最多选择5项)', //标题
                    SelectedLimit: 5, //最多选择几项
                    SelectedTitle: '已选专业', //选中标题
                    SelectedItemWidth: 120, //选中项的宽度
                    ItemWidth: 120, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 5, //弹出层项最大字数
                    selectedTips: "尚未选择专业，请从下方专业列表选择",
                    Config: { itemTitle: true, itemitem: false, toolTipTitle: true, toolTipitem: true }
                };
            },
            SchLvlMulti: function () {
                return {
                    topucDialogId: 'FunctionsMulti',
                    topucDialogMode: '',
                    topucDialogType: 'Multi', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataSchLvl, //数据
                    topucDialogHeight: 'auto', //高度
                    topucDialogWidth: 420, //宽度
                    topucDialogTile: '学校级别(最多选择5项)', //标题
                    SelectedLimit: 5, //最多选择几项
                    SelectedTitle: '已选学校级别', //选中标题
                    SelectedItemWidth: 100, //选中项的宽度
                    ItemWidth: 120, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 5, //弹出层项最大字数
                    clearBtnValue: 0,
                    selectedTips: "尚未选择学校级别，请从下方学校级别列表选择",
                    Config: { itemTitle: false, itemitem: true, toolTipTitle: true, toolTipitem: true }
                };
            },
            ModeMulti: function () {
                return {
                    topucDialogId: 'ModeMulti',
                    topucDialogMode: { Mode: "Table", TitleWidth: "160px", ContentWidth: "" }, //Table
                    topucDialogType: 'Multi', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataMode, //数据
                    topucDialogHeight: 'auto', //高度 600
                    topucDialogWidth: 800, //宽度
                    topucDialogTile: '所属性质', //标题
                    SelectedLimit: 20, //最多选择几项
                    SelectedTitle: '已选性质', //选中标题
                    SelectedItemWidth: '', //选中项的宽度
                    ItemWidth: 180, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 5, //弹出层项最大字数
                    Config: { itemTitle: false, itemitem: true, toolTipTitle: false, toolTipitem: false }
                };
            },
            ScaleMulti: function () {
                return {
                    topucDialogId: 'ScaleMulti',
                    topucDialogMode: { Mode: "Table", TitleWidth: "160px", ContentWidth: "" }, //Table
                    topucDialogType: 'Multi', //Single,Multi
                    topucDialogData: topucdialogdata.topucDataScale, //数据
                    topucDialogHeight: 'auto', //高度 600
                    topucDialogWidth: 800, //宽度
                    topucDialogTile: '所属规模(最多选择5项)', //标题
                    SelectedLimit: 5, //最多选择几项
                    SelectedTitle: '已选规模', //选中标题
                    SelectedItemWidth: '', //选中项的宽度
                    ItemWidth: 180, //项宽度
                    toolTipItemWidth: 80, //弹出层项宽度
                    toolTipCountPerLine: 4, //弹出层项每页行数量
                    toolTipWordMaxCount: 5, //弹出层项最大字数
                    Config: { itemTitle: false, itemitem: true, toolTipTitle: false, toolTipitem: false }
                };
            }
        }
    };
});

