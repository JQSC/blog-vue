<template>
    <div>
        <!--留言条-->
        <div style="border: 1px rgb(238,238,238) solid; margin-top: 10px;background-color: #F9FAFC;border-radius: 5px;" v-show="NoteShow">
            <p style="margin: 10px 10px;">

                <span class="label label-warning">留言</span>
                <span id="close" @click="changNote" class="glyphicon glyphicon-remove-sign" style="float: right;;margin-right: 10px"></span>
                <span id="shrink" @click="changeMessage" class="glyphicon glyphicon-minus-sign" style="float: right;margin-right: 10px"></span>
            </p>
            <div v-show="leMessage" class="list-group list-group-flush list-paddingleft-2" style="list-style-type: none;">
                <!--<loadingNote v-show="showLoadNote" style="padding-bottom: 100px"></loadingNote>-->
                <div v-loading="showLoadNote" element-loading-text="Loading..." style="width: 100%;padding-bottom: 10px;">
                    <div v-for="item in items">

                        <a href="#" class="list-group-item" >
                            <span  class="badge NoteFloor">{{item.floor}}F</span>
                            <span class="NoteText">{{item.MessageText}}</span>
                        </a>
                    </div>
                </div>
                <div style="text-align: center">
                    <ul class="pagination">
                        <li :class="{disabled:IsDisabled}"><a href="javascript:;" @click="GetNoteContent(1)">&laquo;</a></li>
                        <li><a href="javascript:;" @click="PageUp(-1)">上一页</a></li>
                        <li :class="{active:item.IsActive}" v-for="item in pageItems" @click="PageTurning(item)"><a href="javascript:;">{{item.pagCount}}</a></li>
                        <li><a href="javascript:;" @click="PageUp(1)">下一页</a></li>
                        <li><a href="javascript:;" @click="PageUp(0)">&raquo;</a></li>
                    </ul>
                </div>


            </div>
        </div>
    </div>
</template>
<style>
    .NoteText{width: 85%;display: inline-block;overflow: hidden;}
    .NoteFloor{background: #d9534f}
</style>
<script>
    import loadingNote from './../loading.vue'
    export default{
        data(){
            return {
                NoteShow:true,  //留言显示
                leMessage:true,  //条数显示
                showLoadNote:true,
                IsDisabled:false,
                items: [
                    {MessageText: 'Loading...', floor: 1}
                ],
                pageItems:[
                    {pagCount:1,IsActive:true}

                ]
            }
        },
        created:function(){
            this.GetNoteContent(1);
        },
        methods:{
            GetNoteContent:function(pageNum){
                var page=pageNum||1
                this.$http.post('/api/GetNote',{num:page}).then( function(response) {
                    this.showLoadNote=false
                    this.items=response.data.list;
                    this.pageItems=[]
                    for(var i=0;i<response.data.pageCount;i++){
                        var pagCounts={pagCount:i+1,IsActive:false};
                        this.pageItems.push(pagCounts)
                    }
                    this.pageItems[page-1].IsActive=true
                   // this.$set('gridData', {a:2})
                }, function (response) {
                    this.showLoadNote=false
                   /* this.$message({
                        type: 'error',
                        message: '数据库连接超时,查询失败!'
                    });*/
                    console.log(response)
                })
            },
            PageTurning:function(item){
                this.showLoadNote=true
                for(var j=0;j<this.pageItems.length;j++){
                    this.pageItems[j].IsActive=false
                }
                item.IsActive=!item.IsActive
                this.GetNoteContent(item.pagCount);
            },
            PageUp:function(type){
                //上一页
                this.showLoadNote=true
                if(type==-1){
                    for(var k=0;k<this.pageItems.length;k++){
                        if((this.pageItems[k].IsActive==true)&&(this.pageItems[k].pagCount>1)){
                            this.pageItems[k].IsActive=false
                            this.pageItems[k-1].IsActive=true
                            this.GetNoteContent(this.pageItems[k-1].pagCount);
                        }
                    }
                }
                //下一页
                if(type==1){
                    for(var k=0;k<this.pageItems.length;k++){
                        if((this.pageItems[k].IsActive==true)&&(this.pageItems[k].pagCount<this.pageItems.length)){
                            this.pageItems[k].IsActive=false
                            this.pageItems[k+1].IsActive=true
                            this.GetNoteContent(this.pageItems[k+1].pagCount);
                        }
                    }
                }
                //最后一页
                if(type==0){
                    for(var k=0;k<this.pageItems.length;k++){
                        if((this.pageItems[k].IsActive==true)&&(this.pageItems[k].pagCount<this.pageItems.length)){
                            this.pageItems[k].IsActive=false
                            this.pageItems[this.pageItems.length-1].IsActive=true
                            this.GetNoteContent(this.pageItems.length);
                        }
                    }
                }
            },
            changeMessage:function(){
                this.leMessage=!this.leMessage
            },
            changNote:function(){
                this.NoteShow=!this.NoteShow
            }

        },
        components:{loadingNote}

    }
</script>
