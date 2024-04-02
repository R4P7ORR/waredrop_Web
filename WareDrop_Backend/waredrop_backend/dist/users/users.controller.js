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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const users_service_1 = require("./users.service");
const permissions_service_1 = require("../permissions/permissions.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const jwt_decoder_1 = require("../auth/jwt.decoder");
const permission_decoarator_1 = require("../auth/permission.decoarator");
let UsersController = class UsersController {
    constructor(users, permissions, jwt) {
        this.users = users;
        this.permissions = permissions;
        this.jwt = jwt;
    }
    async userPermissions(req) {
        const decodedJwt = this.jwt.decodeToken(req);
        return this.permissions.getPermissionsByUser(decodedJwt.sub.id);
    }
    async getUserName(req) {
        const decodedJwt = this.jwt.decodeToken(req);
        return this.users.getUserName(decodedJwt.sub.id);
    }
    async getAllUsers() {
        return this.users.listUsers();
    }
    async updateUser(updateInput) {
        return this.users.updateUser(updateInput);
    }
    async deleteUser(deleteUser) {
        return this.users.deleteUser(deleteUser);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('/permissions'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "userPermissions", null);
__decorate([
    (0, common_1.Get)('/getUserName'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserName", null);
__decorate([
    (0, common_1.Get)('/listAll'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, permission_decoarator_1.PermissionGuard)({ permission_name: 'All' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('/delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('/user'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        permissions_service_1.PermissionsService,
        jwt_decoder_1.default])
], UsersController);
//# sourceMappingURL=users.controller.js.map