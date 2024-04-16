import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import { AuthService,} from "./auth.service";
import {LocalGuard} from "./guards/local.guard";
import {Request} from "express";
import {JwtAuthGuard} from "./guards/jwt.guard";
import {CreateUserDto} from "../users/users.service";
import JwtDecoder from "./jwt.decoder";

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService, private readonly jwt: JwtDecoder) { }

    @Post('login')
    @UseGuards(LocalGuard)
    validate (@Req() req: Request){
        return req.user;
    }

    @Post('register')
    register(@Body() newUser: CreateUserDto){
        return this.service.register(newUser);
    }

    @Post('registerWorker')
    registerWorker(@Body() newUser: CreateUserDto){
        return this.service.registerWorker(newUser);
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req : Request){
        return req.user;
    }

    @Get('isAdmin')
    @UseGuards(JwtAuthGuard)
    isAdmin(@Req() req : Request){
        const user_token = this.jwt.decodeToken(req);
        return this.service.isAdmin(user_token.sub.userPermissions);
    }

    @Get('isWorker')
    @UseGuards(JwtAuthGuard)
    isWorker(@Req() req : Request){
        const user_token = this.jwt.decodeToken(req);
        return this.service.isWorker(user_token.sub.userPermissions);
    }
}
