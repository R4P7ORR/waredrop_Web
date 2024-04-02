import { Prisma } from "@prisma/client";
import { UsersService } from "./users.service";
import { PermissionsService } from "../permissions/permissions.service";
import { Request } from "express";
import JwtDecoder from "../auth/jwt.decoder";
export interface UpdateInput {
    data: {
        user_name?: string;
        user_password?: string;
        user_email?: string;
    };
    where: number;
}
export declare class UsersController {
    private users;
    private permissions;
    private jwt;
    constructor(users: UsersService, permissions: PermissionsService, jwt: JwtDecoder);
    userPermissions(req: Request): Promise<import("../permissions/permissions.service").Permission[]>;
    getUserName(req: Request): Promise<{
        user_name: string;
    }>;
    getAllUsers(): Promise<{
        user_id: number;
        user_name: string;
        user_email: string;
        user_password: string;
    }[]>;
    updateUser(updateInput: UpdateInput): Promise<{
        user_id: number;
        user_name: string;
        user_email: string;
        user_password: string;
    }>;
    deleteUser(deleteUser: Prisma.usersWhereUniqueInput): Promise<{
        user_id: number;
        user_name: string;
        user_email: string;
        user_password: string;
    }>;
}
