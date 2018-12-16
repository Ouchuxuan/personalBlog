import "reflect-metadata";
import { createConnection } from "typeorm";

import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as  KoaCors from "koa2-cors";
import router from "./routes";
import appConfig from "./config/config.default";
import * as KoaLogger from 'koa-logger';

const app = new Koa();

createConnection()
  .then(async () => {
    app.use(KoaCors({
        origin: function(ctx) {
            if (ctx.url === "/api") {
              return "*";
            }
            return appConfig.cors.whiteUrl;
          },
          exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
          maxAge: 5,
          credentials: true,
          allowMethods: ["GET", "POST", "DELETE"],
          allowHeaders: ["Content-Type", "Authorization", "Accept"] 
    }))
    app.use(bodyParser());
    app.use(router.routes()).use(router.allowedMethods());
    app.use(KoaLogger());
    app.listen(appConfig.port);
    console.log(`Server running on port ${appConfig.port}`);
  })
  .catch(error => console.log("TypeORM connection error: ", error));
