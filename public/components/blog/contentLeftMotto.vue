<template>
    <div>
        <h2 class="h2style row" style=" border-radius: 10px;color: rgb(17, 15, 15);background-color: rgb(225, 213, 220)">
            <p class="col-md-7" style="letter-spacing:3px;">宁可在骄阳里暴晒,也不愿在黑暗中偷生!</p>
            <div class="col-md-5">
                <!--<img src="http://mjs.sinaimg.cn/wap/online/public/images/weather/day/yu.gif?v=2016092216"-->
                <!--width="20" height="20">-->
                北京 · {{text}} ·  {{temperature}}°C
            </div>
        </h2>
    </div>
</template>
<style>

</style>
<script>

    export default{
        data(){
            return{
                text:'',
                temperature:''
            }
        },
        created:function(){
            this.GetWeatherInfo();
        },
        methods:{
            GetWeatherInfo:function(){
                this.$http.get('/api/weather').then( function(response) {
                    if(response.data && response.data.results){
                        this.text=response.data.results[0].now.text;
                        this.temperature=response.data.results[0].now.temperature;
                    }else{
                        this.text='';
                        this.temperature='';
                    }
                }, function (response) {
                    console.log(response)
                })

            }
        }
    }
</script>
