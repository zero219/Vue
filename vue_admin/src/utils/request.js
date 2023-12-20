/* 封装axios用于发送请求 */
import axios from 'axios'
import router from '../router'
import { MessageBox } from 'element-ui'
import { getInfo, setInfo } from './storage'
import { refreshToken, isRefreshTokenRequest } from './refreshToken'

// 创建一个新的axios实例
const instance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json', // 设置请求头
  },
  timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = getInfo('token')
    const refreshToken = getInfo('refreshToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    if (refreshToken) {
      config.headers.RefreshToken = refreshToken
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  // 响应
  async (res) => {
    // 对响应之前做点什么
    return res
  },
  // 异常
  async (error) => {
    let isRefresh = false
    if (error.response && error.response.status === 400) {
      MessageBox.confirm(error, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log('确定')
        })
        .catch(() => {
          console.log('取消')
        })
    } else if (
      error.response &&
      error.response.status === 401 &&
      !isRefreshTokenRequest(error.config)
    ) {
      if (!isRefresh) {
        isRefresh = true
        try {
          // 刷新token
          const result = await refreshToken()
          // 请求成功后
          if (result.status === 200) {
            setInfo('token', result.data.accessToken)
            setInfo('refreshToken', result.data.refreshToken)
            // 重新请求
            return instance(error.config)
          }
        } catch (error) {
          localStorage.clear()
          router.push('/Login')
        }
        isRefresh = false
      }
    } else if (error.response && error.response.status === 403) {
      MessageBox.confirm(error, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log('确定')
        })
        .catch(() => {
          console.log('取消')
        })
    } else if (error.response && error.response.status === 500) {
      MessageBox.confirm(error, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log('确定')
        })
        .catch(() => {
          console.log('取消')
        })
    } else if (error.request) {
      // 请求发送失败，没有收到响应
      console.error('未发送请求：', error.message)
    } else {
      // 其他错误
      console.error('其他错误：', error.message)
    }

    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance

// restFull url拼接：const apiUrl = `/users/${userId}`;
