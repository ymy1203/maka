var cx_zhang;
var cx_jie;
var cx_ti;
//查询学生最近使用的目录
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
		// location.href = "#/dati";
		cx_zhang = data.recordList[1];
		cx_jie = data.recordList[2];
		cx_ti = data.recordList[3];
		// $("#" + cx_zhang + "").click();
	}

})