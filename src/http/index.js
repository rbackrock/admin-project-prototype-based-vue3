import axios from 'axios'
import { createPinia } from 'pinia'
import { message, notification } from 'ant-design-vue'
// import store from '/@/store'
import { useAuthStore } from '/@/store/auth'
import router from '/@/router'
import { businessCodeStatus, httpCodeStatus } from './consts'

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_REQUEST_BASE}`,
  timeout: 6000,
  disableMessage: false
})

axiosInstance.interceptors.request.use((config) => {
  createPinia()
  const authStore = useAuthStore()
  config.headers.Authorization = authStore.token
  config.headers['Content-Type'] = 'application/json'

  return config
}, (error) => Promise.reject(error))

axiosInstance.interceptors.response.use((response) => {
  const rspData = response.data

  // TODO 需要和后端协商业务代码含义此处添加
  if (rspData.code !== businessCodeStatus.SUCCESS) {
    if (response.config.disableMessage === false) {
      if (rspData.message) {
        message.error(rspData.message)
      } else {
        message.error('数据请求失败')
      }
    }

    return Promise.reject(new Error(rspData.message || 'Error'))
  }

  // 此处含义一般为，无法删除，用户名密码错误等，对业务请求的行为本身进行回应，不代表后端报错
  if (!rspData.success) {
    if (response.config.disableMessage === false && rspData.message) {
      message.error(rspData.message)
    }
    return Promise.reject(new Error(rspData.message || 'Error'))
  }

  if (response.config.disableMessage === false && rspData.message) {
    message.success(rspData.message)
  }
  return {
    response,
    result: rspData,
    data: rspData.data
  }
}, (error) => {
  let rsponseHttpCodeStatus = 0

  try {
    rsponseHttpCodeStatus = error.response.data.status
  } catch (err) {
    // 处理超时，如果超时进行提示
    if (error.toString().indexOf('Error: timeout') !== -1) {
      notification.error({
        message: '网络超时'
      })
      return Promise.reject(error)
    }
  }

  if (rsponseHttpCodeStatus === httpCodeStatus.UNAUTHORIZED) {
    router.replace({
      name: 'Login',
      params: {
        message: '登录状态已失效，请重新登录'
      }
    })

    return Promise.reject(error)
  }

  if (rsponseHttpCodeStatus === httpCodeStatus.FORBIDDEN) {
    notification.error({
      message: '抱歉您无权访问该资源'
    })

    return Promise.reject(error)
  }

  notification.error({
    message: '数据请求失败'
  })
  return Promise.reject(error)
})

export default axiosInstance
