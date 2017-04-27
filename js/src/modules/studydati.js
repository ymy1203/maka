//答题
function dati_ajax(aa){
	$(".datibg").show();
	$(".audmps")[0].pause();//学姐停
	$(".dati_bgmp3")[0].play();//答题bgm，开始
	$.ajax({
		type: "post",
		url: url+"moka/newStudent/1/interface",
		data: {
		    method: "getSisterAnalysis",
		    quesId: questionId,
		    mkAmStudentId: "QD012016100104",
		    mkDifficultLevel: queStyle
		},
		dataType: "json",
		async:false,
		success: function(data){
			var data = data.answerList[aa];
			// console.log(aa);
			$(".datibg .bg_head").remove();//移除第一次添加的子元素
			$(".datibg ul").remove();
			$(".nextLisen").hide();//隐藏第一次显示的“去挑战”“继续听学姐答题”
			$(".goTiao").hide();
			var workc = $("<div class='bg_head'>"
				+"<img src='img/images/dtbg.png'><img class='wenti_img' src="
				+data.workContent+"></div><ul></ul>");
			$(".datibg").append(workc);
			$.each(data.selection,function(index,obj){
				var ul = ("<li><p class='p_bgc' name="+obj.isCorrect+">"+
					"<img class='dt_dc' name="+obj.isCorrect+" src='img/images/dtok.png'>"+
					"<img class='dt_dc' src='img/images/dterr.png'>"+
					"</p><img class='dt_xx' name="
					+obj.isCorrect+" src="+obj.picUrl+"></li>")
				$(".datibg ul").append(ul);
			})
		}
	})
	dati_oneClick();//调用one点击事件
}
//====选择==
function dati_oneClick(){
	$(".datibg").one("click",".dt_xx",function(){
		var panduan = this.getAttribute("name");
		var pbgc = $(this).prev();
		if(panduan == "Y"){
			pbgc.css("backgroundColor","#57b4a9");
			$(pbgc[0].firstChild).show();
			$(".nextLisen").hide();//错误答案的图先消失
			$(".goTiao").show();
			$(".dati_okmp3")[0].play();//答对音效
		}else{
			pbgc.css("backgroundColor","#b3b3b3");
			$(pbgc[0].lastChild).show();
			$(".p_bgc[name='Y']").css("backgroundColor","#57b4a9");
			$(".dt_dc[name='Y']").show();//选错时，出现正确的答案
			$(".goTiao").hide();//正确答案的图先消失
			$(".nextLisen").show();
			$(".dati_errormp3")[0].play();//打错音效
		}
	})
}
