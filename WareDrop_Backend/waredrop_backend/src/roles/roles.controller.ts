import {Body, Controller, Get, Post} from '@nestjs/common';
import {AddPermissionInput, AddRoleInput, Role, RolesService} from "./roles.service";
import {Prisma} from "@prisma/client";



@Controller('roles')
export class RolesController {
    constructor(private service: RolesService) {
    }

    @Post('/createRole')
    createRole(@Body() newRole: Role){
        return this.service.createRole(newRole);
    }

    @Post('/userRole')
    getRole(@Body() user: number){
        return this.service.getUserRoles(user);
    }

    @Post('/addRoleToUser')
    addRole(@Body() input: AddRoleInput){
        return this.service.addRoleToUser(input);
    }

    @Post('/addPermission')
    addPermission(@Body() input: AddPermissionInput){
        return this.service.addPermissionToRole(input);
    }

    @Get('/list')
    getRoles(){
        return this.service.listRoles();
    }
}
