/**
 * Created by Administrator on 2016/9/11.
 */
// 临时新闻
$(function () {
    $(".top-new").animate({height:80});
})

//滚动广告
$(function () {
    var iNow=0;
    var timer;
    var bannerLen=$(".banner-main li").length;
    var colorArr=["rgb(187, 193, 255)","rgb(254, 184, 208)","rgb(0, 212, 154)"]
    $("#banner-cricle span").click(function () {
        iNow=$(this).index()
        bannnerRun()
    })

    $(".before-btn").click(function () {
        if(iNow==0){
            iNow=bannerLen;
        }
        iNow--;
        bannnerRun()
    })

    $(".after-btn").click(function () {
        iNow++;
        if(iNow==bannerLen){
            iNow=0;
        }
        bannnerRun()
    })

    function bannnerRun() {
        $("#banner-cricle span").removeClass("chose").eq(iNow).addClass("chose")

        //$(".banner-main li").animate({opacity:0.5}).stop().hide()
        //$(".banner-main li").eq(iNow).animate({opacity:1});
        $(".banner-main li").hide().eq(iNow).fadeIn("slow");
        $(".index-banner").css("background-color",colorArr[iNow])

    }
    autoRun()
    function autoRun() {
        timer = setInterval(function () {
            iNow++;
            if(iNow==bannerLen){
                iNow=0;
            }
            bannnerRun()
        },2000)
    }
    $(".index-banner").hover(function () {
        $(".after-btn").show()
        $(".before-btn").show()
        clearInterval(timer);
    },function () {
        $(".after-btn").hide()
        $(".before-btn").hide()
        autoRun();
    })


})

//列表获取商品
$(function () {
    var pageNum=12;
    var page=0;
    var totleDate=[];
    var $mainProduct=$(".hot-goods-list");
    var flag=true;
    //可视区高度
    var winH=$(window).height();
    //检查屏幕的高度
    var winT;
    var str="";
    var docH;
    var docBeginH;




    $.get("json/index.json",function (data) {
        console.log(data)
        totleDate=data
        addData();

        $(window).scroll(function () {

            if(docH==docBeginH){
                return;//不让他执行下面的操作
            }
            winT=$(window).scrollTop();

            if(winT+winH>=docH){
                flag=true;
                docBeginH=$(document).height()-10
                setTimeout(function () {
                    //console.log(1);
                    addData();
                },1000)

            }

        })

    })

    function addData() {

        if(flag){
            flag=false;
            for(var i=0; i<pageNum;i++){
                str+=' <li class="world-hot-goods">' +
                    '<div class="world-hot-img"><a href="ProductDetails.html?pId='+totleDate[i+pageNum*page].product_id+'"><img src="'+totleDate[i+pageNum*page].imgurl+'"/></a></div>' +
                    '<div class="world-infor">' +
                    '<div class="infor-top">' +
                    '<img src="'+totleDate[i+pageNum*page].smallimg+'"/><h4 class="fl">'+totleDate[i+pageNum*page].warehouse_post_desc+'</h4>' +
                    '<h5 class="fr">距结束<span>03:02:17</span></h5>' +
                    '</div>' +
                    '<a class="infor-name ov-ellipsis" href="ProductDetails.html?pId='+totleDate[i+pageNum*page].product_id+'">'+totleDate[i+pageNum*page].product_name+'</a> ' +
                    '<p class="infor-record">'+totleDate[i+pageNum*page].product_brief+'</p>' +
                    '<div class="infor-footer">' +
                    '<p class="fl">￥<span class="font-big">'+totleDate[i+pageNum*page].group_price+'</span><span class="font-small">￥'+totleDate[i+pageNum*page].mktprice+'</span></p>' +
                    '<a class="fr infor-now" href="ProductDetails.html?pId=?'+totleDate[i+pageNum*page].product_id+'">立即抢购</a>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
            }

            $mainProduct.html(str);
            docH=$(document).height()-10
            page++;

        }

    }




})

//购物袋数量
$(function () {
    var total= $.cookie("total")||0;
    $("#shoppnum").html(total)
})

//用户登录显示
$(function () {
    if(fnBase.request("nicheng")!=undefined){
        var nicheng=fnBase.request("nicheng");
        console.log()
        $(".show-user").removeClass("dis-no")
        $(".no-user").addClass("dis-no")
        $(".show-user li").eq(0).find("a").html("亲爱的，"+nicheng)
    }

})

