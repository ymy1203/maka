require(["jquery","director"],function($,Router){
	var router = Router({
		"/:view":function(view){
			// $(".center").empty();
			//默认地址栏变化，直接清空当前页的定时任务
			clearTime();
			$(".center").load("component/"+view+".html");
		}
	}).init("/star");
});
//学生id
var StudentId = "QD012016100104";
var url = "http://115.182.107.203:8088/inter/";
//==对set的特殊处理
var timeMap = [];
function createTimer(fn,time){
	var interval = setInterval(fn,time);
	timeMap.push(interval);
	return interval;
}
function desTimer(inter){
	var index = timeMap.indexOf(inter);
	timeMap.splice(index,1);
	clearInterval(inter);
}
function clearTime(){
	if(timeMap.length){
		for(var i=0;i<timeMap.length;){
			clearInterval(timeMap[i]);
			timeMap.shift(i);
		}
	}
}
//全局變量
var Time_aa = 0;