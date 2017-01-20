/**
 * Created by chi on 2017/1/20.
 */

//发送邮件中间件
var nodeMailer=require('./sendmail.js');

//通用代码
var observer = {
    //订阅者功能 ：订阅（添加订阅者列表）
    addSubscriber: function (callback) {
        this.subscribers[this.subscribers.length] = callback;
    },
    //订阅者功能 ：退订
    removeSubscriber: function (callback) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === callback) {
                delete (this.subscribers[i]);
            }
        }
    },
    //发布者功能 ：发布
    publish: function (what) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (typeof this.subscribers[i] === 'function') {
                this.subscribers[i](what);
            }
        }
    },
    //发布者功能： 添加发布者列表
    make: function (o) {
        for (var i in this) {
            if(this.hasOwnProperty(i)){
                o[i] = this[i];
                o.subscribers = [];
            }
        }
    }
};


//发布者
var blogger = {
    recommend: function (text) {
        var msg = text ;
        this.publish(msg);
    }
};


//加入到发布者队列中
observer.make(blogger);


//订阅者
var tom = {
    read: function (what) {
        console.log('发送订阅内容：' + what)
    }
};

var mm = {
    read: function (what) {
        console.log('发送订阅内容2：' + what)
    }
};

function subscription(mail){
    console.log("订阅者"+mail)
}

// 订阅（加入订阅者列表）

blogger.addSubscriber("122377305@qq.com");

blogger.recommend("发布内容"); //调用发布






function a(){
    var contentList={
        addressee:Email,
        headline:'池圣齐博客发来的一封邮件',
        title:'<h2>邮件订阅成功!!:</h2><h3> ' +
        '<a href="http://chisir.top">' +
        'http://chisir.top</a></h3>'
    };
    nodeMailer.SendMail(contentList,function(err){
        if(err){
            console.log(err)
        } else{
            console.log("邮件发送成功!!")
        }
    });
}
