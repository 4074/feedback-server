import koa from 'koa'

export async function list(ctx: koa.Context): Promise<void> {
    ctx.body = []
}

export async function receive(ctx: koa.Context): Promise<void> {
    const params: Params.List = ctx.validate(ctx.request.body, {
        uid: 'number'
    })
    ctx.body = params
}

export async function error(): Promise<void> {
    let b: number[]
    b.push(1)
}
