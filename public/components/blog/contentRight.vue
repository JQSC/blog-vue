<template>
    <div>
        <div class="col-md-4 blog_right" v-bind:style="{opacity:opacity}">
            <div style="border: 1px rgb(238,238,238) solid;background-color: #F9FAFC;;border-radius: 5px;">

                <ul class="ads_nav list-unstyled" >
                    <h4>{{date}}</h4>
                    <li><a href="#"><img class="img-responsive" src="/images/me.jpg" alt=""> </a></li>
                    <li><span class="blog_top">这是一个程序员的独立博客站，主要用于分享与编程技术相关的内容，
								同时这里也是博主记录工作学习中遇到的问题及其解决方案的地方。</span></li>
                    <div class="clearfix"></div>
                </ul>

                <!--<div class="clearfix"></div>-->
                <link rel="stylesheet" href="/stylesheets/iconfont.css">
                <div>
                    <el-row :gutter="20">
                        <el-col :span="6" class="icon_lists" style="text-align: center">
                            <a  class="icon iconfont" href="https://github.com/" target="_blank" title="github">&#xe69f;</a>
                            <div class="name">github</div>
                        </el-col>
                        <el-col :span="6" class="icon_lists" style="text-align: center">
                            <a class="icon iconfont" href="http://w.qq.com/" target="_blank" title="QQ">&#xe613;</a>
                            <div class="name">腾讯QQ</div>
                        </el-col>
                        <el-col :span="6" class="icon_lists" style="text-align: center">
                            <a class="icon iconfont" href="http://www.imooc.com/" target="_blank" title="慕课网">&#xe648;</a>
                            <div class="name">慕课网</div>
                        </el-col>
                        <el-col :span="6" class="icon_lists" style="text-align: center">
                            <a class="icon iconfont" href="https://cnodejs.org/" target="_blank" title="CNde社区">&#xe989;</a>
                            <div class="name">nodejs</div>
                        </el-col>

                    </el-row>
                </div>

            </div>
            <!--留言条-->
            <content-Right-Note></content-Right-Note>
            <!--背景色-->
            <content-Right-Color></content-Right-Color>
            <!--关键词-->
            <div style="border: 1px rgb(238,238,238) solid; margin-top: 15px;background-color: #F9FAFC;border-radius: 5px;">
                <ul class="tag_nav list-unstyled" style="text-align: center">
                    <h4 style="text-align: left">关键词</h4>
                    <hr>
                    <li class="active"><a href="#">分页</a></li>
                    <li><a href="#">bootstrap</a></li>
                    <li><a href="#">cookie</a></li>
                    <li><a href="#">heroku</a></li>
                    <li><a href="#">百度分享</a></li>
                    <li><a href="#">nodejs</a></li>
                    <li><a href="#">云服务器</a></li>
                    <li><a href="#">github</a></li>
                    <li><a href="#">ueditor</a></li>
                    <div class="clearfix"></div>
                </ul>
            </div>
            <contentRightEmail></contentRightEmail>
        </div>
    </div>
</template>
<script>
    var todayDate=new Date(); //生成流水号
    var year=todayDate.getFullYear(); // 年
    var day=todayDate.getDate(); //日
    var month=todayDate.getMonth()+1; //月
    var ddd=year+"-"+month+"-"+day
    import contentRightNote from './contentRightNote.vue'
    import contentRightColor from './contentRightColor.vue'
    import contentRightEmail from './contentRightEmail.vue'
    export default{
        data(){
            return{
                opacity:0.98,
                date:ddd
            }
        },components:{
            'content-Right-Note':contentRightNote,'content-Right-Color':contentRightColor,contentRightEmail
        }
    }

</script>


<style>

    .el-row {
        margin-bottom: 20px;

    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>