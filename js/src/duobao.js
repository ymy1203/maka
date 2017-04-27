//点击夺宝
var clickmp3 = $(".db_clickmp3")[0];
var db_zhong = $(".db_zhong")[0];
$(".bdbtn").on("click", function() {
        clickmp3.play();
        $(".db_bg").hide();
        $(".goduobao").show();
    })
    //取消夺宝
$(".qxbtn").on("click", function() {
        clickmp3.play();
        Time_aa = 1;
        location.href = "#/answer";
    })
    //go蒙版
    // $(".db_go").on("click", function() {
    //         $(this).hide();
    //         //答题模块出现
    //         $(".queAns").show();
    //     })
    //--判断是否是首次夺宝--
if (localStorage.fuxi == "复习") {
    $(".fir_dbbg").hide();
    $(".fu_bg").css("display", "block");
    $(".db_btn").hide();
     fu_dh();
} else {
    //如果不是复习，判读是不是首次夺宝
    if (localStorage.first == "不是首次") {
        $(".fir_dbbg").hide();
        $(".sec_dbbg").css("display", "block");
    }
}

//-------
var questionId = sessionStorage.questionId; //ID
$.ajax({
        type: "post",
        url: url+"moka/newStudent/1/interface",
        data: {
            method: "getQuesIndiana",
            // quesId: questionId
            quesId: "QUES20160310163955068171"
        },
        dataType: "json",
        success: function(data) {
            // console.log(data);
            var data = data.duobaoUrl;
            $(".allGuan").text("共" + data.length + "关");
            var aa = 0;
            function chosedb(i) {
                var dl = $("<dl><img src=" + data[i].workContent + "></dl><ul></ul>");
                $(".queAns").append(dl);
                $.each(data[i].selection, function(index, obj) {
                        var ulimg = $("<li><img class='db_ans' src='" + obj.mkIndianaPicUrl + "' name='" + obj.mkIndianaIsCorrect + "'>" +
                            "<img src='img/images/confirm.png' class='db_dui duicuo'>" +
                            "<img src='img/images/error.png' class='db_cuo duicuo'></li>");
                        $(".queAns ul").append(ulimg);
                    })
                    //-=-=--=-=-=-=-=--
                switch (aa) {
                    case 0:
                        $(".nowGuan").text("第一关");
                        break;
                    case 1:
                        $(".nowGuan").text("第二关");
                        break;
                    case 2:
                        $(".nowGuan").text("第三关");
                        break;
                }
                //======题目的点击事件
                var imgs = $(".db_ans");
                imgs.on("click", function() {
                    // console.log('run in imgs click')
                    var imgName = this.getAttribute("name");
                    if (imgName == "N") {
                        //首次夺宝失败
                        localStorage.first = "不是首次";
                        //音效
                        $(".db_ermp3")[0].play();
                        //出现对错号
                        $(".db_ans[name=Y]").next().show();
                        $(this).next().next().show();
                        //打错题时
                        setTimeout(function() {
                            db_zhong.pause();
                            $(".db_sbmp3")[0].play();
                            $(".jiangli").show();
                            $(".shibai_box").show();
                            if (localStorage.fuxi == "复习") {
                                $(".fx_sb").show();
                            } else {
                                $(".fir_sb").show();
                            }
                        }, 1000)
                    } else {
                        //答对题时
                        $(".db_okmp3")[0].play();
                        $(this).next().show();
                        aa++;
                        //延时500ms，出现下一题
                        if (aa < data.length) {
                            setTimeout(function() {
                                $(".queAns dl").remove();
                                $(".queAns ul").remove();
                                chosedb(aa);
                            }, 1000);
                        }
                        //达到最后一题，并结束时
                        if (aa == data.length) {
                            //音乐起。
                            db_zhong.pause();
                            $(".db_slmp3")[0].play();
                            // 奖励模块出现
                            $(".jiangli").show();
                            //继续听出现
                            setTimeout(function(){$(".goting").show()},1000);
                            if (localStorage.fuxi == "复习") {
                                setTimeout(function(){$(".fuxi_cg").show()},1000);
                            } else {
                                //第一次成功时locl 记录一个值
                                localStorage.fuxi = "复习";
                                if (localStorage.first != "不是首次") {
                                    //第一次奖励出现
                                    $(".firstcg").show();
                                } else {
                                    //第二次奖励出现
                                    $(".secondcg").show();
                                }
                            }
                        }
                    }
                })

            }
            chosedb(aa); //执行一次
        }
    })
    //首次夺宝成功
    //出现分享页面
$(".jl_fx").on("click", function() {
        clickmp3.play();
        $(".fx_mb").css("display", "block");
        // $(".db_fx").css("bottom","0");
    })
    //取消分享
$(".fx_qx").on("click", function() {
        clickmp3.play();
        $(".fx_mb").hide();
        // $(".db_fx").css("bottom","-3.6rem");
    })
    //这题回了
$(".jl_hui").on("click", function() {
        clickmp3.play();
        location.href = "#/dati";
    })
    //继续听详解
$(".goting").on("click", function() {
        Time_aa = 1;
        location.href = "#/answer";
        // $(".db_box").hide();
        // $(".audmps")[0].play();
    })
    //失败继续听详解
$(".sb_goting").on("click", function() {
        Time_aa = 1;
        location.href = "#/answer";
        // $(".db_box").hide();
        // $(".audmps")[0].play();
    })
    //====go蒙版===
$(".db_go").click(function() {
    $this = $(this);
    $this.css({
        top: "25%",
        left: "25%",
        width: "3.2rem",
        height: "3.2rem",
        "border-radius": "50%",
    });
    var interval = setTimeout(function() {
        $this.css({
            transition: "all 1s",
            top: "50%",
            left: "50%",
            width: "0rem",
            height: "0rem",
            transform: "rotate(720deg)"
        });
        clearInterval(interval);
    }, 500);
    setTimeout(function() { $(".queAns").show(); }, 1000)
});

//=
function fu_dh() {
    $(".fu_jiangli").css({ display: "block", top: "-7.74rem" });
    var timeout = setTimeout(function() {
        $(".fu_jiangli").css("top", "0rem");
        clearInterval(timeout);
    }, 100);
    var timeout1 = setTimeout(function() {
        $(".fu_jiangli").css("top", "-2rem");
        clearInterval(timeout1);
    }, 1100);
    var timeout2 = setTimeout(function() {
        $(".fu_jiangli").css("transition", "top 0.7s");
        $(".fu_jiangli").css("top", "0rem");
        $(".db_btn").show();
        clearInterval(timeout2);
    }, 1300);
}
