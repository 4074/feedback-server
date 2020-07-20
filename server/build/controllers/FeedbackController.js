"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receive = exports.list = void 0;
async function list(ctx) {
    ctx.body = 'list';
}
exports.list = list;
async function receive(ctx) {
    const params = ctx.validate(ctx.request.body, {
        uid: 'number'
    });
    ctx.body = params;
}
exports.receive = receive;
//# sourceMappingURL=FeedbackController.js.map