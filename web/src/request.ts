import { extend } from 'umi-request'
import store from './store/store'

import { alert } from './store/messageSlice'
import { load } from './store/loadingSlice'

const request = extend({
  prefix: '/api/',
  timeout: 1000,
})

request.interceptors.response.use((response) => {
  const codeMap: { [key: number]: string } = {
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  }
  let message = codeMap[response.status]
  if (message) {
    store.dispatch(alert({ content: message, type: 'error' }))
  }
  return response
})

request.interceptors.request.use((url, options) => {
  store.dispatch(load(url))
  return {
    url: url,
    options: options,
  }
})

request.interceptors.response.use(async (response, options) => {
  store.dispatch(load(undefined))
  if ('blob' !== options.responseType) {
    const json = await response.clone().json()
    if (json.message) {
      store.dispatch(alert({ content: json.message, type: json.success ? 'success' : 'error' }))
    }
  }
  return response
})

export default request
