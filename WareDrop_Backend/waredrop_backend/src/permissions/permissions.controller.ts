import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {PermissionsService} from "./permissions.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {Request} from "express";
import JwtDecoder from "../auth/jwt.decoder";

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly service: PermissionsService, private readonly jwt: JwtDecoder) {
    }

    @Get('/user')
    @UseGuards(JwtAuthGuard)
    async getPermissionsByUser(@Req() req : Request){
        const user = this.jwt.decodeToken(req);
        return this.service.getPermissionsByUser(user.sub.id)
    }
}
