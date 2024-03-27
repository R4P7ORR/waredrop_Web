import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {Permission, PermissionsService} from "./permissions.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {Request} from "express";
import JwtDecoder from "../auth/jwt.decoder";

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly service: PermissionsService, private readonly jwt: JwtDecoder) {
    }

    @Post('newPermission')
    async createNewPermission(@Body() newPermission: Permission){
        return this.service .createPermission(newPermission);
    }

    @Get('/user')
    @UseGuards(JwtAuthGuard)
    async getPermissionsByUser(@Req() req : Request){
        const user = this.jwt.decodeToken(req);
        return this.service.getPermissionsByUser(user.sub.id)
    }

    @Post('/giveToRole')
    async givePermission(@Body() {role_id, permission_id}:{role_id: number, permission_id: number}){
        return this.service.givePermission(role_id, permission_id);
    }
}
