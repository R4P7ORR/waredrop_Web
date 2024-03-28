import {Body, Controller, Get, Post, Req, UseGuards,} from "@nestjs/common";
import {Prisma} from "@prisma/client";
import {UpdateInput, UsersService} from "./users.service";
import {PermissionsService} from "../permissions/permissions.service";
import {Request} from "express";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import JwtDecoder from "../auth/jwt.decoder";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";

@Controller('/user')
export class UsersController {
    constructor(private users: UsersService,
                private permissions: PermissionsService,
                private jwt: JwtDecoder,
    ) {}


    @Get('/permissions')
    @UseGuards(JwtAuthGuard)
    async userPermissions(@Req() req: Request){
        const decodedJwt = this.jwt.decodeToken(req);
        return this.permissions.getPermissionsByUser(decodedJwt.sub.id);
    }

    @Get('/getUserName')
    @UseGuards(JwtAuthGuard)
    async getUserName(@Req() req: Request){
        const decodedJwt = this.jwt.decodeToken(req);
        return this.users.getUserName(decodedJwt.sub.id);
    }

    @Get('/listAll')
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission({permission_name: 'All'})
    async getAllUsers(){
        return this.users.listUsers();
    }

    @Post('/update')
    async updateUser(@Body() updateInput: UpdateInput){
        return this.users.updateUser(updateInput);
    }

    @Post('/delete')
    async deleteUser(@Body() deleteUser: Prisma.usersWhereUniqueInput){
        return this.users.deleteUser(deleteUser);
    }
}