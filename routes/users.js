var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {

  res.render('admin', { title: "测试",content:"&nbsp;&nbsp;&nbsp;&nbsp;<p>我是池圣齐</p>"});
});



module.exports = router;
