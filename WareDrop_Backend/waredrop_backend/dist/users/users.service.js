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
exports.UsersService = exports.UserDto = exports.UpdateInput = exports.CreateUserDto = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userEmail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userPassword", void 0);
class UpdateInput {
}
exports.UpdateInput = UpdateInput;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateInput.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateInput.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateInput.prototype, "userPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateInput.prototype, "userEmail", void 0);
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UserDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserDto.prototype, "userEmail", void 0);
let UsersService = class UsersService {
    constructor(db) {
        this.db = db;
    }
    async createUser(createInput) {
        const salt = await bcrypt.genSalt();
        createInput.userPassword = await bcrypt.hash(createInput.userPassword, salt);
        return this.db.users.create({
            data: {
                user_name: createInput.userName,
                user_email: createInput.userEmail,
                user_password: createInput.userPassword,
            }
        });
    }
    async listUsers() {
        return this.db.users.findMany();
    }
    async findUser(email) {
        return this.db.users.findFirst({
            where: {
                user_email: email
            }
        });
    }
    async updateUser(updateInput) {
        return this.db.users.update({
            data: updateInput,
            where: {
                user_id: updateInput.userId
            }
        });
    }
    async deleteUser(deleteInput) {
        try {
            const hasRole = await this.db.user_has_role.findFirst({
                where: {
                    user_user_id: deleteInput.userId
                }
            });
            if (hasRole) {
                await this.db.user_has_role.deleteMany({
                    where: {
                        user_user_id: deleteInput.userId
                    }
                });
            }
            const assignedToWarehouse = await this.db.user_assigned_to_warehouse.findFirst({
                where: {
                    user_user_id: deleteInput.userId
                }
            });
            if (assignedToWarehouse) {
                await this.db.user_assigned_to_warehouse.deleteMany({
                    where: {
                        user_user_id: deleteInput.userId
                    }
                });
            }
            await this.db.users.delete({
                where: {
                    user_id: deleteInput.userId,
                }
            });
            return { Massage: "User deleted" };
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
                return { errorMassage: "User does not exist" };
            }
            else {
                throw e;
            }
        }
    }
    async getUserName(user) {
        return this.db.users.findFirst({
            select: {
                user_name: true,
            },
            where: {
                user_id: user.userId,
            }
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map