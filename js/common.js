var appname = "kb2048";
var domain = localStorage.getItem("domain");
var userid = localStorage.getItem("userid");
var username = localStorage.getItem("username");
var line = localStorage.getItem("line");
var mask = mui.createMask();
function gotourl(url){
	mui.openWindow({
		url:url,
		id:url,
		createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	});
}
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null){
     	return unescape(r[2]);
     }else{
     	return null;
     }
}
function getDate(timestamp,cut){
	//转换成 2011-3-16 16:50:43 格式
	var tt = new Date(parseInt(timestamp) * 1000);
	var str = "";
	var fix = "-"
	var fix1 = ":";
	var month = tt.getMonth() < 10 ? "0"+ tt.getMonth() : tt.getMonth();
	var day = tt.getDate() < 10 ? "0"+ tt.getDate() : tt.getDate();
	str += tt.getFullYear() + fix;
	str += month + fix;
	str += day;
	str += " ";
	str += tt.getHours() + fix1;
	str += tt.getMinutes() + fix1;	
	str += tt.getSeconds();

	//var tt=new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/\//g, "-").replace(/年|月/g, "-").replace(/日/g, " ");
	//var tt=new Date(parseInt(timestamp) * 1000).toLocaleString();
	if(cut == 1){
		str = str.substring(0, str.length - 8);
	}
	return str;
} 
function domainselect(selected){
	if(selected == "1" || selected == ""){
		var domain = "http://kb2048.xyz";
	}else if(selected == "2"){
		var domain = "http://kb2048.com";
	}
	localStorage.setItem("domain",domain);
	return domain;
}
function login(loginInfo,callback){
	callback = callback;
	loginInfo = loginInfo || {};
	loginInfo.username = loginInfo.username || '';
	loginInfo.password = loginInfo.password || '';
	loginInfo.line = loginInfo.line || '';
	if (loginInfo.username.length < 5) {
		return callback('账号最短为 5 个字符');
	}
	if (loginInfo.password.length < 6) {
		return callback('密码最短为 6 个字符');
	}
	domainselect(loginInfo.line);
	mui.getJSON(domain + "/index.php?m=home&c=api&a=login",{username:loginInfo.username,password:loginInfo.password},function(data){
		if(data.status == "success"){
			localStorage.setItem("userid",data.userid);
			localStorage.setItem("username",data.username);
			localStorage.setItem("regtime",data.regtime);
			localStorage.setItem("groupname",data.groupname);			
			return callback("success");
		}else{
			return callback(data.statustext);
		}
	});
}
function islogin(){
	if(userid && username){
		return "yes";
	}else{
		return "no";
	}
}
function logout(){
	localStorage.clear();
	return "success";
}
function getRadioBoxValue(radioName){ 
	var obj = document.getElementsByName(radioName);  //这个是以标签的name来取控件
	for(i=0; i<obj.length;i++){
		if(obj[i].checked){
			return obj[i].value; 
		}
	}         
	return "undefined";       
}
function vipprice(count){
	var price = 0;
	if(count == "1"){
		price = 10;
	}else if(count == "3"){
		price = 20;
	}else if(count == "6"){
		price = 36;
	}else if(count == "12"){
		price = 60;
	}
	return price;
}
	

(function(){

}(mui, window.app = {}));
