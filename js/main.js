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

}(mui, document));