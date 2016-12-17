/**
 * Created by chi on 2016/12/15.
 */
var express = require('express');
var router = express.Router();
var db = require('../database/db')
var request=require('request');
var user=db.user;
var comments=db.comments;
var messages=db.messages;



///获取天气详细情况
var options={
    //uri: 'http://apis.baidu.com/apistore/weatherservice/cityid?cityid=101010100',
    uri: 'http://apis.baidu.com/thinkpage/weather_api/currentweather?location=beijing&language=zh-Hans&unit=c',
    headers: {
        'apikey':"ec8bd565b64ac8fb745c476158723bf4"
    }
};

//获取天气内容
router.get('/GetWeather', function(req, res) {
    request(options, function (err, response, string) {
        if (!err) {
            var jsonStr = eval('(' + string + ')') ;
            res.json(jsonStr)
        } else {
            console.log(err)
        }
    })
});



//获取留言
router.post('/GetNote',function(req,res){
    console.log(req.body.num)
    var pageMessage={limit:5,num:req.body.num};
    //type:{ $ne:-1 }
    var modelMessage = {
        search:{type:{ $ne:-1 }},    //查询条件
        columns:{
            nickname:1,
            _id:1,
            email:1,
            MessageText:1,
            day:1,
            floor:1,
            type:1
        },
        page:pageMessage,
        sort:req.body.sort||-1
    };
    messages.findPagNote(modelMessage,function(err, pageCount, list){
        if(!err){
           // console.log(list)
            var listPage={
                list:list,
                pageCount:pageCount
            };
            res.json(listPage)
        }
    })
});

//删除留言
router.post('/deleteNote',function(req,res){
    var id=req.body.id
    messages.update({_id:id},{$set:{type:-1}},function (err,a) {
        if (err) return handleError(err);
        res.json({success:'OK!'});
    });
})
//获取文章内容
router.post('/getContentMain',function(req,res){

    //console.log("111111")
    var search={};
    //查看哪页
    /*
     limit:3，每页限制3条记录
     num:1，查询的页面
     pageCount，一共有多少页
     size，当前页面有多少条
     记录
     numberOf，分页用几个标签显示*/
    var page={limit:req.body.limit,num:req.body.num};
    var model = {
        search:search,    //查询条件
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
        page:page,
        sort:req.body.sort||-1
    };
    user.findPagination(model,function(err, pageCount, list){
        if(!err){
            var listPage={
                list:list,
                pageCount:pageCount
            };
            res.json(listPage)
        }else{
            console.error("获取文章内容出现异常错误!"+err.stack)
            res.status=500;
            res.setHeader('content-type','text/plain')
            res.end('Server error')
        }
    })
});





//获取文章列表
router.get('/getArticleList',function(req,res) {
    user.find({},{'title':1},{limit:20},function(error, results){
        if(!error){
            res.json(results)
        }

    })
})


//获取评论
router.post('/GetComment', function(req, res) {
    var searchId = req.body.articleId;
    //console.log(searchId)
    comments.find({articleId:searchId},function(err,article) {
        if (!err) {
            var listComment = {
                articleNum:article.length,article:article
            };
            //console.log(listComment)
            res.json(listComment)
        }
    })
});



var marked = require('marked');
var fs = require('fs');

/* GET home page. */
router.get('/aaa',function(req, res, next) {
    fs.readFile('./marked.md', 'utf-8',function(err, data) {
        var html = marked(data);
        ///console.log(html)
        res.render('marker',{text:html})
    })

});


//留言
router.post('/LeMessage', function(req, res) {

    var NowDate=new Date();
    messages.count(function (err, doc) {
        console.log("开始"+doc);
        var messagesAll = new messages({
            nickname: req.body.nickname,
            email: req.body.email,
            MessageText: req.body.LMmessage,
            day: NowDate.toLocaleDateString() + "  " + NowDate.toLocaleTimeString(),
            floor: doc + 1
        });
        console.log("结束")
        //messagesAll.save();
        res.json({success:"留言成功!!"})
    })
});
//点赞
router.get('/praise', function(req, res) {
    var id=url.parse(req.url).query
    //查找操作
    user.findById({_id:id},function(err,text){
        //var titleNew=text.title
        //var contentNew=text.content;
        //var readNumNew=text.readNum+1;
        var praise=text.praise+1
        //更新操作
        user.update({_id:id},{ praise:praise},  function (err) {
            if (err) return handleError(err);
            res.jsonp("OK!");
            //res.redirect('/')
        });
    });
});
//评论
router.post('/search/:id/commit', function(req, res) {

    var NowDate=new Date();
    console.log("开始评论!!!!!!!!!!!!!!");

    (function(){
        comments.count({articleId:req.params.id}, function (err, doc) {

            var commentsAll= new comments({
                nickname: req.body.nicknameComment,
                email: req.body.emailComment,
                articleId: req.params.id,
                articleText: req.body.articleTextComment,
                day:NowDate.toLocaleDateString()+"  "+NowDate.toLocaleTimeString(),
                floor:doc+1
            });
            commentsAll.save();
            user.update({_id:req.body.articleId},{ comment:doc+1},  function (err) {
                if (err) return handleError(err);
                res.redirect('/search/'+req.params.id)
            })
        })
    })();
});


//发送邮件中间件
var nodeMailer=require('../lib/sendmail.js');
//发送邮件
router.post('/SendEmail',function(req,res){

    var Email = req.body.Email;
    //'"池圣齐"<916024826@qq.com>'
    var contentList={
        addressee:Email,
        headline:'池圣齐博客发来的一封邮件',
        title:'<h2>邮件订阅成功!!:</h2><h3> ' +
        '<a href="http://chisir.top">' +
        'http://chisir.top</a></h3>'
    };
    nodeMailer.SendMail(contentList,function(err,info){
        if(err){
            res.json({success:''});
            console.log(err)
        } else{
            res.json({success:"OK!!"});
            console.log("邮件发送成功!!")
        }
    });
});


//文件上传;并将其存储到七牛云平台
router.post('/uploadFile',function(req,res){

    var uploadFile=require('../lib/fileQiNiu.js')
    filePath = './public/main.js';
    nameSpace = 'blog';
    fileName = 'my-nodejs-test.js';
    try {
        uploadFile.uploadFile(filePath,fileName,nameSpace,function(err,ret){
            if(!err){
                console.log("上传成功:"+ret)
                res.json({success:'OK!!!'})
            }
        })
    }
    catch (err){
        console.error("上传文件出现异常错误!"+err.stack)
        res.status=500
        res.setHeader('content-type','text/plain')
        res.end('Server error')
    }

});


module.exports = router;