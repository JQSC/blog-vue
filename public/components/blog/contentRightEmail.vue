<template>
    <div>

        <!--订阅信-->
        <div class="news_letter">
            <h4>新闻信</h4>
            <form method="post" action="SendEmail" v-on:submit.prevent="onSubmit">
                <span><input type="text" placeholder="Your email address" v-model="Email"></span>
                <span  class="pull-right fa-btn btn-1 btn-1e">
                    <input type="submit" value="订阅">
                </span>
            </form>
        </div>


    </div>
</template>
<style>

</style>
<script>

    export default{
        data(){
            return{
                Email:''
            }
        },
        components:{

        },
        methods:{
            onSubmit:function(){
               this.SendLeMessage()
            },
            SendLeMessage:function(){

                this.$http.post('/api/email',{Email:this.Email}).then(function(res){

                   if(res.data.success){
                       alert("测试邮件已发送目标邮箱!!")
                   }else{
                       alert("邮件地址有误,测试发送邮箱失败!!")
                   }

                })
            }
        }
    }
</script>
