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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let RolesService = class RolesService {
    constructor(db) {
        this.db = db;
    }
    async getUserRoles(user) {
        const roles = await this.db.user_has_role.findMany({
            select: {
                roles: {
                    select: {
                        role_name: true
                    }
                }
            },
            where: { user_user_id: user.user_id }
        });
        return roles;
    }
    async addRoleToUser(input) {
        const result = await this.db.user_has_role.create({
            data: {
                user_user_id: input.user_id,
                role_role_id: input.role_id
            }
        });
        return result;
    }
    async addPermissionToRole(input) {
        const result = await this.db.role_has_permission.create({
            data: {
                role_role_id: input.role_id,
                permission_permission_id: input.permission_id
            }
        });
        return result;
    }
    async listRoles() {
        const roleList = [];
        const roles = await this.db.roles.findMany({
            select: {
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
            var roleItem = { role_name: role.role_name, permissions: [] };
            for (const permission of permissions) {
                if (role.role_has_permission[0].permission_permission_id === permission.permission_id) {
                    roleItem.permissions.push(permission.permission_name);
                }
            }
            roleList.push(roleItem);
        }
        return roleList;
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesService);
//# sourceMappingURL=roles.service.js.map