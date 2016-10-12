/**
 * Created by Administrator on 2016/9/16.
 */



//根据列表动态添加数据
$(function () {

    var pId=fnBase.request("pId");
    var totleDate;

    var str3="";
    var $detailImg=$(".detail-img");

    var str6="";
    var str7="";

    $.get("json/index.json",function (data) {
        //console.log(data)
        for(var i=0;i<data.length;i++){
            if(pId==data[i].product_id){
                totleDate=data[i];
                addData()
                addcookie()
            }
        }


    })
    function addData() {
        var str1='<a href="###">首页</a>&nbsp;&gt;&nbsp;<a href="###">'+totleDate.brand+'</a>&nbsp;&gt;&nbsp;<a href="###">'+totleDate.category+'</a>&nbsp;&gt;&nbsp;<span>'+totleDate.product_name+'</span>'
        $(".show-top").html(str1);

        var str2='<img  class="bigbig" src="'+totleDate.fangsrc+'">' +
            '<p><i class="heart"></i><span class="heart-num">'+totleDate.like+'</span>人收藏</p>'
        $(".big-img").html(str2);

        for( var i=0;i<totleDate.imgArray.length;i++){
            if(i==0){
            str3+='<li class="black"><img src="'+totleDate.imgArray[i]+'"/></li>'
            }else {
                str3+='<li><img src="'+totleDate.imgArray[i]+'"/></li>'
            }

        }
        $detailImg.html(str3);

        //右侧
        var str4=' <h2 class="ov-ellipsis">'+totleDate.product_name+'</h2>' +
            '<span class="title-cuntry"><img src="'+totleDate.cricleimg+'"/></span>';
        $(".info-title").html(str4);

        var str5=' <p class="info-describe">'+totleDate.product_brief+'</p>' +
            '<div class="info-price">￥<span>'+totleDate.group_price+'</span></div>' +
            '<p class="official-price">官方指导价<span>￥'+totleDate.mktprice+'</span></p>' +
            '<p class="info-red"><span>包邮</span>全场包邮</p>' +
            '<p class="info-red"><span>限时促销</span>周年庆限时促销</p>' +
            '<p class="where-form">'+totleDate.warehouse_post_desc+'</p>'
        $(".info-info").html(str5);

        //下部左边


        //下部右边
        $(".introduce-tupian img").attr("src",totleDate.imgArray[0])

        for(var a in totleDate.product_category){
            str6+='<li>'+a+'：<span>'+totleDate.product_category[a]+'</span></li>'
        }
        $(".information-list").html(str6);

        //最后大图
        for(var i=0;i<totleDate.product_img.length;i++){
            str7+='<img src="'+totleDate.product_img[i]+'">'
        }
        $(".information-image").html(str7)

        //购物袋
        var str8='<a href="buynow.html?pId='+totleDate.product_id+'" class="btn-buy" data-id="'+totleDate.product_id+'"><span >立即购买</span></a>' +
            '<a href="javascript:;" class="btn-add" data-id="'+totleDate.product_id+'"><span ><i class="iconfont icon-gouwudai" ></i>加入购物袋</span></a>'
        $(".info-btn").html(str8)

        //图片转化
        $(".detail-img li").on("mousemove",function () {
            $(".detail-img li").removeClass("black")
            $(this).addClass("black")
            $(".bigbig").attr("src",$(this).find("img").attr("src"))
        })

        $(document).on("click",".btn-add",function () {
            var flyImg=$('<img src="goodimg/1.jpg" class="add-cart-img">')
            flyImg.appendTo($(".btn-add"))

            flyImg.animate({left:300,top:-200},1000)
            setTimeout(function () {
                flyImg.css("display","none")
            },1000)

        })


    }


    function addcookie() {

        //加入购物车创建cookie
        var total= $.cookie("total")||0;
        $("#shoppnum").html(total)


        $(document).on("click",".btn-add",function () {
            //console.log($(this).attr("data-id"))
            var num=$.cookie("dataid"+$(this).attr("data-id")+"num")||0
            var nowNow=$(".info-count-num input").val()

            if($.cookie("dataid"+$(this).attr("data-id"))==null){
                total++;
                $.cookie("dataid"+$(this).attr("data-id"),$(this).attr("data-id"))
                $.cookie("total",total)
            }
            $.cookie("dataid"+$(this).attr("data-id")+"num",parseInt(num)+parseInt(nowNow))
            $("#shoppnum").html(total)

        })
    }

    //+-
    $(".add-num").click(function () {
        var nowNow=$(".info-count-num input").val()
        if(nowNow==1){
            $(this).parent().find(".cut-num").css("background-color","#fff")
        }
        nowNow++;
        $(".info-count-num input").val(nowNow)
    })
    $(".cut-num").click(function () {
        var nowNow=$(".info-count-num input").val()
        if(nowNow==2){
            $(this).css("background-color","#eee")
        }
        if(nowNow==1){
            nowNow=2;
        }
        nowNow--;
        $(".info-count-num input").val(nowNow)
    })
    //点心
    $(document).one("click",".heart",function () {
        var $heart=$(".heart-num").html()
        $(".heart-num").html(++$heart)
    })
    //微信
    $(".share-weixin").hover(function () {
        $(".weixin-code").removeClass("dis-no")
    },function () {
        $(".weixin-code").addClass("dis-no")
    })
    //税费说明
    $(".revenue").hover(function () {
        $(".tax-value").removeClass("dis-no")
    },function () {
        $(".tax-value").addClass("dis-no")
    })
    //商品评价
    $(".intro-title li").eq(0).click(function () {
           $(this).addClass("pink").siblings().removeClass("pink")
            $(".infor-show").removeClass("dis-no")
            $(".user-show").addClass("dis-no")
        })

    $(".intro-title li").eq(1).click(function () {
        $(this).addClass("pink").siblings().removeClass("pink")
        $(".infor-show").addClass("dis-no")
        $(".user-show").removeClass("dis-no")
    })




})

