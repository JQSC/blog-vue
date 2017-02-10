//es6语法：
//import Vue from "../node_modules/vue/dist/vue.min.js";
//其实不用写完，会自动查找。可以直接写import Vue from "vue";
import Vue from "vue";
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

/*var componentList=['switch.js','badge.js','loading.js','row.js','col.js','autocomplete.js']
var src='../node_modules/element-ui/lib/'
componentList.forEach(function(value,array){

    import Switch from "'../node_modules/element-ui/lib/'+value";

})*/

import Switch from '../node_modules/element-ui/lib/switch.js';
import Badge from '../node_modules/element-ui/lib/badge.js';
import Loading from '../node_modules/element-ui/lib/loading.js';
import Row from '../node_modules/element-ui/lib/row.js';
import Col from '../node_modules/element-ui/lib/col.js';
import Autocomplete from '../node_modules/element-ui/lib/autocomplete.js';

import App from './components/App.vue';

Vue.use(Switch);
Vue.use(Badge);
Vue.use(Loading);
Vue.use(Row);
Vue.use(Col);
Vue.use(Autocomplete);

Vue.use(VueResource);
Vue.use(VueRouter);

import blogIndex from './components/blog/blogIndex.vue'
import searchArcitle from './components/Article/searchArcitle.vue'
import about from './components/about/about.vue'

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
       {
            path: '/blog',
            component: blogIndex
        },
        {
            path: '/about',
            component: about
        },
        {
            path: '/',
            component: blogIndex
        },
        {
            path: '/search/:id',
            component: searchArcitle
        }
    ]
});
Vue.config.debug = true;//开启错误提示

new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');
