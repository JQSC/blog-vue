<template>
    <div>
        <div class="col-md-4 production_left">
            <div class="product_right">
                <h3 class="pro_h3">作品说明:</h3>
                <p style="text-indent: 20px">下面的一些内容都是博主工作闲余时间学习过后为巩固知识做的各个练习。</p>
                <p style="text-indent: 20px">由于工作原因，本人大部分工作内容都是在写后台服务、做接口。
                    偶尔做些查询界面也是用公司的组件编辑器和ext。出于对js的热情,
                    特别期望能学到一些更高层次的js编写方式，随而从基础开始看书、看视频、逛各种论坛。
                    从最初的js基础到dom操作，从面向过程到面向对象、在到用seajs进行模块化开发。
                    很多内容来回学习了好几遍,对于js自我感觉刚刚入门,以后的时间会继续的学习下去。加油~自己！
                </p>
                <button style="margin-top: 30px;margin-bottom: 10px" type="button" class="btn btn-danger" id="sPractice">
                    <a href="https://jqsc.github.io/practice/index.html" target="_blank" style="list-style: none;color: white;">各种小练习</a>
                </button>
            </div>
        </div>
    </div>
</template>
<style>
    .pro_h3{
        padding: 5px;
    }
    .product_right{
        background-color: #F9FAFC;border-radius: 5px; font-size: 14px;margin: 15px}
    .production_left{
        background-color: rgb(249, 250, 252);border-radius: 5px;padding: 0!important;
    }
</style>
<script>
    //import HeaderComponent from './components/header.vue'
    //import OtherComponent from './components/other.vue'
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
