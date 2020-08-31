import Koa from 'koa'
import service from '@server/service'
import storage from '@server/storage'

export async function list(): Promise<Model.Feedback[]> {
  return []
}

export async function receive(ctx: Koa.Context): Promise<boolean> {
  const params: Model.Feedback = ctx.validate(ctx.request.body, {
    appId: 'string',
    user: 'string',
    action: 'string',
    data: 'string',
    message: { type: 'string', optional: true }
  })

  const app = await service.findAppById(params.appId)
  if (!app) ctx.throw(400, 'Expected a valid appId:', params.appId)

  if (app.hosts && app.hosts.length) {
    const matches = (ctx.request.path || '').match(/https?:\/\/(.+)\//)
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
      const images = await storage.upload(files)
      params.images = images
    }
    await service.saveFeedback(params)
  } else {
    await service.saveFeedback(params)
  }

  return true
}

export async function error(): Promise<void> {
  let b: number[]
  b.push(1)
}
