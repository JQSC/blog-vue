<template>
    <div>
        <div class="modal fade" :id="model" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">提示</h4>
                    </div>
                    <div class="modal-body" style="font-size: 18px;">确认是否提交？</div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submit">提交</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    </div>
</template>
<style>
   
</style>
<script>
    //import HeaderComponent from './components/header.vue'
    //import OtherComponent from './components/other.vue'
    export default{
        data(){
            return{
            }
        },
        props:['model'],
        components:{
            
        },
        watch:{

        },
        methods: {
            submit: function () {
                this.$emit('open')
            }
        }
    }
</script>
