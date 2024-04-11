import { AddRoleInput, Role, RoleDto, RolesService } from "./roles.service";
export declare class RolesController {
    private service;
    constructor(service: RolesService);
    createRole(newRole: Role): Promise<{
        role_id: number;
        role_name: string;
    }>;
    getRole(inputId: string): Promise<string[]>;
    getRoles(): Promise<Role[]>;
    addRole(addRoleInput: AddRoleInput): Promise<{
        role_role_id: number;
        user_user_id: number;
    }>;
    removeRole(removeInput: AddRoleInput): Promise<{
        role_role_id: number;
        user_user_id: number;
    }>;
    deleteRole(deleteRole: RoleDto): Promise<{
        Massage: string;
        errorMassage?: undefined;
    } | {
        errorMassage: string;
        Massage?: undefined;
    }>;
}
