/* eslint-disable class-methods-use-this */
import Koa from 'koa'
import { Controller, Get } from 'koa-autoboot'
import Service from '@server/service'
import Storage from '@server/storage'
import runner from '@server/runner'

@Controller()
export default class FeedbackController {
  @Get()
  async list(): Promise<Model.Feedback[]> {
    return Service.findFeedbacks()
  }

  @Get()
  async error(): Promise<void> {
    let b: number[]
    b.push(1)
  }
}

export async function receive(ctx: Koa.Context): Promise<boolean> {
  const params: Model.Feedback = ctx.validate(ctx.request.body, {
    appId: 'string',
    user: { type: 'string', optional: true },
    action: 'string',
    data: { type: 'string', optional: true },
    message: { type: 'string', optional: true }
  })

  const app = await Service.findAppById(params.appId)
  if (!app) ctx.throw(400, 'Expected a valid appId:', params.appId)

  if (app.hosts && app.hosts.length) {
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

  params.path = ctx.header.referer || params.path
  params.userAgent = ctx.header['user-agent']
  try {
    params.data = JSON.parse(params.data as any)
  } catch (_) {
    //
  }

  if (params.action === 'feedback') {
    if (ctx.request.files) {
      const files = Object.values(ctx.request.files)
      const images = await Storage.upload(files)
      params.images = images
    }
    await Service.saveFeedback(params)
    runner(app, params)
  } else {
    await Service.saveFeedback(params)
  }

  return true
}
