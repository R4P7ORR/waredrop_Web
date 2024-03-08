import {Injectable, NotFoundException,} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {CreateUserDto, UsersService} from "../users/users.service";
import {RolesService} from "../roles/roles.service";

export class AuthPayloadDto{
    email: string;
    password: string;
}
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
                private usersService: UsersService,
                private rolesService: RolesService,
    ) { }

    async validateUser(input: AuthPayloadDto){
        const user = await this.usersService.findUser(input.email);
        if(user && await bcrypt.compare(input.password, user.user_password)) {
            const payload = {
                sub: {
                    id: user.user_id,
                    email: user.user_email,
                    userRoles: await this.rolesService.getUserRoles({userId: user.user_id})
                },
            }
            return {
                accessToken: this.jwtService.sign(payload),
            }
        } else {
            throw new NotFoundException
        }
    }

    async register(newUser: CreateUserDto){
        const user = await this.usersService.findUser(newUser.email)
        if(user){
            return {errorMessage: 'User already exist'}
        }
        else {
            const result = await this.usersService.createUser(newUser);
            return result;
        }
    }
}
