mui.init();
mui.plusReady(function(){
	document.getElementById("submit").addEventListener('tap',function(){
		var count = getRadioBoxValue("num");
		var price = vipprice(count);
		mui.openWindow({
			url:'pay.html',
			id:'pay.html',
			extras:{
				count:count,
				price:price
			},
			createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		});
		//gotourl("pay.html?count="+count+"&price="+price);
	});
});