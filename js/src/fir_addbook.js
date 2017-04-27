$(".chose_mban img").on("click",function(){
	$(".chose_mban").hide();
})
$(".header_title").text("添加练习册");
//后退
document.querySelector(".houtui_btn").onclick=function(){
	history.go(-1);
}
$("#img259").on("click",function(){
	location.href="#/dati";
})
$(".otherimg").on("click",function(){
	alert("本书暂未开放");
})