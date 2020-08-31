import Koa from 'koa'

export default function middleware(): Koa.Middleware {
  return async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {
    const result = await next()
    if (result === undefined) return

    const body = { status: true, message: '操作成功', data: null }

    if (result instanceof Error || result === false) {
      body.status = false
      body.message = result.message || '操作失败'
    } else if (result) {
      body.data = result
    }

    ctx.body = body
  }
}
