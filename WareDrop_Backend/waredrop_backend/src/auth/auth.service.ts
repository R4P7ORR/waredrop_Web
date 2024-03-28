import {Injectable, } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {CreateUserDto, UsersService} from "../users/users.service";
import {Permission, PermissionsService} from "../permissions/permissions.service";

export class AuthPayloadDto{
    email: string;
    password: string;
}

export interface TokenData{
    sub: {
        id: number,
        email: string,
        userPermissions: Permission[],
    }
}
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
                private usersService: UsersService,
                private permissionService: PermissionsService,
    ) { }

    async validateUser(input: AuthPayloadDto){
        const user = await this.usersService.findUser(input.email);
        if(user && await bcrypt.compare(input.password, user.user_password)) {
            const payload :TokenData = {
                sub: {
                    id: user.user_id,
                    email: user.user_email,
                    userPermissions: await this.permissionService.getPermissionsByUser(user.user_id)
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

    async isAdmin(user_permissions: string[]){
        for (const permission of user_permissions) {
            if (permission === 'All'){
                return true;
            }
        }
        return false;
    }
}
