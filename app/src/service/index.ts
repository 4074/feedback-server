import axios from 'axios'

import * as app from './app'
import * as feedback from './feedback'

axios.defaults.baseURL = '/api/'
axios.interceptors.response.use((response) => {
  if (response.data.status) return response.data.data
  return Promise.reject(response.data.message)
}, (error) => {
  return Promise.reject(error)
})

export default {
  app,
  feedback
}