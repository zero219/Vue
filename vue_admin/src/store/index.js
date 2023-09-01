import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

// vuex也是vue的插件, 需要use一下, 进行插件的安装初始化
Vue.use(Vuex)

// 创建仓库 store
const store = new Vuex.Store({
  state() {},
  mutations: {},
  actions: {},
  getters: {},
  // vuex模块
  modules: {
    user,
  },
})

// 导出仓库
export default store
