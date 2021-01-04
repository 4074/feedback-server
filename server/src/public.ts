import path from 'path'

import Koa from 'koa'
import staticCache from 'koa-static-cache'
import koaBody from 'koa-body'
import koaCompose from 'koa-compose'
import cors from '@koa/cors'

import config from '@server/config'
import service from './service'

import {
  LogMiddleware,
  ValidateMiddleware,
  ReturnMiddleware
} from '@server/middlewares'
import { receive } from '@server/controllers/FeedbackController'

const app = new Koa()

app.use(
  koaBody({
    multipart: true,
    formidable: {
      multiples: true
    }
  })
)

app.use(service.middleware)
const appStaticPath = path.resolve(__dirname, '../sdks')
app.use(staticCache(appStaticPath, { gzip: true, preload: false, dynamic: true }))

app.use(LogMiddleware())
app.use(ValidateMiddleware())
app.use(ReturnMiddleware())

app.use(async (ctx: Koa.Context, next: () => any) => {
  if (ctx.method === 'POST' && ctx.path === '/receive') {
    return koaCompose([cors(), receive])(ctx, next)
  }
  return next()
})

app.listen(config.publicPort, () => {
  // eslint-disable-next-line no-console
  console.log(
    'Receive server running on port',
    config.publicPort,
    '\nenv',
    config.isProduction ? 'production' : 'development'
  )
})
