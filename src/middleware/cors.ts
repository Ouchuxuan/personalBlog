import { Context } from "koa";
import * as KoaCors from "koa2-cors";
const cors = () => {
  return async function(ctx: Context, next: () => Promise<any>) {
    KoaCors({
      origin: function(ctx) {
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
export default cors;
