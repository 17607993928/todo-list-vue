//该文件专门用于创建整个应用的路由器

import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

//创建一个路由器
const router = new VueRouter({
    // routes:[
    //     {
    //         path:'/about',
    //         component:About,
    //         meta:{isAuth,false},  //s是否需要鉴权
            
    //     },
    //     {

    //     },
    // ]
})


//全局前置路由守卫---初始化的时候调用、每次路由由切换之前调用
//  to：去哪    from：来自哪里  next：是否放行
router.beforeEach((to,from,next)=>{
    // console.log('前置路由',to,from)
    next()
})

//后置路由守卫
router.afterEach((to,from)=>{
    // console.log('后置路由',to,from)
})


export default router