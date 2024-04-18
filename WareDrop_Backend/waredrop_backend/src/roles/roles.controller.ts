import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AddRoleInput, Role, RoleDto, RolesService} from "./roles.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";

@ApiTags('Roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class RolesController {
    constructor(private service: RolesService) { }

    @ApiOperation({summary: 'Create role (Admin)', description: 'Creates a new role in the database'})
    @ApiOkResponse({description: 'Role created'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Post()
    @RequiredPermission([{permissionName: 'All'}])
    createRole(@Body() newRole: Role){
        return this.service.createRole(newRole);
    }

    @ApiOperation({summary: 'User role (Admin)', description: `Returns a user's role(s)`})
    @ApiOkResponse({description: 'Returned the role(s)'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Get('/:id')
    @RequiredPermission([{permissionName: 'All'}])
    getRole(@Param('id') inputId: string){
        const id = parseInt(inputId);
        return this.service.getUserRoles({userId: id});
    }

    @ApiOperation({summary: 'All roles (Admin)', description: 'Returns all roles and their assigned permissions'})
    @ApiOkResponse({description: 'Returned all role(s)'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Get()
    @RequiredPermission([{permissionName: 'All'}])
    getRoles(){
        return this.service.listRoles();
    }

    @ApiOperation({summary: 'Give role (Admin)', description: 'Assigns a role to a user'})
    @ApiOkResponse({description: 'Role assigned'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Patch()
    @RequiredPermission([{permissionName: 'All'}])
    addRole(@Body() addRoleInput: AddRoleInput){
        return this.service.addRoleToUser(addRoleInput);
    }

    @ApiOperation({summary: 'Revoke role (Admin)', description: 'Revoke a role from a user'})
    @ApiOkResponse({description: 'Role revoked'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Patch('remove')
    @RequiredPermission([{permissionName: 'All'}])
    removeRole(@Body() removeInput: AddRoleInput){
        return this.service.removeRole(removeInput);
    }

    @ApiOperation({summary: 'Delete role (Admin)', description: 'Deletes a role from the database'})
    @ApiOkResponse({description: 'Role deleted'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Delete()
    @RequiredPermission([{permissionName: 'All'}])
    deleteRole(@Body() deleteRole: RoleDto){
        return this.service.deleteRole(deleteRole)
    }
}
