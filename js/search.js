mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
mui.plusReady(function() {
	mui("#result").on("tap","a",function(){
		var articleid = this.getAttribute("articleid");
		//gotourl('article.html?id='+articleid);
		mui.openWindow({
			url:'article.html',
			id:'article.html',
			extras:{
				articleid:articleid
			},
			createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		});
	});

});
var keywords = "";
function search(e){
	if (event.keyCode==13){
		keywords = e.value;
		e.blur();
		plus.nativeUI.showWaiting("正在努力搜索中...");
		var table = document.body.querySelector('.mui-table-view');
		var str = "";
		mui.getJSON(domain + "/index.php?m=home&c=api&a=search",{keywords:keywords},function(data){
			mui.each(data,function(key,val){
				str += '<li class="mui-table-view-cell mui-media"><a href="#" articleid="'+val.id+'">';
				str += '<img class="mui-media-object mui-pull-left" src="http://kb2048.xyz'+val.litpic+'">';
				str += '<div class="mui-media-body">'+val.title+'<p class="mui-ellipsis">'+val.time+'</p></div>';
				str += '</a></li>';
			});
			table.innerHTML = str;
			mui('#pullrefresh').pullRefresh().refresh(true); //重置上拉
			plus.nativeUI.closeWaiting();
		})
	}
}
/**
 * 上拉加载具体业务实现
 */
var curpage = 1;
function pullupRefresh() {
	setTimeout(function() {
		var table = document.body.querySelector('.mui-table-view');
		++curpage;
		if(keywords == ""){
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
		}else{
			mui.getJSON(domain + "/index.php?m=home&c=api&a=search",{keywords:keywords,curpage:curpage},function(data){
				if(data.status == "nomore"){
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				}else{
					mui.each(data,function(key,val){
						var str = "";
						var li = document.createElement('li');
						li.className = 'mui-table-view-cell mui-media';
						str += '<a href="#" articleid="'+val.id+'">';
						str += '<img class="mui-media-object mui-pull-left" src="http://kb2048.xyz'+val.litpic+'">';
						str += '<div class="mui-media-body">'+val.title+'<p class="mui-ellipsis">'+val.time+'</p></div>';
						str += '</a>';
						li.innerHTML = str;
						table.appendChild(li);
					});
					mui('#pullrefresh').pullRefresh().endPullupToRefresh();
				}
			});
		}
			
		/*mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。*/
	}, 1500);
}