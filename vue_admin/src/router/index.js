import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Index from '@/components/Index.vue'
import Welcome from '@/components/Welcome.vue'
import User from '@/components/Users/User.vue'
import Role from '@/components/Roles/Role.vue'
import Result from '@/components/Results/401.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/index',
      component: Index,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/user', component: User },
        { path: '/role', component: Role },
        { path: '/401', component: Result }
      ]
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
