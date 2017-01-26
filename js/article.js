mui.init();
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	var articleid = self.articleid;
	//var articleid = GetQueryString("id");
	if(articleid != null && articleid != "null"){
		mui.getJSON(domain+"/index.php?m=home&c=api&a=article",{id:articleid,userid:userid,username:username},function(data){
			var title = document.getElementById("title");
			title.innerHTML = data.title;
			var articletitle = document.getElementById("articletitle");
			var articlecontent = document.getElementById("articlecontent");
			var hiddencontent = document.getElementById("hiddencontent");
			if(data.hiddencontent == "notallow"){
				if(data.authmessage != null){
					var message = '<div class="mui-text-center">本版块<span style="color:red;">'+data.authmessage+"</span>可查看下载链接";
					message += '<button class="mui-btn mui-btn-negative mui-btn-block" id="vip">开通VIP</button></div>';
					hiddencontent.innerHTML = message;
				}
				
			}else{
				hiddencontent.innerHTML = data.hiddencontent;
			}
			articletitle.innerHTML = data.title;
			articlecontent.innerHTML = data.content;
		});
	}else{
		alert("文章不存在");
		mui.back();
	}
	
	mui("#hiddencontent").on("tap","#vip",function(){
		gotourl("vip.html");
	});
	mui("#hiddencontent").on("tap","a",function(){
		var link = this.getAttribute("href");
		mui.openWindow({
			url:'browser.html',
			id:'browser.html',
			extras:{
				link:link
			},
			createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		});
		//gotourl('browser.html?link='+link);
	});
});