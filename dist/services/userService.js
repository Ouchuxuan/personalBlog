"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
class UserService {
    static async UsersListAction() {
        return typeorm_1.getRepository(User_1.User).find();
    }
}
exports.default = UserService;
//# sourceMappingURL=userService.js.map