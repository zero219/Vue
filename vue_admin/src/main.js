import Vue from 'vue' // 导入vue核心包
import App from './App.vue' // 导入App.vue根组件
import router from './router'
import EventBus from './utils/eventBus' // 事件总线
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'

import axios from 'axios'
// 导入全局样式表
import './assets/css/global.css'

axios.defaults.baseURL = 'http://localhost:5000/'
Vue.prototype.$http = axios

// 开发环境
Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$bus = EventBus

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
