//分类
export default {
    namespaced: true,//开启命名空间
    actions: {
        test(context, value) {
            // console.log('actions被调用了', context, value)
            var a = value * 10
            context.commit("TEST", a)
        }
    },
    mutations: {
        TEST(state, value) {
            // console.log('mutations被调用了', state, value)
            state.sum = value
        }
    },
    state:{
        sum: 5
    },
    getters :{
        testSum(state) {
            // console.log('getters被调用了',state.sum * 1000)
            return state.sum * 1000
        }
    }
}