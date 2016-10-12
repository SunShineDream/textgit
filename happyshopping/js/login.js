/**
 * Created by Administrator on 2016/9/21.
 */
//登录
$(function () {
    var imgCode;
    var noteCode;
    //转换
    $(".login-title li").eq(0).click(function () {
        $(".code-login").css("display","none")
        $(".password-login").css("display","block")
        $(this).addClass("click-look").siblings().removeClass("click-look")
    })
    $(".login-title li").eq(1).click(function () {
        $(".code-login").css("display","block")
        $(".password-login").css("display","none")
        $(this).addClass("click-look").siblings().removeClass("click-look")
    })

    var flag=false;
    //所有输入框失去焦点时
    $(document).on("blur",".register-input",function () {
        $(this).parent().css("border-color","#e10482")
    })
    $(document).on("focus",".register-input",function () {
        $(this).parent().css("border-color","#999")
    })
    $(document).on("blur",".password",function () {
        $(this).parent().parent().css("border-color","#e10482")
    })
    $(document).on("focus",".register-input",function () {
        $(this).parent().parent().css("password","#999")
    })




    //输入框失去光标时提示
    $(document).on("blur",".user-name",function () {
        var mobileReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/;
        var $useRember=$(this).parents().find(".register-phone").next().eq(0).find(".user-rember")
         if($(this).val()!=""){
                if(mobileReg.test($(this).val())==false){
                    $useRember.find(".Prompt").html("手机格式有误请从新输入")
                    $useRember.removeClass("dis-no")
                    flag=false;
                }else {
                    $(this).parent().css("border-color","#999")
                    $useRember.addClass("dis-no")
                    flag=true;
                }
         }else {
             $useRember.removeClass("dis-no")
             flag=false;
         }

    })
    $(document).on("blur",".user-password",function () {
        var passwordReg = /^[\w-]{6,20}$/;
        var $useRember=$(this).parents().find(".password-login").find(".user-note")
        if($(this).val()!=""){
            if(passwordReg.test($(this).val())==false){
                $useRember.find(".Prompt").html("请输入6-20位字母、数字或字符")
                $useRember.removeClass("dis-no")
                flag=false;
            }else {
                $(this).parent().css("border-color","#999")
                $useRember.addClass("dis-no")
                flag=true;
            }


        }else {
            $useRember.removeClass("dis-no")
            flag=false;
        }
    })
    $(document).on("blur",".mima",function () {
        var $useRember=$(this).parents().find(".second-tep").find(".mima-tis")
        var passwordReg = /^[\w-]{6,20}$/;
        if($(this).val()!=""){
            if(passwordReg.test($(this).val())==false){
                $useRember.find(".Prompt").html("请输入6-20位字母、数字或字符")
                $useRember.removeClass("dis-no")
                flag=false;
            }else {
                $(this).parent().parent().css("border-color","#999")
                $useRember.addClass("dis-no")
                flag=true;
            }
        }else {
            $useRember.removeClass("dis-no")
            flag=false;
        }
    })
    $(document).on("blur",".seccond-mima",function () {
        var $useRember=$(this).parents().find(".second-tep").find(".mima-tis")
        if($(".seccond-mima").val()!=""){
            if($(".mima").val()!=$(".seccond-mima").val()){
                $useRember.find(".Prompt").html("密码不一致")
                $useRember.removeClass("dis-no")
                flag=false;
            }else {
                $(this).parent().css("border-color","#999")
                $useRember.addClass("dis-no")
                flag=true;
            }

        }else {
            $useRember.find(".Prompt").html("确认密码不能为空")
            $useRember.removeClass("dis-no")
            flag=false;
        }
    })
    $(document).on("blur",".user-erweima",function () {
        var $useRember=$(this).parents().find(".user-erweima-tis")
        if($(this).val()=="") {
            $(this).css("border-color", "#999")
            $useRember.removeClass("dis-no")
            flag=false;
        }else {
            $(this).parent().css("border-color","#999")
            flag=true;
        }
    })
    $(document).on("blur",".user-note",function () {
        var $useRember=$(this).parents().find(".user-note-tis")

        if($(this).val()=="") {
            $(this).css("border-color", "#999")
            $useRember.removeClass("dis-no")
            flag=false;
        }
    })
    //用户名
    $(document).on("blur",".user-xiaoming",function () {
        var $useRember=$(this).parents().find(".user-xiaoming-tis")

        if($(this).val()=="") {
            $(this).css("border-color", "#999")
            $useRember.removeClass("dis-no")
            flag=false;
        }else {
            $(this).parent().css("border-color","#999")
            flag=true;
        }
    })


    focusAddcClass(".user-name",".user-rember")
    focusAddcClass(".user-password",".user-note")
    focusAddcClass(".user-erweima",".user-erweima-tis")
    focusAddcClass(".user-note",".user-note-tis")
    focusAddcClass(".user-xiaoming",".user-xiaoming-tis")
    focusAddcClass(".password",".user-password-tis")



    //提交按钮
    $(".next-login").click(function () {
        if(flag){
            //console.log(1)
            //获取cookie里的用户名
            var userNameV=$(".login-user-name").val();
            var userPasswordV=$(".user-password").val();

            if($.cookie("userName"+userNameV)!=undefined){
                if($.cookie("userPass"+userNameV)==userPasswordV){
                    console.log("正确")
                    $(".next-login").attr("href","shoppingindex.html?nicheng="+$.cookie("userNicheng"+userNameV))
                }else {
                    alert("密码不正确")
                }
            }else{
               alert("不存在此用户")
            }

        }else {
            console.log(2)
        }
    })
    //注册下一步
    $(".next-info-input").click(function () {

        if(($(".user-erweima").val()!=imgCode)||($(".user-note").val()!=noteCode)){
            flag=false;
            //console.log("1"+flag)
        }else {
            flag=true;
            //console.log("2"+flag)
        }
        if(flag){
            //登录
            //console.log(1)
            $(".first-tep").addClass("dis-no")
            $(".second-tep").removeClass("dis-no")
        }else {
            alert("是有哪里不对吧")
        }
    })
    //注册
    $(".enroll").hover(function () {
        //再次判断输入密码的正确与否
        var $useRember=$(this).parents().find(".second-tep").find(".mima-tis")
        if($(".mima").val()!=$(".seccond-mima").val()){
            $useRember.find(".Prompt").html("密码不一致")
            $useRember.removeClass("dis-no")
            $(".mima").parent().parent().css("border-color","#e10482")
            flag=false;
        }else {
            $useRember.addClass("dis-no")
            $(".mima").parent().parent().css("border-color","#999")
            flag=true;
        }
        if(flag){
            $(".enroll").css("background-color","#e10482")
        }
    },function () {
        if(flag){
            $(".enroll").css("background-color","#999999")
        }
    })
    //所有都正确点击注册
    $(".enroll").click(function () {
        if(flag){
            //console.log(1)
            $(".mima").parent().parent().css("border-color","#999")
            $.cookie("userName"+$(".user-name").val(),$(".user-name").val(),{
                expires:12345,
                path:"/"
            })
            $.cookie("userPass"+$(".user-name").val(),$(".mima").val(),{
                expires:12345,
                path:"/"
            })
            $.cookie("userNicheng"+$(".user-name").val(),$(".user-xiaoming").val(),{
                expires:12345,
                path:"/"
            })
        }

    })

    //随机生成二维码
    imgCode=count()
    $(".img-code").html(imgCode)

    $(".img-code").on("click",function () {
        imgCode=count()
        $(this).html(imgCode)
    })

    $(".note-code").on("click",function () {
        noteCode=numCount()
        alert("请记住验证码"+noteCode)
    })

















    //字母数字组合验证码（四位） （12k）
    function count(){
        var str="abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZ";

        //定义一个数组
        array1 = new String();
        for(var i=0;i<4;i++){
            array1=array1+str[rand(62)];
        }
        //传输数据到页面
        return array1
    }
    //字母数字组合验证码（四位） （12k）
    function numCount(){
        var str="1234567890";
        var num;
        //定义一个数组
        array1 = new String();
        for(var i=0;i<6;i++){
            array1=array1+str[rand(6)];
        }
        //传输数据到页面
        return array1
    }

    //获取随机字母单词下标
    function rand(a){
        var m=parseInt(Math.random()*10000)%a;
        return m;
    }

    //获取光标函数
    function focusAddcClass(a,b) {
        $(document).on("focus",a,function () {
            var $useRember=$(this).parents().find(b)
            $useRember.addClass("dis-no")
        })
    }

})