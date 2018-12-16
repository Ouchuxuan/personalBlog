"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = require("../services/userService");
class UserController {
    static async getAllUsers(ctx) {
        const result = await userService_1.default.UsersListAction();
        ctx.body = '1112ssssss2111';
    }
    static async testCors(ctx) {
        ctx.body = 'jadkssssssssf';
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map