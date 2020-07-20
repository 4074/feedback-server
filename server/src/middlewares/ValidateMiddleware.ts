import koa from 'koa'
import Validator, { ValidationSchema } from 'fastest-validator'

export default function middleware() {
    return async function m(
        ctx: koa.Context,
        next: () => Promise<any>
    ): Promise<any> {
        const validator = new Validator()
        ctx.validate = <T>(source: any, schema: ValidationSchema): T => {
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
            return source as T
        }
        await next()
    }
}
