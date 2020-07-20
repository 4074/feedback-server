/* eslint-disable @typescript-eslint/no-empty-interface */
import 'koa'
import { ValidationSchema } from 'fastest-validator'

declare module 'koa' {
    interface Context {
        validate: <T>(
            source: Record<string, any>,
            schema: ValidationSchema
        ) => T
    }
}
