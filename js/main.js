(function($, doc) {
	$.init();
	var subpages = ['html/index.html', 'html/category.html', 'html/search.html', 'html/member.html'];
	var subpage_style = {
		top: '46px',
		bottom: '50px',
		scrollIndicator:'none',
		bounce:'vertical'
	};
	
	$.plusReady(function() {
		if(islogin() == "no"){
			gotourl("login.html");
		}
		var self = plus.webview.currentWebview();
		for (var i = 0; i < 4; i++) {
			var temp = {};
			var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
			if (i > 0) {
				sub.hide();
			}else{
				temp[subpages[i]] = "true";
				mui.extend(aniShow,temp);
			}
			self.append(sub);
		}
		
		//--
		$.oldBack = mui.back;
		var backButtonPress = 0;
		$.back = function(event) {
			backButtonPress++;
			if (backButtonPress > 1) {
				plus.runtime.quit();
			} else {
				plus.nativeUI.toast('再按一次退出应用');
			}
			setTimeout(function() {
				backButtonPress = 0;
			}, 1000);
			return false;
		};
	});
var aniShow = {}; 

 //当前激活选项
var activeTab = subpages[0];
var title = document.getElementById("title");
 //选项卡点击事件
mui('.mui-bar-tab').on('tap', 'a', function(e) {
	var targetTab = this.getAttribute('href');
	if (targetTab == activeTab) {
		return;
	}
	//更换标题
	title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
	//显示目标选项卡
	if(mui.os.ios||aniShow[targetTab]){
		plus.webview.show(targetTab);
	}else{
		var temp = {};
		temp[targetTab] = "true";
		mui.extend(aniShow,temp);
		plus.webview.show(targetTab,"fade-in",300);
	}
	//隐藏当前;
	plus.webview.hide(activeTab);
	//更改当前活跃的选项卡
	activeTab = targetTab;
});
	
//在线更新
 plus.runtime.getProperty(plus.runtime.appid,function(inf){
    wgtVer=inf.version;
    console.log("当前应用版本："+wgtVer);
});
// 检测更新
var checkUrl="http://demo.dcloud.net.cn/test/update/check.php";
function checkUpdate(){
    plus.nativeUI.showWaiting("检测更新...");
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        switch(xhr.readyState){
            case 4:
            plus.nativeUI.closeWaiting();
            if(xhr.status==200){
                console.log("检测更新成功："+xhr.responseText);
                var newVer=xhr.responseText;
                if(wgtVer&&newVer&&(wgtVer!=newVer)){
                    downWgt();  // 下载升级包
                }else{
                    plus.nativeUI.alert("无新版本可更新！");
                }
            }else{
                console.log("检测更新失败！");
                plus.nativeUI.alert("检测更新失败！");
            }
            break;
            default:
            break;
        }
    }
    xhr.open('GET',checkUrl);
    xhr.send();
}

// 下载wgt文件
var wgtUrl="http://demo.dcloud.net.cn/test/update/H5EF3C469.wgt";
function downWgt(){
    plus.nativeUI.showWaiting("下载wgt文件...");
    plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
        if ( status == 200 ) { 
            console.log("下载wgt成功："+d.filename);
            installWgt(d.filename); // 安装wgt包
        } else {
            console.log("下载wgt失败！");
            plus.nativeUI.alert("下载wgt失败！");
        }
        plus.nativeUI.closeWaiting();
    }).start();
}

// 更新应用资源
function installWgt(path){
    plus.nativeUI.showWaiting("安装wgt文件...");
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件成功！");
        plus.nativeUI.alert("应用资源更新完成！",function(){
            plus.runtime.restart();
        });
    },function(e){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件失败["+e.code+"]："+e.message);
        plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
    });
}


}(mui, document));