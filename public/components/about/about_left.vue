<template>
    <div id="about">
        <div class="col-md-8 about_left">
             <h3 class="h3">关于本站</h3>

            <div style="float: left;padding: 20px 20px 10px 20px">
                <img src="/images/m.jpg">
            </div>
            <div style="padding: 20px 20px 10px 20px;font-size: 16px;">
                <div style="text-indent: 2em">
                    本站定位为IT技术博客站，
                    全站均由本人开发，基于express框架，使用nodejs进行编写，
                    前端UI框架采用Bootstrap搭建，数据库为mongodb，
                    服务器为Windows Server 2012 R2版腾讯云主机，域名chisir.top购自阿里万维网。
                </div>
            </div>
             <div style="clear: both"></div>
             <hr>
             <h4>初衷</h4>
             <p>
                写博是一个人思考和沉淀的过程。
             </p>
             <p>对内是自己的知识仓库。</p>
             <p>对外是别人了解你的最直接的方式；是交流、分享经验的平台。</p>
             <hr>
            <h4>联系方式</h4>
            <p>邮箱:122377305@qq.com</p>
            <p>github:<a href="https://github.com/JQSC" target="_blank">https://github.com/JQSC</a></p>
            <hr>
            <h4>一句箴言</h4>
            <p class="proverbs">宁可在骄阳里暴晒,也不愿在黑暗里偷生。</p>
        </div>
    </div>
</template>
<style>
    #about h4{
        margin-left: 20px;
        font-size: 20px;
    }
    #about p{
        font-size: 16px;
        margin-left: 20px;
        text-indent: 15px;
    }
   .h3{
       color: rgb(17, 15, 15);
       margin: 20px 1px 0 1px;
       background-color: rgb(225, 213, 220);
       padding: 20px;
       border-radius: 10px;

   }
    .proverbs{
        background-color: rgb(239,236,238);
        padding: 10px;margin-right: 20px;
        border-radius: 5px;margin-bottom: 20px
    }
    .about_left{
        background-color: rgb(249, 250, 252);border-radius: 5px;padding: 0;
    }
</style>
<script>

    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            
        }
    }
</script>
