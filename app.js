var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');       //图标
var logger = require('morgan');              //提供自动日志记录支持
var cookieParser = require('cookie-parser'); //提供对cookie的支持
var bodyParser = require('body-parser');
var fs=require('fs');
//var session=require('express-session');

var index = require('./routes/index');
var users = require('./routes/admin');
var api = require('./routes/api');

var app = express();
//断言测试
app.use(function(raq,res,next){
  res.locals.showTests=app.get('env')!=='production' && raq.query.test=='1';
  next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('port', (process.env.PORT || 8080));
//app.set('env', 'production');   //开发环境
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',require('ejs').__express);

//注册模板引擎
app.set('view engine', 'html');


//用gzip压缩响应数据
/* var compress = require('compression');
app.use(compress()); */

app.use(favicon(__dirname + '/public/images/icon-logo.jpg'));

app.use(logger('dev'));

/*var accessLog = fs.createWriteStream(__dirname+'/log/request.log', {flags : 'a'});

switch(app.get('env')){
  case 'development':
    app.use(logger('dev'));
    break;
  case 'production':
    app.use(logger('combined', {stream : accessLog}))
}*/

//app.use(logger('dev'));   //服务器日志  ;预定义格式 short tiny (dev 输出简洁日志)

app.use(bodyParser.json());  //读取并解析请求体,放到req.body中;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());   //解析来自游览器的cookie 放到req.cookies 中
/*
app.use(session({
      secret: '12345',
     // name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
      cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
      resave: false,
     saveUninitialized: true
    }));  //存储会话窗口session
*/


app.use(express.static(path.join(__dirname, 'public')));    //发送指定目录的文件到http客户端


//app.use(express.static('public'));    //发送指定目录的文件到http客户端

//
app.use(function(raq,res,next){
  var cluster=require('cluster');
  if(cluster.isWorker){
    console.log("运行的工作线程为——"+cluster.worker.id)
  }
  next()
});


app.use('/api', api);
app.use('/admin', users);
app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function startServer(){
  app.listen(app.get('port'),function(){
    console.log("启动成功!");
  });
}

//直接运行脚本时候 require.main===module是true，如果是false 表面脚本是通过另一脚本require加载进来的
if(require.main===module){
  startServer()
}else{
  //应用程序作为一个模块 require 引入 导出函数
  module.exports = startServer;
}

