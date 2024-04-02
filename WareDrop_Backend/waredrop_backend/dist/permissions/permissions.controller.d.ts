import { AssignPermissionDto, Permission, PermissionDto, PermissionsService } from "./permissions.service";
import { UserDto } from "../users/users.service";
export declare class PermissionsController {
    private readonly service;
    constructor(service: PermissionsService);
    createNewPermission(newPermission: Permission): Promise<{
        permission_id: number;
        permission_name: string;
    }>;
    getPermissionsByUser(userId: UserDto): Promise<Permission[]>;
    listPermissions(): Promise<{
        permission_id: number;
        permission_name: string;
    }[]>;
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
