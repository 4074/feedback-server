import axios from 'axios'

const urls = {
  list: 'app/list'
}

export function list(): Promise<any> {
  return axios.get(urls.list)
}