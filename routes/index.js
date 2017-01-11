var express = require('express');
var router = express.Router();
var db = require('../database/db')
var user=db.user;
var url=require('url')
var Promise=require('bluebird');

function findById(id){
  return new Promise(function(resolve,reject){
    user.findById(id,function(err,text){
      if(!err) {
        resolve(text)
      }else{
        reject(err)
      }
    })
  })
}

function articleUpdate(id,text){
  var readNum=text.readNum+1
  return new Promise(function(resolve,reject){
    user.update({_id:id},{readNum:readNum},function (err) {
      if(!err) {
        resolve(text)
      }else{
        reject(err)
      }
    })
  })
}

//跳转文章页
router.post('/GetArticleContent', function(req, res) {
  var id=req.body.articleId
  //console.log(id)
  findById(id)
      .then(function(text){
        return articleUpdate(id,text)
      }).then(function(list){
    var titleNew=list.title;
    var contentNew=list.content;
    var keyword=list.keyword.toUpperCase();
    var comment={
      title:titleNew, content:contentNew, commentId:id ,keyword:keyword};
    res.json(comment)
  })
});


//路由配置
router.get('/*', function(req, res) {

   switch(req.params[0]){
     case "note":
       res.render('note');
       break;
     case "log":
       res.render('editLog');
       break;
     case "article":
       res.render('article');
       break;
     case "comment":
       res.render('comment');
       break;
     case "production":
       res.render('production');
       break;
     default:
       res.render('vue',{fortun:'aaa',pageTestScript:'/qa/test-about.js'});
       break;
   }
});

module.exports = router;
