// 下载wgt文件
//var wgtUrl="http://demo.dcloud.net.cn/test/update/H5EF3C469.wgt";
function downWgt(wgtUrl){
    plus.nativeUI.showWaiting("下载wgt文件...");
    plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
        if ( status == 200 ) { 
            //console.log("下载wgt成功："+d.filename);
            installWgt(d.filename); // 安装wgt包
        } else {
            //console.log("下载wgt失败！");
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
        //console.log("安装wgt文件成功！");
        plus.nativeUI.alert("应用资源更新完成！",function(){
            plus.runtime.restart();
        });
    },function(e){
        plus.nativeUI.closeWaiting();
        //console.log("安装wgt文件失败["+e.code+"]："+e.message);
        plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
    });
}