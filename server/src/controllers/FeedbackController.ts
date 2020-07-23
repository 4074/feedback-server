import Koa from 'koa'

export async function list(ctx: Koa.Context): Promise<void> {
  ctx.body = []
}

export async function receive(ctx: Koa.Context): Promise<void> {
  const params: Params.Feedback.List = ctx.validate(ctx.request.body, {
    uid: 'number'
  })
  ctx.body = params
}

export async function error(): Promise<void> {
  let b: number[]
  b.push(1)
}
