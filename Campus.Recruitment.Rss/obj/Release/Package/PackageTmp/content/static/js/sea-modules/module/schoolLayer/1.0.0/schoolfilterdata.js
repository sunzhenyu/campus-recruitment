define('corp/schoolLayer/1.0.0/schoolfilterdata', [], function (require, exports, module) {

    /*
学校筛选项 0 地区 1 学校级别 2 学校专业
*/
    filterdata = {};

    filterdata.filterCity = {
        id: 0,
        name: '学校地区',
        items: [{ "id": 1001, "name": "北京" }, { "id": 1002, "name": "天津" }, { "id": 1003, "name": "上海" }, { "id": 1004, "name": "重庆" }, { "id": 2001, "name": "河北" }, { "id": 2002, "name": "山西" }, { "id": 2003, "name": "内蒙古" }, { "id": 2004, "name": "辽宁" }, { "id": 2005, "name": "吉林" }, { "id": 2006, "name": "黑龙江" }, { "id": 2007, "name": "江苏" }, { "id": 2008, "name": "浙江" }, { "id": 2009, "name": "安徽" }, { "id": 2010, "name": "福建" }, { "id": 2011, "name": "江西" }, { "id": 2012, "name": "山东" }, { "id": 2013, "name": "河南" }, { "id": 2014, "name": "湖北" }, { "id": 2015, "name": "湖南" }, { "id": 2016, "name": "广东" }, { "id": 2017, "name": "广西" }, { "id": 2018, "name": "海南" }, { "id": 2019, "name": "四川" }, { "id": 2020, "name": "贵州" }, { "id": 2021, "name": "云南" }, { "id": 2022, "name": "西藏" }, { "id": 2023, "name": "陕西" }, { "id": 2024, "name": "甘肃" }, { "id": 2025, "name": "青海" }, { "id": 2026, "name": "宁夏" }, { "id": 2027, "name": "新疆" }]
    };
    filterdata.filterLevel = {
        id: 1,
        name: '学校级别',
        items: [{
            id: 1,
            name: '985'
        }, {
            id: 2,
            name: '211'
        }, {
            id: 3,
            name: '普通一本'
        }, {
            id: 4,
            name: '普通二本'
        },
        {
            id: 5,
            name: '普通三本'
        },
        {
            id: 6,
            name:'高职高专'
        },
        {
            id: 7,
            name:'其他院校'
        }]
    };
    filterdata.filterMajor = {
        id: 2,
        name: '专业',
        items: [{ "id": "12", "name": "管理学" }, { "id": "08", "name": "工学" }, { "id": "02", "name": "经济学" }, { "id": "05", "name": "文学" }, { "id": "07", "name": "理学" }, { "id": "10", "name": "医学" }, { "id": "09", "name": "农学" }, { "id": "04", "name": "教育学" }, { "id": "13", "name": "艺术学" }, { "id": "03", "name": "法学" }, { "id": "01", "name": "哲学" }, { "id": "06", "name": "历史学" }]
    };


    module.exports = filterdata;
});