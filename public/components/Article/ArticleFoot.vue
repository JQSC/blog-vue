<template>
    <div>
        <div class="footer_bg" id="contact"><!-- start footer -->

            <div class="container">
                <div class="row footer">
                    <div class="col-md-8 contact_left">
                        <h3>评论</h3>
                        <p>发表您的见解吧:</h4>
                        <form method="post" v-bind:action="comment">
                            <input type="text" name="nicknameComment" v-model="nickname" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = '起个昵称吧(必填)';}">
                            <input type="text" name="emailComment" value="输入您的邮箱" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = 'Email';}">
                            <textarea id="editor" style="height: 200px;" v-model="articleText" name="articleTextComment"  onFocus="if(this.value == 'Your Message here....') this.value='';" onBlur="if(this.value == '') this.value='Your Message here....;'" ></textarea>
                            <span class="pull-right" ><input type="submit"  value="提交" @click="commentSubmit"></span>
                        </form>
                    </div>
                    <!--<div class="col-md-4  contact_right">
                        <p><span>座右铭 :</span> The best preparation for tomorrow is doing your best today .</p>
                        <ul class="list-unstyled address">
                            <li><i class="fa fa-map-marker"></i><span></span></li>
                            <li><i class="fa fa-phone"></i><span></span></li>
                            <li><i class="fa fa-envelope"></i><a href="mailto:info@mycompany.com">122377305@qq.com</a></li>
                        </ul>
                    </div>-->
                </div>
            </div>
        </div>
      </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return{
                ok:false,
                articleText:'',
                comment:this.$route.params.id+'/commit',
                nickname:"起个昵称吧(必填)",
                messages:'Your Message here....'
            }
        }, created:function(){

        },
        methods:{
            commentSubmit:function(ev){
                var arr = [];
                var ue=UE.getEditor('editor')
                arr.push(ue.getContent());
                var text=arr.join("\n")
                if(text.length>500)
                {
                    alert("内容超长!!")
                    ev.preventDefault()
                }
                if((this.nickname=="")||((this.nickname=="起个昵称吧(必填)"))){
                    alert("请输入昵称！")
                    ev.preventDefault()
                }
                alert(text)
                ev.preventDefault()
                this.articleText=text
            }
        }
    }

</script>
