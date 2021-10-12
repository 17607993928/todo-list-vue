import Vue from 'vue'
import App from './App.vue'

//引入插件
import vueResource from 'vue-resource'
Vue.use(vueResource)

import router from './router'


//引入store 
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store:store,  //vuex组件间数据共享
  router:router,    //路由器
  //安装全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this
  },
}).$mount('#app')
