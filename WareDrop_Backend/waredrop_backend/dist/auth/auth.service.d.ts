import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, UsersService } from "../users/users.service";
import { Permission, PermissionsService } from "../permissions/permissions.service";
export declare class AuthPayloadDto {
    userEmail: string;
    userPassword: string;
}
export declare class TokenData {
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
    }>;
    register(newUser: CreateUserDto): Promise<{
        message: string;
    }>;
    registerWorker(newUser: CreateUserDto): Promise<{
        message: string;
    }>;
    isAdmin(user_permissions: Permission[]): Promise<{
        isAdmin: boolean;
    }>;
}
