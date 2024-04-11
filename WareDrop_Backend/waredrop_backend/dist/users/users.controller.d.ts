import { UpdateInput, UserDto, UsersService } from "./users.service";
import { PermissionsService } from "../permissions/permissions.service";
import { Request } from "express";
import JwtDecoder from "../auth/jwt.decoder";
export declare class UsersController {
    private service;
    private permissions;
    private jwt;
    constructor(service: UsersService, permissions: PermissionsService, jwt: JwtDecoder);
    userPermissions(req: Request): Promise<import("../permissions/permissions.service").Permission[]>;
    getUserName(req: Request): Promise<{
        user_name: string;
    }>;
    getAllUsers(): Promise<({
        user_has_role: {
            roles: {
                role_name: string;
            };
        }[];
    } & {
        user_id: number;
        user_name: string;
        user_email: string;
        user_password: string;
    })[]>;
    updateUser(updateInput: UpdateInput): Promise<{
        user_id: number;
        user_name: string;
        user_email: string;
        user_password: string;
    }>;
    deleteUser(deleteUser: UserDto): Promise<{
        Massage: string;
        errorMassage?: undefined;
    } | {
        errorMassage: string;
        Massage?: undefined;
    }>;
}
