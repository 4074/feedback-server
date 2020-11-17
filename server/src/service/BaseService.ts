/* eslint-disable class-methods-use-this */
import { v4 as uuid } from 'uuid'

export default class BaseService {
  public async setup(): Promise<void> {
    // setup
  }

  public createAppId = (): string => {
    return uuid().split('-').pop()
  }

  public async findApps(): Promise<Model.App[]> {
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async findAppById(appId: string): Promise<Model.App | null> {
    return null
  }

  public async saveApp(params: Model.App): Promise<Model.App> {
    return params
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async removeApp(_: Model.App): Promise<void> {
    // Remove
  }

  public async findFeedbacks(): Promise<Model.Feedback[]> {
    return []
  }

  public async saveFeedback(params: Model.Feedback): Promise<Model.Feedback> {
    return params
  }
}
