/* eslint-disable class-methods-use-this */
import mongoose from 'mongoose'
import config from '@server/config'
import BaseService from '../BaseService'
import App from './App'
import Feedback from './Feedback'
import build from '../../build'

export default class MongodbService extends BaseService {
  public async setup(): Promise<void> {
    await super.setup()
    await mongoose.connect(config.mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    // eslint-disable-next-line no-console
    console.log('mongodb connected')
  }

  public async findApps(): Promise<Model.App[]> {
    const records: Model.App[] = await App.find().lean()
    return records
  }

  public async findAppById(appId: string): Promise<Model.App | null> {
    const record = await App.findOne({ appId })
    if (record) return record.toObject()
  }

  public async saveApp(params: Model.App): Promise<Model.App> {
    let app: any

    if (!params.appId) {
      app = new App(params)
      app.appId = this.createAppId()
      app.createAt = new Date()
      app.timestamp = app.createAt.getTime()
    } else {
      app = await App.findOne({ appId: params.appId })
      app.name = params.name
      app.hosts = params.hosts
      app.actions = params.actions
      app.setup = params.setup
    }
    const result = (await app.save()).toObject()
    build(result)
    return result
  }

  public async removeApp(params: Model.App): Promise<void> {
    const app = await App.findOne({ appId: params.appId })
    if (app) await app.remove()
  }

  public async findFeedbacks(): Promise<Model.Feedback[]> {
    const records: Model.Feedback[] = await Feedback.find().lean()
    return records
  }

  public async saveFeedback(params: Model.Feedback): Promise<Model.Feedback> {
    const feedback = new Feedback(params)
    const result = (await feedback.save()).toObject()
    return result as Model.Feedback
  }
}
