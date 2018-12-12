"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    // 启动端口
    port: 9096,
    // 数据库配置
    database: {
        DATABASE: 'nodesql',
        USERNAME: 'root',
        // PASSWORD:'root',//home
        PASSWORD: '123456',
        PORT: '3306',
        HOST: 'localhost'
    }
};
//参考：https://blog.csdn.net/wclimb/article/details/7789079356566
exports.default = config;
//# sourceMappingURL=default.js.map