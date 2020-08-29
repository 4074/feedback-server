import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'

import config from '@server/config'
import connect from '@server/connection'
import '@server/service/mongodb'
import {
  LogMiddleware,
  ValidateMiddleware,
  ReturnMiddleware
} from '@server/middlewares'
import { FeedbackController } from '@server/controllers'

connect()
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
api.post('/receive', FeedbackController.receive)
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
