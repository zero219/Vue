import Vue from 'vue' // 导入vue核心包
import App from './App.vue' // 导入App.vue根组件
import router from './router'
import EventBus from './utils/eventBus' // 事件总线
import store from './store' // vuex
import request from './utils/request'
import api from './api/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'

// 导入全局样式表
import './assets/css/global.css'

// 开发环境
Vue.config.productionTip = false

Vue.use(ElementUI)
// 事件总线
Vue.prototype.$bus = EventBus

Vue.prototype.$http = request

Vue.prototype.api = api

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
