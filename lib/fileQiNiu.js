/**
 * Created by chi on 2016/12/7.
 */
var qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'vfo35Pl6iHnp4xJpD-oPDlabannY5v53V8WWuR_d';
qiniu.conf.SECRET_KEY = 'UViB8hHQ0xJr8xfPSegi-mjfhDAZ2SRwH31DEhte';


//要上传的空间
//bucket = 'blog';

//上传到七牛后保存的文件名
//key = 'my-nodejs-logo.png';

//构建上传策略函数
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
}

//生成上传 Token
//token = uptoken(bucket, key);

//要上传文件的本地路径
//filePath = './ruby-logo.png'

//构造上传函数
function uploadFile(filePath,fileName,nameSpace,callback) {

    var putPolicy = new qiniu.rs.PutPolicy(nameSpace+":"+fileName);
    token = putPolicy.token();

    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(token, fileName, filePath, extra, function(err, ret) {
        if(!err) {
            // 上传成功， 处理返回值
            callback(err,ret);
            console.log("上传文件成功："+ret.hash, ret.key, ret.persistentId);
        } else {
            // 上传失败， 处理返回代码
            callback(err,ret);
            console.log("上传失败:"+err);
        }
    });
}

//构造获取文件信息函数
function getFileInfo(nameSpace,fileName,callback){

    //构建bucketmanager对象
    var client = new qiniu.rs.Client();

    //你要测试的空间， 并且这个key在你空间中存在
    //nameSpace = 'blog';
    //fileName = 'my-nodejs-logo.js';

    //获取文件信息
    client.stat(nameSpace, fileName, function(err, ret) {
        if (!err) {
            console.log(ret.hash, ret.fsize, ret.putTime, ret.mimeType);
            callback(err,ret)
        } else {
            console.log(err);
            callback(err,ret)
        }
    });
}

//文件下载
function load(){

//构建私有空间的链接
    url = 'http://ohsmsw5ly.bkt.clouddn.com/my-nodejs-logo.js';
    var policy = new qiniu.rs.GetPolicy();

//生成下载链接url
    var downloadUrl = policy.makeRequest(url);

//打印下载的url
    console.log("文件下载:")
    console.log(downloadUrl);

}


module.exports={
    'uploadFile':uploadFile,
    'getFileInfo':getFileInfo,
    'load':load

};
