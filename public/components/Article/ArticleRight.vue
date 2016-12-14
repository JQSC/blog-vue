<template>
    <div>
        <div class="col-md-4">
            <div style="border: 1px rgb(238,238,238) solid;background-color: #F9FAFC;border-radius: 5px;" >
                <p style="margin: 10px 10px;">
                    <span class="label label-warning">文章列表</span>
                    <span class="glyphicon glyphicon-minus-sign flr" @click="chang"></span>
                </p>
                <transition name="slide-fade">
                   <div v-show="tit">
                        <div v-for="(item, index) in items" >
                            <ul  class="list-group" style="list-style-type: none;">
                                <li>
                                    <a  @click="ChangeArticle(item._id)" href="javascript:;" class="list-group-item">
                                        <span class="NoteText">{{item.title}}</span>
                                        <span  class="badge NoteFloor">第{{index+1}}篇</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                   </div>
                </transition>
            </div>
        </div>

    </div>
</template>
<style>
    .slide-fade-enter-active {
        transition: all .8s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-active {
        padding-left: 10px;
        opacity: 0;
    }
    .NoteText{width: 80%;font-size: 13px; font-weight: bold}
    .NoteFloor{background: #d9534f}
    .flr{float: right;;margin-right: 10px}
</style>
<script>

    export default{
        data(){
            return{
                tit:true,
                items:[
                    {text:'第一篇',title:'用Promise重构nodejs异步代码',_id:'57fc996d9d5d243c062bde3b'}

                ]
            }
        },
        components:{


        },created:function(){
            this.GetArticleList();
        },
        methods:{
            ChangeArticle:function(id){
                this.$emit('SelectArticle',id)
            },
            chang:function(){
              this.tit=!this.tit
            },
            GetArticleList:function(){
                this.$http.get('/getArticleList').then(function(res){

                   console.log(res.data)
                    this.items=res.data



                },function(res){
                  /*  this.load=false
                    console.log(res)*/
                })
            }
        }
    }
</script>
