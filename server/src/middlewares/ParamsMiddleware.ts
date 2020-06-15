// import * as Koa from 'koa'
export default function middleware() {
    return async function m(ctx: any, next: Function): Promise<any> {
        const params = { ...ctx.request.query, ...ctx.request.body }
        ctx.request.params = params
        // Hack for pms
        if (ctx.request.path === '/api/out/exportAllDaily') {
            if (ctx.request.params.t)
                ctx.request.params.t = parseInt(ctx.request.params.t, 10)
            if (ctx.request.params.month)
                ctx.request.params.month = parseInt(
                    ctx.request.params.month,
                    10
                )
        }
        await next()
    }
}
