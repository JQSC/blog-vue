<template>
    <div>
        <div class="ooo">
        <div id="loading-center-absolute">
            <div class="object" id="object_one"></div>
            <div class="object" id="object_two" style="left:20px;"></div>
            <div class="object" id="object_three" style="left:40px;"></div>
            <div class="object" id="object_four" style="left:60px;"></div>
            <div class="object" id="object_five" style="left:80px;"></div>

        </div>
        </div>
    </div>
</template>

<script>
    //import HeaderComponent from './components/header.vue'
    import loading from '../javascripts/loading.js'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            
        }
    }
</script>
<style>
    #loading-center-absolute {
        text-align: center;
        height: 20px;
        width: 30px;
        margin:0 auto;
        position:relative;

    }
    .ooo{
        height: 20px;
        text-align: center;

    }
    .object{
        width: 20px;
        height: 20px;

        background-color: #db5800;
        -moz-border-radius: 50% 50% 50% 50%;
        -webkit-border-radius: 50% 50% 50% 50%;
        border-radius: 50% 50% 50% 50%;
        margin-right: 20px;
        margin-bottom: 20px;

        position: absolute;
        top:50%;
        margin-top: 80px;

    }


    #object_one{
        -webkit-animation: object 2s linear infinite;
        animation: object 2s linear infinite;
    }
    #object_two{
        -webkit-animation: object 2s linear infinite -.4s;
        animation: object 2s linear infinite -.4s;
    }
    #object_three{
        -webkit-animation: object 2s linear infinite -.8s;
        animation: object 2s linear infinite -.8s;
    }
    #object_four{
        -webkit-animation: object 2s linear infinite -1.2s;
        animation: object 2s linear infinite -1.2s;
    }
    #object_five{
        -webkit-animation: object 2s linear infinite -1.6s;
        animation: object 2s linear infinite -1.6s;
    }


    @-webkit-keyframes object{
        0% { left: 100px; top:0}
        80% { left: 0; top:0;}
        85% { left: 0; top: -20px; width: 20px; height: 20px;}
        90% { width: 40px; height: 15px; }
        95% { left: 100px; top: -20px; width: 20px; height: 20px;}
        100% { left: 100px; top:0; }

    }
    @keyframes object{
        0% { left: 100px; top:0}
        80% { left: 0; top:0;}
        85% { left: 0; top: -20px; width: 20px; height: 20px;}
        90% { width: 40px; height: 15px; }
        95% { left: 100px; top: -20px; width: 20px; height: 20px;}
        100% { left: 100px; top:0; }
    }

</style>