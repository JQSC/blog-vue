//发送邮件中间件
var nodeMailer=require('./sendmail.js');
//通用代码
var observer = {
    //订阅
    addSubscriber: function (callback) {
        this.subscribers[this.subscribers.length] = callback;
    },
    //退订
    removeSubscriber: function (callback) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === callback) {
                delete (this.subscribers[i]);
            }
        }
    },
    //发布
    publish: function (obj) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (typeof this.subscribers[i] === 'function') {
                this.subscribers[i](obj);
            }
        }
    },
    // 将对象o具有观察者功能
    make: function (o) {
        for (var i in this) {
            o[i] = this[i];
            o.subscribers = [];
        }
    }
}
//定义发布者
var blogger = {
    articles: function (obj) {

        this.publish(obj);
    }
}
observer.make(blogger);

//定义订阅者行为
var email = {
    //给订阅者发送邮件
    sendEmail: function(){
        var emailText=arguments[0]
        return function (obj) {
            var title=obj.title
            var url=obj.url
            var contentList={
                addressee:emailText,
                headline:'chisir博客发来的一封邮件',
                title:'<h2>'+'chisir最新发表的文章：'+title +'</h2>'+
                '<a href='+url+'>' +url+'</a>'
            };
            nodeMailer.SendMail(contentList,function(err,info){
                if(err){
                    console.log(err)
                    return 1
                } else{
                    console.log(emailText+"邮件发送成功!!")
                    return 0
                }
            });
        }
    }
};

// 订阅
blogger.addSubscriber(email.sendEmail("122377305@qq.com"));

//发布
blogger.articles({
    title:"闭包的理解",
    url:"chisir.top/search/57f71974c79e28d818e74434#home"
});