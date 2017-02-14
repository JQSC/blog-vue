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
    import contents from './production_contents.vue'
    import fotter from '../blog/fotter.vue'
    import fotterEnd from '../blog/fotterEnd.vue'
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
