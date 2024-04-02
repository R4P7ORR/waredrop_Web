import { PrismaService } from "../database/prisma.service";
import { Prisma } from "@prisma/client";
import { UpdateInput } from "./users.controller";
export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}
export interface UserDto {
    userId: number;
}
export declare class UsersService {
    private db;
    constructor(db: PrismaService);
    createUser(createInput: CreateUserDto): Promise<{
        user_id: number;
        user_name: string;
        user_email: string;
        user_password: string;
    }>;
    listUsers(): Promise<{
        user_id: number;
        user_name: string;
        user_email: string;
        user_password: string;
    }[]>;
    findUser(email: string): Promise<{
        user_id: number;
        user_name: string;
        user_email: string;
        user_password: string;
    }>;
    updateUser(updateInput: UpdateInput): Promise<{
        user_id: number;
        user_name: string;
        user_email: string;
        user_password: string;
    }>;
    deleteUser(deleteInput: Prisma.usersWhereUniqueInput): Promise<{
        user_id: number;
        user_name: string;
        user_email: string;
        user_password: string;
    }>;
    getUserName(user_id: number): Promise<{
        user_name: string;
    }>;
}
