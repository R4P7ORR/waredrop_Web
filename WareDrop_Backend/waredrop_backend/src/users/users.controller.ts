import {Body, Controller, Delete, Get, Post, Req, UseGuards,} from "@nestjs/common";
import {Prisma} from "@prisma/client";
import {UpdateInput, UserDto, UsersService} from "./users.service";
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
        return this.users.getUserName({ userId: decodedJwt.sub.id});
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

    @Delete('/delete')
    async deleteUser(@Body() deleteUser: UserDto){
        return this.users.deleteUser(deleteUser);
    }
}