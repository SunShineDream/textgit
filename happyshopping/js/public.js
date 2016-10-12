/**
 * Created by Administrator on 2016/9/11.
 */
//浮动菜单
$(function () {
    var i=0;
    $("#tnavm-right").click(function () {
        i++;
        $(".float-menu").toggle()
        if(i%2==1){
            $("#tnavm-right").text("收起分类");
            $("#tnavm-right").removeClass("ii").addClass("xx");

        }else{
            $("#tnavm-right").text("查看分类");
            $("#tnavm-right").removeClass("xx").addClass("ii");
        }
    })

    $(".menu-left li").each(function () {
        $(this).hover(
            function () {
                $(this).addClass("mouseinter")
                $(".menu-right li").removeClass("show").eq($(this).index()).addClass("show")
            },function () {
                $(this).removeClass("mouseinter")

            }
        )
    })
})

// 右侧菜单
$(function () {

    rightRun($(".html-right1"),$(".right1-flt"))
    rightRun($(".html-right3"),$(".right3-flt"))
    rightRun($(".html-right4"),$(".right4-flt"))
    rightRun($(".html-right5"),$(".right5-flt"))

    function rightRun(a,b) {
        var bL=b.outerWidth();
        a.hover(function () {
            b.stop().css("display","block").animate({opacity:1,left:-bL+6})
        },function () {
            b.animate({opacity:0,left:-bL-20},500)
            setTimeout(function () {
                b.stop().css("display","none")
            },500)

        })
    }
//返回顶部
    $(".html-right6").click(function () {
        if($(window).scrollTop()==0){
            return;
        }
        $("body,html").animate({"scrollTop":0},1000);
    })


})

