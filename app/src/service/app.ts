import axios from 'axios'

const urls = {
  list: 'app/list',
  save: 'app/save',
  remove: 'app/remove'
}

export function list(): Promise<API.AppController.ListData> {
  return axios.get(urls.list)
}

export function save(params: API.AppController.SaveParams): Promise<API.AppController.SaveData> {
  return axios.post(urls.save, params)
}

export function remove(params: API.AppController.RemoveParams): Promise<API.AppController.RemoveData> {
  return axios.post(urls.remove, params)
}