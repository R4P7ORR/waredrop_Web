import {Injectable, NotFoundException,} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {CreateUserDto, UsersService} from "../users/users.service";

export class AuthPayloadDto{
    email: string;
    password: string;
}
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
                private usersService: UsersService) { }

    async validateUser(input: AuthPayloadDto){
        const user = await this.usersService.findUser(input.email);
        if(user && await bcrypt.compare(input.password, user.user_password)) {
            const payload = {
                sub: {
                    id: user.user_id
                },
                email: user.user_email
            }
            return {
                accessToken: this.jwtService.sign(payload)
            }
        } else {
            throw new NotFoundException
        }
    }

    async register(newUser: CreateUserDto){
        const user = await this.usersService.findUser(newUser.email)
        if(!user){
            const result = await this.usersService.createUser(newUser);
            return result;
        }
        else {
            return {errorMessage: 'User already exist'}
        }
    }
}
