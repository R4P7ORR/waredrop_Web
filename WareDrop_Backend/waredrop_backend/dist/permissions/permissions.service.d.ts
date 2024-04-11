import { PrismaService } from "../database/prisma.service";
import { UserDto } from "../users/users.service";
export declare class Permission {
    permissionId?: number;
    permissionName: string;
}
export declare class PermissionDto {
    permissionId: number;
}
export declare class AssignPermissionDto {
    permissionId: number;
    roleId: number;
}
export declare class PermissionsService {
    private readonly db;
    constructor(db: PrismaService);
    createPermission(newPermission: Permission): Promise<{
        message: string;
    }>;
    getAllPermissions(): Promise<{
        permission_id: number;
        permission_name: string;
    }[]>;
    getPermissionsByUser(userDto: UserDto): Promise<Permission[]>;
    givePermission(assignInput: AssignPermissionDto): Promise<{
        permission_permission_id: number;
        role_role_id: number;
    }>;
    removePermission(removeInput: AssignPermissionDto): Promise<{
        permission_permission_id: number;
        role_role_id: number;
    }>;
    deletePermission(deletePermission: PermissionDto): Promise<{
        Massage: string;
        errorMassage?: undefined;
    } | {
        errorMassage: string;
        Massage?: undefined;
    }>;
}
