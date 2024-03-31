import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AddRoleInput, Role, RoleDto, RolesService} from "./roles.service";
import {UserDto} from "../users/users.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";

@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RequiredPermission({permissionName: 'All'})
export class RolesController {
    constructor(private service: RolesService) { }

    @Post()
    createRole(@Body() newRole: Role){
        return this.service.createRole(newRole);
    }

    @Get('/:id')
    getRole(@Param('id') userId: UserDto){
        return this.service.getUserRoles(userId);
    }

    @Get()
    getRoles(){
        return this.service.listRoles();
    }

    @Patch()
    addRole(@Body() addRoleInput: AddRoleInput){
        return this.service.addRoleToUser(addRoleInput);
    }

    @Delete()
    deleteRole(@Body() deleteRole: RoleDto){
        return this.service.deleteRole(deleteRole)
    }
}
