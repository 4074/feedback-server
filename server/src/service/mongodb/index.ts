/* eslint-disable class-methods-use-this */
import mongoose from 'mongoose'
import config from '@server/config'
import BaseService from '../BaseService'
import App from './App'
import Feedback from './Feedback'

export default class MongodbService extends BaseService {
  async setup(): Promise<void> {
    await super.setup()
    await mongoose.connect(config.mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    // eslint-disable-next-line no-console
    console.log('mongodb connected')
  }

  async findApps(): Promise<Model.App[]> {
    const records: Model.App[] = await App.find().lean()
    return records
  }

  async findAppById(appId: string): Promise<Model.App | null> {
    const record = await App.findOne({ appId })
    if (record) return record.toObject()
  }

  async saveApp(params: Model.App): Promise<Model.App> {
    let app: any

    if (!params.appId) {
      app = new App(params)
      app.appId = this.createAppId()
      app.createAt = new Date()
      app.timestamp = app.createAt.getTime()
    } else {
      app = await App.findOne({ appId: params.appId })
    }

    const result = (await app.save()).toObject()

    return result as Model.App
  }

  async findFeedbacks(): Promise<Model.Feedback[]> {
    const records: Model.Feedback[] = await Feedback.find().lean()
    return records
  }

  async saveFeedback(params: Model.Feedback): Promise<Model.Feedback> {
    const feedback = new Feedback(params)
    const result = (await feedback.save()).toObject()
    return result as Model.Feedback
  }
}
