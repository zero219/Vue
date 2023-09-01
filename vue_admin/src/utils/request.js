/* 封装axios用于发送请求 */
import axios from 'axios'

const token = localStorage.getItem('userInfo')

// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 5000,
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    if (token !== '') {
      config.headers.Authorization = JSON.parse(token)
    }
    // 在发送请求之前做些什么
    // console.log(config)
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
    // console.log('response', response)
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request
