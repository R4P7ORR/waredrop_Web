import { PrismaService } from "../database/prisma.service";
export interface Permission {
    permission_id?: number;
    permission_name: string;
}
export declare class PermissionsService {
    private readonly db;
    constructor(db: PrismaService);
    createPermission(newPermission: Permission): Promise<{
        permission_id: number;
        permission_name: string;
    }>;
    givePermission(permission_id: number, role_id: number): Promise<{
        permission_permission_id: number;
        role_role_id: number;
    }>;
    getPermissionsByUser(user_id: number): Promise<Permission[]>;
}
