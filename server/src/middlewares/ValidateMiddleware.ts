import koa from 'koa'
import Validator, { ValidationSchema } from 'fastest-validator'

interface ValidateFunction {
    <T>(source: Record<string, any>, schema: ValidationSchema): T
}

declare module 'koa' {
    interface ExtendableContext {
        validate: ValidateFunction
    }
}

export default function middleware(): koa.Middleware {
    return async function m(
        ctx: koa.Context,
        next: () => Promise<any>
    ): Promise<any> {
        const validator = new Validator()
        ctx.validate = (source: any, schema: ValidationSchema) => {
            const errors = validator.validate(source, schema)
            if (Array.isArray(errors) && errors.length) {
                ctx.throw(
                    400,
                    errors
                        .map(
                            (e) =>
                                `${e.message} Actual: ${
                                    e.actual === '' ? `'${e.actual}'` : e.actual
                                }.`
                        )
                        .join('\n')
                )
            }
            return source
        }
        await next()
    }
}
