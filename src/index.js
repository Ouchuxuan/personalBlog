const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const ejs = require('ejs');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./config/default');
const signup = require('./routers/signup');
const signin = require('./routers/signin');
const views = require('koa-views');
const staticCache = require('koa-static-cache');

const app = new Koa();

// session存储配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
  }

// 配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
  }))

// 静态资源

// 缓存
app.use(staticCache(path.join(__dirname, './public'), { dynamic: true }, {
    maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
    maxAge: 365 * 24 * 60 * 60
}))



// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

// 配置bodyparser
app.use(bodyParser({
    formLimit: '1mb'
}))


app.use(signup.routes(), signup.allowedMethods());
app.use(signin.routes(),signin.allowedMethods());

  // 路由
// 启动服务
app.listen(config.port, () => {
    console.log(`服务器启动成功`);
});
