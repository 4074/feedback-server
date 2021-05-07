import axios from 'axios'
import { message } from 'antd'

axios.defaults.baseURL = '/api/'
axios.interceptors.response.use((response) => {
  if (response.data.status) return response.data.data
  return Promise.reject(response.data.message)
}, (error) => {
  return Promise.reject(error)
})

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const create = <R = any, P = void>(url: string, method: 'get' | 'post' = 'get') => {
  // Use `url` as func name
  const { [url]: fn } = {
    [url]: async (params: P): Promise<R> => {
      try {
        return await axios[method](url, params)
      } catch (error) {
        message.error('请求失败，请稍后重试')
        throw error
      }
    }
  }
  return fn
}