$(".header_title").text("题目详解");
$(".add_btn").hide();
document.querySelector(".houtui_btn").onclick = function() {
        location.href = "#/dati";
    }
    //答题环节
require(["modules/studydati"]);
//拖动事件
// require(["modules/tuodong"]);
//显示答案
var queStyle = sessionStorage.questionName; //类型
var questionId = sessionStorage.questionId; //ID
$.ajax({
    type: "post",
    url: url + "moka/newStudent/1/interface",
    data: {
        method: "getSisterAnalysis",
        quesId: questionId,
        mkAmStudentId: StudentId,
        mkDifficultLevel: queStyle
    },
    dataType: "json",
    async: false,
    success: function(data) {
        if (queStyle != "C") {
            // if (data.ansUrl.length > 2) {
            // var img = $("<img alt='图片未加载' class='aimg' src=" + data.ansUrl + ">");
            // $(".ans").append(img);
            // } else {
            $(".ansUrl").append(data.ansUrl);
            // }
        } else {
            $(".anstitle").hide();
            //音频
            var mp3 = $("<div class='aud_box'><audio class='audmps' autoplay src=" + data.audioUrl + "></audio></div>")
                //题目
            var img = $("<div class='rel img1'><img src=" + data.questionTitle + "></div>");
            //解析
            var img2 = $("<div class='rel img2'><img src=" + data.questionContent[0].contentUrl + "></div>");
            $(".time").append(mp3);
            $(".ans").append(img);
            $(".ans").append(img2);
            // 答案
            $.each(data.questionAnalyse, function(index, obj) {
                var img3 = $("<div class='rel img" + (index + 3) + "'><img src=" + obj.analyseurl + "></div>");
                $(".ans").append(img3);
            });
            //=-=-==
            if (Time_aa == 1) {
                $('.audmps')[0].currentTime = Number(localStorage.db_locTime) + 1;
            }
            //当前视频播放时间
            var dati_aa = 0;
            var h_aa = [];

            function curtimefun() {
                var curtime = $('.audmps')[0].currentTime.toFixed(0);
                var longtime = $('.audmps')[0].duration.toFixed(0);
                //当前时间与总时间
                $(".cutTime").text(ans_time(curtime));
                $(".allTime").text(ans_time(longtime));
                //长度逐渐增加模块
                $.each(data.cartoonPoint, function(index, obj) {
                    obj = Number(obj).toFixed(0);
                    if (curtime == obj) {
                        bodyHeight();
                    }
                    // console.log(typeof(curtime));
                    if (Number(curtime) > Number(obj)) {
                        h_aa[index] = obj;
                    }
                })
                $(".ans").css("height", "" + heig + "rem");
                //滚动条固定在底部
                document.documentElement.scrollTop = $(".ans").height();//火狐
                document.body.scrollTop = $(".ans")[0].scrollHeight;//google
                //答题的时间控制模块
                $.each(data.answerPoint, function(index, obj) {
                        obj = Number(obj).toFixed(0);
                        if (curtime == obj) {
                            dati_ajax(dati_aa);
                            dati_aa++;
                            if (dati_aa == data.answerPoint.length) {
                                dati_aa = 0;
                            }
                            desTimer(listen); //停止循环
                        }
                    })
                    //夺宝的时间控制模块
                var dbTime = Number(data.indianaPoint).toFixed(0);
                if (curtime == dbTime) {
                    // desTimer(listen);//停止循环
                    localStorage.db_locTime = dbTime;
                    // $(".audmps")[0].pause();
                    location.href = "#/duobao";
                }
            }
            var listen = createTimer(curtimefun, 1000);
            //答题---继续听学姐讲
            $(".jixuting").on("click", function() {
                $(".datibg").hide();
                $(".dati_bgmp3")[0].pause();
                $(".audmps")[0].play();
                listen = createTimer(curtimefun, 1000);
            });
            //==点击出现公式==
            var quesZb = data.questionContent[0].allposition;
            var quesZb2 = data.questionAnalyse;
            $.each(quesZb, function(index, obj) {
                var bbb = obj.pointPosition.split(",");
                var bbb0 = Number(bbb[0]).toFixed(5) * 100 + "%";
                var bbb1 = Number(bbb[1]).toFixed(5) * 100 + "%";
                allpos(obj, 2, bbb0, bbb1, index);
            })

            function ertu() {
                var obj = quesZb2[0].allposition[0];
                var bbb = obj.pointPosition.split(",");
                var bbb0 = Number(bbb[0]).toFixed(5) * 100 + "%";
                var bbb1 = Number(bbb[1]).toFixed(5) * 100 + "%";
                allpos(obj, 3, bbb0, bbb1, 2);
            }
            ertu()
            $.each(quesZb2[1].allposition, function(index, obj) {
                    var bbb = obj.pointPosition.split(",");
                    var bbb0 = Number(bbb[0]).toFixed(5) * 100 + "%";
                    var bbb1 = Number(bbb[1]).toFixed(5) * 100 + "%";
                    allpos(obj, 4, bbb0, bbb1, index + 3);

                })
                //拖动事件
            var speedwidth = $(".goline1").width();
            var leftAud = $("div.playaudio")[0].clientWidth;
            var fontSize = speedwidth / 640 * 100;
            $(".goline1")[0].addEventListener('touchmove', function(e) {
                var potLeft = e.targetTouches[0].pageX / fontSize - 1.13 - this.offsetLeft / fontSize;
                if (potLeft < 0) potLeft = 0;
                $(".audmps")[0].pause();
                $(".goline2").css("width", potLeft + "rem");
                $(".goon").css("left", potLeft + "rem");
            })
            $(".goline1")[0].addEventListener('touchend', function(e) {
                    $(".audmps")[0].play();
                    var potLeft = e.changedTouches[0].pageX / fontSize - 1.13 - this.offsetLeft / fontSize;
                    var curTime = (potLeft / 4.72 * 281).toFixed(1);
                    $(".audmps")[0].currentTime = curTime;
                    h_heig();
                })
                //==========
                //===拖动时，长度===
            function h_heig() {
                var h_ab = [];
                var cutt2 = $('.audmps')[0].currentTime;
                $.each(data.cartoonPoint, function(index, obj) {
                    if (Number(cutt2) >= Number(obj)) {
                        h_ab[index] = obj;
                    }
                })
                console.log(h_ab.length);
                for(var i=0;i<h_ab.length;i++){
                    bodyHeight();
                }
                $(".ans").css("height", "" + heig + "rem");
            }
        }
    },
    error: function() {
        $(".ansUrl").append("无数据");
    }
})

