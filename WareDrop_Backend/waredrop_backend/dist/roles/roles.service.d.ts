import { PrismaService } from "../database/prisma.service";
export declare class AddRoleInput {
    roleId: number;
    userId: number;
}
export declare class Role {
    roleId?: number;
    roleName: string;
    permissions?: string[];
}
export declare class RoleDto {
    roleId: number;
}
export declare class GetRoleDto {
    userId: number;
}
export declare class RolesService {
    private readonly db;
    constructor(db: PrismaService);
    createRole(newRole: Role): Promise<{
        role_id: number;
        role_name: string;
    }>;
    getUserRoles(userId: GetRoleDto): Promise<string[]>;
    addRoleToUser(addRoleInput: AddRoleInput): Promise<{
        role_role_id: number;
        user_user_id: number;
    }>;
    listRoles(): Promise<Role[]>;
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
