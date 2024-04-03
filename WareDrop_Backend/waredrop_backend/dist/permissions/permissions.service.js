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
exports.PermissionsService = exports.AssignPermissionDto = exports.PermissionDto = exports.Permission = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class Permission {
}
exports.Permission = Permission;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Permission.prototype, "permissionId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Permission.prototype, "permissionName", void 0);
class PermissionDto {
}
exports.PermissionDto = PermissionDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], PermissionDto.prototype, "permissionId", void 0);
class AssignPermissionDto {
}
exports.AssignPermissionDto = AssignPermissionDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AssignPermissionDto.prototype, "permissionId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AssignPermissionDto.prototype, "roleId", void 0);
let PermissionsService = class PermissionsService {
    constructor(db) {
        this.db = db;
    }
    async createPermission(newPermission) {
        return this.db.permissions.create({
            data: {
                permission_name: newPermission.permissionName,
            }
        });
    }
    async getAllPermissions() {
        return this.db.permissions.findMany();
    }
    async getPermissionsByUser(userDto) {
        const permissions = [];
        const result = await this.db.roles.findMany({
            select: {
                role_name: true,
                role_has_permission: {
                    select: {
                        permissions: {
                            select: {
                                permission_name: true
                            }
                        }
                    }
                }
            },
            where: {
                user_has_role: {
                    some: {
                        user_user_id: userDto.userId
                    }
                }
            }
        });
        for (const permission of result) {
            permission.role_has_permission.map((item) => {
                permissions.push({ permissionName: item.permissions.permission_name });
            });
        }
        return permissions;
    }
    async givePermission(assignInput) {
        return this.db.role_has_permission.create({
            data: {
                permission_permission_id: assignInput.permissionId,
                role_role_id: assignInput.roleId,
            }
        });
    }
    async removePermission(removeInput) {
        return this.db.role_has_permission.delete({
            where: {
                permission_permission_id_role_role_id: {
                    role_role_id: removeInput.roleId,
                    permission_permission_id: removeInput.permissionId,
                }
            }
        });
    }
    async deletePermission(deletePermission) {
        try {
            const hasRole = await this.db.role_has_permission.findFirst({
                where: {
                    permission_permission_id: deletePermission.permissionId,
                }
            });
            if (hasRole) {
                await this.db.role_has_permission.deleteMany({
                    where: {
                        permission_permission_id: deletePermission.permissionId,
                    }
                });
            }
            await this.db.permissions.delete({
                where: {
                    permission_id: deletePermission.permissionId,
                }
            });
            return { Massage: "Permission deleted" };
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
                return { errorMassage: "Role does not exist" };
            }
            else {
                throw e;
            }
        }
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map