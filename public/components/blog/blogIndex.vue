<template>
    <div>
        <contents></contents>
        <fotter></fotter>
        <fotter-end></fotter-end>
    </div>
</template>
<style>
   
</style>
<script>
    import contents from './contents.vue'
    import fotter from './fotter.vue'
    import fotterEnd from './fotterEnd.vue'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            contents ,fotter,'fotter-end':fotterEnd
        }
    }
</script>
