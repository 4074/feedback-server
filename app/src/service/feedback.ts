import axios from 'axios'

const urls = {
  list: 'feedback/list'
}

export function list(): Promise<API.FeedbackController.ListData> {
  return axios.get(urls.list)
}