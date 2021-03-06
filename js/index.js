mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		var table = document.body.querySelector('.mui-table-view');
		var str = "";
		mui.getJSON(domain + "/index.php?m=home&c=api&a=categorylist",{curpage:1,version:version},function(data){
			if(data.status == "update"){
				downWgt(data.url);
			}else{
				mui.each(data,function(key,val){
					str += '<li class="mui-table-view-cell mui-media"><a href="#" articleid="'+val.id+'">';
					str += '<img class="mui-media-object mui-pull-left" src="http://kb2048.xyz'+val.litpic+'">';
					str += '<div class="mui-media-body">'+val.title+'<p class="mui-ellipsis">'+val.time+'</p></div>';
					str += '</a></li>';
				});
				table.innerHTML = str;
				curpage = 1;
				mui('#pullrefresh').pullRefresh().refresh(true);
			}
			
		});
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		mask.close();
	}, 1500);
}
var count = 0;
/**
 * 上拉加载具体业务实现
 */
var curpage = 1;
function pullupRefresh() {
	setTimeout(function() {
		var table = document.body.querySelector('.mui-table-view');
		++curpage;
		mui.getJSON(domain + "/index.php?m=home&c=api&a=categorylist",{curpage:curpage,version:version},function(data){
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
		/*mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。*/
	}, 1500);
}
if (mui.os.plus) {
	mui.plusReady(function() {
		//alert(localStorage.getItem("domain"));
		mui("#articlelist").on("tap","a",function(){
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
		})
		setTimeout(function() {
			mui('#pullrefresh').pullRefresh().pulldownLoading();
		}, 1000);

	});
} else {
	mui.ready(function() {
		//mui('#pullrefresh').pullRefresh().pullupLoading();
		
	});
}