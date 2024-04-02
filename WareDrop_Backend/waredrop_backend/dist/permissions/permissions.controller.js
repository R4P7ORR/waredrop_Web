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
exports.PermissionsController = void 0;
const common_1 = require("@nestjs/common");
const permissions_service_1 = require("./permissions.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const jwt_decoder_1 = require("../auth/jwt.decoder");
let PermissionsController = class PermissionsController {
    constructor(service, jwt) {
        this.service = service;
        this.jwt = jwt;
    }
    async createNewPermission(newPermission) {
        return this.service.createPermission(newPermission);
    }
    async getPermissionsByUser(req) {
        const user = this.jwt.decodeToken(req);
        return this.service.getPermissionsByUser(user.sub.id);
    }
    async givePermission({ role_id, permission_id }) {
        return this.service.givePermission(role_id, permission_id);
    }
};
exports.PermissionsController = PermissionsController;
__decorate([
    (0, common_1.Post)('newPermission'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "createNewPermission", null);
__decorate([
    (0, common_1.Get)('/user'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "getPermissionsByUser", null);
__decorate([
    (0, common_1.Post)('/giveToRole'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "givePermission", null);
exports.PermissionsController = PermissionsController = __decorate([
    (0, common_1.Controller)('permissions'),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService, jwt_decoder_1.default])
], PermissionsController);
//# sourceMappingURL=permissions.controller.js.map