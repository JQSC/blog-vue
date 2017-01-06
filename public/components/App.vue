
<template>
  <div>
    <div id="navigationBar">
      <div class="header_bg" id="home"><!-- start header -->
        <div class="container">
          <div class="row text-center col-md-8">
            <nav class="top-nav">
              <ul class="top-nav nav_list">
                <!--<li><a><img src="/images/logo1.png"></a></li>-->
                <li><a><img style="height: 42px" src="/images/logo-new2.png"></a></li>
                <li><a href="production">作品 <span class="sr-only">(current)</span></a></li>
                <li class="page-scroll"><router-link to="/about">关于</router-link></li>
                <li class="logo page-scroll"><router-link to="/blog"><img src="/images/logo.png" alt="" class="responsive"/></router-link></li>
                <li class="page-scroll"><router-link to="/blog">博客</router-link></li>
                <li class="page-scroll"><a href="#contact">联系我</a></li>
                <!--<li class="page-scroll"><a style="color: rgb(50,50,50);">联系我哦&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;池圣齐</a></li>-->
              </ul>
              <a href="#" id="pull"><img src="/images/nav-icon.png" title="menu" /></a>
            </nav>
            <div class="clearfix"></div>
          </div>
          <div class="col-md-4 text-center">
            <div class="from_search">
              <form class="form-inline" role="form" action="">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="输入关键字">
                  <!--<button type="submit" class="btn btn-default col-md-3">查询</button>-->
                  <input type="submit" class="btn btn-default form-control" value="查询">
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!--博客-->
    <router-view></router-view>
  </div>
</template>

<script>
  //es

  export default {

    data () {
      return {
        name:"chishengqi"
      }
    },
    components:{

    },
    methods: {

    }
  }
</script>

<style>
  .nav_list li a{
    font-size: 15px;

  }
</style>