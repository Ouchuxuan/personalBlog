"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const appConfig = {
    port: 8090,
    staticPath: '../src/public',
    baseLogPath: path.resolve(__dirname, '../logs'),
    cors: {
        whiteUrl: 'http://127.0.0.1:5500',
    }
};
exports.default = appConfig;
//# sourceMappingURL=config.default.js.map