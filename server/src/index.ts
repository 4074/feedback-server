/* eslint-disable radix */
/* eslint-disable guard-for-in */
import fs from 'fs'
import path from 'path'
import Koa from 'koa'

import session from 'koa-session'
import koaBody from 'koa-body'
import koaStatic from 'koa-static'
import proper from 'koa-proper'

import config from './config'
import {
    ParamsMiddleware,
    LogMiddleware,
    ExtensionMiddleware,
} from './middlewares'

// import router from './routers'

const app = new Koa()
app.proxy = true

app.keys = ['feedback-server', config.cookieKey]
app.use(
    session(
        {
            maxAge: 3600 * 1000 * 12 
        },
        app
    )
)

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

app.use(ExtensionMiddleware())
app.use(ParamsMiddleware())
app.use(proper())
app.use(LogMiddleware())

// app.use(router.routes())
app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log('Server running on port', config.port)
    // eslint-disable-next-line no-console
    console.log('env', config.isProduction ? 'production' : 'test')
})
