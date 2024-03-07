import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, UsersService } from "../users/users.service";
export declare class AuthPayloadDto {
    email: string;
    password: string;
}
export declare class AuthService {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    validateUser(input: AuthPayloadDto): Promise<{
        accessToken: string;
    }>;
    register(newUser: CreateUserDto): Promise<{
        user_id: number;
        user_name: string;
        user_email: string;
        user_password: string;
    } | {
        errorMessage: string;
    }>;
}
