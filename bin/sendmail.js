/**
 * Created by chi on 2016/12/5.
 */
//邮箱服务
var nodemailer = require('nodemailer');

function SendMail(contentList,callback){
    var transporter = nodemailer.createTransport({
        service:'qq',
        auth: {
            user: '122377305@qq.com',
            pass: 'ejqfxfydcxesbjic'
        }
    });
    //发送多个用户
    //'916024826@qq.com,111@qq.com,"池圣齐"<916024826@qq.com>'
    var mailOptions = {
        from: '122377305@qq.com', // 发送者
        to: contentList.addressee, // 接受者,可以同时发送多个,以逗号隔开
        subject: contentList.headline, // 标题
       // text: contentList.title // 文本
        html: contentList.title // html
        /* html: '<h2>nodemailer基本使用:</h2><h3> ' +
         '<a href="http://blog.csdn.net/zzwwjjdj1/article/details/51878392">' +
         'http://blog.csdn.net/zzwwjjdj1/article/details/51878392</a></h3>'*/
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            callback(err,null)
            console.log("邮件发送失败!!!")
            console.log(err);
            return;
        }
        callback(null,info)
    });
}


module.exports.SendMail=SendMail