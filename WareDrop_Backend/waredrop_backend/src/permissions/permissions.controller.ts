import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AssignPermissionDto, Permission, PermissionDto, PermissionsService} from "./permissions.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";
import {UserDto} from "../users/users.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Permissions')
@Controller('permissions')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class PermissionsController {
    constructor(private readonly service: PermissionsService,) { }

    @Post()
    @RequiredPermission([{permissionName: 'All'}])
    createNewPermission(@Body() newPermission: Permission){
        return this.service.createPermission(newPermission);
    }

    @Get('/:id')
    @RequiredPermission([{permissionName: 'All'}])
    getPermissionsByUser(@Param() userId: UserDto){
        return this.service.getPermissionsByUser(userId);
    }

    @Get()
    @RequiredPermission([{permissionName: 'All'}])
    listPermissions(){
        return this.service.getAllPermissions();
    }

    @Patch()
    @RequiredPermission([{permissionName: 'All'}])
    givePermission(@Body() assignInput: AssignPermissionDto){
        return this.service.givePermission(assignInput);
    }

    @Patch('/remove')
    @RequiredPermission([{permissionName: 'All'}])
    removePermission(@Body() removeInput: AssignPermissionDto){
        return this.service.removePermission(removeInput);
    }

    @Delete()
    @RequiredPermission([{permissionName: 'All'}])
    deletePermission(@Body() deletePermission: PermissionDto){
        return this.service.deletePermission(deletePermission);
    }
}
