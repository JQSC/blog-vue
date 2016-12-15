var express = require('express');
var router = express.Router();
var db = require('../database/db')
var user=db.user;
var comments=db.comments;
var messages=db.messages;
var url=require('url')
var Promise=require('bluebird');




var UserFind=new Promise(function(resolve,reject){
  var search={};
//查看哪页
  /*
   limit:3，每页限制3条记录
   num:1，查询的页面
   pageCount，一共有多少页
   size，当前页面有多少条
   记录
   numberOf，分页用几个标签显示*/
  var page={limit:3,num:1};
  var model = {
    search:search,    //查询条件
    //columns:'name alias director publish images.coverSmall create_date type deploy',
    //数据返回字段
    columns:{
      title:1,
      _id:1,
      contentTxt:1,
      day:1,            //日期
      comment:1,       // 评论数量
      readNum:1,       // 阅读量
      author:1,        //作者
      praise:1,         //点赞数量
      keyword:1
    },
    page:page
  };
 return user.findPagination(model,function(err, pageCount, list){
   if(!err){
     var listpage={
       list:list,
       pageCount:pageCount
     };
     resolve(listpage)
   }else{
     reject(err)
   }
})});

var MessageFind=new Promise(function(resolve,reject){
  return  messages.find(function(err,messages) {
    if(!err){
      resolve(messages)
    }else{
      reject(err)
    }
  })
});

/*var requestOpt=new Promise(function(resolve,reject){
  return request({}, function (err, res, string) {
    if(!err){
    resolve(string)
    }else{
      reject(err)
    }
  })
});*/

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


function commentFind(id,text){
  return new Promise(function(resolve,reject){
    comments.find({articleId:id},function(err,article){
      if(!err){
        var list={
          text:text,
          article:article
        }
        resolve(list)
      }else{
        reject(err)
      }
    })
  })
}

//初始页
router.get('/', function(req, res) {
  //res.redirect('/');
  //throw new Error('NOPE！')
  res.render('vue',{fortun:'aaa',pageTestScript:'/qa/test-about.js'});
});
router.get('/*', function(req, res) {
  process.nextTick(function(){
    throw new Error('NOPE！')
  })


});


module.exports = router;
