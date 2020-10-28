import axios from 'axios'

const urls = {
  list: 'app/list',
  save: 'app/save'
}

export function list(): Promise<API.AppController.ListData> {
  return axios.get(urls.list)
}

export function save(params: API.AppController.SaveParams): Promise<API.AppController.SaveData> {
  return axios.post(urls.save, params)
}