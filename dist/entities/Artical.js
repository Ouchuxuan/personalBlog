"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], User.prototype, "artical_id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 200, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "blob" }),
    __metadata("design:type", String)
], User.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ type: "bigint", default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "likes", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "images", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], User.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({ type: "bigint", default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "read_num", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 64 }),
    __metadata("design:type", String)
], User.prototype, "author", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is_delete", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=Artical.js.map