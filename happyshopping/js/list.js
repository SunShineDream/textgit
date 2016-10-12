/**
 * Created by Administrator on 2016/9/14.
 */

$(function () {
    // 列表获取商品
    var pageNum=12;
    var page=0;
    var totleDate=[];
    var $mainProduct=$(".main-product");
    var flag=true;
    //可视区高度
    var winH=$(window).height();
    //检查屏幕的高度
    var winT;
    var str="";
    var docH;
    var docBeginH

    $.get("json/index.json",function (data) {
       // console.log(data)
        totleDate=data
        addData();

        $(window).scroll(function () {
            if(docH==docBeginH){
                return;//不让他执行下面的操作
            }
            winT=$(window).scrollTop();
            if(winT+winH>=docH){
                docBeginH=$(document).height()-10;
                setTimeout(function () {
                    console.log(1);
                    addData();
                },1000)
            }
        })


       // href="listing.html" target="_blank"
    })

    function addData() {
        if(flag){
            for(var i=0; i<pageNum;i++){
                str+='<li class="product-item"><a class="pro-a"  target="_blank" href="ProductDetails.html?pId='+totleDate[i+pageNum*page].product_id+'">' +
                    '<div class="img-div">' +
                    '<a href="ProductDetails.html?pId='+totleDate[i+pageNum*page].product_id+'"><img src="'+totleDate[i+pageNum*page].fangsrc+'"></a>' +
                    '</div>' +
                    '<div class="specific-infor">' +
                    '<p class="country">' +
                    '<a href="ProductDetails.html?pId='+totleDate[i+pageNum*page].product_id+'"><img src="'+totleDate[i+pageNum*page].cricleimg+'"class="country-img"></a>' +
                    '<span>'+totleDate[i+pageNum*page].warehouse_post_desc+'</span>' +
                    '</p>' +
                    '<h2 class="product-name "><a href="ProductDetails.html?pId='+totleDate[i+pageNum*page].product_id+'">'+totleDate[i+pageNum*page].product_name+'</a></h2>' +
                    '<p class="product-value">￥<i>'+totleDate[i+pageNum*page].group_price+'</i></p>' +
                    '<span class="before-value">￥'+totleDate[i+pageNum*page].mktprice+'</span>' +
                    '<a  href="ProductDetails.html?pId='+totleDate[i+pageNum*page].product_id+'" class="now-buy"></a>' +
                    '</div>' +
                    '</a></li>'
            }

            $mainProduct.html(str);
            docH=$(document).height()-10;
            page++;

        }
        }


})

//购物袋数量
$(function () {
    var total= $.cookie("total")||0;
    $("#shoppnum").html(total)
})
