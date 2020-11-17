import config from '@server/config'
import BaseSerice from './BaseService'
import MongodbService from './mongodb'
import LowdbService from './lowdb'

export class Service extends BaseSerice {
  public instance: BaseSerice

  public constructor(database: string) {
    super()
    switch (database) {
      case 'mongodb': {
        this.instance = new MongodbService()
        break
      }
      case 'lowdb': {
        this.instance = new LowdbService()
        break
      }
      default: {
        this.instance = new BaseSerice()
      }
    }
    this.instance.setup()
  }

  public async findApps(): Promise<Model.App[]> {
    return this.instance.findApps()
  }

  public async findAppById(appId: string): Promise<Model.App | null> {
    return this.instance.findAppById(appId)
  }

  public async saveApp(params: Model.App): Promise<Model.App> {
    return this.instance.saveApp(params)
  }

  public async removeApp(params: Model.App): Promise<void> {
    return this.instance.removeApp(params)
  }

  public async findFeedbacks(): Promise<Model.Feedback[]> {
    return this.instance.findFeedbacks()
  }

  public async saveFeedback(params: Model.Feedback): Promise<Model.Feedback> {
    return this.instance.saveFeedback(params)
  }
}

export default new Service(config.database)
