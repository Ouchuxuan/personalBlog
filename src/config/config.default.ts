import { Context } from 'koa';
import * as path from 'path';
const appConfig = {
  port: 8090,
  baseLogPath: path.resolve(__dirname, '../logs'),
  cors: {
    whiteUrl: 'http://127.0.0.1:5500',
  }
}

export default appConfig;