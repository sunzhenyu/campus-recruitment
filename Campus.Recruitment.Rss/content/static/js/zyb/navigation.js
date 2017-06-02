seajs.use(['$', 'jquery/scity/1.0.0/scity'], function ($, JqueryScity) {
    JqueryScity($);
    $(function () {
        $('#J_SelectCity').sCity({
            isFixed: true
        });

        $('#user-nav').find('.has-sub').hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });

        $('#user-nav').find('.has-sel').hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });

        $('.J_TopWord').focus(function (){
            $this = $(this);
            $this.removeClass('focused');
            //$this.closest('.top-search').addClass('top-search-focus');
        });
    });
});
