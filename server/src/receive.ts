import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import cors from '@koa/cors'

import config from '@server/config'

import {
  LogMiddleware,
  ValidateMiddleware,
  ReturnMiddleware
} from '@server/middlewares'
import { FeedbackController } from '@server/controllers'

const app = new Koa()

app.use(
  koaBody({
    multipart: true,
    formidable: {
      multiples: true
    }
  })
)

app.use(LogMiddleware())
app.use(ValidateMiddleware())
app.use(ReturnMiddleware())

const api = new Router()
api.post('/receive', cors(), FeedbackController.receive)
app.use(api.routes())

app.listen(config.receivePort, () => {
  // eslint-disable-next-line no-console
  console.log(
    'Receive server running on port',
    config.receivePort,
    '\nenv',
    config.isProduction ? 'production' : 'development'
  )
})
