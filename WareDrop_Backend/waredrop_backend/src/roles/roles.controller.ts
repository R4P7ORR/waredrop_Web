import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {AddPermissionInput, AddRoleInput, Role, RoleDto, RolesService} from "./roles.service";
import {UserDto} from "../users/users.service";



@Controller('roles')
export class RolesController {
    constructor(private service: RolesService) {
    }

    @Post('/new')
    createRole(@Body() newRole: Role){
        return this.service.createRole(newRole);
    }

    @Post('/user')
    getRole(@Body() userId: UserDto){
        return this.service.getUserRoles(userId);
    }

    @Post('/addToUser')
    addRole(@Body() addRoleInput: AddRoleInput){
        return this.service.addRoleToUser(addRoleInput);
    }

    @Post('/addPermission')
    addPermission(@Body() addPermissionInput: AddPermissionInput){
        return this.service.addPermissionToRole(addPermissionInput);
    }

    @Get('/list')
    getRoles(){
        return this.service.listRoles();
    }

    @Delete('/delete')
    deleteRole(@Body() deleteRole: RoleDto){
        return this.service.deleteRole(deleteRole)
    }
}
