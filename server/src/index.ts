import fs from 'fs'
import path from 'path'
import Koa from 'koa'

import koaStatic from 'koa-static'
import Router from 'koa-router'
import koaBody from 'koa-body'
import { ValidateMiddleware } from '@server/middlewares'
import config from './config'

import * as FeedbackController from './controllers/FeedbackController'

const app = new Koa()

app.use(
    koaBody({
        multipart: true,
        formidable: {
            multiples: true
        }
    })
)

// Resolve static file
app.use(async (ctx, next) => {
    if (ctx.path !== '/') {
        await koaStatic(path.resolve(__dirname, '../../app/build/'), {
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
            const indexPath = path.resolve(
                __dirname,
                '../../app/build/index.html'
            )
            indexBuffer = fs.readFileSync(indexPath)
        }
        ctx.type = 'html'
        ctx.body = indexBuffer
    } else {
        await next()
    }
})

app.use(ValidateMiddleware())

const api = new Router<null, Koa.Context>({ prefix: '/api' })
api.get('/list', FeedbackController.list)
api.post('/receive', FeedbackController.receive)
app.use(api.routes())

app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(
        'Server running on port',
        config.port,
        '\nenv',
        config.isProduction ? 'production' : 'development'
    )
})
