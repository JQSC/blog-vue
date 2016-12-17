<template>
    <div>
        <div class="blog" style="background-color: rgb(238,238,238) "><!-- start main -->
            <div class="container">
                <div class="main row">
                    <div class="col-md-12 comment-num" style="">
                        {{articleNum}}条评论
                    </div>
                    <!--start -->
                    <div class="col-md-12 blog_left" style="border: 1px rgb(238,238,238) solid;background-color: rgb(255,255,255);border-radius: 5px;" v-for="item in comments">
                        <ol class="comment">
                            <li>
                                <article class="comment-body">
                                    <footer class="comment-meta">
                                        <p class="comment-left">
                                            <img src="/images/tx1.jpg" class="avatar avatar-70 photo" height="60" width="60" data-bd-imgshare-binded="1" />
                                            <strong class="fn" style="box-sizing: border-box;">
                                                <a href="" rel="external nofollow" class="floor">{{item.nickname}} ></a>
                                            </strong>
                                            <span class="says">say :</span>
                                        </p>
                                        <p class="comment-right">
                                            <a href="#">
                                                {{item.day}}
                                                <span>{{item.floor}} 楼</span>

                                            </a>
                                        </p>
                                    </footer>
                                    <p  class="comment-text" v-html="item.articleText">

                                    </p>
                                    <p>
                                        <a class="comment-reply-link" href="#contact" >回复</a>
                                    </p>
                                </article>
                                <hr>
                            </li>
                        </ol>
                    </div>

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
                articleNum:'',
                comments:[]
            }
        },
        created(){
        this.GetComment();
        },
        props:['fun'],
        watch:{
            fun:function(){
                this.GetComment();
                //alert(this.fun)
            }
        },
        methods:{
            GetComment:function(){
                this.$http.post('/api/GetComment',{articleId:this.fun||this.$route.params.id}).then(function(res){
                    this.articleNum=res.data.articleNum
                    this.comments=res.data.article

                },function(res){
                    console.log(res)
                })
        }
    },
        components:{

        }
    }
</script>
