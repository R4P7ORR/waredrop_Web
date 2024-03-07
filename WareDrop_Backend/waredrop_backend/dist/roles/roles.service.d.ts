import { PrismaService } from "../database/prisma.service";
import { Prisma } from "@prisma/client";
export interface AddRoleInput {
    role_id: number;
    user_id: number;
}
export interface AddPermissionInput {
    role_id: number;
    permission_id: number;
}
export interface Role {
    role_name: string;
    permissions: string[];
}
export declare class RolesService {
    private readonly db;
    constructor(db: PrismaService);
    getUserRoles(user: Prisma.usersWhereUniqueInput): Promise<{
        roles: {
            role_name: string;
        };
    }[]>;
    addRoleToUser(input: AddRoleInput): Promise<{
        role_role_id: number;
        user_user_id: number;
    }>;
    addPermissionToRole(input: AddPermissionInput): Promise<{
        permission_permission_id: number;
        role_role_id: number;
    }>;
    listRoles(): Promise<Role[]>;
}
