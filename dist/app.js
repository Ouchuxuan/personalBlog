"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const KoaCors = require("koa2-cors");
const routes_1 = require("./routes");
const config_default_1 = require("./config/config.default");
const KoaLogger = require("koa-logger");
const app = new Koa();
typeorm_1.createConnection()
    .then(async () => {
    app.use(KoaCors({
        origin: function (ctx) {
            if (ctx.url === "/api") {
                return "*";
            }
            return config_default_1.default.cors.whiteUrl;
        },
        exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
        maxAge: 5,
        credentials: true,
        allowMethods: ["GET", "POST", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization", "Accept"]
    }));
    app.use(bodyParser());
    app.use(routes_1.default.routes()).use(routes_1.default.allowedMethods());
    app.use(KoaLogger());
    app.listen(config_default_1.default.port);
    console.log(`Server running on port ${config_default_1.default.port}`);
})
    .catch(error => console.log("TypeORM connection error: ", error));
//# sourceMappingURL=app.js.map