"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const path = require("path");
const bodyParser = require("koa-bodyparser");
const KoaCors = require("koa2-cors");
const config_default_1 = require("./config/config.default");
const KoaLogger = require("koa-logger");
const koaStatic = require("koa-static");
const app = routing_controllers_1.createKoaServer({
    controllers: [`${__dirname}/controllers/**/*{.js,.ts}`]
});
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
    app.use(koaStatic(path.join(__dirname, '/public')));
    app.use(KoaLogger());
    app.listen(config_default_1.default.port);
    console.log(`Server running on port ${config_default_1.default.port}`);
})
    .catch(error => console.log("TypeORM connection error: ", error));
//# sourceMappingURL=app的副本.js.map