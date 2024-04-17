import {Body, Controller, Delete, Get, Param, Patch, Req, UseGuards,} from "@nestjs/common";
import {UserUpdateInput, UserDto, UsersService} from "./users.service";
import {PermissionsService} from "../permissions/permissions.service";
import {Request} from "express";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import JwtDecoder from "../auth/jwt.decoder";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Users')
@Controller('/user')
export class UsersController {
    constructor(private service: UsersService,
                private permissions: PermissionsService,
                private jwt: JwtDecoder,
    ) {}
    @Get()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    getAllUsers(@Req() req :Request){
        const user = this.jwt.decodeToken(req);
        return this.service.listUsers({userId: user.sub.id, userEmail: user.sub.email});
    }

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

    @Get('/byId/:id')
    getUserById(@Param('id') idParam: string){
        const id = parseInt(idParam);
        return this.service.findUserById(id);
    }

    @Patch()
    updateUser(@Body() updateInput: UserUpdateInput){
        return this.service.updateUser(updateInput);
    }

    @Delete()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    deleteUser(@Body() deleteUser: UserDto){
        return this.service.deleteUser(deleteUser);
    }
}