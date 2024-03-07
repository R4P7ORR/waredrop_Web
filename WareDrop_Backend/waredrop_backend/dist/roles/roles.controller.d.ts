import { AddPermissionInput, AddRoleInput, RolesService } from "./roles.service";
import { Prisma } from "@prisma/client";
export declare class RolesController {
    private service;
    constructor(service: RolesService);
    getRole(user: Prisma.usersWhereUniqueInput): Promise<{
        roles: {
            role_name: string;
        };
    }[]>;
    addRole(input: AddRoleInput): Promise<{
        role_role_id: number;
        user_user_id: number;
    }>;
    addPermission(input: AddPermissionInput): Promise<{
        permission_permission_id: number;
        role_role_id: number;
    }>;
    getRoles(): Promise<import("./roles.service").Role[]>;
}
