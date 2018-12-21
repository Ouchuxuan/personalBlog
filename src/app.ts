import "reflect-metadata";
import { createKoaServer } from 'routing-controllers'
import { createConnection } from  'typeorm';
import * as bodyParser from "koa-bodyparser";
import * as  KoaCors from "koa2-cors";
import appConfig from "./config/config.default";
import * as KoaLogger from 'koa-logger';

const app = createKoaServer({
  controllers: [`${__dirname}/controllers/**/*{.js,.ts}`],
})

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
    app.use(KoaLogger());
    app.listen(appConfig.port);
    console.log(`Server running on port ${appConfig.port}`);
  })
  .catch(error => console.log("TypeORM connection error: ", error));
