import { Prisma } from "@prisma/client";
import { UsersService } from "./users.service";
import { RolesService } from "../roles/roles.service";
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
    private roles;
    constructor(users: UsersService, roles: RolesService);
    userRole(user: Prisma.usersWhereUniqueInput): Promise<{
        roles: {
            role_name: string;
        };
    }[]>;
    updateUser(updateInput: UpdateInput): Promise<void>;
    deleteUser(deleteUser: Prisma.usersWhereUniqueInput): Promise<{
        user_id: number;
        user_name: string;
        user_email: string;
        user_password: string;
    }>;
}
