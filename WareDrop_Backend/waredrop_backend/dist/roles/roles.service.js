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
exports.RolesService = exports.RoleDto = exports.Role = exports.AddRoleInput = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const IsStringArrayConstraint_1 = require("../validation/IsStringArrayConstraint");
class AddRoleInput {
}
exports.AddRoleInput = AddRoleInput;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AddRoleInput.prototype, "roleId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AddRoleInput.prototype, "userId", void 0);
class Role {
}
exports.Role = Role;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Role.prototype, "roleId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Role.prototype, "roleName", void 0);
__decorate([
    (0, IsStringArrayConstraint_1.IsStringArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], Role.prototype, "permissions", void 0);
class RoleDto {
}
exports.RoleDto = RoleDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], RoleDto.prototype, "roleId", void 0);
let RolesService = class RolesService {
    constructor(db) {
        this.db = db;
    }
    async createRole(newRole) {
        return this.db.roles.create({
            data: {
                role_name: newRole.roleName,
            }
        });
    }
    async getUserRoles(userId) {
        const roles = await this.db.user_has_role.findMany({
            select: {
                roles: {
                    select: {
                        role_name: true
                    }
                }
            },
            where: {
                user_user_id: userId.userId
            }
        });
        const rolesResult = roles.map((roles) => roles.roles.role_name);
        return rolesResult;
    }
    async addRoleToUser(addRoleInput) {
        return this.db.user_has_role.create({
            data: {
                user_user_id: addRoleInput.userId,
                role_role_id: addRoleInput.roleId
            }
        });
    }
    async listRoles() {
        const roleList = [];
        const roles = await this.db.roles.findMany({
            select: {
                role_id: true,
                role_name: true,
                role_has_permission: {
                    select: {
                        permission_permission_id: true,
                    }
                }
            }
        });
        const permissions = await this.db.permissions.findMany({
            select: {
                permission_name: true,
                permission_id: true,
            }
        });
        for (const role of roles) {
            const roleItem = { roleId: role.role_id, roleName: role.role_name, permissions: [] };
            for (const permission of permissions) {
                if (role.role_has_permission[0] === undefined) {
                    break;
                }
                else if (role.role_has_permission[0].permission_permission_id === permission.permission_id) {
                    roleItem.permissions.push(permission.permission_name);
                }
            }
            roleList.push(roleItem);
        }
        return roleList;
    }
    async removeRole(removeInput) {
        return this.db.user_has_role.delete({
            where: {
                role_role_id_user_user_id: {
                    role_role_id: removeInput.roleId,
                    user_user_id: removeInput.userId,
                }
            }
        });
    }
    async deleteRole(deleteRole) {
        try {
            const hasPermission = await this.db.role_has_permission.findFirst({
                where: {
                    role_role_id: deleteRole.roleId,
                }
            });
            if (hasPermission) {
                await this.db.role_has_permission.deleteMany({
                    where: {
                        role_role_id: deleteRole.roleId,
                    }
                });
            }
            const assigned = await this.db.user_has_role.findFirst({
                where: {
                    role_role_id: deleteRole.roleId,
                }
            });
            if (assigned) {
                await this.db.user_has_role.deleteMany({
                    where: {
                        role_role_id: deleteRole.roleId,
                    }
                });
            }
            await this.db.roles.delete({
                where: {
                    role_id: deleteRole.roleId,
                }
            });
            return { Massage: "Role deleted" };
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
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesService);
//# sourceMappingURL=roles.service.js.map