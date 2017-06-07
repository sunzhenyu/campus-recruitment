$(function () {
    window.clickNum = 0;
    $(document).on("click", ".search-job", function (f) {
        if ($(".s-job").hasClass("dN")) {
            if (!$(".hot-link").hasClass("dN")) { $(".hot-link").addClass("dN") }
            $(".s-job").removeClass("dN");
            $(".search-job i").addClass("animationR")
        } else {
            $(".search-job i").removeClass("animationR");
            $(".s-job").addClass("dN")
        }
        return false
    }).on("click", ".search-location", function () {
        var f = { trigger: "#cityName", inputVal: "#cityName", hinput: "#hCity", numLimit: 5 };
        $(this).city_picker(f)
    }).on("click", "#keys", function (f) {
        if (!$(".s-job").hasClass("dN")) {
            $(".s-job").addClass("dN");
            $(".search-job i").removeClass("animationR")
        }
        $(".s-key .hot-link").removeClass("dN");
        return false
    }).on("keydown", "#keys", function (f) {
        if (f.keyCode === 13) { e() }
    }).on("click", function (g) {
        var h = g || window.event;
        var f = h.srcElement || h.target;
        if ($(f).attr("id") != "keys") { $(".s-key .hot-link").addClass("dN") }
        if ($(f).attr("id") != "search-job") {
            $(".search-job i").removeClass("animationR");
            $(".s-job").addClass("dN")
        }
    });
    $(".s-job").on("click", "li", function () {
        $("#search-job").html($(this).html());
        $("#J_Type").val($(this).attr("data-id"))
    });
    //$(".hot-link a").on("click", function (f) {
    //    $(".s-key .hot-link").addClass("dN");
    //    $(".s-key input").val($(this).html());
    //    e()
    //});
    //$(".s-btn-full-time").on("click", function () { e() });
    //$(".s-btn-practice").on("click", function () { e_practice() });
    var b = "";

    function e(l) {
        var o, s, p, i, m, h, k, r, j, g;
        if (l == undefined || undefined == true) {
            s = $("[name=func]").val();
            p = $("[name=Occupation]").val();
            i = $("[name=degree]").val();
            m = $("[name=salary]").val();
            if (m == "") { m = 0 }
            h = $("[name=scale]").val();
            if (h == "") { h = 0 }
            k = $("[name=property]").val();
            if (k == "") { k = 0 }
        } else {
            s = 0;
            p = 0;
            i = 0;
            m = 0;
            h = 0;
            k = 0
        }
        o = 0;
        if (b == "") { b = "0" }
        if (i == "") { i = 0 }
        if (s == "") { s = 0 }
        r = $("#J_Type").val();
        j = $("[name=city]").val() === "" ? 0 : $("[name=city]").val();
        g = $("#keys").val();
        var n = 1;
        var f = "/sou/" + o + "-" + s + "-" + p + "-" + i + "-" + m + "-" + h + "-" + k + "-" + r + "-" + b + "-" + n + "-" + j;
        if (g.length > 0) { f += "?q=" + g }
        location.href = "/job/full-time";// f
    }

    function e_practice(l) {
        var o, s, p, i, m, h, k, r, j, g;
        if (l == undefined || undefined == true) {
            s = $("[name=func]").val();
            p = $("[name=Occupation]").val();
            i = $("[name=degree]").val();
            m = $("[name=salary]").val();
            if (m == "") { m = 0 }
            h = $("[name=scale]").val();
            if (h == "") { h = 0 }
            k = $("[name=property]").val();
            if (k == "") { k = 0 }
        } else {
            s = 0;
            p = 0;
            i = 0;
            m = 0;
            h = 0;
            k = 0
        }
        o = 0;
        if (b == "") { b = "0" }
        if (i == "") { i = 0 }
        if (s == "") { s = 0 }
        r = $("#J_Type").val();
        j = $("[name=city]").val() === "" ? 0 : $("[name=city]").val();
        g = $("#keys").val();
        var n = 1;
        var f = "/sou/" + o + "-" + s + "-" + p + "-" + i + "-" + m + "-" + h + "-" + k + "-" + r + "-" + b + "-" + n + "-" + j;
        if (g.length > 0) { f += "?q=" + g }
        location.href = "/job/practice";// f
    }
    $(".part1-container").on("click", ".part1-list", function () {
        var f = $(this).index() + 1;
        $(this).addClass("current").siblings().removeClass("current");
        $(".specialty" + f).addClass("cur").removeClass("dN").siblings(".s-list").removeClass("cur").addClass("dN")
    });
    $('[data-widget="ui-selectD"]').selectui({ showText: "学历", inputHidden: 'input[name="degree"]', callback: function () { e() } });
    $('[data-widget="ui-selectS"]').selectui({ showText: "月薪", inputHidden: 'input[name="salary"]', callback: function () { e() } });
    $('[data-widget="ui-selectC"]').selectui({ showText: "公司规模", inputHidden: 'input[name="scale"]', callback: function () { e() } });
    $('[data-widget="ui-selectP"]').selectui({ showText: "公司性质", inputHidden: 'input[name="property"]', callback: function () { e() } });
    var c = '<ul data-id="select"><li data-id="">不限</li><li data-id="1">会计/出纳</li><li data-id="2">财务</li><li data-id="3">审计</li><li data-id="20">人力资源</li><li data-id="22">行政</li><li data-id="4">金融</li><li data-id="7">产品</li><li data-id="8">运营</li><li data-id="18">编辑/文案</li><li data-id="30">设计/创意</li><li data-id="5">技术研发</li><li data-id="37">技术支持</li><li data-id="10">项目管理</li><li data-id="9">质量管理</li><li data-id="19">管理</li><li data-id="11">销售</li><li data-id="12">商务拓展</li><li data-id="15">市场营销</li><li data-id="13">渠道/分销</li><li data-id="31">工程</li><li data-id="17">生产/制造</li><li data-id="26">采购</li><li data-id="25">贸易/进出口</li><li data-id="27">物流/供应链</li><li data-id="28">医疗/健康</li><li data-id="14">客户服务</li><li data-id="6">咨询顾问</li><li data-id="16">公关</li><li data-id="21">法律</li><li data-id="23">教师</li><li data-id="24">培训</li><li data-id="34">翻译</li><li data-id="29">艺术</li><li data-id="32">物业管理</li><li data-id="33">科研</li><li data-id="35">公务员</li><li data-id="36">其他</li></ul>';
    $(c).func({ onFoo: function () { e() } });
    $("#Occupation").industry({ hiddenInput: 'input[name="Occupation"]', onFoo: function () { e() } });
    $(".selectC").on("mouseover", function () {
        if ($("#Occupation").hasClass("selected-input")) {
            $(this).find("i").removeClass("animationR");
            $("#Occupation").removeClass("selected-input")
        } else {
            $(this).find("i").addClass("animationR");
            $("#Occupation").addClass("selected-input")
        }
        $(".industry-select").show()
    });
    $(".selectC").on("mouseout", function () {
        $(this).find("i").removeClass("animationR");
        $("#Occupation").removeClass("selected-input");
        $(".industry-select").hide()
    });
    $(document).on("click", ".list-job", function () {
        window.open($(this).find("h3 a").attr("href"));
        return false
    });
    $(document).on("click", ".a-link", function (f) {
        var g = f || window.event;
        g.stopPropagation ? g.stopPropagation() : g.cancelBubble = true
    });
    $(".left-header").on("click", "p", function () {
        if ($(this).hasClass("current")) {
            return false
        }
        b = $(this).attr("data-id");
        if (b == "") { b = "0" }
        if (pageTypeName == "搜职位") { e() } else {
            if (pageTypeName == "找全职") { location.href = "/job/full-time/" + b + "-1/" } else {
                if (pageTypeName == "找实习") { location.href = "/job/practice/" + b + "-1/" }
            }
        }
    });
    $(".result-content img").error(function () {
        $(this).attr("src", "/content/static/images/avatar/etp.jpg");
        $(this).onerror = null
    });
    $(".left-result").on("click", ".result-content a", function (f) { f.stopPropagation() });
    $("#warning-detail").click(function () {
        var f = $('<div id="layer-mask" class="fade">                            <div id="warning-content">                                <div class="warning-header">关于防范虚假招聘的提醒<i></i></div>                                <p class="notice">近来，有不法个人或组织利用各大招聘网站发布虚假招聘信息，通过假冒、伪装知名企业或高薪诱导等手段欺骗学生求职，从而诈骗钱财或从事非法传销！为保护各位同学的利益，就业联盟8将强化招聘公司和职位的审核并建立虚假信息举报机制；同时，也请同学们在求职过程中提高警惕，切勿上当受骗！</p>                                <p class="notice-2">以下是虚假招聘的一般特征，请同学多留意并提高警惕：</p>                                <p>1、招聘单位只有手机单一联系方式；</p>                                <p>2、凡收取“服装费、伙食费、体检费、报名费、办卡费、押金”等各种费用；</p>                                <p>3、几乎不面试就给出录取通知，且到外地就职（警惕卷入任何形式的传销活动）；</p>                                <p>4、薪资明显高于同职位同工种薪资水平；</p>                                <p>5、通知面试职位明显与实际工作岗位不相同，上岗期间索要烟、酒等礼品； </p>                                <p>6、公司地址含糊不清，面试场所不正规，类似临时租借来的宾馆等地； </p>                                <p>7、非正常工作时间段预约面试或者面试地点在很偏远的地方； </p>                                <p>8、扣押或是以保管为名索要身份证、毕业证等证件。</p>                            </div>                        </div>');
        f.appendTo("body");
        $("#layer-mask").css("display", "block");
        setTimeout(a, 100);
        $("#layer-mask i").click(function () {
            $("#layer-mask").removeClass("in");
            $("#warning-content").removeClass("fadeInDown").addClass("fadeOutUp");
            setTimeout(d, 300)
        })
    });

    function a() {
        $("#layer-mask").addClass("in");
        $("#warning-content").removeClass("fadeOutUp").addClass("fadeInDown")
    }

    function d() { $("#layer-mask").css("display", "none").remove() }
});
