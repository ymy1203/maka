$(".header_title").text("作业辅导");
document.querySelector(".houtui_btn").onclick=function(){
	$(".guanbi").show();
}
$(".add_btn").show();
//退出确认JS模块
require(["modules/tuichu_star"]);
//蒙版
function mengban(){
	$(".mengban").css("display","block");
	$(".mengban").on("click",function(){
		$(".mengban").css({
			backgroundColor:"rgba(250,250,250,0)"
		})
		$(".mengban img").hide();
		$(".add_btn").show();
	})
}

// ajax
$.ajax({
	type:"post",
	url:url+"moka/newStudent/1/interface",
	data:{
		mkAmStudentId:StudentId,
		source:"am",
		method:"queryBookByAmId",
	},
	dataType:"json",
	success:function(data){
		// console.log(data);
		var yxbook = data.bookPicList[0];
		if(yxbook){
			var li = $("<li><img src="
				+yxbook.bookFaceUrl+
				"><p>"
				+yxbook.bookName+
				"</p></li>")
			$(".book_box").prepend(li);
			//跳转
			$(".book_box img").click(function(){
				location.href = "#/dati";
			})
		}else{
			mengban();	
		}
	}
})

