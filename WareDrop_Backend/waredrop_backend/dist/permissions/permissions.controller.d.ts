import { Permission, PermissionsService } from "./permissions.service";
import { Request } from "express";
import JwtDecoder from "../auth/jwt.decoder";
export declare class PermissionsController {
    private readonly service;
    private readonly jwt;
    constructor(service: PermissionsService, jwt: JwtDecoder);
    createNewPermission(newPermission: Permission): Promise<{
        permission_id: number;
        permission_name: string;
    }>;
    getPermissionsByUser(req: Request): Promise<Permission[]>;
    givePermission({ role_id, permission_id }: {
        role_id: number;
        permission_id: number;
    }): Promise<{
        permission_permission_id: number;
        role_role_id: number;
    }>;
}
