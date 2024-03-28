import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AddRoleInput, Role, RoleDto, RolesService} from "./roles.service";
import {UserDto} from "../users/users.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";



@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RequiredPermission({permission_name: 'All'})
export class RolesController {
    constructor(private service: RolesService) { }

    @Post('/new')
    createRole(@Body() newRole: Role){
        return this.service.createRole(newRole);
    }

    @Get('/user/:id')
    getRole(@Param('id') userId: UserDto){
        return this.service.getUserRoles(userId);
    }

    @Get('/list')
    getRoles(){
        return this.service.listRoles();
    }

    @Patch('/addToUser')
    addRole(@Body() addRoleInput: AddRoleInput){
        return this.service.addRoleToUser(addRoleInput);
    }

    @Delete('/delete')
    deleteRole(@Body() deleteRole: RoleDto){
        return this.service.deleteRole(deleteRole)
    }
}
