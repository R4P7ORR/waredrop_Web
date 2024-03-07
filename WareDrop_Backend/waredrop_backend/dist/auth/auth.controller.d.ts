/// <reference types="passport" />
import { AuthService } from "./auth.service";
import { Request } from "express";
import { CreateUserDto } from "../users/users.service";
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    validate(req: Request): Express.User;
    register(newUser: CreateUserDto): Promise<{
        user_id: number;
        user_name: string;
        user_email: string;
        user_password: string;
    } | {
        errorMessage: string;
    }>;
    status(req: Request): Express.User;
}
