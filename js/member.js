mui.init();
mui.plusReady(function(){ 
	var nickname = document.getElementById("nickname");
	nickname.innerHTML = localStorage.getItem("username");
	document.getElementById("logout").addEventListener("tap",function(){
		plus.nativeUI.confirm("是否要退出登陆",function(e){
			if(e.index == 0){
				if(logout()=="success") gotourl("../login.html");
			}
			
		},appname,["确认","取消"]);
	});
	document.getElementById("setting").addEventListener("tap",function(){
		gotourl("../setting.html");
	});
	document.getElementById("vip").addEventListener("tap",function(){
		gotourl("vip.html");
	});
	document.getElementById("regtime").innerHTML = getDate(localStorage.getItem("regtime"),1);
	document.getElementById("groupname").innerHTML = localStorage.getItem("groupname");
});