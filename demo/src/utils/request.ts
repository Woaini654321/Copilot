import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import storage from './storage'
import router from '@/router'

// 接口返回数据类型
export interface ResponseData<T = any> {
  success: boolean
  data: T
  message: string
}

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = storage.get<string>('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    const res = response.data
    
    if (res.success) {
      return res
    }
    
    // 处理业务错误
    if (res.message.includes('登录状态') || res.message.includes('未授权') || res.message.includes('无效的访问令牌')) {
      // 清除token和用户信息
      storage.remove('token')
      storage.remove('userInfo')
      // 跳转到登录页
      router.push('/login')
    }
    
    ElMessage.error(res.message || '操作失败')
    return Promise.reject(new Error(res.message || '操作失败'))
  },
  error => {
    let message = '网络请求失败'
    
    if (error.response) {
      const { status } = error.response
      switch (status) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '未授权，请重新登录'
          // 清除token和用户信息
          storage.remove('token')
          storage.remove('userInfo')
          // 跳转到登录页
          router.push('/login')
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = error.response.data?.message || '网络请求失败'
      }
    }
    
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

// 请求方法
export function request<T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>> {
  return service(config)
}

// 导出请求方法
export const get = <T = any>(url: string, params?: any, config?: AxiosRequestConfig) =>
  request<T>({ ...config, method: 'get', url, params })

export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
  request<T>({ ...config, method: 'post', url, data })

export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
  request<T>({ ...config, method: 'put', url, data })

export const del = <T = any>(url: string, params?: any, config?: AxiosRequestConfig) =>
  request<T>({ ...config, method: 'delete', url, params })

// 登录方法
export function login(username: string, password: string) {
  return post<{
    token: string
    id: number
    username: string
    name: string
    avatar: string
  }>('/auth/login', { username, password })
}

export default service