//试题显示长度
var heig = 9.2;

function bodyHeight() {
    heig += 0.53;
    if (heig > 21) {
        heig = 30;
    }
}
//声音的开关控制
$(".playaudio").on("click", function() {
        var mp3 = $(".audmps")[0];
        var playmp3 = $(".playmp3");
        var stopmp3 = $(".stopmp3");
        if (mp3.paused) {
            mp3.play();
            playmp3.hide();
            stopmp3.show();
        } else {
            mp3.pause();
            playmp3.show();
            stopmp3.hide();
        }
    })
    // 音频进度条

function pro() {
    // 音频当前时间
    var curtime = $('.audmps')[0].currentTime.toFixed(0);
    //音频总时间
    var longtime = $('.audmps')[0].duration.toFixed(0);
    //控制点间距
    var marLeft = (curtime * 4.76) / longtime;
    $(".goline2").css("width", "" + marLeft + "rem")
    $(".goon").css("left", "" + marLeft + "rem");
}
if (queStyle == "C") {
    var proTask = createTimer(pro, 300); //C类题时执行循环
}

// 点击出现公式/解析（坐标）
function allpos(obj, pic, mleft, mtop, xx) {
    var pp = $("<p class='pp_piont pp_piont" + xx + "'></p>");
    if (obj.picUrl.indexOf("http") < 0) {
        var qq = $("<div class='gs_mb gsmb" + xx + "'><p>" + obj.picUrl + "</p><img class='pclose' src='img/images/pclose.png'></div>");
    } else {
        var qq = $("<div class='gs_mb gsmb" + xx + "'><img class='picurl' src='" + obj.picUrl + "'><img class='pclose' src='img/images/pclose.png'></div>");
    }
    $(".img" + pic + "").append(pp);
    $(".ans").append(qq);
    $(".pp_piont" + xx + "").css({ left: mleft, top: mtop });
    gsPoint(); //公式点击事件
}
//公式点击事件
function gsPoint() {
    $(".ans").on("click", ".pp_piont", function() {
            var aa = $(this).attr("class");
            var bb = aa.slice(aa.length - 1, aa.length);
            $(".gsmb" + bb + "").show();
            $(".audmps")[0].pause();
        })
        //关闭
    $(".pclose").on("click", function() {
        $(this).parent().hide();
        $(".audmps")[0].play();
    })
}
//
//=
$(".gochange").on("click", function() {
        var curtime = $('.audmps')[0].currentTime.toFixed(0);
        localStorage.db_locTime = curtime;
        location.href = "#/duobao"
    })
    //时间处理
function ans_time(noe) {
    noe = Number(noe);
    var are = noe % 60;
    if (are < 10) {
        are = "0:0" + noe;
    } else {
        are = "0:" + noe;
    }
    if (noe < 60) {
        noe = are;
    } else if (noe >= 60) {
        var second = parseInt(noe) % 60;
        var min = parseInt(noe / 60);
        if (second < 10) second = "0" + second;
        noe = min + ":" + second;
    }
    return noe;
}
