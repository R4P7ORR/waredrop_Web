import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {UserDto} from "../users/users.service";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {Prisma} from "@prisma/client";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class Permission{
    @ApiPropertyOptional({
        description: 'The id of a permission'
    })
    @IsNumber()
    @IsOptional()
    permissionId?: number

    @ApiProperty({
        description: 'The name of a permission'
    })
    @IsString()
    @IsNotEmpty()
    permissionName: string
}

export class PermissionDto {
    @ApiProperty({
        description: 'The id of a permission'
    })
    @IsNumber()
    @IsNotEmpty()
    permissionId: number
}

export class AssignPermissionDto {
    @ApiProperty({
        description: 'The id of the permission which will be assigned'
    })
    @IsNumber()
    @IsNotEmpty()
    permissionId: number

    @ApiProperty({
        description: 'The id of the role which the permission will be assigned to'
    })
    @IsNumber()
    @IsNotEmpty()
    roleId: number
}

@Injectable()
export class PermissionsService {
    constructor(private readonly db: PrismaService) {}

    async createPermission(newPermission: Permission){
        try {
            const result = await this.db.permissions.create({
                data: {
                    permission_name: newPermission.permissionName,
                }
            })

            if (result){
                return {message: 'Permission created'};
            }
        } catch (e) {
            throw new BadRequestException(e.message);
        }
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
