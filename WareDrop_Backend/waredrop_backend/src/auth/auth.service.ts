import {Injectable, } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {CreateUserDto, UsersService} from "../users/users.service";
import {Permission, PermissionsService} from "../permissions/permissions.service";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class AuthPayloadDto{
    @IsEmail()
    @IsNotEmpty()
    userEmail: string;

    @IsString()
    @IsNotEmpty()
    userPassword: string;
}

export class TokenData {
    @IsNotEmpty()
    sub: {
        id: number
        email: string
        userPermissions: Permission[]
    }
}
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
                private usersService: UsersService,
                private permissionService: PermissionsService,
    ) { }

    async validateUser(input: AuthPayloadDto){
        const user = await this.usersService.findUser(input.userEmail);
        if(user && await bcrypt.compare(input.userPassword, user.user_password)) {
            const payload :TokenData = {
                sub: {
                    id: user.user_id,
                    email: user.user_email,
                    userPermissions: await this.permissionService
                        .getPermissionsByUser({userId: user.user_id, userEmail: user.user_email}),
                },
            }
            return {
                accessToken: this.jwtService.sign(payload),
            }
        } else {
            return {errorMessage: "User not found"}
        }
    }

    async register(newUser: CreateUserDto){
        const user = await this.usersService.findUser(newUser.userEmail)
        if(user){
            return {errorMessage: 'User already exist'}
        }
        else {
            const result = await this.usersService.createUser(newUser);
            if (result) {
                return {message: "User created"}
            }
        }
    }

    async registerWorker(newUser: CreateUserDto){
        const user = await this.usersService.findUser(newUser.userEmail)
        if(user){
            return {errorMessage: 'User already exist'}
        }
        else {
            const result = await this.usersService.createWorker(newUser);
            if (result) {
                return {message: "User created"}
            }
        }
    }

    async isAdmin(user_permissions: Permission[]){
        for (const permission of user_permissions) {
            if (permission.permissionName === 'All'){
                return true;
            }
        }
        return false;
    }
}
