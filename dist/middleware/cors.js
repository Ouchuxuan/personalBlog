"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KoaCors = require("koa2-cors");
const cors = () => {
    return async function (ctx, next) {
        console.log('进入中间件');
        KoaCors({
            origin: function (ctx) {
                console.log("000000000000");
                if (ctx.url === "/test") {
                    return "*";
                }
                console.log(22255555);
                return "127.0.0.1:5500";
            },
            exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
            maxAge: 5,
            credentials: true,
            allowMethods: ["GET", "POST", "DELETE"],
            allowHeaders: ["Content-Type", "Authorization", "Accept"]
        });
        console.log(345678);
        await next();
    };
};
exports.default = cors;
//# sourceMappingURL=cors.js.map