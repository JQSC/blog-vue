<template>
    <div>

        <div class="col-md-12 about_left" style="margin-top: 20px">
            <h3 class="h3">作品列表</h3>
            <hr/>

            <div class="container" id="zp">

                <ul class="zp_list" v-for="item in items">
                    <li>
                        <a :href='item.href' target="_blank">
                            <img :src='item.img'>
                        </a>
                        <p>{{item.text}}</p>
                        <p>代码地址:</p><p><a :href="item.codeLink">{{item.codeLink}}</a></p>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>
<style>
    .zp_list{
        list-style: none;
        margin: 0;
        padding: 0;
        margin-top: 30px;

    }
    .zp_list li{
        list-style: none;
        float: left;
        padding: 5px;


    }
    .zp_list li img{
        border: 2px solid #a71d5d;
        border-radius: 5px;
        width: 252px;
        height: 230px;
        overflow: hidden;
    }
    .zp_list li p{
        margin-top: 10px;
        margin-left: 5px;
    }
</style>
<script>

    export default{
        data(){
            return{
                msg:'hello vue',
                items:[
                    {img:'/images/zp-blog.png',href:'http://chisir.top/',
                        text:'博客',codeLink:'https://github.com/JQSC/blog-vue'},

                    {img:'/images/zp-browser.png',href:'http://sandbox.runjs.cn/show/vfvilr2e',
                        text:'游览器介绍',codeLink:'http://sandbox.runjs.cn/show/vfvilr2e'},

                    {img:'/images/zp-2048.png',href:'http://sandbox.runjs.cn/show/ct2g7fyr',
                        text:'2048小游戏',codeLink:'http://sandbox.runjs.cn/show/ct2g7fyr'},

                    {img:'/images/zp-zm.png',href:'http://sandbox.runjs.cn/show/eudqzizp',
                        text:'祖玛小游戏',codeLink:'http://sandbox.runjs.cn/show/eudqzizp'}
                ]
            }
        },
        components:{
            
        }
    }
</script>
