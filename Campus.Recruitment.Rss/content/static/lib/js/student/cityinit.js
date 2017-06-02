/*
* 2015-10-09 新版城市选择器
*/
var jQuery = $;
(function ($) {
    $.fn.extend({
        //cityPicker||view the cityPicker
        cityPicker: function (options) {
            var defaults = {
                trigger: '',
                inputVal: '',
                hinput: '',//隐藏元素
                positionElement: '',//定位元素
                ifClose: false, //默认点击页面其他部位不关闭选择器
                callback: function () { }
            };
            $.extend(defaults, options);
            return this.each(function () {
                //全局模块渲染参数
                var hotCity = [{ "id": 1, "items": [{ "id": 0, "items": null, "name": "全国", "pid": 1 }, { "id": 1001, "items": null, "name": "北京", "pid": 1 }, { "id": 1003, "items": null, "name": "上海", "pid": 1 }, { "id": 2016001, "items": null, "name": "广州", "pid": 2016 }, { "id": 2016003, "items": null, "name": "深圳", "pid": 2016 }, { "id": 2007001, "items": null, "name": "南京", "pid": 2007 }, { "id": 2014001, "items": null, "name": "武汉", "pid": 2014 }, { "id": 2023001, "items": null, "name": "西安", "pid": 2023 }, { "id": 2008001, "items": null, "name": "杭州", "pid": 2008 }, { "id": 1002, "items": null, "name": "天津", "pid": 1 }, { "id": 1004, "items": null, "name": "重庆", "pid": 1 }], "name": "热门城市", "pid": 0 }],
                    dataCity = [{
                        "id": 2, "items": [{
                            "id": 2016, "items": [
                                { "id": 2016, "items": null, "name": "广东", "pid": 2016 }, { "id": 2016001, "items": null, "name": "广州", "pid": 2016 }, { "id": 2016002, "items": null, "name": "韶关", "pid": 2016 }, { "id": 2016003, "items": null, "name": "深圳", "pid": 2016 }, { "id": 2016004, "items": null, "name": "珠海", "pid": 2016 }, { "id": 2016005, "items": null, "name": "汕头", "pid": 2016 }, { "id": 2016006, "items": null, "name": "佛山", "pid": 2016 }, { "id": 2016007, "items": null, "name": "江门", "pid": 2016 }, { "id": 2016008, "items": null, "name": "湛江", "pid": 2016 }, { "id": 2016009, "items": null, "name": "茂名", "pid": 2016 }, { "id": 2016010, "items": null, "name": "肇庆", "pid": 2016 }, { "id": 2016011, "items": null, "name": "惠州", "pid": 2016 }, { "id": 2016012, "items": null, "name": "梅州", "pid": 2016 }, { "id": 2016013, "items": null, "name": "汕尾", "pid": 2016 }, { "id": 2016014, "items": null, "name": "河源", "pid": 2016 }, { "id": 2016015, "items": null, "name": "阳江", "pid": 2016 }, { "id": 2016016, "items": null, "name": "清远", "pid": 2016 }, { "id": 2016017, "items": null, "name": "东莞", "pid": 2016 }, { "id": 2016018, "items": null, "name": "中山", "pid": 2016 }, { "id": 2016019, "items": null, "name": "潮州", "pid": 2016 }, { "id": 2016020, "items": null, "name": "揭阳", "pid": 2016 }, { "id": 2016021, "items": null, "name": "云浮", "pid": 2016 }, { "id": 2016022, "items": null, "name": "顺德", "pid": 2016 }, { "id": 2016023, "items": null, "name": "开平", "pid": 2016 }], "name": "广东", "pid": 2
                        }, {
                            "id": 2007, "items": [
                                { "id": 2007, "items": null, "name": "江苏", "pid": 2007 }, { "id": 2007001, "items": null, "name": "南京", "pid": 2007 }, { "id": 2007002, "items": null, "name": "无锡", "pid": 2007 }, { "id": 2007003, "items": null, "name": "徐州", "pid": 2007 }, { "id": 2007004, "items": null, "name": "常州", "pid": 2007 }, { "id": 2007005, "items": null, "name": "苏州", "pid": 2007 }, { "id": 2007006, "items": null, "name": "昆山", "pid": 2007 }, { "id": 2007007, "items": null, "name": "南通", "pid": 2007 }, { "id": 2007008, "items": null, "name": "连云港", "pid": 2007 }, { "id": 2007009, "items": null, "name": "淮安", "pid": 2007 }, { "id": 2007010, "items": null, "name": "盐城", "pid": 2007 }, { "id": 2007011, "items": null, "name": "扬州", "pid": 2007 }, { "id": 2007012, "items": null, "name": "镇江", "pid": 2007 }, { "id": 2007013, "items": null, "name": "泰州", "pid": 2007 }, { "id": 2007014, "items": null, "name": "宿迁", "pid": 2007 }, { "id": 2007015, "items": null, "name": "靖江", "pid": 2007 }, { "id": 2007016, "items": null, "name": "常熟", "pid": 2007 }, { "id": 2007017, "items": null, "name": "江阴", "pid": 2007 }, { "id": 2007018, "items": null, "name": "张家港", "pid": 2007 }, { "id": 2007019, "items": null, "name": "太仓市", "pid": 2007 }, { "id": 2007020, "items": null, "name": "吴江", "pid": 2007 }, { "id": 2007021, "items": null, "name": "丹阳", "pid": 2007 }, { "id": 2007022, "items": null, "name": "溧阳", "pid": 2007 }, { "id": 2007023, "items": null, "name": "泰兴", "pid": 2007 }, { "id": 2007024, "items": null, "name": "宜兴", "pid": 2007 }], "name": "江苏", "pid": 2
                        }, {
                            "id": 2008, "items": [
                                { "id": 2008, "items": null, "name": "浙江", "pid": 2008 }, { "id": 2008001, "items": null, "name": "杭州", "pid": 2008 }, { "id": 2008002, "items": null, "name": "宁波", "pid": 2008 }, { "id": 2008003, "items": null, "name": "温州", "pid": 2008 }, { "id": 2008004, "items": null, "name": "嘉兴", "pid": 2008 }, { "id": 2008005, "items": null, "name": "湖州", "pid": 2008 }, { "id": 2008006, "items": null, "name": "绍兴", "pid": 2008 }, { "id": 2008007, "items": null, "name": "金华", "pid": 2008 }, { "id": 2008008, "items": null, "name": "衢州", "pid": 2008 }, { "id": 2008009, "items": null, "name": "舟山", "pid": 2008 }, { "id": 2008010, "items": null, "name": "台州", "pid": 2008 }, { "id": 2008011, "items": null, "name": "丽水", "pid": 2008 }, { "id": 2008012, "items": null, "name": "玉环县", "pid": 2008 }, { "id": 2008013, "items": null, "name": "方家山", "pid": 2008 }, { "id": 2008014, "items": null, "name": "萧山", "pid": 2008 }, { "id": 2008015, "items": null, "name": "义乌", "pid": 2008 }, { "id": 2008016, "items": null, "name": "慈溪", "pid": 2008 }, { "id": 2008017, "items": null, "name": "海宁", "pid": 2008 }], "name": "浙江", "pid": 2
                        }, {
                            "id": 2012, "items": [
                                { "id": 2012, "items": null, "name": "山东", "pid": 2012 }, { "id": 2012001, "items": null, "name": "济南", "pid": 2012 }, { "id": 2012002, "items": null, "name": "青岛", "pid": 2012 }, { "id": 2012003, "items": null, "name": "淄博", "pid": 2012 }, { "id": 2012004, "items": null, "name": "枣庄", "pid": 2012 }, { "id": 2012005, "items": null, "name": "东营", "pid": 2012 }, { "id": 2012006, "items": null, "name": "烟台", "pid": 2012 }, { "id": 2012007, "items": null, "name": "潍坊", "pid": 2012 }, { "id": 2012008, "items": null, "name": "济宁", "pid": 2012 }, { "id": 2012009, "items": null, "name": "泰安", "pid": 2012 }, { "id": 2012010, "items": null, "name": "威海", "pid": 2012 }, { "id": 2012011, "items": null, "name": "日照", "pid": 2012 }, { "id": 2012012, "items": null, "name": "莱芜", "pid": 2012 }, { "id": 2012013, "items": null, "name": "临沂", "pid": 2012 }, { "id": 2012014, "items": null, "name": "德州", "pid": 2012 }, { "id": 2012015, "items": null, "name": "聊城", "pid": 2012 }, { "id": 2012016, "items": null, "name": "滨州", "pid": 2012 }, { "id": 2012017, "items": null, "name": "菏泽", "pid": 2012 }, { "id": 2012018, "items": null, "name": "章丘市", "pid": 2012 }, { "id": 2012019, "items": null, "name": "荣成", "pid": 2012 }], "name": "山东", "pid": 2
                        }, {
                            "id": 2023, "items": [
                                { "id": 2023, "items": null, "name": "陕西", "pid": 2023 }, { "id": 2023001, "items": null, "name": "西安", "pid": 2023 }, { "id": 2023002, "items": null, "name": "铜川", "pid": 2023 }, { "id": 2023003, "items": null, "name": "宝鸡", "pid": 2023 }, { "id": 2023004, "items": null, "name": "咸阳", "pid": 2023 }, { "id": 2023005, "items": null, "name": "渭南", "pid": 2023 }, { "id": 2023006, "items": null, "name": "延安", "pid": 2023 }, { "id": 2023007, "items": null, "name": "汉中", "pid": 2023 }, { "id": 2023008, "items": null, "name": "榆林", "pid": 2023 }, { "id": 2023009, "items": null, "name": "安康", "pid": 2023 }, { "id": 2023010, "items": null, "name": "商洛", "pid": 2023 }, { "id": 2023011, "items": null, "name": "杨凌", "pid": 2023 }], "name": "陕西", "pid": 2
                        }, {
                            "id": 2019, "items": [
                                { "id": 2019, "items": null, "name": "四川", "pid": 2019 }, { "id": 2019001, "items": null, "name": "成都", "pid": 2019 }, { "id": 2019002, "items": null, "name": "自贡", "pid": 2019 }, { "id": 2019003, "items": null, "name": "攀枝花", "pid": 2019 }, { "id": 2019004, "items": null, "name": "泸州", "pid": 2019 }, { "id": 2019005, "items": null, "name": "德阳", "pid": 2019 }, { "id": 2019006, "items": null, "name": "绵阳", "pid": 2019 }, { "id": 2019007, "items": null, "name": "广元", "pid": 2019 }, { "id": 2019008, "items": null, "name": "遂宁", "pid": 2019 }, { "id": 2019009, "items": null, "name": "内江", "pid": 2019 }, { "id": 2019010, "items": null, "name": "乐山", "pid": 2019 }, { "id": 2019011, "items": null, "name": "南充", "pid": 2019 }, { "id": 2019012, "items": null, "name": "眉山", "pid": 2019 }, { "id": 2019013, "items": null, "name": "宜宾", "pid": 2019 }, { "id": 2019014, "items": null, "name": "广安", "pid": 2019 }, { "id": 2019015, "items": null, "name": "达州", "pid": 2019 }, { "id": 2019016, "items": null, "name": "雅安", "pid": 2019 }, { "id": 2019017, "items": null, "name": "巴中", "pid": 2019 }, { "id": 2019018, "items": null, "name": "资阳", "pid": 2019 }, { "id": 2019019, "items": null, "name": "西昌", "pid": 2019 }, { "id": 2019020, "items": null, "name": "阿坝", "pid": 2019 }, { "id": 2019021, "items": null, "name": "甘孜", "pid": 2019 }, { "id": 2019022, "items": null, "name": "凉山", "pid": 2019 }], "name": "四川", "pid": 2
                        }, {
                            "id": 2014, "items": [
                                { "id": 2014, "items": null, "name": "湖北", "pid": 2014 }, { "id": 2014001, "items": null, "name": "武汉", "pid": 2014 }, { "id": 2014002, "items": null, "name": "黄石", "pid": 2014 }, { "id": 2014003, "items": null, "name": "十堰", "pid": 2014 }, { "id": 2014004, "items": null, "name": "宜昌", "pid": 2014 }, { "id": 2014005, "items": null, "name": "襄阳", "pid": 2014 }, { "id": 2014006, "items": null, "name": "鄂州", "pid": 2014 }, { "id": 2014007, "items": null, "name": "荆门", "pid": 2014 }, { "id": 2014008, "items": null, "name": "孝感", "pid": 2014 }, { "id": 2014009, "items": null, "name": "荆州", "pid": 2014 }, { "id": 2014010, "items": null, "name": "黄冈", "pid": 2014 }, { "id": 2014011, "items": null, "name": "咸宁", "pid": 2014 }, { "id": 2014012, "items": null, "name": "随州", "pid": 2014 }, { "id": 2014013, "items": null, "name": "仙桃", "pid": 2014 }, { "id": 2014014, "items": null, "name": "潜江", "pid": 2014 }, { "id": 2014015, "items": null, "name": "天门", "pid": 2014 }, { "id": 2014016, "items": null, "name": "神农架", "pid": 2014 }, { "id": 2014017, "items": null, "name": "恩施", "pid": 2014 }], "name": "湖北", "pid": 2
                        }, {
                            "id": 2015, "items": [
                                { "id": 2015, "items": null, "name": "湖南", "pid": 2015 }, { "id": 2015001, "items": null, "name": "长沙", "pid": 2015 }, { "id": 2015002, "items": null, "name": "株洲", "pid": 2015 }, { "id": 2015003, "items": null, "name": "湘潭", "pid": 2015 }, { "id": 2015004, "items": null, "name": "衡阳", "pid": 2015 }, { "id": 2015005, "items": null, "name": "邵阳", "pid": 2015 }, { "id": 2015006, "items": null, "name": "岳阳", "pid": 2015 }, { "id": 2015007, "items": null, "name": "常德", "pid": 2015 }, { "id": 2015008, "items": null, "name": "张家界", "pid": 2015 }, { "id": 2015009, "items": null, "name": "益阳", "pid": 2015 }, { "id": 2015010, "items": null, "name": "郴州", "pid": 2015 }, { "id": 2015011, "items": null, "name": "永州", "pid": 2015 }, { "id": 2015012, "items": null, "name": "怀化", "pid": 2015 }, { "id": 2015013, "items": null, "name": "娄底", "pid": 2015 }, { "id": 2015014, "items": null, "name": "湘西", "pid": 2015 }], "name": "湖南", "pid": 2
                        }, {
                            "id": 2001, "items": [
                                { "id": 2001, "items": null, "name": "河北", "pid": 2001 }, { "id": 2001001, "items": null, "name": "石家庄", "pid": 2001 }, { "id": 2001002, "items": null, "name": "唐山", "pid": 2001 }, { "id": 2001003, "items": null, "name": "秦皇岛", "pid": 2001 }, { "id": 2001004, "items": null, "name": "邯郸", "pid": 2001 }, { "id": 2001005, "items": null, "name": "邢台", "pid": 2001 }, { "id": 2001006, "items": null, "name": "保定", "pid": 2001 }, { "id": 2001007, "items": null, "name": "张家口", "pid": 2001 }, { "id": 2001008, "items": null, "name": "承德", "pid": 2001 }, { "id": 2001009, "items": null, "name": "沧州", "pid": 2001 }, { "id": 2001010, "items": null, "name": "廊坊", "pid": 2001 }, { "id": 2001011, "items": null, "name": "衡水", "pid": 2001 }], "name": "河北", "pid": 2
                        }, {
                            "id": 2013, "items": [
                                { "id": 2013, "items": null, "name": "河南", "pid": 2013 }, { "id": 2013001, "items": null, "name": "郑州", "pid": 2013 }, { "id": 2013002, "items": null, "name": "开封", "pid": 2013 }, { "id": 2013003, "items": null, "name": "洛阳", "pid": 2013 }, { "id": 2013004, "items": null, "name": "平顶山", "pid": 2013 }, { "id": 2013005, "items": null, "name": "安阳", "pid": 2013 }, { "id": 2013006, "items": null, "name": "鹤壁", "pid": 2013 }, { "id": 2013007, "items": null, "name": "新乡", "pid": 2013 }, { "id": 2013008, "items": null, "name": "焦作", "pid": 2013 }, { "id": 2013009, "items": null, "name": "濮阳", "pid": 2013 }, { "id": 2013010, "items": null, "name": "许昌", "pid": 2013 }, { "id": 2013011, "items": null, "name": "漯河", "pid": 2013 }, { "id": 2013012, "items": null, "name": "三门峡", "pid": 2013 }, { "id": 2013013, "items": null, "name": "南阳", "pid": 2013 }, { "id": 2013014, "items": null, "name": "商丘", "pid": 2013 }, { "id": 2013015, "items": null, "name": "信阳", "pid": 2013 }, { "id": 2013016, "items": null, "name": "周口", "pid": 2013 }, { "id": 2013017, "items": null, "name": "驻马店", "pid": 2013 }, { "id": 2013018, "items": null, "name": "济源", "pid": 2013 }], "name": "河南", "pid": 2
                        }, {
                            "id": 2010, "items": [
                                { "id": 2010, "items": null, "name": "福建", "pid": 2010 }, { "id": 2010001, "items": null, "name": "福州", "pid": 2010 }, { "id": 2010002, "items": null, "name": "厦门", "pid": 2010 }, { "id": 2010003, "items": null, "name": "莆田", "pid": 2010 }, { "id": 2010004, "items": null, "name": "三明", "pid": 2010 }, { "id": 2010005, "items": null, "name": "泉州", "pid": 2010 }, { "id": 2010006, "items": null, "name": "泉港区", "pid": 2010 }, { "id": 2010007, "items": null, "name": "漳州", "pid": 2010 }, { "id": 2010008, "items": null, "name": "南平", "pid": 2010 }, { "id": 2010009, "items": null, "name": "龙岩", "pid": 2010 }, { "id": 2010010, "items": null, "name": "宁德", "pid": 2010 }], "name": "福建", "pid": 2
                        }, {
                            "id": 2009, "items": [
                                { "id": 2009, "items": null, "name": "安徽", "pid": 2009 }, { "id": 2009001, "items": null, "name": "合肥", "pid": 2009 }, { "id": 2009002, "items": null, "name": "芜湖", "pid": 2009 }, { "id": 2009003, "items": null, "name": "蚌埠", "pid": 2009 }, { "id": 2009004, "items": null, "name": "淮南", "pid": 2009 }, { "id": 2009005, "items": null, "name": "马鞍山", "pid": 2009 }, { "id": 2009006, "items": null, "name": "淮北", "pid": 2009 }, { "id": 2009007, "items": null, "name": "铜陵", "pid": 2009 }, { "id": 2009008, "items": null, "name": "安庆", "pid": 2009 }, { "id": 2009009, "items": null, "name": "黄山", "pid": 2009 }, { "id": 2009010, "items": null, "name": "滁州", "pid": 2009 }, { "id": 2009011, "items": null, "name": "阜阳", "pid": 2009 }, { "id": 2009012, "items": null, "name": "宿州", "pid": 2009 }, { "id": 2009013, "items": null, "name": "巢湖", "pid": 2009 }, { "id": 2009014, "items": null, "name": "六安", "pid": 2009 }, { "id": 2009015, "items": null, "name": "亳州", "pid": 2009 }, { "id": 2009016, "items": null, "name": "池州", "pid": 2009 }, { "id": 2009017, "items": null, "name": "宣城", "pid": 2009 }], "name": "安徽", "pid": 2
                        }, {
                            "id": 2002, "items": [
                                { "id": 2002, "items": null, "name": "山西", "pid": 2002 }, { "id": 2002001, "items": null, "name": "太原", "pid": 2002 }, { "id": 2002002, "items": null, "name": "大同", "pid": 2002 }, { "id": 2002003, "items": null, "name": "阳泉", "pid": 2002 }, { "id": 2002004, "items": null, "name": "长治", "pid": 2002 }, { "id": 2002005, "items": null, "name": "晋城", "pid": 2002 }, { "id": 2002006, "items": null, "name": "朔州", "pid": 2002 }, { "id": 2002007, "items": null, "name": "晋中", "pid": 2002 }, { "id": 2002008, "items": null, "name": "运城", "pid": 2002 }, { "id": 2002009, "items": null, "name": "忻州", "pid": 2002 }, { "id": 2002010, "items": null, "name": "临汾", "pid": 2002 }, { "id": 2002011, "items": null, "name": "吕梁", "pid": 2002 }, { "id": 2002012, "items": null, "name": "永济市", "pid": 2002 }], "name": "山西", "pid": 2
                        }, {
                            "id": 2011, "items": [
                                { "id": 2011, "items": null, "name": "江西", "pid": 2011 }, { "id": 2011001, "items": null, "name": "南昌", "pid": 2011 }, { "id": 2011002, "items": null, "name": "景德镇", "pid": 2011 }, { "id": 2011003, "items": null, "name": "萍乡", "pid": 2011 }, { "id": 2011004, "items": null, "name": "九江", "pid": 2011 }, { "id": 2011005, "items": null, "name": "新余", "pid": 2011 }, { "id": 2011006, "items": null, "name": "鹰潭", "pid": 2011 }, { "id": 2011007, "items": null, "name": "赣州", "pid": 2011 }, { "id": 2011008, "items": null, "name": "吉安", "pid": 2011 }, { "id": 2011009, "items": null, "name": "宜春", "pid": 2011 }, { "id": 2011010, "items": null, "name": "抚州", "pid": 2011 }, { "id": 2011011, "items": null, "name": "上饶", "pid": 2011 }], "name": "江西", "pid": 2
                        }, {
                            "id": 2020, "items": [
                                { "id": 2020, "items": null, "name": "贵州", "pid": 2020 }, { "id": 2020001, "items": null, "name": "贵阳", "pid": 2020 }, { "id": 2020002, "items": null, "name": "六盘水", "pid": 2020 }, { "id": 2020003, "items": null, "name": "遵义", "pid": 2020 }, { "id": 2020004, "items": null, "name": "安顺", "pid": 2020 }, { "id": 2020005, "items": null, "name": "铜仁地区", "pid": 2020 }, { "id": 2020006, "items": null, "name": "黔西南", "pid": 2020 }, { "id": 2020007, "items": null, "name": "毕节地区", "pid": 2020 }, { "id": 2020008, "items": null, "name": "黔东南", "pid": 2020 }, { "id": 2020009, "items": null, "name": "黔南", "pid": 2020 }], "name": "贵州", "pid": 2
                        }, {
                            "id": 2004, "items": [
                                { "id": 2004, "items": null, "name": "辽宁", "pid": 2004 }, { "id": 2004001, "items": null, "name": "沈阳", "pid": 2004 }, { "id": 2004002, "items": null, "name": "大连", "pid": 2004 }, { "id": 2004003, "items": null, "name": "鞍山", "pid": 2004 }, { "id": 2004004, "items": null, "name": "抚顺", "pid": 2004 }, { "id": 2004005, "items": null, "name": "本溪", "pid": 2004 }, { "id": 2004006, "items": null, "name": "丹东", "pid": 2004 }, { "id": 2004007, "items": null, "name": "锦州", "pid": 2004 }, { "id": 2004008, "items": null, "name": "营口", "pid": 2004 }, { "id": 2004009, "items": null, "name": "阜新", "pid": 2004 }, { "id": 2004010, "items": null, "name": "辽阳", "pid": 2004 }, { "id": 2004011, "items": null, "name": "盘锦", "pid": 2004 }, { "id": 2004012, "items": null, "name": "铁岭", "pid": 2004 }, { "id": 2004013, "items": null, "name": "朝阳", "pid": 2004 }, { "id": 2004014, "items": null, "name": "葫芦岛", "pid": 2004 }], "name": "辽宁", "pid": 2
                        }, {
                            "id": 2005, "items": [
                                { "id": 2005, "items": null, "name": "吉林", "pid": 2005 }, { "id": 2005001, "items": null, "name": "长春", "pid": 2005 }, { "id": 2005002, "items": null, "name": "吉林", "pid": 2005 }, { "id": 2005003, "items": null, "name": "四平", "pid": 2005 }, { "id": 2005004, "items": null, "name": "辽源", "pid": 2005 }, { "id": 2005005, "items": null, "name": "通化", "pid": 2005 }, { "id": 2005006, "items": null, "name": "白山", "pid": 2005 }, { "id": 2005007, "items": null, "name": "松原", "pid": 2005 }, { "id": 2005008, "items": null, "name": "白城", "pid": 2005 }, { "id": 2005009, "items": null, "name": "延吉", "pid": 2005 }, { "id": 2005010, "items": null, "name": "延边", "pid": 2005 }], "name": "吉林", "pid": 2
                        }, {
                            "id": 2006, "items": [
                                { "id": 2006, "items": null, "name": "黑龙江", "pid": 2006 }, { "id": 2006001, "items": null, "name": "哈尔滨", "pid": 2006 }, { "id": 2006002, "items": null, "name": "齐齐哈尔", "pid": 2006 }, { "id": 2006003, "items": null, "name": "鸡西", "pid": 2006 }, { "id": 2006004, "items": null, "name": "鹤岗", "pid": 2006 }, { "id": 2006005, "items": null, "name": "双鸭山", "pid": 2006 }, { "id": 2006006, "items": null, "name": "大庆", "pid": 2006 }, { "id": 2006007, "items": null, "name": "伊春", "pid": 2006 }, { "id": 2006008, "items": null, "name": "佳木斯", "pid": 2006 }, { "id": 2006009, "items": null, "name": "七台河", "pid": 2006 }, { "id": 2006010, "items": null, "name": "牡丹江", "pid": 2006 }, { "id": 2006011, "items": null, "name": "黑河", "pid": 2006 }, { "id": 2006012, "items": null, "name": "绥化", "pid": 2006 }, { "id": 2006013, "items": null, "name": "大兴安岭", "pid": 2006 }], "name": "黑龙江", "pid": 2
                        }, {
                            "id": 2003, "items": [
                                { "id": 2003, "items": null, "name": "内蒙古", "pid": 2003 }, { "id": 2003001, "items": null, "name": "呼和浩特", "pid": 2003 }, { "id": 2003002, "items": null, "name": "包头", "pid": 2003 }, { "id": 2003003, "items": null, "name": "乌海", "pid": 2003 }, { "id": 2003004, "items": null, "name": "赤峰", "pid": 2003 }, { "id": 2003005, "items": null, "name": "通辽", "pid": 2003 }, { "id": 2003006, "items": null, "name": "鄂尔多斯", "pid": 2003 }, { "id": 2003007, "items": null, "name": "呼伦贝尔", "pid": 2003 }, { "id": 2003008, "items": null, "name": "兴安盟", "pid": 2003 }, { "id": 2003009, "items": null, "name": "锡林郭勒", "pid": 2003 }, { "id": 2003010, "items": null, "name": "乌兰察布", "pid": 2003 }, { "id": 2003011, "items": null, "name": "巴彦淖尔", "pid": 2003 }, { "id": 2003012, "items": null, "name": "阿拉善盟", "pid": 2003 }], "name": "内蒙古", "pid": 2
                        }, {
                            "id": 2024, "items": [
                                { "id": 2024, "items": null, "name": "甘肃", "pid": 2024 }, { "id": 2024001, "items": null, "name": "兰州", "pid": 2024 }, { "id": 2024002, "items": null, "name": "嘉峪关", "pid": 2024 }, { "id": 2024003, "items": null, "name": "金昌", "pid": 2024 }, { "id": 2024004, "items": null, "name": "白银", "pid": 2024 }, { "id": 2024005, "items": null, "name": "天水", "pid": 2024 }, { "id": 2024006, "items": null, "name": "武威", "pid": 2024 }, { "id": 2024007, "items": null, "name": "张掖", "pid": 2024 }, { "id": 2024008, "items": null, "name": "平凉", "pid": 2024 }, { "id": 2024009, "items": null, "name": "酒泉", "pid": 2024 }, { "id": 2024010, "items": null, "name": "庆阳", "pid": 2024 }, { "id": 2024011, "items": null, "name": "定西", "pid": 2024 }, { "id": 2024012, "items": null, "name": "陇南", "pid": 2024 }, { "id": 2024013, "items": null, "name": "临夏", "pid": 2024 }, { "id": 2024014, "items": null, "name": "甘南", "pid": 2024 }], "name": "甘肃", "pid": 2
                        }, {
                            "id": 2017, "items": [
                                { "id": 2017, "items": null, "name": "广西", "pid": 2017 }, { "id": 2017001, "items": null, "name": "南宁", "pid": 2017 }, { "id": 2017002, "items": null, "name": "柳州", "pid": 2017 }, { "id": 2017003, "items": null, "name": "桂林", "pid": 2017 }, { "id": 2017004, "items": null, "name": "梧州", "pid": 2017 }, { "id": 2017005, "items": null, "name": "北海", "pid": 2017 }, { "id": 2017006, "items": null, "name": "防城港", "pid": 2017 }, { "id": 2017007, "items": null, "name": "钦州", "pid": 2017 }, { "id": 2017008, "items": null, "name": "贵港", "pid": 2017 }, { "id": 2017009, "items": null, "name": "玉林", "pid": 2017 }, { "id": 2017010, "items": null, "name": "百色", "pid": 2017 }, { "id": 2017011, "items": null, "name": "贺州", "pid": 2017 }, { "id": 2017012, "items": null, "name": "河池", "pid": 2017 }, { "id": 2017013, "items": null, "name": "来宾", "pid": 2017 }, { "id": 2017014, "items": null, "name": "崇左", "pid": 2017 }], "name": "广西", "pid": 2
                        }, {
                            "id": 2021, "items": [
                                { "id": 2021, "items": null, "name": "云南", "pid": 2021 }, { "id": 2021001, "items": null, "name": "昆明", "pid": 2021 }, { "id": 2021002, "items": null, "name": "曲靖", "pid": 2021 }, { "id": 2021003, "items": null, "name": "玉溪", "pid": 2021 }, { "id": 2021004, "items": null, "name": "保山", "pid": 2021 }, { "id": 2021005, "items": null, "name": "昭通", "pid": 2021 }, { "id": 2021006, "items": null, "name": "临沧", "pid": 2021 }, { "id": 2021007, "items": null, "name": "丽江", "pid": 2021 }, { "id": 2021008, "items": null, "name": "普洱", "pid": 2021 }, { "id": 2021009, "items": null, "name": "文山", "pid": 2021 }, { "id": 2021010, "items": null, "name": "西双版纳", "pid": 2021 }, { "id": 2021011, "items": null, "name": "楚雄", "pid": 2021 }, { "id": 2021012, "items": null, "name": "红河", "pid": 2021 }, { "id": 2021013, "items": null, "name": "大理", "pid": 2021 }, { "id": 2021014, "items": null, "name": "德宏", "pid": 2021 }, { "id": 2021015, "items": null, "name": "怒江", "pid": 2021 }, { "id": 2021016, "items": null, "name": "迪庆", "pid": 2021 }], "name": "云南", "pid": 2
                        }, {
                            "id": 2018, "items": [
                                { "id": 2018, "items": null, "name": "海南", "pid": 2018 }, { "id": 2018001, "items": null, "name": "海口", "pid": 2018 }, { "id": 2018002, "items": null, "name": "三亚", "pid": 2018 }, { "id": 2018003, "items": null, "name": "文昌", "pid": 2018 }, { "id": 2018004, "items": null, "name": "琼海", "pid": 2018 }, { "id": 2018005, "items": null, "name": "万宁", "pid": 2018 }, { "id": 2018006, "items": null, "name": "儋州", "pid": 2018 }, { "id": 2018007, "items": null, "name": "东方", "pid": 2018 }, { "id": 2018008, "items": null, "name": "五指山", "pid": 2018 }, { "id": 2018009, "items": null, "name": "洋浦市", "pid": 2018 }], "name": "海南", "pid": 2
                        }, {
                            "id": 2026, "items": [
                                { "id": 2026, "items": null, "name": "宁夏", "pid": 2026 }, { "id": 2026001, "items": null, "name": "银川", "pid": 2026 }, { "id": 2026002, "items": null, "name": "石嘴山", "pid": 2026 }, { "id": 2026003, "items": null, "name": "吴忠", "pid": 2026 }, { "id": 2026004, "items": null, "name": "固原", "pid": 2026 }, { "id": 2026005, "items": null, "name": "中卫", "pid": 2026 }], "name": "宁夏", "pid": 2
                        }, {
                            "id": 2027, "items": [
                                { "id": 2027, "items": null, "name": "新疆", "pid": 2027 }, { "id": 2027001, "items": null, "name": "乌鲁木齐", "pid": 2027 }, { "id": 2027002, "items": null, "name": "克拉玛依", "pid": 2027 }, { "id": 2027003, "items": null, "name": "吐鲁番", "pid": 2027 }, { "id": 2027004, "items": null, "name": "哈密地区", "pid": 2027 }, { "id": 2027005, "items": null, "name": "喀什地区", "pid": 2027 }, { "id": 2027006, "items": null, "name": "和田", "pid": 2027 }, { "id": 2027007, "items": null, "name": "石河子", "pid": 2027 }, { "id": 2027008, "items": null, "name": "阿拉尔", "pid": 2027 }, { "id": 2027009, "items": null, "name": "五家渠", "pid": 2027 }, { "id": 2027010, "items": null, "name": "图木舒克", "pid": 2027 }, { "id": 2027011, "items": null, "name": "博尔塔拉", "pid": 2027 }, { "id": 2027012, "items": null, "name": "巴音郭楞", "pid": 2027 }, { "id": 2027013, "items": null, "name": "阿克苏", "pid": 2027 }, { "id": 2027014, "items": null, "name": "克孜勒苏", "pid": 2027 }, { "id": 2027015, "items": null, "name": "昌吉", "pid": 2027 }, { "id": 2027016, "items": null, "name": "塔城地区", "pid": 2027 }, { "id": 2027017, "items": null, "name": "伊犁", "pid": 2027 }, { "id": 2027018, "items": null, "name": "阿勒泰", "pid": 2027 }], "name": "新疆", "pid": 2
                        }, {
                            "id": 2025, "items": [
                                { "id": 2025, "items": null, "name": "青海", "pid": 2025 }, { "id": 2025001, "items": null, "name": "西宁", "pid": 2025 }, { "id": 2025002, "items": null, "name": "海东地区", "pid": 2025 }, { "id": 2025003, "items": null, "name": "海北", "pid": 2025 }, { "id": 2025004, "items": null, "name": "黄南", "pid": 2025 }, { "id": 2025005, "items": null, "name": "海南", "pid": 2025 }, { "id": 2025006, "items": null, "name": "果洛", "pid": 2025 }, { "id": 2025007, "items": null, "name": "玉树", "pid": 2025 }, { "id": 2025008, "items": null, "name": "海西", "pid": 2025 }], "name": "青海", "pid": 2
                        }, {
                            "id": 2022, "items": [
                                { "id": 2022, "items": null, "name": "西藏", "pid": 2022 }, { "id": 2022001, "items": null, "name": "拉萨", "pid": 2022 }, { "id": 2022002, "items": null, "name": "昌都地区", "pid": 2022 }, { "id": 2022003, "items": null, "name": "山南地区", "pid": 2022 }, { "id": 2022004, "items": null, "name": "日喀则", "pid": 2022 }, { "id": 2022005, "items": null, "name": "那曲地区", "pid": 2022 }, { "id": 2022006, "items": null, "name": "阿里地区", "pid": 2022 }, { "id": 2022007, "items": null, "name": "林芝地区", "pid": 2022 }], "name": "西藏", "pid": 2
                        }, { "id": 2028, "items": null, "name": "香港", "pid": 2 }, { "id": 2029, "items": null, "name": "澳门", "pid": 2 }, { "id": 2030, "items": null, "name": "台湾", "pid": 2 }, { "id": 2099, "items": null, "name": "海外", "pid": 2 }], "name": "其他省市", "pid": 0
                    }],
                    isExact = false;//判断是否是香港，澳门，台湾，海外
                init();
                function init() {
                    if ($("#citySelect")[0]) {
                        initSecondpro();
                        show();
                    } else {
                        domReady(options.trigger);
                        initSecondpro();
                        //events listener
                        bindEvent();
                    }
                }
                function domReady(trigger) {
                    var template = $('<div id="citySelect" class="dn">'
                                        + '<div class="citylist listfirst">'
                                            + '<h3>热门城市：</h3>'
                                                + '<ul>'
                                                    + hotcity(hotCity)
                                                + '</ul>'
                                        + '</div>'
                                        + '<div class="citylist listlast">'
                                            + '<h3>其他省市：</h3>'
                                                + '<ul>'
                                                    + otherPro(dataCity)
                                                + '</ul>'
                                        + '</div>'
                                    + '</div>');
                    $(trigger).append(template);
                    show();
                }
                function show() {
                    var left = $(options.positionElement).position().left,
                        top = $(options.positionElement).position().top + $(options.positionElement).outerHeight(true) - 1;
                    $('#citySelect').css({ 'left': left, 'top': top }).show().removeClass('dn');
                }
                //一级热门城市
                function hotcity(hotCity) {
                    var innerLi = '';
                    $.each(hotCity[0].items, function (m, n) {
                        innerLi += '<li data-id="' + n.id + '">' + n.name + '</li>'
                    })
                    return innerLi;
                }
                //一级省份
                function otherPro(dataCity) {
                    var otherLi = '';
                    var i = 1;
                    $.each(dataCity[0].items, function (m, n) {
                        if ((m + 1) % 7 != 0) {
                            otherLi += '<li data-index="' + m + '" data-id="' + n.id + '">' + n.name + '</li>';
                        } else {
                            otherLi += '<li data-index="' + m + '" data-id="' + n.id + '" class="flag">' + n.name + '</li>';
                            i++;
                        }
                    })
                    return otherLi;
                }
                //二级省份城市
                function secondPro(index) {
                    var tempLi = '';
                    if (dataCity[0].items[index].items) {
                        $.each(dataCity[0].items[index].items, function (m, n) {
                            tempLi += '<li data-id="' + n.id + '">' + n.name + '</li>';
                        })
                        isExact = false;
                    } else {
                        isExact = true;
                    }
                    return tempLi;
                }
                function bindEvent() {
                    $('#citySelect').on('click', function (e) {
                        var e = e || window.event;
                        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                    })
                    $('.listfirst li').click(function () {
                        ord($(this));
                    });
                    $('.listlast li').on('click', function () {
                        initSecondpro();
                        var index = $(this).attr('data-index'),
                        temp = $('<li class="inner-div"><ul>' + secondPro(index) + '</ul></li>');
                        //判断是否是香港，澳门，台湾，海外
                        if (!isExact) {
                            //判断是不是最后一个元素，如果是在之后插入，如果不是在下一个flag之后插入
                            if ($(this).hasClass('flag')) {
                                $(this).after(temp);
                            } else {
                                $(this).nextAll('.flag:first').after(temp);
                            }
                            $(this).css({ 'border': '1px solid #5db664', 'border-bottom': '1px solid #fff', 'margin-bottom': '-1px', 'z-index': '1' });
                        } else {
                            ord($(this))
                        }
                        bindDEvent();
                    });
                    if (options.ifClose) {
                        $(document).off();
                        $(document).on('click', function (e) {
                            if (e.delegateTarget.id !== 'citySelect') {
                                $('#citySelect').remove();
                            }
                        });
                    }
                };
                //对展开的二级城市重新打开初始化
                function initSecondpro() {
                    $('.listlast li').css({ 'border': '0 none', 'border-bottom': '0 none', 'margin-bottom': '0', 'z-index': '0' });
                    $('.listlast .inner-div').remove();
                }
                function ord(_this) {
                    $(options.inputVal).text(_this.text());
                    $(options.hinput).val(_this.attr('data-id'));
                    $('#citySelect').remove();
                    $('.search-location i').removeClass('animationR');
                    $('#cityName').css('border', '1px solid #f90');
                    window.clickNum = 0;
                    defaults.callback();
                }
                function bindDEvent() {
                    $('.inner-div li').on('click', function (e) {
                        ord($(this));
                        var e = event || window.event;
                        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                    })
                }
            });
        }
    });
})(jQuery);
