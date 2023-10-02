/* 封装axios用于发送请求 */
import axios from 'axios'
import router from '../router'
import { getInfo } from './storage'

// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json', // 设置请求头
  },
  timeout: 5000,
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = getInfo('userInfo')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      router.push({ name: 'Results', params: { msg: '抱歉,您暂时没有权限' } })
    } else if (error.response && error.response.status === 500) {
      router.push({
        name: 'Results',
        params: { msg: '服务器发生错误，请稍后重试' },
      })
    } else if (error.request) {
      // 请求发送失败，没有收到响应
      router.push({
        name: 'Results',
        params: { msg: '请求发送失败，请检查您的网络连接或稍后重试' },
      })
    } else {
      // 其他错误
      router.push({
        name: 'Results',
        params: { msg: '发生错误：' + error.message },
      })
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request

// restFull url拼接：const apiUrl = `/users/${userId}`;
