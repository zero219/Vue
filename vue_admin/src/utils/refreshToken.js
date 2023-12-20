import request from './request'
import { getInfo } from './storage'
import api from '../api/index'

// promise是为了防止token过期后，并发请求多次
let promise
const refreshToken = () => {
  if (promise) {
    return promise
  }
  promise = new Promise((resolve, reject) => {
    // console.log('刷新token')
    const res = request.get(api.refresh, {
      headers: {
        Authorization: `Bearer ${getInfo('token')}`,
        RefreshToken: getInfo('refreshToken'),
      },
      __isRefreshToken: true,
    })
    // 成功时调用
    resolve(res)
    // 失败时调用
    // reject(res)
  })

  promise.finally(() => {
    promise = null
  })

  return promise
}

const isRefreshTokenRequest = (config) => {
  return !!config.__isRefreshToken // 两个取反，变成bool
}

export { refreshToken, isRefreshTokenRequest }
