import axios from 'axios'

const urls = {
  list: 'feedback/list'
}

export function list(): Promise<any> {
  return axios.get(urls.list)
}