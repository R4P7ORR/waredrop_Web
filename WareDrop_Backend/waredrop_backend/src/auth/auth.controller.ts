import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import { AuthService,} from "./auth.service";
import {LocalGuard} from "./guards/local.guard";
import {Request} from "express";
import {JwtAuthGuard} from "./guards/jwt.guard";
import {CreateUserDto} from "../users/users.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) { }

    @Post('login')
    @UseGuards(LocalGuard)
    validate (@Req() req: Request){
        return req.user;
    }

    @Post('register')
    register(@Body() newUser: CreateUserDto){
        return this.service.register(newUser);
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req : Request){
        return req.user;
    }
}
