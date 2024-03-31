import {Body, Controller, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AssignPermissionDto, Permission, PermissionsService} from "./permissions.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";
import {UserDto} from "../users/users.service";

@Controller('permissions')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RequiredPermission({permissionName: 'All'})
export class PermissionsController {
    constructor(private readonly service: PermissionsService,) { }

    @Post()
    createNewPermission(@Body() newPermission: Permission){
        return this.service .createPermission(newPermission);
    }

    @Get('/:id')
    getPermissionsByUser(@Param() userId: UserDto){
        return this.service.getPermissionsByUser(userId);
    }

    @Get()
    listPermissions(){
        return this.service.getAllPermissions();
    }

    @Patch()
    givePermission(@Body() assignInput: AssignPermissionDto){
        return this.service.givePermission(assignInput);
    }
}
