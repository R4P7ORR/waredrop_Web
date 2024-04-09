import {Body, Controller, Delete, Get, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {AddRoleInput, Role, RoleDto, RolesService} from "./roles.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";
import {Request} from "express";
import JwtDecoder from "../auth/jwt.decoder";

@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RequiredPermission([{permissionName: 'All'}])
export class RolesController {
    constructor(private service: RolesService, private jwt: JwtDecoder) { }

    @Post()
    createRole(@Body() newRole: Role){
        return this.service.createRole(newRole);
    }

    @Get('/user')
    getRole(@Req() req: Request){
        const user = this.jwt.decodeToken(req);
        return this.service.getUserRoles(user.sub.id);
    }

    @Get()
    getRoles(){
        return this.service.listRoles();
    }

    @Patch()
    addRole(@Body() addRoleInput: AddRoleInput){
        return this.service.addRoleToUser(addRoleInput);
    }

    @Patch('remove')
    removeRole(@Body() removeInput: AddRoleInput){
        return this.service.removeRole(removeInput);
    }

    @Delete()
    deleteRole(@Body() deleteRole: RoleDto){
        return this.service.deleteRole(deleteRole)
    }
}
