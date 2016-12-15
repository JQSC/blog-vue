var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {

  res.render('admin', { title: "测试",content:"&nbsp;&nbsp;&nbsp;&nbsp;<p>我是池圣齐</p>"});
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
