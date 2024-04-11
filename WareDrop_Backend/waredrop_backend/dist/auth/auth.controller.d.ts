/// <reference types="passport" />
import { AuthService } from "./auth.service";
import { Request } from "express";
import { CreateUserDto } from "../users/users.service";
import JwtDecoder from "./jwt.decoder";
export declare class AuthController {
    private readonly service;
    private readonly jwt;
    constructor(service: AuthService, jwt: JwtDecoder);
    validate(req: Request): Express.User;
    register(newUser: CreateUserDto): Promise<{
        message: string;
    }>;
    registerWorker(newUser: CreateUserDto): Promise<{
        message: string;
    }>;
    status(req: Request): Express.User;
    isAdmin(req: Request): Promise<{
        isAdmin: boolean;
    }>;
}
