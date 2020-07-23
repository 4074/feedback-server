import Koa from 'koa'

export async function list(ctx: Koa.Context): Promise<void> {
  ctx.body = []
}

export async function save(ctx: Koa.Context): Promise<void> {
  const params: Params.App.Save = ctx.validate(ctx.request.body, {
    uid: 'number'
  })
  ctx.body = params
}
