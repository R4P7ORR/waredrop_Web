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
const permission_guard_1 = require("../auth/guards/permission.guard");
const permission_decorator_1 = require("../auth/guards/permission.decorator");
const users_service_1 = require("../users/users.service");
let PermissionsController = class PermissionsController {
    constructor(service) {
        this.service = service;
    }
    createNewPermission(newPermission) {
        return this.service.createPermission(newPermission);
    }
    getPermissionsByUser(userId) {
        return this.service.getPermissionsByUser(userId);
    }
    listPermissions() {
        return this.service.getAllPermissions();
    }
    givePermission(assignInput) {
        return this.service.givePermission(assignInput);
    }
    removePermission(removeInput) {
        return this.service.removePermission(removeInput);
    }
    deletePermission(deletePermission) {
        return this.service.deletePermission(deletePermission);
    }
};
exports.PermissionsController = PermissionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permissions_service_1.Permission]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "createNewPermission", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_service_1.UserDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "getPermissionsByUser", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "listPermissions", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permissions_service_1.AssignPermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "givePermission", null);
__decorate([
    (0, common_1.Patch)('/remove'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permissions_service_1.AssignPermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "removePermission", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permissions_service_1.PermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "deletePermission", null);
exports.PermissionsController = PermissionsController = __decorate([
    (0, common_1.Controller)('permissions'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequiredPermission)([{ permissionName: 'All' }]),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService])
], PermissionsController);
//# sourceMappingURL=permissions.controller.js.map