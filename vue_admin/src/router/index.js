import Vue from 'vue'
import VueRouter from 'vue-router'
import { getInfo } from '../utils/storage.js'

const Login = () => import('@/views/login/index.vue')
const Home = () => import('@/views/home/index.vue')
const Welcome = () => import('@/views/welcome/index.vue')
const User = () => import('@/views/users/index.vue')
const Role = () => import('@/views/roles/index.vue')
const Company = () => import('@/views/company/index.vue')
const Employee = () => import('@/views/employee/index.vue')
const Results = () => import('@/views/results/index.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/Login' },
    { path: '/Login', component: Login },
    {
      path: '/Home',
      component: Home,
      redirect: '/Welcome',
      children: [
        { path: '/Welcome', name: 'Welcome', component: Welcome },
        { path: '/Users', name: 'User', component: User },
        { path: '/Roles', name: 'Role', component: Role },
        { path: '/Companies', name: 'Company', component: Company },
        { path: '/Employees', name: 'Employee', component: Employee },
        { path: '/Results', name: 'Results', component: Results },
      ],
    },
  ],
})

const authUrl = ['/Login']
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if (authUrl.includes(to.path)) {
    return next()
  }
  const tokenStr = getInfo('token')
  if (!tokenStr) {
    return next('/Login')
  }
  next()
})

export default router
