<template>
    <div>
        <h2 class="h2style row" style=" border-radius: 10px;color: rgb(17, 15, 15);background-color: rgb(225, 213, 220)">
            <p class="col-md-7" >If you don't bird me,I won't bird you,too.</p>
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
                this.$http.get('/GetWeather').then( function(response) {
                    this.text=response.data.results[0].now.text;
                    this.temperature=response.data.results[0].now.temperature;
                }, function (response) {
                    console.log(response)
                })

            }
        }
    }
</script>
