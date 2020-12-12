import Koa from 'koa'
import { Controller, Get } from 'koa-autoboot'
import Service from '@server/service'
import Storage from '@server/storage'
import runner from '@server/runner'

@Controller()
export default class FeedbackController {
  @Get()
  public async list(): Promise<API.FeedbackController.ListData> {
    const feedbacks = await Service.findFeedbacks()
    feedbacks.sort((a, b) => b.timestamp - a.timestamp)
    return feedbacks
  }

  @Get()
  public async error(): Promise<void> {
    let b: number[]
    b.push(1)
  }
}

export async function receive(ctx: Koa.Context): Promise<boolean> {
  const params: API.FeedbackController.ReceiveParams = ctx.validate(
    ctx.request.body,
    {
      appId: 'string',
      user: 'string',
      data: 'string',
      message: 'string'
    }
  )

  const source: Model.Feedback = {
    ...params,
    path: ctx.header.referer,
    userAgent: ctx.header['user-agent'],
    images: [],
    data: {},
    closed: false,
    createAt: new Date()
  }
  try {
    source.data = JSON.parse(params.data)
  } catch (_) {
    //
  }

  const app = await Service.findAppById(source.appId)
  if (!app) ctx.throw(400, 'Expected a valid appId:', source.appId)

  if (app.hosts?.length) {
    const matches = (ctx.header.referer || '').match(/https?:\/\/(.+)\//)
    if (!matches || matches.length < 2) {
      ctx.throw(400, 'Expected request from a valid host')
    }

    const host = matches[1]
    let has = false
    for (const h of Object.values(app.hosts)) {
      if (host.indexOf(h) >= 0) {
        has = true
        break
      }
    }

    if (!has) ctx.throw(400, 'Expected request from a valid host')
  }

  if (ctx.request.files) {
    const files = Object.values(ctx.request.files) as any
    const images = await Storage.upload(Array.isArray(files[0]) ? files[0] : files)
    source.images = images
  }
  await Service.saveFeedback(source)
  runner(app, source)

  return true
}
