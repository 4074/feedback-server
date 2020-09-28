import axios from 'axios'

import * as app from './app'
import * as feedback from './feedback'

axios.defaults.baseURL = '/api/'

export default {
  app,
  feedback
}