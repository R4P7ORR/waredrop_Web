import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {UserDto} from "../users/users.service";
import { IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Prisma} from "@prisma/client";

export class Permission{
    @IsNumber()
    permissionId?: number

    @IsString()
    @IsNotEmpty()
    permissionName: string
}

export class PermissionDto {
    @IsNumber()
    @IsNotEmpty()
    permissionId: number
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

    async removePermission(removeInput: AssignPermissionDto){
        return this.db.role_has_permission.delete({
            where: {
                permission_permission_id_role_role_id: {
                    role_role_id: removeInput.roleId,
                    permission_permission_id: removeInput.permissionId,
                }
            }
        })
    }

    async deletePermission(deletePermission: PermissionDto){
        try {

            //If the permission is assigned to any roles, the relation will be deleted as well
            const hasRole = await this.db.role_has_permission.findFirst({
                where: {
                    permission_permission_id: deletePermission.permissionId,
                }
            })

            if (hasRole){
                await this.db.role_has_permission.deleteMany({
                    where: {
                        permission_permission_id: deletePermission.permissionId,
                    }
                })
            }

            await this.db.permissions.delete({
                where: {
                    permission_id: deletePermission.permissionId,
                }
            });

            return {Massage: "Permission deleted"};
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025'){
                return {errorMassage: "Role does not exist"};
            }
            else {
                throw e
            }
        }
    }
}
