import * as Koa from 'koa'
import config from '../config'

export default function middleware() {
    // eslint-disable-next-line func-names
    return async function (ctx: Koa.Context, next: Function): Promise<void> {
        const logInfo: Log.Request = {
            action: 'request',
            path: ctx.path,
            user: ctx.session.user && ctx.session.user.corp,
            params: (ctx.request as any).params,
            referer: ctx.header.referer,
            userAgent: ctx.header['user-agent'],
            ip: ctx.ip,
            host: ctx.host,
            location: 'api',
            stage: 'start',
            date: new Date()
        }
        console.info(logInfo)

        try {
            await next()
        } catch (error) {
            if (error.status >= 400 && error.status < 500) {
                ctx.status = 200
                ctx.body = {
                    status: false,
                    code: error.status,
                    message: error.message
                }
            } else {
                logInfo.error = error.stack
                console.error(logInfo)
                ctx.throw(500, error)
            }
        }

        if (config.isProduction) {
            logInfo.stage = 'end'
            logInfo.duration = new Date().getTime() - logInfo.date.getTime()
            console.info(logInfo)
        }
    }
}
