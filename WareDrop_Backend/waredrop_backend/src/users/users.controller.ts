import {Body, Controller, Delete, Get, Patch, Req, UseGuards,} from "@nestjs/common";
import {UpdateInput, UserDto, UsersService} from "./users.service";
import {PermissionsService} from "../permissions/permissions.service";
import {Request} from "express";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import JwtDecoder from "../auth/jwt.decoder";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";

@Controller('/user')
export class UsersController {
    constructor(private service: UsersService,
                private permissions: PermissionsService,
                private jwt: JwtDecoder,
    ) {}

    @Get('/permissions')
    @UseGuards(JwtAuthGuard)
    userPermissions(@Req() req: Request){
        const decodedJwt = this.jwt.decodeToken(req);
        return this.permissions.getPermissionsByUser(decodedJwt.sub.id);
    }

    @Get('/userName')
    @UseGuards(JwtAuthGuard)
    getUserName(@Req() req: Request){
        const decodedJwt = this.jwt.decodeToken(req);
        return this.service.getUserName({ userId: decodedJwt.sub.id, userEmail: decodedJwt.sub.email});
    }

    @Get()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    getAllUsers(){
        return this.service.listUsers();
    }

    @Patch()
    updateUser(@Body() updateInput: UpdateInput){
        return this.service.updateUser(updateInput);
    }

    @Delete()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    deleteUser(@Body() deleteUser: UserDto){
        return this.service.deleteUser(deleteUser);
    }
}