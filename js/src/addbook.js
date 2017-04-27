$(".header_title").text("添加练习册");
document.querySelector(".houtui_btn").onclick = function() {
    location.href = "#/homework";
}
$(".add_btn").hide();

//点击事件
var add_imgs = $("#img259");
add_imgs[0].onclick = function() {
    $.ajax({
        type: "post",
        url: url + "moka/newStudent/1/interface",
        data: {
            mkAmStudentId: StudentId,
            source: "am",
            method: "getRecentRecord",
            bid: "259"
        },
        dataType: "json",
        success: function(data) {
            location.href = "#/dati";
        },
        // error:function(){
        // 	console.log("ymy==404");
        // }
    })
}
$(".otherimg").on("click", function() {
            alert("本书暂未开放");
})
