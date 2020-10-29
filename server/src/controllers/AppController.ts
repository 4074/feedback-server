/* eslint-disable class-methods-use-this */
import Koa from 'koa'
import { Controller, Get, Post } from 'koa-autoboot'
import Service from '@server/service'

@Controller()
export default class AppController {
  @Get()
  async meta(): Promise<API.AppController.MetaData> {
    const actionTypes: Model.AppActionType[] = ['popo', 'udata-question']
    return { actionTypes }
  }

  @Get()
  async list(): Promise<API.AppController.ListData> {
    const apps = await Service.findApps()
    return { apps }
  }

  @Post()
  async save(ctx: Koa.Context): Promise<API.AppController.SaveData> {
    const params: API.AppController.SaveParams = ctx.validate(
      ctx.request.body,
      {
        name: 'string',
        hosts: 'array'
      }
    )
    const app = await Service.saveApp(params)
    return app
  }

  @Post()
  async remove(ctx: Koa.Context): Promise<API.AppController.RemoveData> {
    const params: API.AppController.SaveParams = ctx.validate(
      ctx.request.body,
      {
        name: 'string',
        hosts: 'array'
      }
    )
    await Service.removeApp(params)
    return params
  }
}
