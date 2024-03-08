import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {Prisma} from "@prisma/client";

export interface AddRoleInput {
    role_id: number,
    user_id: number,
}

export interface AddPermissionInput {
    role_id: number,
    permission_id: number,
}

export interface Role {
    role_id?: number,
    role_name: string;
    permissions?: string[];
}
@Injectable()
export class RolesService {
    constructor(private readonly db: PrismaService) {}

    async createRole(newRole: Role){
        const result = await this.db.roles.create({
            data: {
                role_name: newRole.role_name,
            }
        })
        return result;
    }

    async getUserRoles(userId: number) {
        const roles = await this.db.user_has_role.findMany({
            select: {
                roles: {
                    select: {
                        role_name: true
                    }
                }
            },
            where: {user_user_id: userId}
        })
        return roles;
    }

    async addRoleToUser(input: AddRoleInput){
        const result = await this.db.user_has_role.create({
            data: {
                user_user_id: input.user_id,
                role_role_id: input.role_id
            }
        })
        return result;
    }

    async addPermissionToRole(input: AddPermissionInput){
        const result = await this.db.role_has_permission.create({
            data: {
                role_role_id: input.role_id,
                permission_permission_id: input.permission_id
            }
        })
        return result;
    }

    async listRoles(){
        const roleList: Role[] = [];
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
        })
        const permissions = await this.db.permissions.findMany({
            select: {
                permission_name: true,
                permission_id: true,
            }
        })
        for (const role of roles) {
            var roleItem: Role = {role_id: role.role_id,role_name: role.role_name, permissions: []}
            for (const permission of permissions) {
                if(role.role_has_permission[0] === undefined){
                    break;
                }
                else if (role.role_has_permission[0].permission_permission_id === permission.permission_id){
                    roleItem.permissions.push(permission.permission_name);
                }
            }
            roleList.push(roleItem);
        }
        return roleList;
    }
}
