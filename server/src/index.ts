import fs from 'fs'
import path from 'path'

import Koa from 'koa'
import koaStatic from 'koa-static'
import koaBody from 'koa-body'
import koaAutoboot from 'koa-autoboot'

import config from '@server/config'

import {
  LogMiddleware,
  ValidateMiddleware,
  ReturnMiddleware
} from '@server/middlewares'

const app = new Koa()

app.use(
  koaBody({
    multipart: true,
    formidable: {
      multiples: true
    }
  })
)

// Resolve upload static file
app.use(koaStatic(path.join(config.root, '../upload')))

// Resolve app static file
const appBuildPath = path.join(config.root, '../../app/build/')
app.use(async (ctx, next) => {
  if (ctx.path !== '/') {
    await koaStatic(appBuildPath, {
      maxage: 31536000000
    })(ctx, next)
  } else {
    await next()
  }
})

// Fall back to react app
let indexBuffer: Buffer
app.use(async (ctx, next) => {
  if (ctx.path.indexOf('/api') !== 0 && ctx.path.indexOf('.') < 0) {
    if (!indexBuffer) {
      const indexPath = path.join(appBuildPath, 'index.html')
      if (!fs.existsSync(indexPath)) return next
      indexBuffer = fs.readFileSync(indexPath)
    }
    ctx.type = 'html'
    ctx.body = indexBuffer
  } else {
    return next()
  }
})

app.use(LogMiddleware())
app.use(ValidateMiddleware())
app.use(ReturnMiddleware())

app.use(
  koaAutoboot({
    dir: path.join(__dirname, 'controllers'),
    prefix: 'api'
  })
)

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(
    'API server running on port',
    config.port,
    '\nenv',
    config.isProduction ? 'production' : 'development'
  )
})

if (!config.isPm2) {
  import('./public')
}
