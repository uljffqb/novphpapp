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
		var cateid = plus.storage.getItem("curcateid");
		var table = document.body.querySelector('.mui-table-view');
		var str = "";
		mui.getJSON(domain + "/index.php?m=home&c=api&a=categorylist",{id:cateid,curpage:1,version:version},function(data){
			mui.each(data,function(key,val){
				str += '<li class="mui-table-view-cell mui-media mui-col-xs-12"><a href="#" articleid="'+val.id+'">';
				str += '<img class="mui-media-object" src="http://kb2048.xyz'+val.litpic+'">';
				str += '<div class="mui-media-body">'+val.time+"&nbsp;&nbsp;"+val.title+'</div>';
				str += '<span>&nbsp;</span></a></li>';
			});
			table.innerHTML = str;
			curpage = 1;
			mui('#pullrefresh').pullRefresh().refresh(true);
		});
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1500);
}
var count = 0;
/**
 * 上拉加载具体业务实现
 */
var curpage = 1;
function pullupRefresh() {
	setTimeout(function() {
		var cateid = plus.storage.getItem("curcateid");
		var table = document.body.querySelector('.mui-table-view');
		++curpage;
		mui.getJSON(domain + "/index.php?m=home&c=api&a=categorylist",{id:cateid,curpage:curpage,version:version},function(data){
			if(data.status == "nomore"){
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
			}else{
			mui.each(data,function(key,val){
				var str = "";
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell mui-media mui-col-xs-12';
				str += '<a href="#" articleid="'+val.id+'">';
				str += '<img class="mui-media-object" src="http://kb2048.xyz'+val.litpic+'">';
				str += '<div class="mui-media-body">'+val.time+"&nbsp;&nbsp;"+val.title+'</div>';
				str += '<span>&nbsp;</span></a>';
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