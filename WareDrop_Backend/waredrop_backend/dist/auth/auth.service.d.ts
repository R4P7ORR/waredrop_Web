import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, UsersService } from "../users/users.service";
import { Permission, PermissionsService } from "../permissions/permissions.service";
export declare class AuthPayloadDto {
    email: string;
    password: string;
}
export interface TokenData {
    sub: {
        id: number;
        email: string;
        userPermissions: Permission[];
    };
}
export declare class AuthService {
    private jwtService;
    private usersService;
    private permissionService;
    constructor(jwtService: JwtService, usersService: UsersService, permissionService: PermissionsService);
    validateUser(input: AuthPayloadDto): Promise<{
        accessToken: string;
        errorMessage?: undefined;
    } | {
        errorMessage: string;
        accessToken?: undefined;
    }>;
    register(newUser: CreateUserDto): Promise<{
        errorMessage: string;
        message?: undefined;
    } | {
        message: string;
        errorMessage?: undefined;
    }>;
    isAdmin(user_permissions: string[]): Promise<boolean>;
}
