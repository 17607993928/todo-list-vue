//-----该文件用于创建Vuex中最为核心的store-----

import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
import about from './about'
//使用Vuex插件
Vue.use(Vuex)

// //准备Actions----用于响应组件中的动作
// const actions = {
//     test(context, value) {
//         console.log('actions被调用了', context, value)
//         var a = value * 10
//         context.commit("TEST", a)
//     }
// }

// //准备mutations----用于操作数据(state)
// const mutations = {
//     TEST(state, value) {
//         console.log('mutations被调用了', state, value)
//         state.sum = value
//     }
// }

// //准备state----用于存储数据
// const state = {
//     sum: 5
// }

// //用于将state中的数据进行加工
// const getters = {
//     testSum() {
//         console.log('getters被调用了')
//         return state.sum * 100
//     }
// }



//创建store
const store = new Vuex.Store({
    modules: {
        about
    }
})



//暴露store
export default store



