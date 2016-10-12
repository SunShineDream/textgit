/**
 * Created by Administrator on 2016/9/18.
 */
$(function () {
    //全选按钮
    var $chackAll=$("#chackall");
    var $ckCk=$(".ckck");
    var $allNum=$(".all-num");
    var $allSum=$(".all-sum")
    //购物袋数量
    var total= $.cookie("total")||0;
    $("#shoppnum").html($.cookie("total"))


    //获取cookie
    var arr='';
    var totleDate;
    $.get("json/index.json",function (data) {
        //console.log(data)
        for(var i=0;i<data.length;i++){
            totleDate=data[i];
            addData()
        }
        getSum()

        //刚开始1的时候灰色
        $(".goods-num").each(function () {
            if($(this).val()==1){
                $(this).parent().find(".num-del").css("background-color","#eee")
            }

        })

        $chackAll.on("click",function () {
            if($(this).prop("checked")){
                $chackAll.prop("checked",true);
                $(".ckck").prop("checked",true)
            }else {
                $chackAll.prop("checked",false);
                $(".ckck").prop("checked",false)
            }
            getSum()
        })



    })

    function addData() {
        if($.cookie("dataid"+totleDate.product_id)!=null){
            var num=$.cookie("dataid"+totleDate.product_id+"num");
            arr+='<div class="shuju">' +
                '<div class="th1">' +
                '<input type="checkbox" checked="checked" class="ckck">' +
                '</div>' +
                '<div class="th2 cart-small">' +
                '<a href="ProductDetails.html?pId='+totleDate.product_id+'" class="cart-a1"><img src="'+totleDate.fangsrc+'"></a>' +
                '<a href="ProductDetails.html?pId='+totleDate.product_id+'" class="cart-a2">'+totleDate.product_name+'</a>' +
                '</div>' +
                '<div class="th3 goods-value">￥<span class="danjia">'+totleDate.group_price+'</span></div>' +
                '<div class="th4 num ">' +
                '<p>' +
                '<a class="num-a1 num-del"  href="javascript:;">-</a>' +
                '<input type="text" value="'+num+'" class="goods-num">' +
                '<a class="num-a1 num-add"  href="javascript:;">+</a>' +
                '</p>' +
                '</div>' +
                '<div class="th5 good-total-value">￥<span class="value-span">'+toDecimal2((totleDate.group_price*100)*num/100)+'</span></div>' +
                '<div class="th6 good-del">' +
                '<a href="###" title="删除" class="del-self" data-id="'+totleDate.product_id+'"></a>' +
                '</div>' +
                '</div>'
        }
        $(".tianjia").html(arr)
    }

    //小按钮监听
    $(document).on("click",".ckck",function () {
        //console.log($(this).prop("checked"))
        if(!$(this).prop("checked")){
            //如果当前没有选中，就干掉全选
            $chackAll.prop("checked",false)
        }else {

            var allCh = true;//假设被全选
            //判断所有的选项是否都选中
            $(".ckck").each(function () {
                if(!$(this).prop("checked")){
                    //如果有一个没有被选中
                    allCh =false
                }
            });
            if(allCh){
                $chackAll.prop("checked",true)
            }
        }
        getSum()
    });

    //加减
    $(document).on("click",".num-add",function () {
        var oP=$(this).parents(".shuju")
        var goodNum=oP.find(".goods-num")
        var goodEvalue=oP.find(".danjia")
        var goodTvalue=oP.find(".value-span")

        var num=goodNum.val();
        if(num==1){
            oP.find(".num-del").css("background-color","#fff")
        }
        goodNum.val(++num)
        var thisId=oP.find(".del-self").attr("data-id")
        var thisNum=$.cookie("dataid"+thisId+"num")
        $.cookie("dataid"+thisId+"num",++thisNum)
        goodTvalue.html(toDecimal2(goodEvalue.html()*num))
        getSum()
    })
    $(document).on("click",".num-del",function () {
        var oP=$(this).parents(".shuju")
        var goodNum=oP.find(".goods-num")
        var goodEvalue=oP.find(".danjia")
        var goodTvalue=oP.find(".value-span")

        var num=goodNum.val();
        if(num==2){
            $(this).css("background-color","#eee")
        }
        if(num==1){
            num=2;
        }
        num--;
        goodNum.val(num)
        var thisId=oP.find(".del-self").attr("data-id")
        var thisNum=$.cookie("dataid"+thisId+"num")
        $.cookie("dataid"+thisId+"num",--thisNum)
        goodTvalue.html(toDecimal2(goodEvalue.html()*num))
        getSum()
    })

    //强制保留2位小数函数
    function toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }

    function getSum() {
        var allNum = 0;
        var allSum = 0;
        var sum
        $(".ckck:checked").each(function () {
            var oP = $(this).parents(".shuju");
            var num =oP.find(".goods-num");
            var goodEvalue=oP.find(".danjia")
            //赋值
            sum = oP.parents().find(".goods-news").find(".value");

            allNum++;
            allSum+=goodEvalue.html()*num.val();
            //console.log(toDecimal2(allSum))
        });
        //sum.html(toDecimal2(allSum))
        $allNum.html(allNum)
        $allSum.html(toDecimal2(allSum))
    }

    //删除
    $(document).on("click",".del-self",function () {

        var inum = $(this).index(".del-self")
        $(".tianjia .shuju").eq(inum).remove();
        getSum()

        var clickId=$(this).attr("data-id")
        console.log(clickId)
        $.removeCookie("dataid"+clickId+"num")
        $.removeCookie("dataid"+clickId)
        total--;
        $.cookie("total",total)
        $("#shoppnum").html(total)

    })




})

