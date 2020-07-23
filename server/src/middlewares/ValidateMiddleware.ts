import Koa from 'koa'
import Validator, { ValidationSchema } from 'fastest-validator'

interface ValidateFunction {
  <T>(source: Record<string, any>, schema: ValidationSchema): T
}

declare module 'koa' {
  interface ExtendableContext {
    validate: ValidateFunction
  }
}

export default function middleware(): Koa.Middleware {
  return async function m(
    ctx: Koa.Context,
    next: () => Promise<any>
  ): Promise<any> {
    const validator = new Validator()
    ctx.validate = (source: any, schema: ValidationSchema) => {
      const errors = validator.validate(source, schema)
      if (Array.isArray(errors) && errors.length) {
        const messages = errors
          .map(
            (e) =>
              `${e.message} Actual: ${
                e.actual === '' ? `'${e.actual}'` : e.actual
              }.`
          )
          .join('\n')
        ctx.throw(400, messages)
      }
      return source
    }
    await next()
  }
}
