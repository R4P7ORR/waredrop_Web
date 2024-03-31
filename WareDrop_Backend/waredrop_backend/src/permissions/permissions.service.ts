import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {UserDto} from "../users/users.service";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class Permission{
    @IsNumber()
    permissionId?: number

    @IsString()
    @IsNotEmpty()
    permissionName: string
}

export class AssignPermissionDto {
    @IsNumber()
    @IsNotEmpty()
    permissionId: number

    @IsNumber()
    @IsNotEmpty()
    roleId: number
}

@Injectable()
export class PermissionsService {
    constructor(private readonly db: PrismaService) {}

    async createPermission(newPermission: Permission){
        return this.db.permissions.create({
            data: {
                permission_name: newPermission.permissionName,
            }
        })
    }

    async getAllPermissions(){
        return this.db.permissions.findMany();
    }

    async getPermissionsByUser(userDto: UserDto){
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
                        user_user_id: userDto.userId
                    }
                }
            }
        })
        for (const permission of result) {
           permission.role_has_permission.map((item) => {
               permissions.push({permissionName: item.permissions.permission_name});
           });
        }

        return permissions;
    }
    async givePermission(assignInput: AssignPermissionDto){
        return this.db.role_has_permission.create({
            data: {
                permission_permission_id: assignInput.permissionId,
                role_role_id: assignInput.roleId,
            }
        });
    }
}
