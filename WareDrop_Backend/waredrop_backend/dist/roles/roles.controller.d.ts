import { AddPermissionInput, AddRoleInput, Role, RolesService } from "./roles.service";
import { UserDto } from "../users/users.service";
export declare class RolesController {
    private service;
    constructor(service: RolesService);
    createRole(newRole: Role): Promise<{
        role_id: number;
        role_name: string;
    }>;
    getRole(userId: UserDto): Promise<string[]>;
    addRole(input: AddRoleInput): Promise<{
        role_role_id: number;
        user_user_id: number;
    }>;
    addPermission(input: AddPermissionInput): Promise<{
        permission_permission_id: number;
        role_role_id: number;
    }>;
    getRoles(): Promise<Role[]>;
}
