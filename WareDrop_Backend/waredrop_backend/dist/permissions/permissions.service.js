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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let PermissionsService = class PermissionsService {
    constructor(db) {
        this.db = db;
    }
    async createPermission(newPermission) {
        return this.db.permissions.create({
            data: newPermission
        });
    }
    async givePermission(permission_id, role_id) {
        return this.db.role_has_permission.create({
            data: {
                permission_permission_id: permission_id,
                role_role_id: role_id,
            }
        });
    }
    async getPermissionsByUser(user_id) {
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
                        user_user_id: user_id
                    }
                }
            }
        });
        for (const permission of result) {
            permission.role_has_permission.map((item) => {
                permissions.push({ permission_name: item.permissions.permission_name });
            });
        }
        return permissions;
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map