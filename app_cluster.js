/**
 * Created by chi on 2016/12/6.
 */

/*cluster是node提供的一个多线程库，用户可以使用它来创建多个线程，
线程之间共享一个监听端口，当有外部请求这个端口时，cluster会将请求转发到随机线程里。
因为每个node线程都会占用几十兆的内存，所以不能像php那样对每个请求创建一个线程，
一般来说创建的线程数最多都不会超过cpu的核心数量。*/
var cluster=require('cluster');

 function startWorker(){
    var  worker=cluster.fork()
     console.log("新的工作进程："+worker.id)
 }

//判断是否是主进程 ,r如果是则cluster.isMaster为true
if(cluster.isMaster)
{
    require('os').cpus().forEach(function(){
        startWorker()
    })
    //记录所有断开的线程,如果工作线程断开则退出
    //等待exit，繁衍出一个新的进程替代断开的进程
    cluster.on('disconnect',function(worker){
        console.log("有断开的进程"+worker.id)
    })
    //创建新的工作进程替代
    cluster.on('exit', function(worker, code, signal) {
        console.log('工作进程: ' + worker.id + ' 断开',code,signal);
        startWorker()
    });
}else{
    //在子进程中启动app服务
    require('./app.js')()
}