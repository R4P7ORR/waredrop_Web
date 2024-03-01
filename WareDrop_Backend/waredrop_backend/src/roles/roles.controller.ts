import {Body, Controller, Get, Post} from '@nestjs/common';
import {AddPermissionInput, AddRoleInput, RolesService} from "./roles.service";
import {Prisma} from "@prisma/client";



@Controller('roles')
export class RolesController {
    constructor(private service: RolesService) {
    }
    @Post('/userRole')
    getRole(@Body() user: Prisma.usersWhereUniqueInput){
        return this.service.getUserRole(user);
    }

    @Post('/addRole')
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
