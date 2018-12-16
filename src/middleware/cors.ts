import { Context } from "koa";
import * as KoaCors from "koa2-cors";
const cors = () => {
  return async function(ctx: Context, next: () => Promise<any>) {
    console.log('进入中间件');
    KoaCors({
      origin: function(ctx) {
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
export default cors;
