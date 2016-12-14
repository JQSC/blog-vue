<template>
    <div>
        <div id="colorList" class="list-group" style="margin-top: 10px;border: 1px rgb(238,238,238) solid; background-color: #F9FAFC;;border-radius: 5px;">
            <p style="margin: 10px 10px;">
                <span class="label label-danger" style="">背景色切换</span>

                <span class="glyphicon glyphicon-refresh" style="float: right;;margin-right: 10px"></span>
            </p>
            <div v-for="item in items">
                <a  :class="[classLi,{'active':item.IsActive}]" @click="changeColor(item)">
                    {{item.color}}
                </a>
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
                classLi:"list-group-item",
                items:[
                    {color:"默认",IsActive:false},
                    {color:"水蓝",IsActive:false},
                    {color:"火红",IsActive:true}
                ]
            }
        },
        methods:{
            changeColor:function(item){
                for(var i=0;i<this.items.length;i++){
                        this.items[i].IsActive=false;
                }
                item.IsActive=!item.IsActive
            }
        }
    }
</script>
