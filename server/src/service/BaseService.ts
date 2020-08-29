/* eslint-disable class-methods-use-this */
import { v4 as uuid } from 'uuid'

export default class BaseService {
  async setup(): Promise<void> {
    // setup
  }

  createAppId = (): string => {
    return uuid().split('-').pop()
  }

  async findApps(): Promise<Model.App[]> {
    return []
  }

  async saveApp(params: Model.App): Promise<Model.App> {
    return params
  }

  async findFeedbacks(): Promise<Model.Feedback[]> {
    return []
  }

  async saveFeedback(params: Model.Feedback): Promise<Model.Feedback> {
    return params
  }
}
