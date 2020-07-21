import koa from 'koa'

export async function list(ctx: koa.Context): Promise<void> {
    ctx.body = 'list'
}

export async function receive(ctx: koa.Context): Promise<void> {
    const params: Params.List = ctx.validate(ctx.request.body, {
        uid: 'number'
    })
    ctx.body = params
}
