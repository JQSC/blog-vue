<template>
    <div>
        <div class="footer1_bg"><!-- start footer1 -->
            <div class="container">
                <div class="row  footer">
                    <div class="copy text-center">
                        <p class="link"><span>Copyright &copy; 2016.Csqblog 联系我:122377305@qq.com.<a target="_blank" href="http://www.huiyi8.com/moban/">github</a></span></p>
                        <a href="#home" id="toTop" style="display: block;"><span id="toTopHover" style="opacity: 1;"> </span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
   
</style>
<script>
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        created:function(){

        }
        ,
        methods:{

        },
        components:{
            
        }
    }
</script>
