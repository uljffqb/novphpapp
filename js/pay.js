mui.init();
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	var count = self.count;
	var price = self.price;
	
	//var count = GetQueryString("count");
	//var price = GetQueryString("price");
	var subject = "用户" + username + "开通" + count + "月VIP";
	var qrcode = document.getElementById("qrcode");
	var qrcodeurl = encodeURI(domain + "/api/alipayma/appqrcode.php?price="+price+"&subject="+subject+"&userid="+userid);
	qrcode.setAttribute("src",qrcodeurl);
	document.getElementById("paytitle").innerHTML = subject;
	var mask  = mui.createMask();
	qrcode.addEventListener("tap",function(){
		plus.nativeUI.confirm("是否保存二维码",function(e){
			if(e.index == 0){
				mask.show();
				plus.nativeUI.showWaiting("正在保存图片...");
				var downloader = plus.downloader.createDownload(qrcodeurl,{filename: '_downloads/2048qrcode.jpg'},function(d,status){
					if(status == 200){
						plus.gallery.save(d.filename,function(){
							plus.nativeUI.closeWaiting();
							mask.close();
							plus.nativeUI.toast("保存成功");
						},function(){
							plus.nativeUI.closeWaiting();
							mask.close();
							alert("保存失败了");
						});
					}else{
						alert(status);
					}
				});
				downloader.start();
			}
				
		},appname,["确认","不了"]);
	});
});