<template>
    <div>
        <div class="col-md-8 blog_left" v-bind:style="{opacity:opacity}" style="  border: 1px rgb(238,238,238) solid;background-color: #F9FAFC;border-radius: 5px;">

            <contentLeft-Motto></contentLeft-Motto> <!-- 座右铭-->


            <div v-loading="loading" element-loading-text="Loading..." style="width: 100%">

                <div id="logMain" v-for="item in contentMains" style="border-top: 1px solid #D1D0DF;">

                    <div class="blog_main" style="margin-top: 30px;">
                        <h4>
                            <a href="#" style="margin-top: 3px; float:left;box-sizing: border-box; color: rgb(255, 255, 255);text-decoration: none; padding: 3px 6px; font-size: 14px; display: inline-block;position: relative; top: -2px; margin-right: 6px;font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif; line-height: 17.1429px;white-space: normal; background-color: rgb(69, 188, 249); border-radius: 4px;">
                                {{item.keyword}} <em style="" class="keyword_icon"></em></a>
                            <router-link :to="'/search/'+item._id+'#home'" style="font-weight: 600">{{item.title}}</router-link>
                        </h4>
                        <div class="blog_list pull-left">
                            <ul class="list-unstyled">
                                <li><i class="fa fa-calendar-o"></i><span>{{item.day}} </span></li>
                                <li><a href="#contact"><i class="fa fa-comment "></i>
                                    <el-badge :value="item.comment" class="item">
                                        <span>评论</span>
                                    </el-badge>
                                   </a></li>
                                <li><i class="fa fa-user"></i><span>{{item.author}}</span></li>
                                <li><a href="#"><i class="fa fa-eye"></i>
                                    <el-badge :value="item.readNum" class="item">
                                    <span>阅读量</span>
                                </el-badge>
                                </a></li>
                            </ul>
                        </div>
                        <div class="b_left pull-right">
                            <!--<a href="praise?<%=post._id%>" ><i class="fa fa-heart"></i><span><%= post.praise %></span></a>-->
                            <a href="javascript:;" @click="praiseOn(item._id)"><i class="fa fa-heart"></i>
                                <el-badge :value="item.praise" class="item">
                                <span></span>
                            </el-badge>
                            </a>
                        </div>
                        <div class="clearfix"></div>

                        <!--<p class="para" style="height: 160px; overflow: hidden;color: rgb(119, 95, 128);background: rgb(225, 213, 220);border-radius: 15px;">-->
                        <blockquote  class="para" style="letter-spacing:1px;height: 173px; overflow: hidden;color: rgb(119, 95, 128);background: rgb(225, 213, 220);border-radius: 15px;">
                            {{item.contentTxt}}
                        </blockquote>
                            <!--<loading v-show="showLoad"></loading>-->


                        <!--</p>-->
                        <div class="read_more btm" >
                            <!--<a :href="'search?'+item._id" style="background-color: #A1509C">阅读更多</a>-->
                            <router-link :to="'/search/'+item._id+'#home'" style="background-color: #A1509C">阅读更多 </router-link>

                        </div>
                    </div>
                    <hr>
               </div>
            </div>
            <!--Slider 滑块 调节透明度-->
            <div class="block">
                <el-switch v-model="switchSlider"  on-color="#13ce66" off-color="#ff4949"></el-switch>
                <span class="demonstration" style="font-family:Microsoft YaHei">调节透敏度</span>
                <!--<el-slider :min="30" v-show="switchSlider" v-model="opacityChange"></el-slider>-->
            </div>
            <!--分页条-->
            <div style="text-align: center">
                <ul class="pagination">
                    <li :class="{disabled:IsDisabled}"><a href="#" @click="getContentMain(1)">&laquo;</a></li>
                    <li><a href="#" @click="PageUp(-1)">上一页</a></li>
                    <li :class="{active:item.IsActive}" v-for="item in pageItems" @click="PageTurning(item)"><a href="#">{{item.pagCount}}</a></li>
                    <li><a href="#" @click="PageUp(1)">下一页</a></li>
                    <li><a href="#" @click="PageUp(0)">&raquo;</a></li>
                </ul>
            </div>
            <!--end-->
        </div>
    </div>
</template>

<script>
    import contentLeftMotto from './contentLeftMotto.vue'
   // import loading from './../loading.vue'
    export default{
        data(){
            return{
                switchSlider:true,
                opacityChange:98,
                loading:true,
                IsDisabled:false,
                pageItems:[
                    {pagCount:1,IsActive:true}

                ],
                contentMains:[
                    {   id:'0',
                        contentTxt:'Loading...', //文章内容
                        title:'0',    //文章标题
                        day:'0',    //文章日期
                        comment:'0',  //评论数量
                        readNum:'0',  //阅读量
                        author:'0',  //作者
                        praise:'0',  //点赞数
                        keyword:'0'} //关键字

                ]
            }
        },
        computed:{
            opacity:function(){
                return this.opacityChange*0.01
            }
        },
        created:function(){
            this.getContentMain(1);
        },
        methods:{
            getContentMain:function(pagCount){
                this.$http.post('/api/getContentMain',{limit:3,num:pagCount}).then(function(res){
                    this.pageItems=[];
                    for(var i=0;i<res.data.pageCount;i++){
                        var pagCounts={pagCount:i+1,IsActive:false};
                        this.pageItems.push(pagCounts)
                    }
                    this.pageItems[pagCount-1].IsActive=true;
                    this.loading=false;
                    this.contentMains=res.data.list
                    //console.log(res.data.list)
                },function(res){
                    console.log(res)
                })
            },
            PageTurning:function(item){
                this.loading=true;
                for(var j=0;j<this.pageItems.length;j++){
                    this.pageItems[j].IsActive=false
                }
                item.IsActive=!item.IsActive;
                this.contentMains=[];
                this.getContentMain(item.pagCount);
            },
            PageUp:function(type){
                //上一页

                if(type==-1){
                    for(var k=0;k<this.pageItems.length;k++){
                        if((this.pageItems[k].IsActive==true)&&(this.pageItems[k].pagCount>1)){
                            this.pageItems[k].IsActive=false;
                            this.pageItems[k-1].IsActive=true;
                            this.contentMains=[];
                            this.loading=true;
                            this.getContentMain(this.pageItems[k-1].pagCount);
                        }
                    }
                }
                //下一页
                if(type==1){
                    for(var k=0;k<this.pageItems.length;k++){
                        if((this.pageItems[k].IsActive==true)&&(this.pageItems[k].pagCount<this.pageItems.length)){
                            this.pageItems[k].IsActive=false;
                            this.pageItems[k+1].IsActive=true;
                            this.contentMains=[];
                            this.loading=true;
                            this.getContentMain(this.pageItems[k+1].pagCount);
                        }
                    }
                }
                //最后一页
                if(type==0){
                    for(var k=0;k<this.pageItems.length;k++){
                        if((this.pageItems[k].IsActive==true)&&(this.pageItems[k].pagCount<this.pageItems.length)){
                            this.pageItems[k].IsActive=false;
                            this.pageItems[this.pageItems.length-1].IsActive=true;
                            this.contentMains=[];
                            this.loading=true;
                            this.getContentMain(this.pageItems.length);
                        }
                    }
                }
            }
        },
        components:{
            'contentLeft-Motto':contentLeftMotto
        }
    }



</script>


<style>
    .item {
        margin: 4px;
    }

</style>