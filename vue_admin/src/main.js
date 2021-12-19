import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Form, FormItem, Input, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api/auth'
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
