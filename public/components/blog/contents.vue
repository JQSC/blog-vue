<template>
    <div>
        <div class="blog" style="" id="blogBackground" style=" background-image: url('http://ohsmsw5ly.bkt.clouddn.com/image/bj-red.jpg');background-size: cover;"><!-- start main -->
            <div class="container">
                <div class="main row">
                    <content-left></content-left>
                    <content-right></content-right>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
  #blogBackground{
     /* background-color: rgb(118, 115, 115);
      background-image: url('/images/bj-blue.jpg');
      background-size: cover;*/
  }
</style>
<script>
    import contentLeft from './contentLeft.vue'
    import contentRight from './contentRight.vue'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            'content-left':contentLeft,
            'content-right':contentRight
        }
    }
</script>
