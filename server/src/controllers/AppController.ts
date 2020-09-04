import Koa from 'koa'
import Service from '@server/service'

export async function list(): Promise<API.AppController.ListData> {
  const apps = await Service.findApps()
  return { apps }
}

export async function save(
  ctx: Koa.Context
): Promise<API.AppController.SaveData> {
  const params: API.AppController.SaveParams = ctx.validate(ctx.request.body, {
    name: 'string',
    hosts: 'array'
  })
  const app = await Service.saveApp(params)
  return app
}
