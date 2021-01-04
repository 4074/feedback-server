/* eslint-disable class-methods-use-this */
import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import mongoose from 'mongoose'
import config from '@server/config'
import BaseService from '../BaseService'
import App from './App'
import Feedback from './Feedback'
import Build from './Build'
import build from '../../build'
import { isDiff } from '@server/utils'

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
    const record: any = await App.findOne({ appId })
    if (record) return record.toObject()
  }

  public async saveApp(params: Model.App): Promise<Model.App> {
    let app: any
    let needBuild = false

    if (!params.appId) {
      needBuild = true
      app = new App(params)
      app.appId = this.createAppId()
      app.createAt = new Date()
      app.timestamp = app.createAt.getTime()
    } else {
      app = await App.findOne({ appId: params.appId })
      needBuild = isDiff(params.setup, app.toObject().setup)

      app.name = params.name
      app.hosts = params.hosts
      app.actions = params.actions
      app.setup = params.setup
    }
    const result = (await app.save()).toObject()

    if (needBuild) build(result, () => {
      this.saveBuild(app.appId)
    })
    // build(result)

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

  public async middleware(ctx: Koa.Context, next: () => any) {
    const match = ctx.path.match(/^\/(.+)\/feedback\.js$/)
    if (!match) return next()

    const appId = match[1]
    const filedir = path.join(__dirname, '../../../sdks', appId)
    const filepath = path.join(filedir, 'feedback.js')
    if (!fs.existsSync(filepath)) {
      const item: any = await Build.findOne({appId})
      if (item) {
        if (!fs.existsSync(filedir)) fs.mkdirSync(filedir)
        fs.writeFileSync(filepath, item.content)
      }
    }
    
    return next()
  }

  private async saveBuild(appId: string): Promise<void> {
    const filepath = path.join(__dirname, '../../../sdks', appId, 'feedback.js')
    if (!fs.existsSync(filepath)) return
    const content = fs.readFileSync(filepath).toString()
    let item: any = await Build.findOne({appId})
    if (item) {
      item.content = content
      item.cteateAt = new Date()
    } else {
      item = new Build({
        appId, content, createAt: new Date()
      })
    }

    return item.save()
  }
}
