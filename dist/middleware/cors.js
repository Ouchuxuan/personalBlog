"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KoaCors = require("koa2-cors");
const cors = () => {
    return async function (ctx, next) {
        KoaCors({
            origin: function (ctx) {
                if (ctx.url === "/test") {
                    return "*";
                }
                return "127.0.0.1:5500";
            },
            exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
            maxAge: 5,
            credentials: true,
            allowMethods: ["GET", "POST", "DELETE"],
            allowHeaders: ["Content-Type", "Authorization", "Accept"]
        });
        await next();
    };
};
exports.default = cors;
//# sourceMappingURL=cors.js.map