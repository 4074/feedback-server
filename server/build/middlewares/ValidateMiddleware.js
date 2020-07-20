"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastest_validator_1 = __importDefault(require("fastest-validator"));
function middleware() {
    return async function m(ctx, next) {
        const validator = new fastest_validator_1.default();
        ctx.validate = (source, schema) => {
            const errors = validator.validate(source, schema);
            if (Array.isArray(errors) && errors.length) {
                ctx.throw(400, errors
                    .map((e) => `${e.message} Actual: ${e.actual === '' ? `'${e.actual}'` : e.actual}.`)
                    .join('\n'));
            }
            return source;
        };
        await next();
    };
}
exports.default = middleware;
//# sourceMappingURL=ValidateMiddleware.js.map