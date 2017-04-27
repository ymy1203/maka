$(".turnIn").click(function() {
	//查询最后保存的题目信息
	cx_timu();
})

function cx_timu() {
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
			if (data.recordList.length > 1) {
				location.href = "#/dati";
			} else {
				location.href = "#/fir_add";
			}
		}
	})
}