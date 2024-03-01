import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class RolesService {
    constructor(private readonly db: PrismaService) {}

    async getUserRole(user: Prisma.usersWhereUniqueInput) {
        const role = await this.db.user_has_role.findMany({
            select: {
                roles: {
                    select: {
                        role_name: true
                    }
                }
            },
            where: {user_user_id: user.user_id}
        })
        return role;
    }

    async addRoleToUser(user: Prisma.usersWhereUniqueInput, role: Prisma.rolesWhereUniqueInput){
        const result = await this.db.user_has_role.create({
            data: {
                user_user_id: user.user_id,
                role_role_id: role.role_id
            }
        })
        return result;
    }

    async addPermissionToRole(role: Prisma.rolesWhereUniqueInput, permission: Prisma.permissionsWhereUniqueInput){
        const result = await this.db.role_has_permission.create({
            data: {
                role_role_id: role.role_id,
                permission_permission_id: permission.permission_id
            }
        })
        return result;
    }


}
