<template>
    <div>
        <div class="" style="background-image: url('/images/bj-red.jpg');background-size: cover;"><!-- start main -->
            <div class="container">
                <div class="main row">
                    <div class="col-md-8 blog_left" style="border: 1px rgb(238,238,238) solid;background-color: rgb(255,255,255);border-radius: 5px;">
                        <!--路径导航  面包屑-->
                        <!--各路径间的分隔符已经自动通过 CSS 的 :before 和 content 属性添加了-->
                        <!-- <loading v-show="load"></loading>-->
                        <div v-loading="load" element-loading-text="Loading..." style="width: 100%">
                            <ol class="breadcrumb" style="margin-top: 10px;">
                                <li ><a class="glyphicon glyphicon-home" href="blog"></a></li>
                                <li ><a href="blog" >CsqBlog</a></li>
                                <li class="active">{{keyword}}</li>
                            </ol>
                            <h2 class="style">{{title}}</h2>
                            <p style="text-align: center">
                    <span style="color: rgb(153, 153, 153);
                    font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif; font-size: 13px;
                    line-height: 18.5714px; text-align: center; background-color: rgb(255, 255, 255);">关键词:</span>
                    <span style="box-sizing: border-box; margin-right: 12px; color: rgb(153, 153, 153);
                     font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif; font-size: 13px;
                    line-height: 18.5714px; text-align: center; background-color: rgb(255, 255, 255);">{{keyword}}></span>
                            </p>
                            <hr>
                            <div class="details row">
                                <div class="col-md-12" style="color: rgb(61, 68, 80);
                    font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif;
                     font-size: 15px; line-height: 25px; background-color: rgb(255, 255, 255);overflow: hidden" v-html="content">

                                </div>
                                <div class="bdsharebuttonbox" style="margin-left: 20px">
                                    <a href="#" class="bds_more" data-cmd="more"></a>
                                    <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                                    <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                                    <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
                                    <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
                                    <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                                </div>

                            </div>
                        </div>

                    </div>
                    <ArticleRight v-on:SelectArticle="ArticleChange"></ArticleRight>
                 </div>
                </div>
            </div>
        <comment :fun="ArticleId"></comment>
        <ArticleFoot></ArticleFoot>
        <fotter-end></fotter-end>
    </div>
</template>
<style>

</style>
<script>
    import ArticleLeft from './ArticleLeft.vue'
    import ArticleRight from './ArticleRight.vue'
    import comment from './comment.vue'
    import ArticleFoot from './ArticleFoot.vue'
    import fotterEnd from './../blog/fotterEnd.vue'
    //import fotterEnd from './../blog/fotter.vue'
    export default{
        data(){
            return{
                load:true,
                keyword:'',
                content:'',
                title:'Loading...',
                msg:'hello vue',
                ArticleId:'11'
            }
        },
        created (){
            this.GetArticleContent();
        },
        methods:{
            ArticleChange:function(ArticleId){
                this.ArticleId=ArticleId;
                this.content='';
                this.title='Loading...';
                this.load=true;
                this.GetArticleContent(ArticleId);
            },
            GetArticleContent:function(ArticleId){
                this.$http.post('/GetArticleContent',{articleId:ArticleId||this.$route.params.id}).then(function(res){
                    this.load=false;
                    this.keyword=res.data.keyword;
                    this.title=res.data.title;
                    this.content=res.data.content

                },function(res){
                    this.load=false;
                    //console.log(res)
                })
            }
        },
        components:{
            ArticleLeft ,ArticleFoot,'fotter-end':fotterEnd,comment, ArticleRight
        }
    }
</script>
