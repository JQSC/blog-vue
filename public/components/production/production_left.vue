<template>
    <div>
        <div class="col-md-8" >
            <!--游览器轮播    -->
            <div id="carousel-cs" class="carousel slide" data-ride="carousel" style="margin: auto;background-color: white">
                <!-- 轮播（Carousel）指标 -->
                <ol class="carousel-indicators">
                    <li data-target="#carousel-cs" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-cs" data-slide-to="1"></li>
                    <li data-target="#carousel-cs" data-slide-to="2"></li>
                    <li data-target="#carousel-cs" data-slide-to="3"></li>
                </ol>

                <!-- 轮播（Carousel）项目 -->
                <div class="carousel-inner" role="listbox" data-interval="2000">
                    <div class="item active">
                        <img class="carousel_img center" src="/images/zp-browser.png" alt="11">
                        <div class="carousel-caption">
                            游览器介绍页面
                        </div>
                    </div>
                    <div class="item">
                        <img class="carousel_img center" src="/images/zp-blog.png" alt="...">
                        <div class="carousel-caption">
                            博客
                        </div>
                    </div>
                    <div class="item">
                        <img class="carousel_img center" src="/images/zp-2048.png" alt="...">
                        <div class="carousel-caption">
                            2048小游戏
                        </div>
                    </div>
                    <div class="item">
                        <img class="carousel_img center" src="/images/zp-zm.png" alt="...">
                        <div class="carousel-caption">
                            祖玛小游戏
                        </div>
                    </div>
                </div>
                <!-- 轮播（Carousel）导航 -->
                <a class="left carousel-control" href="#carousel-cs" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#carousel-cs" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    </div>
</template>
<style>
   .production_left{
       background-color: rgb(249, 250, 252);border-radius: 5px;padding: 0!important;
   }
   .carousel-indicators li{
       background-color: #ff4949!important;
       padding: 10px;

   }

   .carousel-indicators .active {
       background-color: #a71d5d!important;
   }
   .carousel-caption{
       color: #000000;

       font-size: 15px;
   }
    .center{
      margin: auto;
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
