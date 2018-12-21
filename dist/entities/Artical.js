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
const User_1 = require("./User");
const Category_1 = require("./Category");
let Artical = class Artical {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Artical.prototype, "artical_id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 200, nullable: false }),
    __metadata("design:type", String)
], Artical.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Artical.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Artical.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ type: "bigint", default: 0 }),
    __metadata("design:type", Number)
], Artical.prototype, "likes", void 0);
__decorate([
    typeorm_1.Column({ type: "bigint", default: 0 }),
    __metadata("design:type", Number)
], Artical.prototype, "read_num", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 64 }),
    __metadata("design:type", String)
], Artical.prototype, "author", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", default: false }),
    __metadata("design:type", Boolean)
], Artical.prototype, "is_delete", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.articals),
    __metadata("design:type", User_1.User)
], Artical.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Category_1.Category, {
        cascade: true
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Artical.prototype, "categories", void 0);
Artical = __decorate([
    typeorm_1.Entity()
], Artical);
exports.Artical = Artical;
//# sourceMappingURL=Artical.js.map