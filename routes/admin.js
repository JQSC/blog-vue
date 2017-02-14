var express = require('express');
var router = express.Router();
var db = require('../database/db');
var user=db.user;
var fs=require('fs');

//匹配admin路由
router.get('/', function(req, res) {
    res.render('index');
});


//用百度ueditor编辑器保存html形式日志  --old
router.post('/savelog', function(req, res) {

  //保存日志主题及其内容

  var NowDate=new Date()
  var textAll= new user({
    title: req.body.title,
    content: req.body.content,
    contentTxt: req.body.contentTxt,
    day:NowDate.toLocaleDateString()+"  "+NowDate.toLocaleTimeString(),
    comment:0,       // 评论数量
    readNum:0,       // 阅读量
    author:"Danny",  //作者
    praise:0 ,       //点赞数量
    keyword:req.body.keyword
  });

  textAll.save();

  res.render('admin', { title:req.body.title ,content: req.body.content } );

});


//以markdown形式编写日志  --new
router.post('/saveLogNew', function(req, res) {

  var marked = require('marked');
  var content=marked(req.body.contentTxt);
  var NowDate=new Date();
  var textAll= new user({
    title: req.body.title,
    content: content,
    contentTxt: req.body.contentTxt,
    day:NowDate.toLocaleDateString()+"  "+NowDate.toLocaleTimeString(),
    comment:0,       // 评论数量
    readNum:0,       // 阅读量
    author:"Danny",  //作者
    praise:0 ,       //点赞数量
    keyword:req.body.keyword
  });

  textAll.save();

  res.render('admin', { title:req.body.title ,content: req.body.content } );

});
module.exports = router;
