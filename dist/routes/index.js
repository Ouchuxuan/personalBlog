"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KoaRouter = require("koa-router");
const userController_1 = require("../controllers/userController");
const router = new KoaRouter();
router.get('/admin', userController_1.default.getAllUsers);
router.post('/haha', userController_1.default.testCors);
router.post('/test', userController_1.default.testCors);
exports.default = router;
//# sourceMappingURL=index.js.map