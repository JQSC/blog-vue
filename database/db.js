/**
 * Created by chi on 2016/8/11.
 */
var mongoose = require('mongoose');
//var db = mongoose.connect('mongodb://localhost/csq');//；连接数据库

var db = mongoose.connect('mongodb://vueblog:chi123@ds035836.mlab.com:35836/chiblog');//；连接数据

    db.connection.on('error',console.error.bind(console,'数据库连接错误!!!!!!!!'));
    db.connection.on('open',function(){
        //一次打开记录
        console.log("数据库打开成功!!!!!!!!")
    });

var Schema = mongoose.Schema;   //  创建表



//存储日志
var userScheMa = new Schema({
    title: String,        //主题内容
    content: String,        //日志HTML内容
    contentTxt:String,     //日志纯文本内容
    day:String,            //日期
    comment:Number,       // 评论数量
    readNum:Number,       // 阅读量
    author:String,        //作者
    praise:Number,         //点赞数量
    keyword:String

});
//存储评论
var commentScheMa = new Schema({
    nickname: String,        //昵称
    email: String,        //邮箱
    articleId:String,     //文章id
    articleText:String,     //评论内容
    day:String,       // 日期
    floor:Number    //楼层


});
//存储留言
var MessageScheMa = new Schema({
    nickname: String,        //昵称
    email: String,        //邮箱
    MessageText:String,     //评论内容
    day:String,       // 日期
    floor:Number    //楼层


});



//  定义了一个新的模型，但是此模式还未和users集合有关联
var user=db.model('users', userScheMa); //  与users集合关联
var comments=db.model('comments', commentScheMa); //  与users集合关联
var messages=db.model('Messages', MessageScheMa);



/*user.findPagination=function(obj,callback){
     var q=obj.search||{}   //查询条件
     var col=obj.columns;   //数据返回字段
     //var q={title:1,_id:0};

     var pageNumber=obj.page.num||1;   //查询的页面，如果为空则默认查询第一页
     var resultsPerPage=obj.page.limit||3;   //每页查询的条数，默认3条

     var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;   //从第几条开始
     var query = user.find(q,col).sort({_id:-1}).skip(skipFrom).limit(resultsPerPage);
     //exec(cb)即执行完后将调用callback函数
     query.exec(function(error, results) {
         if (error) {

             callback(error, null, null);
         } else {

             user.count(q, function(error, count) {
                 if (error) {
                     callback(error, null, null);
                 } else {
                     var pageCount = Math.ceil(count / resultsPerPage);
                     callback(null, pageCount, results);
                 }
             });
         }
     });
};;*/

//代码片段

user.findPagination = function(obj,callback) {
    var q=obj.search||{}   //查询条件
    var col=obj.columns;   //数据返回字段
    //var q={title:1,_id:0};

    var reverse=obj.sort||-1;
    var pageNumber=obj.page.num||1;   //查询的页面，如果为空则默认查询第一页
    var resultsPerPage=obj.page.limit||3;   //每页查询的条数，默认3条

    var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;   //从第几条开始
    var query = user.find(q,col).sort({_id:reverse}).skip(skipFrom).limit(resultsPerPage);
    //exec(cb)即执行完后将调用callback函数
    query.exec(function(error, results) {
        if (error) {

            callback(error, null, null);
        } else {

            user.count(q, function(error, count) {
                if (error) {
                    callback(error, null, null);
                } else {
                    var pageCount = Math.ceil(count / resultsPerPage);
                    callback(null, pageCount, results);
                }
            });
        }
    });
};

//查询留言

messages.findPagNote = function(obj,callback) {
    var q=obj.search||{}   //查询条件
    var col=obj.columns;   //数据返回字段
    var pageNumber=obj.page.num||1;   //查询的页面，如果为空则默认查询第一页
    var resultsPerPage=obj.page.limit||5;   //每页查询的条数，默认5条
    var sort=obj.sort||-1
    var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;   //从第几条开始
    var query = messages.find(q,col).sort({_id:sort}).skip(skipFrom).limit(resultsPerPage);
    //exec(cb)即执行完后将调用callback函数
    query.exec(function(error, results) {
        if (error) {
            callback(error, null, null);
        } else {

            messages.count(q, function(error, count) {
                if (error) {
                    callback(error, null, null);
                } else {
                    var pageCount = Math.ceil(count / resultsPerPage);
                    callback(null, pageCount, results);
                }
            });
        }
    });
};
exports.user = user;
exports.messages = messages
exports.comments = comments



