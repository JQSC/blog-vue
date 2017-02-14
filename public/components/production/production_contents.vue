<template>
    <div id="production">
        <div class="blog" style=" background-image: url('http://ohsmsw5ly.bkt.clouddn.com/image/bj-red.jpg');background-size: cover;"><!-- start main -->
            <div class="container">
                <div class="main row">
                    <content-left></content-left>
                    <content-right></content-right>
                    <product-list></product-list>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import contentLeft from './production_left.vue'
    import contentRight from './production_right.vue'
    import productList from './production_list.vue'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            'content-left':contentLeft,
            'content-right':contentRight,
            'product-list':productList
        }
    }
</script>
