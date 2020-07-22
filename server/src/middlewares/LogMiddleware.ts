/* eslint-disable no-console */
import Koa from 'koa'
import config from '@server/config'

export default function middleware(): Koa.Middleware {
    return async function m(
        ctx: Koa.Context,
        next: () => Promise<any>
    ): Promise<void> {
        const logInfo: Log.Request = {
            action: 'request',
            path: ctx.path,
            params: ctx.request.body,
            referer: ctx.header.referer,
            userAgent: ctx.header['user-agent'],
            ip: ctx.ip,
            host: ctx.host,
            location: 'api',
            stage: 'start',
            date: new Date()
        }
        console.info(logInfo)

        let error: any
        try {
            await next()
        } catch (err) {
            error = err
            logInfo.error = error.stack
        }

        logInfo.duration = new Date().getTime() - logInfo.date.getTime()
        if (config.isProduction || logInfo.duration > 1000 || logInfo.error) {
            logInfo.stage = 'end'
            console.info(logInfo)
        }

        if (error) ctx.throw(error.status || 500, error)
    }
}
