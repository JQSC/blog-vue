<template>
    <div>
        <transition name="slide-fade">
            <div class="alert" v-bind:class="[color]" v-show="alert" style="position: fixed;top:0;width: 100%; text-align: center" v-html="diglog">
                <a href="javascript:;" class="close" @click="close">
                    &times;
                </a>

            </div>
        </transition>
        <div class="footer_bg" id="contact"><!-- start footer -->
            <div class="container">
                <div class="row footer">
                    <div class="col-md-8 contact_left">
                        <h3>chishengqi</h3>
                        <p>可以给博主留言噢~:</p>
                        <form method="post" action="LeMessage"  >
                            <!--<input type="text" name="nickname" v-model="nickname" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = '起个昵称吧';}">
                            <input type="text" name="email" v-model="email" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = 'Email';}">-->
                            <el-col :span="30" class="tac">
                                <el-autocomplete v-model="state" :fetch-suggestions="querySearch"  placeholder="起个昵称吧" @select="handleSelect"></el-autocomplete>
                                <input  type="text" v-model="email" @blur="fun_email()" placeholder="Email" v-bind:class="{form_waring :waring_email}">
                                <p v-show="waring_email" style="color:#FF4949"><span style="padding-right: 10px">*</span>邮箱格式有误</p>
                            </el-col>
                            <div class="btn-group" style="width: 100%;background-color: #9C9C9C;border-radius: 4px;">
                                <button type="button" class="btn btn-default" :class="[item.position]" onmouseover="this.style.backgroundColor='';"
                                       onmouseout="this.style.backgroundColor='#9C9C9C';"
                                        v-for="(item,index) in items" style="border: none;background-color: #9C9C9C"  @click="writingPrompt(index)">
                                    <span :class="[item.gly]"></span>{{item.text}}
                                </button>

                            </div>
                            <textarea name="MessageText" style="margin-top: 0"
                                      v-model="messages"  ></textarea>
                            <!--<span class="pull-right"><button type="primary" data-toggle="modal" data-target="#myModal" style="padding:15px;background-color: #2B9C85 ">提交留言</button></span>-->
                            <span class="pull-right"><input type="submit" data-toggle="modal" data-target="#myModal" value="提交留言"></span>
                        </form>
                    </div>
                    <div class="col-md-4  contact_right">
                        <p><span>座右铭 :</span> The best preparation for tomorrow is doing your best today .</p>
                        <ul class="list-unstyled address">
                            <li><i class="fa fa-map-marker"></i><span>北京黄村火车站</span></li>
                            <li><i class="fa fa-phone"></i><span>(00) 110</span></li>
                            <li><i class="fa fa-envelope"></i><a href="mailto:122377305@qq.com">122377305@qq.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <diglog @open="open" model="myModal"></diglog>
    </div>
</template>
<style>
    .slide-fade-enter-active {
        transition: all .8s ease;
    }
    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-active {
        padding-left: 10px;
        opacity: 0;
    }
    .Danger{
        background-color: #FF4949;
    }
    .Success{
        background-color: #13CE66;
    }
    .right{
        position: relative ; float: right !important;
    }
    .form_waring{
        border:1px solid #FF4949!important;
    }
</style>
<script>
    import diglog from '../Mycomponents/diglog.vue'
    export default{
        data(){
            return{
                items:[
                    {gly:'glyphicon glyphicon-bold',position:'',text:'加粗'},
                    {gly:'glyphicon glyphicon-italic',position:'',text:'倾斜'},
                    {gly:'glyphicon glyphicon-list',position:'',text:'列表'},
                    {gly:'glyphicon glyphicon-link',position:'',text:'链接'},
                    {gly:'glyphicon glyphicon-picture',position:'',text:'上传图片'},
                    {gly:'glyphicon glyphicon-eye-open',position:'',text:'预览'},
                    {gly:'glyphicon glyphicon-trash',position:'',text:'清空'},
                    {gly:'glyphicon glyphicon-question-sign',position:'',text:'帮助'},
                    {gly:'glyphicon glyphicon-resize-full',position:'right',text:'全屏'}

                ],
                diglog:'<strong>警告！</strong>连接数据库失败。',
                color:'Success',
                alert:false,
                showClose:false,
                visible:true,
                state: '',
                email:'',
                nickname:'起个昵称吧',
                messages:'',
                waring_name:false,
                waring_email:false
            }
        }, components:{
            diglog
        },
        mounted() {
            this.restaurants = this.loadAll();
        },
        methods:{
            //邮箱验证
            fun_email:function(){
                var re=/^\w+@[a-z0-9]+(\.[a-z]{2,}){1,3}$/ig
                if(!re.test(this.email)){
                    this.waring_email=true
                }else{
                    this.waring_email=false
                }
            },
            //昵称栏光标移开事件
            fun_name:function(){
             var re=/\D+/g
                if(!re.test(this.state)){
                    this.waring_name=true
                }else{
                    alert(22)
                    this.waring_name=false
                }
            },
            writingPrompt:function(index){
               switch (index){
                   case 0:
                       this.messages=this.messages+'****'
                       break;
                   default :
                       break
               }
            },
            close:function(){
               this.alert=false
            },
            ///将留言数据发送服务器
            SendLeMessage:function(){
                this.$http.post('/api/LeMessage').then(function(res){
                    this.diglog='<h4>提交成功!!</h4>'
                    this.color='Success'
                    this.alert=true
                    var self=this;
                    setTimeout(function(){
                        self.alert=false
                    },2000)
                    console.log(res.data.success)

                },function(res){
                    this.diglog='<h4>提交失败,服务器异常!!</h4>'
                    this.color='Danger'
                    this.alert=true
                    var self=this;
                   
                    console.log(res)
                })
            },
            //el select选择器函数
            createFilter(queryString) {
                return function(restaurant) {
                    return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadAll() {
                return [
                    { "value": "君莫笑" },
                    { "value": "夜雨声烦" },
                    { "value": "包子入侵" },
                    { "value": "一叶知秋" },
                    { "value": "寒烟柔" },
                    { "value": "沐雨橙风" },
                    { "value": "月中眠" },
                    { "value": "王不留行" },
                    { "value": "逢山鬼泣" },
                    { "value": "蓝桥春雪" },
                    { "value": "斩楼兰" },

                ];
            },
            handleSelect(item) {
                console.log(item.value);
            },
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            open(){
                if ((this.messages == '') || (this.state == '')) {
                    this.diglog='<h4>错误！昵称和内容不允许为空!!</h4>'
                    this.color='Danger'
                    this.alert=true
                    var self=this;
                    setTimeout(function(){
                        self.alert=false
                    },2000)
                } else {
                    var MessageAll={
                        nickname:this.nickname,
                        email:this.email,
                        messages:this.messages
                    };
                    this.SendLeMessage()
                }


            }


        }

    }

</script>
