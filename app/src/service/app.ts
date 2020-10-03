import axios from 'axios'

const urls = {
  list: 'app/list'
}

export function list(): Promise<API.AppController.ListData> {
  return axios.get(urls.list)
}