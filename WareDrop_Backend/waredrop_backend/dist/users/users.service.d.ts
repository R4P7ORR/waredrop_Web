import { PrismaService } from "../database/prisma.service";
export declare class CreateUserDto {
    userName: string;
    userEmail: string;
    userPassword: string;
}
export declare class UpdateInput {
    userId: number;
    userName?: string;
    userPassword?: string;
    userEmail?: string;
}
export declare class UserDto {
    userId: number;
    userEmail: string;
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
    deleteUser(deleteInput: UserDto): Promise<{
        Massage: string;
        errorMassage?: undefined;
    } | {
        errorMassage: string;
        Massage?: undefined;
    }>;
    getUserName(user: UserDto): Promise<{
        user_name: string;
    }>;
}
