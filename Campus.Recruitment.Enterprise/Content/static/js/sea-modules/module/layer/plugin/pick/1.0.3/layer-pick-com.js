define('module/layer/plugin/pick/1.0.3/layer-pick-com', function (require, exports, module) {

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
                showConfig: {},         //item配置
                isUnlimited: true       //显示不限按钮
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
                    } else if (this.option.showMode == 'list') {
                        this.contentWrap.css({
                            height: 288,
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: '#eaeaea'
                        })
                        if (that.option.isSearch) {
                            this.searchContainer = $('<div class="m-search"></div>').appendTo(this.contentWrap);
                            $('<p><i class="i_master"></i>代表该专业为研究生专业</p>').appendTo(this.searchContainer);
                            this.searchItem = $('<div class="auto-search-div"><input type="text" id="dialog-search" class="dialog-search" placeholder="输入专业关键词快速选择"><i class="major-search-i"></i></div>');
                            this.searchItem.appendTo(this.searchContainer);
                            this.searchItem.find('.major-search-i').click(function () {
                                $('#dialog-search').val('');
                            });
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
                    that.boxUL = $('<ul class="dialog-data-list clearfix" style="position:relative"></ul>');
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
                        var li = $('<li></li>').attr('data-id', val),
                            initArr = { "010101": 0, "010102": 0, "010103K": 0, "010104T": 0, "020101": 0, "020102": 0, "020103T": 0, "020104T": 0, "020105T": 0, "020106T": 0, "020201K": 0, "020202": 0, "020301K": 0, "020302": 0, "020303": 0, "020304": 0, "020305T": 0, "020306T": 0, "020307T": 0, "020401": 0, "020402": 0, "030101K": 0, "030102T": 0, "030103T": 0, "030201": 0, "030202": 0, "030203": 0, "030204T": 0, "030205T": 0, "030301": 0, "030302": 0, "030303T": 0, "030304T": 0, "030305T": 0, "030401": 0, "030501": 0, "030502": 0, "030503": 0, "030601K": 0, "030602K": 0, "030603K": 0, "030604TK": 0, "030605TK": 0, "030606TK": 0, "030607TK": 0, "030608TK": 0, "030609TK": 0, "030610TK": 0, "030611TK": 0, "030612TK": 0, "030613TK": 0, "030614TK": 0, "030615TK": 0, "040101": 0, "040102": 0, "040103": 0, "040104": 0, "040105": 0, "040106": 0, "040107": 0, "040108": 0, "040109T": 0, "040201": 0, "040202K": 0, "040203": 0, "040204K": 0, "040205": 0, "040206T": 0, "040207T": 0, "050101": 0, "050102": 0, "050103": 0, "050104": 0, "050105": 0, "050106T": 0, "050107T": 0, "050201": 0, "050202": 0, "050203": 0, "050204": 0, "050205": 0, "050206": 0, "050207": 0, "050208": 0, "050209": 0, "050210": 0, "050211": 0, "050212": 0, "050213": 0, "050214": 0, "050215": 0, "050216": 0, "050217": 0, "050218": 0, "050219": 0, "050220": 0, "050221": 0, "050222": 0, "050223": 0, "050224": 0, "050225": 0, "050226": 0, "050227": 0, "050228": 0, "050229": 0, "050230": 0, "050231": 0, "050232": 0, "050233": 0, "050234": 0, "050235": 0, "050236": 0, "050237": 0, "050238": 0, "050239": 0, "050240": 0, "050241": 0, "050242": 0, "050243": 0, "050244": 0, "050245": 0, "050246": 0, "050247": 0, "050248": 0, "050249": 0, "050250": 0, "050251": 0, "050252": 0, "050253": 0, "050254": 0, "050255": 0, "050256": 0, "050257": 0, "050258": 0, "050259": 0, "050260": 0, "050261": 0, "050262": 0, "050301": 0, "050302": 0, "050303": 0, "050304": 0, "050305": 0, "050306T": 0, "050307T": 0, "060101": 0, "060102": 0, "060103": 0, "060104": 0, "060105T": 0, "060106T": 0, "070101": 0, "070102": 0, "070103T": 0, "070201": 0, "070202": 0, "070203": 0, "070204T": 0, "070301": 0, "070302": 0, "070303T": 0, "070304T": 0, "070401": 0, "070501": 0, "070502": 0, "070503": 0, "070504": 0, "070601": 0, "070602": 0, "070701": 0, "070702": 0, "070703T": 0, "070704T": 0, "070801": 0, "070802": 0, "070901": 0, "070902": 0, "070903T": 0, "070904T": 0, "071001": 0, "071002": 0, "071003": 0, "071004": 0, "071101": 0, "071102": 0, "071201": 0, "071202": 0, "080101": 0, "080102": 0, "080201": 0, "080202": 0, "080203": 0, "080204": 0, "080205": 0, "080206": 0, "080207": 0, "080208": 0, "080209T": 0, "080210T": 0, "080211T": 0, "080212T": 0, "080301": 0, "080401": 0, "080402": 0, "080403": 0, "080404": 0, "080405": 0, "080406": 0, "080407": 0, "080408": 0, "080409T": 0, "080410T": 0, "080411T": 0, "080412T": 0, "080413T": 0, "080414T": 0, "080501": 0, "080502T": 0, "080503T": 0, "080601": 0, "080602T": 0, "080603T": 0, "080604T": 0, "080701": 0, "080702": 0, "080703": 0, "080704": 0, "080705": 0, "080706": 0, "080707T": 0, "080708T": 0, "080709T": 0, "080710T": 0, "080711T": 0, "080712T": 0, "080713T": 0, "080714T": 0, "080715T": 0, "080716T": 0, "080801": 0, "080802T": 0, "080901": 0, "080902": 0, "080903": 0, "080904K": 0, "080905": 0, "080906": 0, "080907T": 0, "080908T": 0, "080909T": 0, "081001": 0, "081002": 0, "081003": 0, "081004": 0, "081005T": 0, "081006T": 0, "081101": 0, "081102": 0, "081103": 0, "081104T": 0, "081201": 0, "081202": 0, "081203T": 0, "081204T": 0, "081301": 0, "081302": 0, "081303T": 0, "081304T": 0, "081305T": 0, "081401": 0, "081402": 0, "081403": 0, "081404T": 0, "081501": 0, "081502": 0, "081503": 0, "081504": 0, "081505T": 0, "081506T": 0, "081601": 0, "081602": 0, "081603T": 0, "081604T": 0, "081701": 0, "081702": 0, "081703": 0, "081801": 0, "081802": 0, "081803K": 0, "081804K": 0, "081805K": 0, "081806T": 0, "081807T": 0, "081808TK": 0, "081901": 0, "081902T": 0, "081903T": 0, "082001": 0, "082002": 0, "082003": 0, "082004": 0, "082005": 0, "082006T": 0, "082007T": 0, "082101": 0, "082102": 0, "082103": 0, "082104": 0, "082105": 0, "082106": 0, "082107": 0, "082201": 0, "082202": 0, "082203": 0, "082204": 0, "082301": 0, "082302": 0, "082303": 0, "082304": 0, "082305": 0, "082401": 0, "082402": 0, "082403": 0, "082501": 0, "082502": 0, "082503": 0, "082504": 0, "082505T": 0, "082506T": 0, "082507T": 0, "082601": 0, "082602T": 0, "082701": 0, "082702": 0, "082703": 0, "082704": 0, "082705": 0, "082706T": 0, "082707T": 0, "082708T": 0, "082801": 0, "082802": 0, "082803": 0, "082804T": 0, "082901": 0, "083001": 0, "083002T": 0, "083101K": 0, "083102K": 0, "083103TK": 0, "083104TK": 0, "083105TK": 0, "083106TK": 0, "083107TK": 0, "083108TK": 0, "083109TK": 0, "090101": 0, "090102": 0, "090103": 0, "090104": 0, "090105": 0, "090106": 0, "090107T": 0, "090108T": 0, "090109T": 0, "090110T": 0, "090111T": 0, "090201": 0, "090202": 0, "090203": 0, "090301": 0, "090302T": 0, "090303T": 0, "090401": 0, "090402": 0, "090403T": 0, "090501": 0, "090502": 0, "090503": 0, "090601": 0, "090602": 0, "090603T": 0, "090701": 0, "100101K": 0, "100201K": 0, "100202TK": 0, "100203TK": 0, "100204TK": 0, "100205TK": 0, "100206TK": 0, "100301K": 0, "100401K": 0, "100402": 0, "100403TK": 0, "100404TK": 0, "100405TK": 0, "100501K": 0, "100502K": 0, "100503K": 0, "100504K": 0, "100505K": 0, "100506K": 0, "100507K": 0, "100601K": 0, "100701": 0, "100702": 0, "100703TK": 0, "100704T": 0, "100705T": 0, "100706T": 0, "100707T": 0, "100801": 0, "100802": 0, "100803T": 0, "100804T": 0, "100805T": 0, "100806T": 0, "100901K": 0, "101001": 0, "101002": 0, "101003": 0, "101004": 0, "101005": 0, "101006": 0, "101007": 0, "101008T": 0, "101101": 0, "120101": 0, "120102": 0, "120103": 0, "120104": 0, "120105": 0, "120106TK": 0, "120201K": 0, "120202": 0, "120203K": 0, "120204": 0, "120205": 0, "120206": 0, "120207": 0, "120208": 0, "120209": 0, "120210": 0, "120211T": 0, "120212T": 0, "120213T": 0, "120214T": 0, "120301": 0, "120302": 0, "120401": 0, "120402": 0, "120403": 0, "120404": 0, "120405": 0, "120406TK": 0, "120407T": 0, "120408T": 0, "120409T": 0, "120501": 0, "120502": 0, "120503": 0, "120601": 0, "120602": 0, "120603T": 0, "120701": 0, "120702T": 0, "120703T": 0, "120801": 0, "120802T": 0, "120901K": 0, "120902": 0, "120903": 0, "120904T": 0, "130101": 0, "130201": 0, "130202": 0, "130203": 0, "130204": 0, "130205": 0, "130206": 0, "130301": 0, "130302": 0, "130303": 0, "130304": 0, "130305": 0, "130306": 0, "130307": 0, "130308": 0, "130309": 0, "130310": 0, "130311T": 0, "130401": 0, "130402": 0, "130403": 0, "130404": 0, "130405T": 0, "130406T": 0, "130501": 0, "130502": 0, "130503": 0, "130504": 0, "130505": 0, "130506": 0, "130507": 0, "130508": 0, "130509T": 0, "010105": 1, "010106": 1, "010107": 1, "010108": 1, "010109": 1, "020501": 1, "020502": 1, "020503": 1, "020504": 1, "020505": 1, "020506": 1, "020601": 1, "020602": 1, "020603": 1, "020604": 1, "020605": 1, "020608": 1, "020609": 1, "020610": 1, "030104": 1, "030105": 1, "030106": 1, "030107": 1, "030108": 1, "030109": 1, "030110": 1, "030111": 1, "030112": 1, "030113": 1, "030114": 1, "030206": 1, "030207": 1, "030208": 1, "030209": 1, "030210": 1, "030306": 1, "030307": 1, "030402": 1, "030403": 1, "030404": 1, "030405": 1, "030504": 1, "030505": 1, "030506": 1, "030507": 1, "030508": 1, "040110": 1, "040111": 1, "040112": 1, "040113": 1, "040114": 1, "040115": 1, "040116": 1, "040117": 1, "040118": 1, "040208": 1, "040209": 1, "040210": 1, "040301": 1, "040302": 1, "040303": 1, "050108": 1, "050109": 1, "050110": 1, "050111": 1, "050112": 1, "050113": 1, "050114": 1, "050263": 1, "050264": 1, "050265": 1, "050266": 1, "050267": 1, "050268": 1, "050269": 1, "050270": 1, "050271": 1, "050272": 1, "050273": 1, "070104": 1, "070105": 1, "070106": 1, "070107": 1, "070108": 1, "070205": 1, "070206": 1, "070207": 1, "070208": 1, "070209": 1, "070210": 1, "070211": 1, "070305": 1, "070306": 1, "070307": 1, "070308": 1, "070309": 1, "070402": 1, "070403": 1, "070505": 1, "070506": 1, "070507": 1, "070603": 1, "070604": 1, "070705": 1, "070706": 1, "070707": 1, "070708": 1, "070803": 1, "070804": 1, "070905": 1, "070906": 1, "070907": 1, "070908": 1, "071005": 1, "071006": 1, "071007": 1, "071008": 1, "071009": 1, "071010": 1, "071011": 1, "071012": 1, "071013": 1, "071014": 1, "071015": 1, "071301": 1, "071302": 1, "080103": 1, "080104": 1, "080105": 1, "080213": 1, "080302": 1, "080415": 1, "080416": 1, "080417": 1, "080418": 1, "080419": 1, "080420": 1, "080504": 1, "080505": 1, "080506": 1, "080507": 1, "080508": 1, "080509": 1, "080605": 1, "080606": 1, "080607": 1, "080608": 1, "080609": 1, "080717": 1, "080718": 1, "080719": 1, "080720": 1, "080721": 1, "080722": 1, "080910": 1, "080911": 1, "080912": 1, "082805": 1, "082806": 1, "082807": 1, "082808": 1, "081007": 1, "081008": 1, "081009": 1, "081010": 1, "081011": 1, "081012": 1, "081105": 1, "081106": 1, "081107": 1, "081108": 1, "081205": 1, "081206": 1, "081207": 1, "081306": 1, "081307": 1, "081308": 1, "081309": 1, "081310": 1, "081405": 1, "081406": 1, "081407": 1, "081507": 1, "081508": 1, "081509": 1, "081605": 1, "081606": 1, "081704": 1, "081705": 1, "081706": 1, "081707": 1, "081809": 1, "081810": 1, "081811": 1, "081812": 1, "081904": 1, "081905": 1, "081906": 1, "082008": 1, "082009": 1, "082010": 1, "082011": 1, "082108": 1, "082109": 1, "082110": 1, "082111": 1, "082205": 1, "082206": 1, "082207": 1, "082208": 1, "082306": 1, "082307": 1, "082308": 1, "082309": 1, "082404": 1, "082405": 1, "082709": 1, "082710": 1, "082711": 1, "082712": 1, "083201": 1, "083301": 1, "083302": 1, "083303": 1, "083304": 1, "083305": 1, "090112": 1, "090113": 1, "090114": 1, "090115": 1, "090204": 1, "090205": 1, "090206": 1, "090207": 1, "090208": 1, "090304": 1, "090305": 1, "090306": 1, "090307": 1, "090404": 1, "090405": 1, "090406": 1, "090504": 1, "090505": 1, "090506": 1, "090507": 1, "090508": 1, "090509": 1, "090510": 1, "090604": 1, "090605": 1, "090606": 1, "100102": 1, "100103": 1, "100104": 1, "100105": 1, "100106": 1, "100107": 1, "100108": 1, "100207": 1, "100208": 1, "100209": 1, "100210": 1, "100211": 1, "100212": 1, "100213": 1, "100214": 1, "100215": 1, "100216": 1, "100217": 1, "100218": 1, "100219": 1, "100220": 1, "100221": 1, "100222": 1, "100223": 1, "100302": 1, "100303": 1, "100406": 1, "100407": 1, "100408": 1, "100409": 1, "100410": 1, "100411": 1, "100508": 1, "100509": 1, "100510": 1, "100511": 1, "100512": 1, "100513": 1, "100514": 1, "100515": 1, "100516": 1, "100517": 1, "100518": 1, "100519": 1, "100520": 1, "100602": 1, "100603": 1, "100708": 1, "100709": 1, "100710": 1, "100711": 1, "100712": 1, "120106": 1, "120215": 1, "120216": 1, "120217": 1, "120303": 1, "120410": 1, "120411": 1, "120412": 1, "120504": 1, "130102": 1, "130510": 1, "130312": 1, "130313": 1 };
                        if(initArr[val]){
                            var span = $('<span></span>').html(that.txtArr[id]).addClass('active').append('<i class="i_master"></i>').append('<i>×</i>').appendTo(li);
                        }else{
                            var span = $('<span></span>').html(that.txtArr[id]).addClass('active').append('<i>×</i>').appendTo(li);
                        }
                        that.selectedList.append(li);
                    })
                }
                this.content.prepend(selectedWrap);
                if(that.option.isUnlimited){
                    this.unlimited = $('<button class="dialog-unlimited-btn">不限</button>').appendTo(selectedWrap).on('click', function () {
                        that.option.values = 0;
                        that.option.text = $(this).text();
                        that.setValue();
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
                    if (value.ig === 1) {
                        $('<i class="i_master"></i>').appendTo(span);
                    }
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
                this.subsetList.width(this.subsetItem.find('li').eq(0).width() * rowItemCount);
                var t = this.currentEle.position().top;
                this.subsetItem.css({
                    width: w,
                    position: 'absolute',
                    left: this.currentEle.position().left,
                    top: t,
                    'z-index': 1111
                })
                if (this.subsetList.height() > (this.subsetItem.find('li').eq(0).height() + 10) * 4) {
                    this.subsetList.slimscroll({
                        height: '124',
                        alwaysVisible: true,
                        railVisible: true   //是否 显示轨道
                    });
                }

                this.subsetItem.on("mouseleave", function (ev) {
                    $(this).remove();
                });
            },
            //绑定事件
            bindEvent: function () {
                var that = this;
                if (that.option.isSearch) {
                    $.widget("custom.autocomplete", $.ui.autocomplete, {
                        _renderItem: function (ul, item) {
                            if (item.ig == 1) {
                                return $("<li>")
                                  .append(item.label)
                                  .append('<i class="i_master"></i>')
                                  .appendTo(ul);
                            } else {
                                return $("<li>")
                                .append(item.label)
                                .appendTo(ul);
                            }
                        }
                    })
                    var autoCompleteItems = [{ "id": "010101", "label": "哲学", "ig": 0 }, { "id": "010102", "label": "逻辑学", "ig": 0 }, { "id": "010103K", "label": "宗教学", "ig": 0 }, { "id": "010104T", "label": "伦理学", "ig": 0 }, { "id": "020101", "label": "经济学", "ig": 0 }, { "id": "020102", "label": "经济统计学", "ig": 0 }, { "id": "020103T", "label": "国民经济管理", "ig": 0 }, { "id": "020104T", "label": "资源与环境经济学", "ig": 0 }, { "id": "020105T", "label": "商务经济学", "ig": 0 }, { "id": "020106T", "label": "能源经济", "ig": 0 }, { "id": "020201K", "label": "财政学", "ig": 0 }, { "id": "020202", "label": "税收学", "ig": 0 }, { "id": "020301K", "label": "金融学", "ig": 0 }, { "id": "020302", "label": "金融工程", "ig": 0 }, { "id": "020303", "label": "保险学", "ig": 0 }, { "id": "020304", "label": "投资学", "ig": 0 }, { "id": "020305T", "label": "金融数学", "ig": 0 }, { "id": "020306T", "label": "信用管理", "ig": 0 }, { "id": "020307T", "label": "经济与金融", "ig": 0 }, { "id": "020401", "label": "国际经济与贸易", "ig": 0 }, { "id": "020402", "label": "贸易经济", "ig": 0 }, { "id": "030101K", "label": "法学", "ig": 0 }, { "id": "030102T", "label": "知识产权", "ig": 0 }, { "id": "030103T", "label": "监狱学", "ig": 0 }, { "id": "030201", "label": "政治学与行政学", "ig": 0 }, { "id": "030202", "label": "国际政治", "ig": 0 }, { "id": "030203", "label": "外交学", "ig": 0 }, { "id": "030204T", "label": "国际事务与国际关系", "ig": 0 }, { "id": "030205T", "label": "政治学、经济学与哲学", "ig": 0 }, { "id": "030301", "label": "社会学", "ig": 0 }, { "id": "030302", "label": "社会工作", "ig": 0 }, { "id": "030303T", "label": "人类学", "ig": 0 }, { "id": "030304T", "label": "女性学", "ig": 0 }, { "id": "030305T", "label": "家政学", "ig": 0 }, { "id": "030401", "label": "民族学", "ig": 0 }, { "id": "030501", "label": "科学社会主义", "ig": 0 }, { "id": "030502", "label": "中国共产党历史", "ig": 0 }, { "id": "030503", "label": "思想政治教育", "ig": 0 }, { "id": "030601K", "label": "治安学", "ig": 0 }, { "id": "030602K", "label": "侦查学", "ig": 0 }, { "id": "030603K", "label": "边防管理", "ig": 0 }, { "id": "030604TK", "label": "禁毒学", "ig": 0 }, { "id": "030605TK", "label": "警犬技术", "ig": 0 }, { "id": "030606TK", "label": "经济犯罪侦查", "ig": 0 }, { "id": "030607TK", "label": "边防指挥", "ig": 0 }, { "id": "030608TK", "label": "消防指挥", "ig": 0 }, { "id": "030609TK", "label": "警卫学", "ig": 0 }, { "id": "030610TK", "label": "公安情报学", "ig": 0 }, { "id": "030611TK", "label": "犯罪学", "ig": 0 }, { "id": "030612TK", "label": "公安管理学", "ig": 0 }, { "id": "030613TK", "label": "涉外警务", "ig": 0 }, { "id": "030614TK", "label": "国内安全保卫", "ig": 0 }, { "id": "030615TK", "label": "警务指挥与战术", "ig": 0 }, { "id": "040101", "label": "教育学", "ig": 0 }, { "id": "040102", "label": "科学教育", "ig": 0 }, { "id": "040103", "label": "人文教育", "ig": 0 }, { "id": "040104", "label": "教育技术学", "ig": 0 }, { "id": "040105", "label": "艺术教育", "ig": 0 }, { "id": "040106", "label": "学前教育", "ig": 0 }, { "id": "040107", "label": "小学教育", "ig": 0 }, { "id": "040108", "label": "特殊教育", "ig": 0 }, { "id": "040109T", "label": "华文教育", "ig": 0 }, { "id": "040201", "label": "体育教育", "ig": 0 }, { "id": "040202K", "label": "运动训练", "ig": 0 }, { "id": "040203", "label": "社会体育指导与管理", "ig": 0 }, { "id": "040204K", "label": "武术与民族传统体育", "ig": 0 }, { "id": "040205", "label": "运动人体科学", "ig": 0 }, { "id": "040206T", "label": "运动康复", "ig": 0 }, { "id": "040207T", "label": "休闲体育", "ig": 0 }, { "id": "050101", "label": "汉语言文学", "ig": 0 }, { "id": "050102", "label": "汉语言", "ig": 0 }, { "id": "050103", "label": "汉语国际教育", "ig": 0 }, { "id": "050104", "label": "中国少数民族语言文学", "ig": 0 }, { "id": "050105", "label": "古典文献学", "ig": 0 }, { "id": "050106T", "label": "应用语言学", "ig": 0 }, { "id": "050107T", "label": "秘书学", "ig": 0 }, { "id": "050201", "label": "英语", "ig": 0 }, { "id": "050202", "label": "俄语", "ig": 0 }, { "id": "050203", "label": "德语", "ig": 0 }, { "id": "050204", "label": "法语", "ig": 0 }, { "id": "050205", "label": "西班牙语", "ig": 0 }, { "id": "050206", "label": "阿拉伯语", "ig": 0 }, { "id": "050207", "label": "日语", "ig": 0 }, { "id": "050208", "label": "波斯语", "ig": 0 }, { "id": "050209", "label": "朝鲜语", "ig": 0 }, { "id": "050210", "label": "菲律宾语", "ig": 0 }, { "id": "050211", "label": "梵语巴利语", "ig": 0 }, { "id": "050212", "label": "印度尼西亚语", "ig": 0 }, { "id": "050213", "label": "印地语", "ig": 0 }, { "id": "050214", "label": "柬埔寨语", "ig": 0 }, { "id": "050215", "label": "老挝语", "ig": 0 }, { "id": "050216", "label": "缅甸语", "ig": 0 }, { "id": "050217", "label": "马来语", "ig": 0 }, { "id": "050218", "label": "蒙古语", "ig": 0 }, { "id": "050219", "label": "僧伽罗语", "ig": 0 }, { "id": "050220", "label": "泰语", "ig": 0 }, { "id": "050221", "label": "乌尔都语", "ig": 0 }, { "id": "050222", "label": "希伯来语", "ig": 0 }, { "id": "050223", "label": "越南语", "ig": 0 }, { "id": "050224", "label": "豪萨语", "ig": 0 }, { "id": "050225", "label": "斯瓦希里语", "ig": 0 }, { "id": "050226", "label": "阿尔巴尼亚语", "ig": 0 }, { "id": "050227", "label": "保加利亚语", "ig": 0 }, { "id": "050228", "label": "波兰语", "ig": 0 }, { "id": "050229", "label": "捷克语", "ig": 0 }, { "id": "050230", "label": "斯洛伐克语", "ig": 0 }, { "id": "050231", "label": "罗马尼亚语", "ig": 0 }, { "id": "050232", "label": "葡萄牙语", "ig": 0 }, { "id": "050233", "label": "瑞典语", "ig": 0 }, { "id": "050234", "label": "塞尔维亚语", "ig": 0 }, { "id": "050235", "label": "土耳其语", "ig": 0 }, { "id": "050236", "label": "希腊语", "ig": 0 }, { "id": "050237", "label": "匈牙利语", "ig": 0 }, { "id": "050238", "label": "意大利语", "ig": 0 }, { "id": "050239", "label": "泰米尔语", "ig": 0 }, { "id": "050240", "label": "普什图语", "ig": 0 }, { "id": "050241", "label": "世界语", "ig": 0 }, { "id": "050242", "label": "孟加拉语", "ig": 0 }, { "id": "050243", "label": "尼泊尔语", "ig": 0 }, { "id": "050244", "label": "克罗地亚语", "ig": 0 }, { "id": "050245", "label": "荷兰语", "ig": 0 }, { "id": "050246", "label": "芬兰语", "ig": 0 }, { "id": "050247", "label": "乌克兰语", "ig": 0 }, { "id": "050248", "label": "挪威语", "ig": 0 }, { "id": "050249", "label": "丹麦语", "ig": 0 }, { "id": "050250", "label": "冰岛语", "ig": 0 }, { "id": "050251", "label": "爱尔兰语", "ig": 0 }, { "id": "050252", "label": "拉脱维亚语", "ig": 0 }, { "id": "050253", "label": "立陶宛语", "ig": 0 }, { "id": "050254", "label": "斯洛文尼亚语", "ig": 0 }, { "id": "050255", "label": "爱沙尼亚语", "ig": 0 }, { "id": "050256", "label": "马耳他语", "ig": 0 }, { "id": "050257", "label": "哈萨克语", "ig": 0 }, { "id": "050258", "label": "乌兹别克语", "ig": 0 }, { "id": "050259", "label": "祖鲁语", "ig": 0 }, { "id": "050260", "label": "拉丁语", "ig": 0 }, { "id": "050261", "label": "翻译", "ig": 0 }, { "id": "050262", "label": "商务英语", "ig": 0 }, { "id": "050301", "label": "新闻学", "ig": 0 }, { "id": "050302", "label": "广播电视学", "ig": 0 }, { "id": "050303", "label": "广告学", "ig": 0 }, { "id": "050304", "label": "传播学", "ig": 0 }, { "id": "050305", "label": "编辑出版学", "ig": 0 }, { "id": "050306T", "label": "网络与新媒体", "ig": 0 }, { "id": "050307T", "label": "数字出版", "ig": 0 }, { "id": "060101", "label": "历史学", "ig": 0 }, { "id": "060102", "label": "世界史", "ig": 0 }, { "id": "060103", "label": "考古学", "ig": 0 }, { "id": "060104", "label": "文物与博物馆学", "ig": 0 }, { "id": "060105T", "label": "文物保护技术", "ig": 0 }, { "id": "060106T", "label": "外国语言与外国历史", "ig": 0 }, { "id": "070101", "label": "数学与应用数学", "ig": 0 }, { "id": "070102", "label": "信息与计算科学", "ig": 0 }, { "id": "070103T", "label": "数理基础科学", "ig": 0 }, { "id": "070201", "label": "物理学", "ig": 0 }, { "id": "070202", "label": "应用物理学", "ig": 0 }, { "id": "070203", "label": "核物理", "ig": 0 }, { "id": "070204T", "label": "声学", "ig": 0 }, { "id": "070301", "label": "化学", "ig": 0 }, { "id": "070302", "label": "应用化学", "ig": 0 }, { "id": "070303T", "label": "化学生物学", "ig": 0 }, { "id": "070304T", "label": "分子科学与工程", "ig": 0 }, { "id": "070401", "label": "天文学", "ig": 0 }, { "id": "070501", "label": "地理科学", "ig": 0 }, { "id": "070502", "label": "自然地理与资源环境", "ig": 0 }, { "id": "070503", "label": "人文地理与城乡规划", "ig": 0 }, { "id": "070504", "label": "地理信息科学", "ig": 0 }, { "id": "070601", "label": "大气科学", "ig": 0 }, { "id": "070602", "label": "应用气象学", "ig": 0 }, { "id": "070701", "label": "海洋科学", "ig": 0 }, { "id": "070702", "label": "海洋技术", "ig": 0 }, { "id": "070703T", "label": "海洋资源与环境", "ig": 0 }, { "id": "070704T", "label": "军事海洋学", "ig": 0 }, { "id": "070801", "label": "地球物理学", "ig": 0 }, { "id": "070802", "label": "空间科学与技术", "ig": 0 }, { "id": "070901", "label": "地质学", "ig": 0 }, { "id": "070902", "label": "地球化学", "ig": 0 }, { "id": "070903T", "label": "地球信息科学与技术", "ig": 0 }, { "id": "070904T", "label": "古生物学", "ig": 0 }, { "id": "071001", "label": "生物科学", "ig": 0 }, { "id": "071002", "label": "生物技术", "ig": 0 }, { "id": "071003", "label": "生物信息学", "ig": 0 }, { "id": "071004", "label": "生态学", "ig": 0 }, { "id": "071101", "label": "心理学", "ig": 0 }, { "id": "071102", "label": "应用心理学", "ig": 0 }, { "id": "071201", "label": "统计学", "ig": 0 }, { "id": "071202", "label": "应用统计学", "ig": 0 }, { "id": "080101", "label": "理论与应用力学", "ig": 0 }, { "id": "080102", "label": "工程力学", "ig": 0 }, { "id": "080201", "label": "机械工程", "ig": 0 }, { "id": "080202", "label": "机械设计制造及其自动化", "ig": 0 }, { "id": "080203", "label": "材料成型及控制工程", "ig": 0 }, { "id": "080204", "label": "机械电子工程", "ig": 0 }, { "id": "080205", "label": "工业设计", "ig": 0 }, { "id": "080206", "label": "过程装备与控制工程", "ig": 0 }, { "id": "080207", "label": "车辆工程", "ig": 0 }, { "id": "080208", "label": "汽车服务工程", "ig": 0 }, { "id": "080209T", "label": "机械工艺技术", "ig": 0 }, { "id": "080210T", "label": "微机电系统工程", "ig": 0 }, { "id": "080211T", "label": "机电技术教育", "ig": 0 }, { "id": "080212T", "label": "汽车维修工程教育", "ig": 0 }, { "id": "080301", "label": "测控技术与仪器", "ig": 0 }, { "id": "080401", "label": "材料科学与工程", "ig": 0 }, { "id": "080402", "label": "材料物理", "ig": 0 }, { "id": "080403", "label": "材料化学", "ig": 0 }, { "id": "080404", "label": "冶金工程", "ig": 0 }, { "id": "080405", "label": "金属材料工程", "ig": 0 }, { "id": "080406", "label": "无机非金属材料工程", "ig": 0 }, { "id": "080407", "label": "高分子材料与工程", "ig": 0 }, { "id": "080408", "label": "复合材料与工程", "ig": 0 }, { "id": "080409T", "label": "粉体材料科学与工程", "ig": 0 }, { "id": "080410T", "label": "宝石及材料工艺学", "ig": 0 }, { "id": "080411T", "label": "焊接技术与工程", "ig": 0 }, { "id": "080412T", "label": "功能材料", "ig": 0 }, { "id": "080413T", "label": "纳米材料与技术", "ig": 0 }, { "id": "080414T", "label": "新能源材料与器件", "ig": 0 }, { "id": "080501", "label": "能源与动力工程", "ig": 0 }, { "id": "080502T", "label": "能源与环境系统工程", "ig": 0 }, { "id": "080503T", "label": "新能源科学与工程", "ig": 0 }, { "id": "080601", "label": "电气工程及其自动化", "ig": 0 }, { "id": "080602T", "label": "智能电网信息工程", "ig": 0 }, { "id": "080603T", "label": "光源与照明", "ig": 0 }, { "id": "080604T", "label": "电气工程与智能控制", "ig": 0 }, { "id": "080701", "label": "电子信息工程", "ig": 0 }, { "id": "080702", "label": "电子科学与技术", "ig": 0 }, { "id": "080703", "label": "通信工程", "ig": 0 }, { "id": "080704", "label": "微电子科学与工程", "ig": 0 }, { "id": "080705", "label": "光电信息科学与工程", "ig": 0 }, { "id": "080706", "label": "信息工程", "ig": 0 }, { "id": "080707T", "label": "广播电视工程", "ig": 0 }, { "id": "080708T", "label": "水声工程", "ig": 0 }, { "id": "080709T", "label": "电子封装技术", "ig": 0 }, { "id": "080710T", "label": "集成电路设计与集成系统", "ig": 0 }, { "id": "080711T", "label": "医学信息工程", "ig": 0 }, { "id": "080712T", "label": "电磁场与无线技术", "ig": 0 }, { "id": "080713T", "label": "电波传播与天线", "ig": 0 }, { "id": "080714T", "label": "电子信息科学与技术", "ig": 0 }, { "id": "080715T", "label": "电信工程及管理", "ig": 0 }, { "id": "080716T", "label": "应用电子技术教育", "ig": 0 }, { "id": "080801", "label": "自动化", "ig": 0 }, { "id": "080802T", "label": "轨道交通信号与控制", "ig": 0 }, { "id": "080901", "label": "计算机科学与技术", "ig": 0 }, { "id": "080902", "label": "软件工程", "ig": 0 }, { "id": "080903", "label": "网络工程", "ig": 0 }, { "id": "080904K", "label": "信息安全", "ig": 0 }, { "id": "080905", "label": "物联网工程", "ig": 0 }, { "id": "080906", "label": "数字媒体技术", "ig": 0 }, { "id": "080907T", "label": "智能科学与技术", "ig": 0 }, { "id": "080908T", "label": "空间信息与数字技术", "ig": 0 }, { "id": "080909T", "label": "电子与计算机工程", "ig": 0 }, { "id": "081001", "label": "土木工程", "ig": 0 }, { "id": "081002", "label": "建筑环境与能源应用工程", "ig": 0 }, { "id": "081003", "label": "给排水科学与工程", "ig": 0 }, { "id": "081004", "label": "建筑电气与智能化", "ig": 0 }, { "id": "081005T", "label": "城市地下空间工程", "ig": 0 }, { "id": "081006T", "label": "道路桥梁与渡河工程", "ig": 0 }, { "id": "081101", "label": "水利水电工程", "ig": 0 }, { "id": "081102", "label": "水文与水资源工程", "ig": 0 }, { "id": "081103", "label": "港口航道与海岸工程", "ig": 0 }, { "id": "081104T", "label": "水务工程", "ig": 0 }, { "id": "081201", "label": "测绘工程", "ig": 0 }, { "id": "081202", "label": "遥感科学与技术", "ig": 0 }, { "id": "081203T", "label": "导航工程", "ig": 0 }, { "id": "081204T", "label": "地理国情监测", "ig": 0 }, { "id": "081301", "label": "化学工程与工艺", "ig": 0 }, { "id": "081302", "label": "制药工程", "ig": 0 }, { "id": "081303T", "label": "资源循环科学与工程", "ig": 0 }, { "id": "081304T", "label": "能源化学工程", "ig": 0 }, { "id": "081305T", "label": "化学工程与工业生物工程", "ig": 0 }, { "id": "081401", "label": "地质工程", "ig": 0 }, { "id": "081402", "label": "勘查技术与工程", "ig": 0 }, { "id": "081403", "label": "资源勘查工程", "ig": 0 }, { "id": "081404T", "label": "地下水科学与工程", "ig": 0 }, { "id": "081501", "label": "采矿工程", "ig": 0 }, { "id": "081502", "label": "石油工程", "ig": 0 }, { "id": "081503", "label": "矿物加工工程", "ig": 0 }, { "id": "081504", "label": "油气储运工程", "ig": 0 }, { "id": "081505T", "label": "矿物资源工程", "ig": 0 }, { "id": "081506T", "label": "海洋油气工程", "ig": 0 }, { "id": "081601", "label": "纺织工程", "ig": 0 }, { "id": "081602", "label": "服装设计与工程", "ig": 0 }, { "id": "081603T", "label": "非织造材料与工程", "ig": 0 }, { "id": "081604T", "label": "服装设计与工艺教育", "ig": 0 }, { "id": "081701", "label": "轻化工程", "ig": 0 }, { "id": "081702", "label": "包装工程", "ig": 0 }, { "id": "081703", "label": "印刷工程", "ig": 0 }, { "id": "081801", "label": "交通运输", "ig": 0 }, { "id": "081802", "label": "交通工程", "ig": 0 }, { "id": "081803K", "label": "航海技术", "ig": 0 }, { "id": "081804K", "label": "轮机工程", "ig": 0 }, { "id": "081805K", "label": "飞行技术", "ig": 0 }, { "id": "081806T", "label": "交通设备与控制工程", "ig": 0 }, { "id": "081807T", "label": "救助与打捞工程", "ig": 0 }, { "id": "081808TK", "label": "船舶电子电气工程", "ig": 0 }, { "id": "081901", "label": "船舶与海洋工程", "ig": 0 }, { "id": "081902T", "label": "海洋工程与技术", "ig": 0 }, { "id": "081903T", "label": "海洋资源开发技术", "ig": 0 }, { "id": "082001", "label": "航空航天工程", "ig": 0 }, { "id": "082002", "label": "飞行器设计与工程", "ig": 0 }, { "id": "082003", "label": "飞行器制造工程", "ig": 0 }, { "id": "082004", "label": "飞行器动力工程", "ig": 0 }, { "id": "082005", "label": "飞行器环境与生命保障工程", "ig": 0 }, { "id": "082006T", "label": "飞行器质量与可靠性", "ig": 0 }, { "id": "082007T", "label": "飞行器适航技术", "ig": 0 }, { "id": "082101", "label": "武器系统与工程", "ig": 0 }, { "id": "082102", "label": "武器发射工程", "ig": 0 }, { "id": "082103", "label": "探测制导与控制技术", "ig": 0 }, { "id": "082104", "label": "弹药工程与爆炸技术", "ig": 0 }, { "id": "082105", "label": "特种能源技术与工程", "ig": 0 }, { "id": "082106", "label": "装甲车辆工程", "ig": 0 }, { "id": "082107", "label": "信息对抗技术", "ig": 0 }, { "id": "082201", "label": "核工程与核技术", "ig": 0 }, { "id": "082202", "label": "辐射防护与核安全", "ig": 0 }, { "id": "082203", "label": "工程物理", "ig": 0 }, { "id": "082204", "label": "核化工与核燃料工程", "ig": 0 }, { "id": "082301", "label": "农业工程", "ig": 0 }, { "id": "082302", "label": "农业机械化及其自动化", "ig": 0 }, { "id": "082303", "label": "农业电气化", "ig": 0 }, { "id": "082304", "label": "农业建筑环境与能源工程", "ig": 0 }, { "id": "082305", "label": "农业水利工程", "ig": 0 }, { "id": "082401", "label": "森林工程", "ig": 0 }, { "id": "082402", "label": "木材科学与工程", "ig": 0 }, { "id": "082403", "label": "林产化工", "ig": 0 }, { "id": "082501", "label": "环境科学与工程", "ig": 0 }, { "id": "082502", "label": "环境工程", "ig": 0 }, { "id": "082503", "label": "环境科学", "ig": 0 }, { "id": "082504", "label": "环境生态工程", "ig": 0 }, { "id": "082505T", "label": "环保设备工程", "ig": 0 }, { "id": "082506T", "label": "资源环境科学", "ig": 0 }, { "id": "082507T", "label": "水质科学与技术", "ig": 0 }, { "id": "082601", "label": "生物医学工程", "ig": 0 }, { "id": "082602T", "label": "假肢矫形工程", "ig": 0 }, { "id": "082701", "label": "食品科学与工程", "ig": 0 }, { "id": "082702", "label": "食品质量与安全", "ig": 0 }, { "id": "082703", "label": "粮食工程", "ig": 0 }, { "id": "082704", "label": "乳品工程", "ig": 0 }, { "id": "082705", "label": "酿酒工程", "ig": 0 }, { "id": "082706T", "label": "葡萄与葡萄酒工程", "ig": 0 }, { "id": "082707T", "label": "食品营养与检验教育", "ig": 0 }, { "id": "082708T", "label": "烹饪与营养教育", "ig": 0 }, { "id": "082801", "label": "建筑学", "ig": 0 }, { "id": "082802", "label": "城乡规划", "ig": 0 }, { "id": "082803", "label": "风景园林", "ig": 0 }, { "id": "082804T", "label": "历史建筑保护工程", "ig": 0 }, { "id": "082901", "label": "安全工程", "ig": 0 }, { "id": "083001", "label": "生物工程", "ig": 0 }, { "id": "083002T", "label": "生物制药", "ig": 0 }, { "id": "083101K", "label": "刑事科学技术", "ig": 0 }, { "id": "083102K", "label": "消防工程", "ig": 0 }, { "id": "083103TK", "label": "交通管理工程", "ig": 0 }, { "id": "083104TK", "label": "安全防范工程", "ig": 0 }, { "id": "083105TK", "label": "公安视听技术", "ig": 0 }, { "id": "083106TK", "label": "抢险救援指挥与技术", "ig": 0 }, { "id": "083107TK", "label": "火灾勘查", "ig": 0 }, { "id": "083108TK", "label": "网络安全与执法", "ig": 0 }, { "id": "083109TK", "label": "核生化消防", "ig": 0 }, { "id": "090101", "label": "农学", "ig": 0 }, { "id": "090102", "label": "园艺", "ig": 0 }, { "id": "090103", "label": "植物保护", "ig": 0 }, { "id": "090104", "label": "植物科学与技术", "ig": 0 }, { "id": "090105", "label": "种子科学与工程", "ig": 0 }, { "id": "090106", "label": "设施农业科学与工程", "ig": 0 }, { "id": "090107T", "label": "茶学", "ig": 0 }, { "id": "090108T", "label": "烟草", "ig": 0 }, { "id": "090109T", "label": "应用生物科学", "ig": 0 }, { "id": "090110T", "label": "农艺教育", "ig": 0 }, { "id": "090111T", "label": "园艺教育", "ig": 0 }, { "id": "090201", "label": "农业资源与环境", "ig": 0 }, { "id": "090202", "label": "野生动物与自然保护区管理", "ig": 0 }, { "id": "090203", "label": "水土保持与荒漠化防治", "ig": 0 }, { "id": "090301", "label": "动物科学", "ig": 0 }, { "id": "090302T", "label": "蚕学", "ig": 0 }, { "id": "090303T", "label": "蜂学", "ig": 0 }, { "id": "090401", "label": "动物医学", "ig": 0 }, { "id": "090402", "label": "动物药学", "ig": 0 }, { "id": "090403T", "label": "动植物检疫", "ig": 0 }, { "id": "090501", "label": "林学", "ig": 0 }, { "id": "090502", "label": "园林", "ig": 0 }, { "id": "090503", "label": "森林保护", "ig": 0 }, { "id": "090601", "label": "水产养殖学", "ig": 0 }, { "id": "090602", "label": "海洋渔业科学与技术", "ig": 0 }, { "id": "090603T", "label": "水族科学与技术", "ig": 0 }, { "id": "090701", "label": "草业科学", "ig": 0 }, { "id": "100101K", "label": "基础医学", "ig": 0 }, { "id": "100201K", "label": "临床医学", "ig": 0 }, { "id": "100202TK", "label": "麻醉学", "ig": 0 }, { "id": "100203TK", "label": "医学影像学", "ig": 0 }, { "id": "100204TK", "label": "眼视光医学", "ig": 0 }, { "id": "100205TK", "label": "精神医学", "ig": 0 }, { "id": "100206TK", "label": "放射医学", "ig": 0 }, { "id": "100301K", "label": "口腔医学", "ig": 0 }, { "id": "100401K", "label": "预防医学", "ig": 0 }, { "id": "100402", "label": "食品卫生与营养学", "ig": 0 }, { "id": "100403TK", "label": "妇幼保健医学", "ig": 0 }, { "id": "100404TK", "label": "卫生监督", "ig": 0 }, { "id": "100405TK", "label": "全球健康学", "ig": 0 }, { "id": "100501K", "label": "中医学", "ig": 0 }, { "id": "100502K", "label": "针灸推拿学", "ig": 0 }, { "id": "100503K", "label": "藏医学", "ig": 0 }, { "id": "100504K", "label": "蒙医学", "ig": 0 }, { "id": "100505K", "label": "维医学", "ig": 0 }, { "id": "100506K", "label": "壮医学", "ig": 0 }, { "id": "100507K", "label": "哈医学", "ig": 0 }, { "id": "100601K", "label": "中西医临床医学", "ig": 0 }, { "id": "100701", "label": "药学", "ig": 0 }, { "id": "100702", "label": "药物制剂", "ig": 0 }, { "id": "100703TK", "label": "临床药学", "ig": 0 }, { "id": "100704T", "label": "药事管理", "ig": 0 }, { "id": "100705T", "label": "药物分析", "ig": 0 }, { "id": "100706T", "label": "药物化学", "ig": 0 }, { "id": "100707T", "label": "海洋药学", "ig": 0 }, { "id": "100801", "label": "中药学前教育", "ig": 0 }, { "id": "100802", "label": "中药资源与开发", "ig": 0 }, { "id": "100803T", "label": "藏药学", "ig": 0 }, { "id": "100804T", "label": "蒙药学", "ig": 0 }, { "id": "100805T", "label": "中药制药", "ig": 0 }, { "id": "100806T", "label": "中草药栽培与鉴定", "ig": 0 }, { "id": "100901K", "label": "法医学", "ig": 0 }, { "id": "101001", "label": "医学检验技术", "ig": 0 }, { "id": "101002", "label": "医学实验技术", "ig": 0 }, { "id": "101003", "label": "医学影像技术", "ig": 0 }, { "id": "101004", "label": "眼视光学", "ig": 0 }, { "id": "101005", "label": "康复治疗学", "ig": 0 }, { "id": "101006", "label": "口腔医学技术", "ig": 0 }, { "id": "101007", "label": "卫生检验与检疫", "ig": 0 }, { "id": "101008T", "label": "听力与言语康复学", "ig": 0 }, { "id": "101101", "label": "护理学", "ig": 0 }, { "id": "120101", "label": "管理科学社会主义", "ig": 0 }, { "id": "120102", "label": "信息管理与信息系统", "ig": 0 }, { "id": "120103", "label": "工程管理", "ig": 0 }, { "id": "120104", "label": "房地产开发与管理", "ig": 0 }, { "id": "120105", "label": "工程造价", "ig": 0 }, { "id": "120106TK", "label": "保密管理", "ig": 0 }, { "id": "120201K", "label": "工商管理", "ig": 0 }, { "id": "120202", "label": "市场营销", "ig": 0 }, { "id": "120203K", "label": "会计学", "ig": 0 }, { "id": "120204", "label": "财务管理", "ig": 0 }, { "id": "120205", "label": "国际商务", "ig": 0 }, { "id": "120206", "label": "人力资源管理", "ig": 0 }, { "id": "120207", "label": "审计学", "ig": 0 }, { "id": "120208", "label": "资产评估", "ig": 0 }, { "id": "120209", "label": "物业管理", "ig": 0 }, { "id": "120210", "label": "文化产业管理", "ig": 0 }, { "id": "120211T", "label": "劳动关系", "ig": 0 }, { "id": "120212T", "label": "体育经济与管理", "ig": 0 }, { "id": "120213T", "label": "财务会计教育", "ig": 0 }, { "id": "120214T", "label": "市场营销教育", "ig": 0 }, { "id": "120301", "label": "农林经济管理", "ig": 0 }, { "id": "120302", "label": "农村区域发展", "ig": 0 }, { "id": "120401", "label": "公共事业管理", "ig": 0 }, { "id": "120402", "label": "行政管理", "ig": 0 }, { "id": "120403", "label": "劳动与社会保障", "ig": 0 }, { "id": "120404", "label": "土地资源管理", "ig": 0 }, { "id": "120405", "label": "城市管理", "ig": 0 }, { "id": "120406TK", "label": "海关管理", "ig": 0 }, { "id": "120407T", "label": "交通管理", "ig": 0 }, { "id": "120408T", "label": "海事管理", "ig": 0 }, { "id": "120409T", "label": "公共关系学", "ig": 0 }, { "id": "120501", "label": "图书馆学", "ig": 0 }, { "id": "120502", "label": "档案学", "ig": 0 }, { "id": "120503", "label": "信息资源管理", "ig": 0 }, { "id": "120601", "label": "物流管理", "ig": 0 }, { "id": "120602", "label": "物流工程", "ig": 0 }, { "id": "120603T", "label": "采购管理", "ig": 0 }, { "id": "120701", "label": "工业工程", "ig": 0 }, { "id": "120702T", "label": "标准化工程", "ig": 0 }, { "id": "120703T", "label": "质量管理工程", "ig": 0 }, { "id": "120801", "label": "电子商务", "ig": 0 }, { "id": "120802T", "label": "电子商务及法律", "ig": 0 }, { "id": "120901K", "label": "旅游管理", "ig": 0 }, { "id": "120902", "label": "酒店管理", "ig": 0 }, { "id": "120903", "label": "会展经济与管理", "ig": 0 }, { "id": "120904T", "label": "旅游管理与服务教育", "ig": 0 }, { "id": "130101", "label": "艺术史论", "ig": 0 }, { "id": "130201", "label": "音乐表演", "ig": 0 }, { "id": "130202", "label": "音乐学", "ig": 0 }, { "id": "130203", "label": "作曲与作曲技术理论", "ig": 0 }, { "id": "130204", "label": "舞蹈表演", "ig": 0 }, { "id": "130205", "label": "舞蹈学", "ig": 0 }, { "id": "130206", "label": "舞蹈编导", "ig": 0 }, { "id": "130301", "label": "表演", "ig": 0 }, { "id": "130302", "label": "戏剧学", "ig": 0 }, { "id": "130303", "label": "电影学", "ig": 0 }, { "id": "130304", "label": "戏剧影视文学", "ig": 0 }, { "id": "130305", "label": "广播电视编导", "ig": 0 }, { "id": "130306", "label": "戏剧影视导演", "ig": 0 }, { "id": "130307", "label": "戏剧影视美术设计", "ig": 0 }, { "id": "130308", "label": "录音艺术", "ig": 0 }, { "id": "130309", "label": "播音与主持艺术", "ig": 0 }, { "id": "130310", "label": "动画", "ig": 0 }, { "id": "130311T", "label": "影视摄影与制作", "ig": 0 }, { "id": "130401", "label": "美术学", "ig": 0 }, { "id": "130402", "label": "绘画", "ig": 0 }, { "id": "130403", "label": "雕塑", "ig": 0 }, { "id": "130404", "label": "摄影", "ig": 0 }, { "id": "130405T", "label": "书法学", "ig": 0 }, { "id": "130406T", "label": "中国画", "ig": 0 }, { "id": "130501", "label": "艺术设计学", "ig": 0 }, { "id": "130502", "label": "视觉传达设计", "ig": 0 }, { "id": "130503", "label": "环境设计", "ig": 0 }, { "id": "130504", "label": "产品设计", "ig": 0 }, { "id": "130505", "label": "服装与服饰设计", "ig": 0 }, { "id": "130506", "label": "公共艺术", "ig": 0 }, { "id": "130507", "label": "工艺美术", "ig": 0 }, { "id": "130508", "label": "数字媒体艺术", "ig": 0 }, { "id": "130509T", "label": "艺术与科技", "ig": 0 }, { "id": "010105", "label": "马克思主义哲学", "ig": 1 }, { "id": "010106", "label": "中国哲学", "ig": 1 }, { "id": "010107", "label": "外国哲学", "ig": 1 }, { "id": "010108", "label": "美学", "ig": 1 }, { "id": "010109", "label": "科学技术哲学", "ig": 1 }, { "id": "020501", "label": "政治经济学", "ig": 1 }, { "id": "020502", "label": "经济思想史", "ig": 1 }, { "id": "020503", "label": "经济史", "ig": 1 }, { "id": "020504", "label": "西方经济学", "ig": 1 }, { "id": "020505", "label": "世界经济", "ig": 1 }, { "id": "020506", "label": "人口、资源与环境经济学", "ig": 1 }, { "id": "020601", "label": "国民经济学", "ig": 1 }, { "id": "020602", "label": "区域经济学", "ig": 1 }, { "id": "020603", "label": "产业经济学", "ig": 1 }, { "id": "020604", "label": "国际贸易学", "ig": 1 }, { "id": "020605", "label": "劳动经济学", "ig": 1 }, { "id": "020608", "label": "统计学", "ig": 1 }, { "id": "020609", "label": "数量经济学", "ig": 1 }, { "id": "020610", "label": "国防经济", "ig": 1 }, { "id": "030104", "label": "法学理论", "ig": 1 }, { "id": "030105", "label": "法律史", "ig": 1 }, { "id": "030106", "label": "宪法学与行政法学", "ig": 1 }, { "id": "030107", "label": "刑法学", "ig": 1 }, { "id": "030108", "label": "民商法学", "ig": 1 }, { "id": "030109", "label": "诉讼法学", "ig": 1 }, { "id": "030110", "label": "经济法学", "ig": 1 }, { "id": "030111", "label": "环境与资源保护法学", "ig": 1 }, { "id": "030112", "label": "国际法学", "ig": 1 }, { "id": "030113", "label": "军事法学", "ig": 1 }, { "id": "030114", "label": "法律硕士", "ig": 1 }, { "id": "030206", "label": "政治学理论", "ig": 1 }, { "id": "030207", "label": "中外政治制度", "ig": 1 }, { "id": "030208", "label": "科学社会主义与国际共产主义运动", "ig": 1 }, { "id": "030209", "label": "中共党史", "ig": 1 }, { "id": "030210", "label": "国际关系", "ig": 1 }, { "id": "030306", "label": "人口学", "ig": 1 }, { "id": "030307", "label": "民俗学", "ig": 1 }, { "id": "030402", "label": "马克思主义民族理论与政策", "ig": 1 }, { "id": "030403", "label": "中国少数民族经济", "ig": 1 }, { "id": "030404", "label": "中国少数民族史", "ig": 1 }, { "id": "030405", "label": "中国少数民族艺术", "ig": 1 }, { "id": "030504", "label": "马克思主义基本原理", "ig": 1 }, { "id": "030505", "label": "马克思主义发展史", "ig": 1 }, { "id": "030506", "label": "马克思主义中国化研究", "ig": 1 }, { "id": "030507", "label": "国外马克思主义研究", "ig": 1 }, { "id": "030508", "label": "中国近现代史基本问题研究", "ig": 1 }, { "id": "040110", "label": "教育学原理", "ig": 1 }, { "id": "040111", "label": "课程与教学论", "ig": 1 }, { "id": "040112", "label": "教育史", "ig": 1 }, { "id": "040113", "label": "比较教育学", "ig": 1 }, { "id": "040114", "label": "学前教育学", "ig": 1 }, { "id": "040115", "label": "高等教育学", "ig": 1 }, { "id": "040116", "label": "成人教育学", "ig": 1 }, { "id": "040117", "label": "职业技术教育学", "ig": 1 }, { "id": "040118", "label": "特殊教育学", "ig": 1 }, { "id": "040208", "label": "体育人文社会学", "ig": 1 }, { "id": "040209", "label": "体育教育训练学", "ig": 1 }, { "id": "040210", "label": "民族传统体育学", "ig": 1 }, { "id": "040301", "label": "基础心理学", "ig": 1 }, { "id": "040302", "label": "发展与教育心理学", "ig": 1 }, { "id": "040303", "label": "应用心理学", "ig": 1 }, { "id": "050108", "label": "文艺学", "ig": 1 }, { "id": "050109", "label": "语言学及应用语言学", "ig": 1 }, { "id": "050110", "label": "汉语言文字学", "ig": 1 }, { "id": "050111", "label": "中国古典文献学", "ig": 1 }, { "id": "050112", "label": "中国古代文学", "ig": 1 }, { "id": "050113", "label": "中国现当代文学", "ig": 1 }, { "id": "050114", "label": "比较文学与世界文学", "ig": 1 }, { "id": "050263", "label": "英语语言文学", "ig": 1 }, { "id": "050264", "label": "俄语语言文学", "ig": 1 }, { "id": "050265", "label": "法语语言文学", "ig": 1 }, { "id": "050266", "label": "德语语言文学", "ig": 1 }, { "id": "050267", "label": "日语语言文学", "ig": 1 }, { "id": "050268", "label": "印度语言文学", "ig": 1 }, { "id": "050269", "label": "西班牙语语言文学", "ig": 1 }, { "id": "050270", "label": "阿拉伯语语言文学", "ig": 1 }, { "id": "050271", "label": "欧洲语言文学", "ig": 1 }, { "id": "050272", "label": "亚非语言文学", "ig": 1 }, { "id": "050273", "label": "外国语言学及应用语言学", "ig": 1 }, { "id": "070104", "label": "基础数学", "ig": 1 }, { "id": "070105", "label": "计算数学", "ig": 1 }, { "id": "070106", "label": "概率论与数理统计", "ig": 1 }, { "id": "070107", "label": "应用数学", "ig": 1 }, { "id": "070108", "label": "运筹学与控制论", "ig": 1 }, { "id": "070205", "label": "理论物理", "ig": 1 }, { "id": "070206", "label": "粒子物理与原子核物理", "ig": 1 }, { "id": "070207", "label": "原子与分子物理", "ig": 1 }, { "id": "070208", "label": "等离子体物理", "ig": 1 }, { "id": "070209", "label": "凝聚态物理", "ig": 1 }, { "id": "070210", "label": "光学", "ig": 1 }, { "id": "070211", "label": "无线电物理", "ig": 1 }, { "id": "070305", "label": "无机化学", "ig": 1 }, { "id": "070306", "label": "分析化学", "ig": 1 }, { "id": "070307", "label": "有机化学", "ig": 1 }, { "id": "070308", "label": "物理化学", "ig": 1 }, { "id": "070309", "label": "高分子化学与物理", "ig": 1 }, { "id": "070402", "label": "天体物理", "ig": 1 }, { "id": "070403", "label": "天体测量与天体力学", "ig": 1 }, { "id": "070505", "label": "自然地理学", "ig": 1 }, { "id": "070506", "label": "人文地理学", "ig": 1 }, { "id": "070507", "label": "地图学与地理信息系统", "ig": 1 }, { "id": "070603", "label": "气象学", "ig": 1 }, { "id": "070604", "label": "大气物理学与大气环境", "ig": 1 }, { "id": "070705", "label": "物理海洋学", "ig": 1 }, { "id": "070706", "label": "海洋化学", "ig": 1 }, { "id": "070707", "label": "海洋生物学", "ig": 1 }, { "id": "070708", "label": "海洋地质", "ig": 1 }, { "id": "070803", "label": "固体地球物理学", "ig": 1 }, { "id": "070804", "label": "空间物理学", "ig": 1 }, { "id": "070905", "label": "矿物学、岩石学、矿床学", "ig": 1 }, { "id": "070906", "label": "古生物学与地层学", "ig": 1 }, { "id": "070907", "label": "构造地质学", "ig": 1 }, { "id": "070908", "label": "第四纪地质学", "ig": 1 }, { "id": "071005", "label": "植物学", "ig": 1 }, { "id": "071006", "label": "动物学", "ig": 1 }, { "id": "071007", "label": "生理学", "ig": 1 }, { "id": "071008", "label": "水生生物学", "ig": 1 }, { "id": "071009", "label": "微生物学", "ig": 1 }, { "id": "071010", "label": "神经生物学", "ig": 1 }, { "id": "071011", "label": "遗传学", "ig": 1 }, { "id": "071012", "label": "发育生物学", "ig": 1 }, { "id": "071013", "label": "细胞生物学", "ig": 1 }, { "id": "071014", "label": "生物化学与分子生物学", "ig": 1 }, { "id": "071015", "label": "生物物理学", "ig": 1 }, { "id": "071301", "label": "系统理论", "ig": 1 }, { "id": "071302", "label": "系统分析与集成", "ig": 1 }, { "id": "080103", "label": "一般力学与力学基础", "ig": 1 }, { "id": "080104", "label": "固体力学", "ig": 1 }, { "id": "080105", "label": "流体力学", "ig": 1 }, { "id": "080213", "label": "机械设计及理论", "ig": 1 }, { "id": "080302", "label": "精密仪器及机械", "ig": 1 }, { "id": "080415", "label": "材料物理与化学", "ig": 1 }, { "id": "080416", "label": "材料学", "ig": 1 }, { "id": "080417", "label": "材料加工工程", "ig": 1 }, { "id": "080418", "label": "冶金物理化学", "ig": 1 }, { "id": "080419", "label": "钢铁冶金", "ig": 1 }, { "id": "080420", "label": "有色金属冶金", "ig": 1 }, { "id": "080504", "label": "工程热物理", "ig": 1 }, { "id": "080505", "label": "热能工程", "ig": 1 }, { "id": "080506", "label": "动力机械及工程", "ig": 1 }, { "id": "080507", "label": "流体机械及工程", "ig": 1 }, { "id": "080508", "label": "制冷及低温工程", "ig": 1 }, { "id": "080509", "label": "化工过程机械", "ig": 1 }, { "id": "080605", "label": "电机与电器", "ig": 1 }, { "id": "080606", "label": "电力系统及其自动化", "ig": 1 }, { "id": "080607", "label": "高电压与绝缘技术", "ig": 1 }, { "id": "080608", "label": "电力电子与电力传动", "ig": 1 }, { "id": "080609", "label": "电工理论与新技术", "ig": 1 }, { "id": "080717", "label": "物理电子学", "ig": 1 }, { "id": "080718", "label": "电路与系统", "ig": 1 }, { "id": "080719", "label": "微电子学与固体电子学", "ig": 1 }, { "id": "080720", "label": "电磁场与微波技术", "ig": 1 }, { "id": "080721", "label": "通信与信息系统", "ig": 1 }, { "id": "080722", "label": "信号与信息处理", "ig": 1 }, { "id": "080910", "label": "计算机系统结构", "ig": 1 }, { "id": "080911", "label": "计算机软件与理论", "ig": 1 }, { "id": "080912", "label": "计算机应用技术", "ig": 1 }, { "id": "082805", "label": "建筑历史与理论", "ig": 1 }, { "id": "082806", "label": "建筑设计及其理论", "ig": 1 }, { "id": "082807", "label": "城市规划与设计", "ig": 1 }, { "id": "082808", "label": "建筑技术科学", "ig": 1 }, { "id": "081007", "label": "岩土工程", "ig": 1 }, { "id": "081008", "label": "结构工程", "ig": 1 }, { "id": "081009", "label": "市政工程", "ig": 1 }, { "id": "081010", "label": "供热、供燃气、通风及空调工程", "ig": 1 }, { "id": "081011", "label": "防灾减灾工程及防护工程", "ig": 1 }, { "id": "081012", "label": "桥梁与隧道工程", "ig": 1 }, { "id": "081105", "label": "水文学及水资源", "ig": 1 }, { "id": "081106", "label": "水力学及河流动力学", "ig": 1 }, { "id": "081107", "label": "水工结构工程", "ig": 1 }, { "id": "081108", "label": "港口、海岸及近海工程", "ig": 1 }, { "id": "081205", "label": "大地测量学与测量工程", "ig": 1 }, { "id": "081206", "label": "摄影测量与遥感", "ig": 1 }, { "id": "081207", "label": "地图制图学与地理信息工程", "ig": 1 }, { "id": "081306", "label": "化学工程", "ig": 1 }, { "id": "081307", "label": "化学工艺", "ig": 1 }, { "id": "081308", "label": "生物化工", "ig": 1 }, { "id": "081309", "label": "应用化学", "ig": 1 }, { "id": "081310", "label": "工业催化", "ig": 1 }, { "id": "081405", "label": "矿产普查与勘探", "ig": 1 }, { "id": "081406", "label": "地球探测与信息技术", "ig": 1 }, { "id": "081407", "label": "地质工程", "ig": 1 }, { "id": "081507", "label": "安全技术及工程", "ig": 1 }, { "id": "081508", "label": "油气井工程", "ig": 1 }, { "id": "081509", "label": "油气田开发工程", "ig": 1 }, { "id": "081605", "label": "纺织材料与纺织品设计", "ig": 1 }, { "id": "081606", "label": "纺织化学与染整工程", "ig": 1 }, { "id": "081704", "label": "制浆造纸工程", "ig": 1 }, { "id": "081705", "label": "制糖工程", "ig": 1 }, { "id": "081706", "label": "发酵工程", "ig": 1 }, { "id": "081707", "label": "皮革化学与工程", "ig": 1 }, { "id": "081809", "label": "道路与铁道工程", "ig": 1 }, { "id": "081810", "label": "交通信息工程及控制", "ig": 1 }, { "id": "081811", "label": "交通运输规划与管理", "ig": 1 }, { "id": "081812", "label": "载运工具运用工程", "ig": 1 }, { "id": "081904", "label": "船舶与海洋结构物设计制造", "ig": 1 }, { "id": "081905", "label": "轮机工程", "ig": 1 }, { "id": "081906", "label": "水声工程", "ig": 1 }, { "id": "082008", "label": "飞行器设计", "ig": 1 }, { "id": "082009", "label": "航空宇航推进理论与工程", "ig": 1 }, { "id": "082010", "label": "航空宇航制造工程", "ig": 1 }, { "id": "082011", "label": "人机与环境工程", "ig": 1 }, { "id": "082108", "label": "武器系统与运用工程", "ig": 1 }, { "id": "082109", "label": "兵器发射理论与技术", "ig": 1 }, { "id": "082110", "label": "火炮、自动武器与弹药工程", "ig": 1 }, { "id": "082111", "label": "军事化学与烟火技术", "ig": 1 }, { "id": "082205", "label": "核能科学与工程", "ig": 1 }, { "id": "082206", "label": "核燃料循环与材料", "ig": 1 }, { "id": "082207", "label": "核技术及应用", "ig": 1 }, { "id": "082208", "label": "辐射防护及环境保护", "ig": 1 }, { "id": "082306", "label": "农业机械化工程", "ig": 1 }, { "id": "082307", "label": "农业水土工程", "ig": 1 }, { "id": "082308", "label": "农业生物环境与能源工程", "ig": 1 }, { "id": "082309", "label": "农业电气化与自动化", "ig": 1 }, { "id": "082404", "label": "木材科学与技术", "ig": 1 }, { "id": "082405", "label": "林产化学加工工程", "ig": 1 }, { "id": "082709", "label": "食品科学", "ig": 1 }, { "id": "082710", "label": "粮食、油脂及植物蛋白工程", "ig": 1 }, { "id": "082711", "label": "农产品加工及贮藏工程", "ig": 1 }, { "id": "082712", "label": "水产品加工及贮藏工程", "ig": 1 }, { "id": "083201", "label": "光学工程", "ig": 1 }, { "id": "083301", "label": "控制理论与控制工程", "ig": 1 }, { "id": "083302", "label": "检测技术与自动化装置", "ig": 1 }, { "id": "083303", "label": "系统工程", "ig": 1 }, { "id": "083304", "label": "模式识别与智能系统", "ig": 1 }, { "id": "083305", "label": "导航、制导与控制", "ig": 1 }, { "id": "090112", "label": "作物栽培学与耕作学", "ig": 1 }, { "id": "090113", "label": "作物遗传育种", "ig": 1 }, { "id": "090114", "label": "果树学", "ig": 1 }, { "id": "090115", "label": "蔬菜学", "ig": 1 }, { "id": "090204", "label": "土壤学", "ig": 1 }, { "id": "090205", "label": "植物营养学", "ig": 1 }, { "id": "090206", "label": "植物病理学", "ig": 1 }, { "id": "090207", "label": "农业昆虫与害虫防治", "ig": 1 }, { "id": "090208", "label": "农药学", "ig": 1 }, { "id": "090304", "label": "动物遗传育种与繁殖", "ig": 1 }, { "id": "090305", "label": "动物营养与饲料科学", "ig": 1 }, { "id": "090306", "label": "草业科学", "ig": 1 }, { "id": "090307", "label": "特种经济动物饲养", "ig": 1 }, { "id": "090404", "label": "基础兽医学", "ig": 1 }, { "id": "090405", "label": "预防兽医学", "ig": 1 }, { "id": "090406", "label": "临床兽医学", "ig": 1 }, { "id": "090504", "label": "林木遗传育种", "ig": 1 }, { "id": "090505", "label": "森林培育", "ig": 1 }, { "id": "090506", "label": "森林保护学", "ig": 1 }, { "id": "090507", "label": "森林经理学", "ig": 1 }, { "id": "090508", "label": "野生动植物保护与利用", "ig": 1 }, { "id": "090509", "label": "园林植物与观赏园艺", "ig": 1 }, { "id": "090510", "label": "水土保持与荒漠化防治", "ig": 1 }, { "id": "090604", "label": "水产养殖", "ig": 1 }, { "id": "090605", "label": "捕捞学", "ig": 1 }, { "id": "090606", "label": "渔业资源", "ig": 1 }, { "id": "100102", "label": "人体解剖与组织胚胎学", "ig": 1 }, { "id": "100103", "label": "免疫学", "ig": 1 }, { "id": "100104", "label": "病原生物学", "ig": 1 }, { "id": "100105", "label": "病理学与病理生理学", "ig": 1 }, { "id": "100106", "label": "法医学", "ig": 1 }, { "id": "100107", "label": "放射医学", "ig": 1 }, { "id": "100108", "label": "航空、航天与航海医学", "ig": 1 }, { "id": "100207", "label": "内科学", "ig": 1 }, { "id": "100208", "label": "儿科学", "ig": 1 }, { "id": "100209", "label": "老年医学", "ig": 1 }, { "id": "100210", "label": "神经病学", "ig": 1 }, { "id": "100211", "label": "精神病与精神卫生学", "ig": 1 }, { "id": "100212", "label": "皮肤病与性病学", "ig": 1 }, { "id": "100213", "label": "影像医学与核医学", "ig": 1 }, { "id": "100214", "label": "临床检验诊断学", "ig": 1 }, { "id": "100215", "label": "护理学", "ig": 1 }, { "id": "100216", "label": "外科学", "ig": 1 }, { "id": "100217", "label": "妇产科学", "ig": 1 }, { "id": "100218", "label": "眼科学", "ig": 1 }, { "id": "100219", "label": "耳鼻咽喉科学", "ig": 1 }, { "id": "100220", "label": "肿瘤学", "ig": 1 }, { "id": "100221", "label": "康复医学与理疗学", "ig": 1 }, { "id": "100222", "label": "运动医学", "ig": 1 }, { "id": "100223", "label": "急诊医学", "ig": 1 }, { "id": "100302", "label": "口腔基础医学", "ig": 1 }, { "id": "100303", "label": "口腔临床医学", "ig": 1 }, { "id": "100406", "label": "流行病与卫生统计学", "ig": 1 }, { "id": "100407", "label": "劳动卫生与环境卫生学", "ig": 1 }, { "id": "100408", "label": "营养与食品卫生学", "ig": 1 }, { "id": "100409", "label": "儿少卫生与妇幼保健学", "ig": 1 }, { "id": "100410", "label": "卫生毒理学", "ig": 1 }, { "id": "100411", "label": "军事预防医学", "ig": 1 }, { "id": "100508", "label": "中医基础理论", "ig": 1 }, { "id": "100509", "label": "中医临床基础", "ig": 1 }, { "id": "100510", "label": "中医医史文献", "ig": 1 }, { "id": "100511", "label": "方剂学", "ig": 1 }, { "id": "100512", "label": "中医诊断学", "ig": 1 }, { "id": "100513", "label": "中医内科学", "ig": 1 }, { "id": "100514", "label": "中医外科学", "ig": 1 }, { "id": "100515", "label": "中医骨伤科学", "ig": 1 }, { "id": "100516", "label": "中医妇科学", "ig": 1 }, { "id": "100517", "label": "中医儿科学", "ig": 1 }, { "id": "100518", "label": "中医五官科学", "ig": 1 }, { "id": "100519", "label": "针灸推拿学", "ig": 1 }, { "id": "100520", "label": "民族医学", "ig": 1 }, { "id": "100602", "label": "中西医结合基础", "ig": 1 }, { "id": "100603", "label": "中西医结合临床", "ig": 1 }, { "id": "100708", "label": "药剂学", "ig": 1 }, { "id": "100709", "label": "生药学", "ig": 1 }, { "id": "100710", "label": "药物分析学", "ig": 1 }, { "id": "100711", "label": "微生物与生化药学", "ig": 1 }, { "id": "100712", "label": "药理学", "ig": 1 }, { "id": "120106", "label": "管理科学与工程", "ig": 1 }, { "id": "120215", "label": "企业管理", "ig": 1 }, { "id": "120216", "label": "旅游管理", "ig": 1 }, { "id": "120217", "label": "技术经济及管理", "ig": 1 }, { "id": "120303", "label": "林业经济管理", "ig": 1 }, { "id": "120410", "label": "社会医学与卫生事业管理", "ig": 1 }, { "id": "120411", "label": "教育经济与管理", "ig": 1 }, { "id": "120412", "label": "社会保障", "ig": 1 }, { "id": "120504", "label": "情报学", "ig": 1 }, { "id": "130102", "label": "艺术学", "ig": 1 }, { "id": "130510", "label": "设计艺术学", "ig": 1 }, { "id": "130312", "label": "戏剧戏曲学", "ig": 1 }, { "id": "130313", "label": "广播电视艺术学", "ig": 1 }];
                    var autoC = $("#dialog-search").autocomplete({
                        source: autoCompleteItems,
                        select: function (event, ui) {
                            //判断是否有重复问题
                            var isall = true;//默认没有重复
                            that.selectedList.find('li').each(function (i, v) {
                                if ($(v).attr('data-id').length === 2 || $(v).attr('data-id').length === 4) {
                                    if (ui.item.id.slice(0, 2) === $(v).attr('data-id')) {
                                        isall = false;
                                    } else if (ui.item.id.slice(0, 4) === $(v).attr('data-id')) {
                                        isall = false;
                                    } else {
                                        isall = true;
                                    }
                                } else {
                                    if ($(v).data('id') == ui.item.id) {
                                        isall = false;
                                    }
                                }
                            });
                            if (isall) {
                                that.addSearchItem(ui.item.label, ui.item.id, ui.item.ig);
                                that.leftList.find('li').each(function (i, v) {
                                    if (ui.item.id.substring(0, 2) == $(v).attr('data-id')) {
                                        $(v).addClass('hasChoose');
                                    }
                                });
                                //消除warning的提示信息
                                that.warningC.removeClass('m-warningactive');
                            }

                        },
                        open: function (e, ui) {
                            $('.ui-widget-content').css({ 'line-height': '28px', 'z-index': '11', 'background-color': '#fff', 'font-size': '14px', 'font-family': 'microsoft yahei', 'max-height': '280px', 'overflow-y': 'auto', 'overflow-x': 'hidden', 'border': '1px solid #ededed' });
                        },
                        focus: function (event, ui) {
                            $('#dialog-search').val(ui.item.label);
                        },
                       
                    }).focus(function () {
                        $(this).autocomplete("search");
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
                    //判断是否是研究生专业
                    that.isMaster = $(this).find('i').length == 0 ? false : true;
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
                                                if (that.currentId == "2028" || that.currentId == "2029" || that.currentId == "2030" || that.currentId == "2099") {
                                                    return;
                                                }
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
            addSearchItem: function (label, value, ig) {
                var numcount = $('.dialog-selected-list').children().length;
                if (numcount < 8) {
                    var li = $('<li></li>').attr('data-id', value);
                    if (ig == 0) {
                        var span = $('<span></span>').html(label).addClass('active').append('<i>×</i>').appendTo(li);
                    } else {
                        var span = $('<span></span>').html(label).addClass('active').append('<i class="i_master"></i>').append('<i>×</i>').appendTo(li);
                    }
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
                if (that.isMaster) {
                    var span = $('<span></span>').html(this.currentTxt).addClass('active').append('<i class="i_master"></i>').append('<i>×</i>').appendTo(li);
                } else {
                    var span = $('<span></span>').html(this.currentTxt).addClass('active').append('<i>×</i>').appendTo(li);
                }
                this.selectedList.append(li);
                if (that.option.isCity == true) {
                    if (that.currentId == "2028" || that.currentId == "2029" || that.currentId == "2030" || that.currentId == "2099") {
                        that.currentEle.addClass('hasListItem active');
                    } else {
                        $('.dialog-data-list').find('li').each(function (m, n) {
                            if (that.currentId == $(n).attr('data-id')) {
                                $(n).find('span').addClass('active');
                            }
                        });
                    }
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
                    showConfig: { dataListItemWidth: 70, subItemWidth: 80 },
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
                    isSearch: true,
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