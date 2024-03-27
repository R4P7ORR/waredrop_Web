import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";

export interface Permission{
    permission_id?: number,
    permission_name: string
}

@Injectable()
export class PermissionsService {
    constructor(private readonly db: PrismaService) {}

    async givePermission(permission_id: number, role_id: number){
        return this.db.role_has_permission.create({
            data: {
                permission_permission_id: permission_id,
                role_role_id: role_id,
            }
        });
    }

    async getPermissionsByUser(user_id: number){
        const permissions: Permission[] = [];
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
            where:{
                user_has_role: {
                    some: {
                        user_user_id: user_id
                    }
                }
            }
        })
        for (const permission of result) {
           permission.role_has_permission.map((item) => {
               permissions.push({permission_name: item.permissions.permission_name});
           });
        }

        return permissions;
    }
}
