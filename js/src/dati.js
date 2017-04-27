$(".add_btn").append("<p>换一本</p>");
document.querySelector(".houtui_btn").onclick = function() {
    location.href = "#/homework";
}
$(".add_btn").on("click", function() {
        location.href = "#/addbook";
    })
    //保存最后点击的题目信息
require(["modules/saveTiId"]);
//查询最后保存的题目信息
var cx_zhang;
var cx_jie;
// var cx_ti;
var ak_abs = 0;
//----查询学生最后使用的目录
$.ajax({
        type: "post",
        url: url+"moka/newStudent/1/interface",
        data: {
            method: "getRecentRecord",
            mkAmStudentId: StudentId,
            source: "am"
        },
        dataType: "json",
        success: function(data) {
            cx_zhang = data.recordList[1];
            cx_jie = data.recordList[2];
            cx_ti = data.recordList[3];
        }

    })
    //ajax----章
$.ajax({
    type: "post",
    url:url+"moka/newStudent/1/interface",
    data: {
        mkAmStudentId: StudentId,
        source: "am",
        method: "stuQueryDictTreeByBookIdForAm",
        bid: "259"
    },
    dataType: "json",
    success: function(data) {
        var data = data.dictTreeData;
        $(".header_title").text(data[0].bookName);
        var dati_box = $(".dati_box");
        $.each(data, function(index, obj) {
                // zhangIds[index] = obj.id;
                var ul = $("<ul ><p class='zhangP' id=" + obj.id +
                    ">" + obj.name + "<span class='rotate'></span></p></ul>");
                dati_box.append(ul);
            })
            //节出现的点击事件
        $(".zhangP").on("click", function() {
            var sib = $(this).siblings();
            //下三角标志
            $(this).children('span').toggleClass('rotate');
            //出现节
            if (sib.length != 0) {
                sib.slideToggle(200);
            } else {
                jie(this.id);            }
        });
        //查询学生最近使用的目录并触发
        $("#" + cx_zhang + "").click();
    }
});
//ajax---节
function jie(objdad) {
    $.ajax({
        type: "post",
        url: url+"moka/newTeacher/1/interface",
        data: {
            method: "queryQuerstionGroupByDictId",
            dictId: objdad
        },
        dataType: "json",
        async: false, //异步，避免ajax的多次调用
        success: function(data) {
            var data = data.questionGroupAndQuestion;
            if (data == "") {
                studyTime(); //弹出提示框
            }
            var uls = $("#" + objdad + "").parent();
            $.each(data, function(index, obj) {
                var li = $("<li id=" + obj.dictId +
                    "><dt>" + obj.dictName + "<span class='rotate'></span></dt></li>");
                uls.append(li);
            })

            //查询学生最近使用的目录并触发
            $("#" + cx_jie + " dt").click();
        }
    })
}
//ajax==题目==
function tis(tidad) {
    $.ajax({
        type: "post",
        url: url+"moka/newStudent/1/interface",
        data: {
            method: "queryQuestionContent",
            questionGroupNum: tidad,
            mkAmStudentId: StudentId,
            source: "am"
        },
        dataType: "json",
        async: false, //异步，避免ajax的多次调用
        success: function(data) {
            var data = data.QuestionContentList;
            if (data == "") {
                studyTime(); //弹出提示框
            }
            $.each(data, function(index, obj) {
                    //把题目类型放到小节中
                    var xiti_style = $("<dd class='xiti_box' style='display:block'><p class='xiti_style'>" + obj.quesTypeName +
                        "</p><div class='a_box' id=" + obj.questionGroupId +
                        "></div></dd>");
                    $("#" + tidad + "").append(xiti_style);
                    //把具体的题目放到题目类型中
                    $.each(obj.questionList, function(indti, objti) {
                        var ass = $("<a id='" + objti.questionId + "' name='" + objti.mkDifficultLevel +
                            "'>" + objti.questionNum + "<span></span></a>");
                        $("#" + obj.questionGroupId + "").append(ass);
                    })
                })
                //将题目的id和类型存到缓存
            $("a").on("click", function() {
                sessionStorage.setItem("questionId", this.id);
                sessionStorage.setItem("questionName", this.getAttribute("name"));
                location.href = "#/answer";
            })
        }
    })
}
//当对某个小节的题目ajax请求无返回数据时，弹出提示框
function studyTime() {
    $(".guanbi").show();
    $(".wuti").on("click", function() {
        $(".guanbi").hide();
    })
}
//
//题目出来的点击事件
$(".dati_box").on("click", "dt", function(event) {
    $(this).children('span').toggleClass('rotate');
    var thisIs = $(this);
    if (thisIs.siblings().length != 0) {
        thisIs.siblings().slideToggle(200);
    } else {
        tis(thisIs.parent()[0].id); //调用题目function
        jiaoIcon();
    }
});
//查詢已點擊過的題目
function jiaoIcon() {
    $.ajax({
        type: "post",
        url: url+"moka/newStudent/1/interface",
        data: {
            method: "queryListenedForAm",
            mkAmStudentId: StudentId,
            source: "am"
        },
        dataType: "json",
        success: function(data) {
            data = data.ListenedQuestion;
            var as = $(".dati_box a");
            $.each(data,function(index,obj){
                $.each(as,function(i,oct){
                    if(obj == oct.id){
                        // console.log(this);
                        $(this).find("span").addClass("spanback");
                    }
                })
            })
        }
    })
}
