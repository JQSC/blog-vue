var express = require('express');
var router = express.Router();
var db = require('../database/db')
var user=db.user;
var fs=require('fs')
/* GET users listing. */
router.get('/', function(req, res) {

  var data = [];
   /* fs.readdir('./public/file', function (ev2, fill) {
    fill.forEach(function (fz) {
      data.push(fz)
    });*/
    var arr=[];
    console.log(arr)
    res.render('index', { user:arr[0] ,data:data,name:arr[2],password:arr[1],email:arr[3]});

});


router.post('/savelog', function(req, res) {
  // console.log(req.body);
  //保存日志主题及其内容
  var NowDate=new Date()
  var textAll= new user({
    title: req.body.title,
    content: req.body.content,
    contentTxt: req.body.contentTxt,
    day:NowDate.toLocaleDateString()+"  "+NowDate.toLocaleTimeString(),
    comment:0,       // 评论数量
    readNum:0,       // 阅读量
    author:"Danny",        //作者
    praise:0 ,        //点赞数量
    keyword:req.body.keyword
  });
  textAll.save();
  res.render('admin', { title:req.body.title ,content: req.body.content } );
});


module.exports = router;