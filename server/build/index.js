"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const koa_1 = __importDefault(require("koa"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_body_1 = __importDefault(require("koa-body"));
const middlewares_1 = require("@server/middlewares");
const config_1 = __importDefault(require("./config"));
const FeedbackController = __importStar(require("./controllers/FeedbackController"));
const app = new koa_1.default();
app.use(koa_body_1.default({
    multipart: true,
    formidable: {
        multiples: true
    }
}));
// Resolve static file
app.use(async (ctx, next) => {
    if (ctx.path !== '/') {
        await koa_static_1.default(path_1.default.resolve(__dirname, '../../app/build/'), {
            maxage: 31536000000
        })(ctx, next);
    }
    else {
        await next();
    }
});
// Fall back to react app
let indexBuffer;
app.use(async (ctx, next) => {
    if (ctx.path.indexOf('/api') !== 0 && ctx.path.indexOf('.') < 0) {
        if (!indexBuffer) {
            const indexPath = path_1.default.resolve(__dirname, '../../app/build/index.html');
            indexBuffer = fs_1.default.readFileSync(indexPath);
        }
        ctx.type = 'html';
        ctx.body = indexBuffer;
    }
    else {
        await next();
    }
});
app.use(middlewares_1.ValidateMiddleware());
const api = new koa_router_1.default({ prefix: '/api' });
api.get('/list', FeedbackController.list);
api.post('/receive', FeedbackController.receive);
app.use(api.routes());
app.listen(config_1.default.port, () => {
    // eslint-disable-next-line no-console
    console.log('Server running on port', config_1.default.port, '\nenv', config_1.default.isProduction ? 'production' : 'development');
});
//# sourceMappingURL=index.js.map