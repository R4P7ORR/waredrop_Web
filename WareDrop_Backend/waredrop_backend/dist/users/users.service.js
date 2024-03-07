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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(db) {
        this.db = db;
    }
    async createUser(createInput) {
        const salt = await bcrypt.genSalt();
        createInput.password = await bcrypt.hash(createInput.password, salt);
        const result = await this.db.users.create({
            data: {
                user_name: createInput.name,
                user_email: createInput.email,
                user_password: createInput.password,
            }
        });
        return result;
    }
    async findUser(email) {
        const result = await this.db.users.findFirst({
            where: {
                user_email: email
            }
        });
        return result;
    }
    async updateUser(updateInput) {
        const result = await this.db.users.update({
            data: updateInput.data,
            where: {
                user_id: updateInput.where
            }
        });
    }
    async deleteUser(deleteInput) {
        const result = await this.db.users.delete({
            where: deleteInput
        });
        return result;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map