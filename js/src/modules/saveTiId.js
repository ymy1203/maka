//保存学生已收听过学姐讲题的题目
function saveId(quesId,finalID){
	$.ajax({
		type: "post",
		url: url+"moka/newStudent/1/interface",
		data: {
			method:"saveListenedQuestionForAm",
		    mkAmStudentId: StudentId,
		    questionId:quesId,
		    bid:"259",//书籍目录
		    finalDictId:finalID,
		    source:"am"
		},
		dataType: "json",
		success:function (data) {
			// console.log(data);
		}
	})
}
//-==
// var ass = $(".dati_box a");
$(".dati_box").on("click","a",function(){
	// console.log(this.id);
	var liId = $(this).parents("li")[0].id;
	saveId(this.id,liId);
})
