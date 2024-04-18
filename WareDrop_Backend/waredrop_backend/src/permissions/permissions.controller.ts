import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AssignPermissionDto, Permission, PermissionDto, PermissionsService} from "./permissions.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation, ApiParam,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";

@ApiTags('Permissions')
@Controller('permissions')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class PermissionsController {
    constructor(private readonly service: PermissionsService,) { }

    @ApiOperation({summary: 'Create permission (Admin)', description: 'Creates a new permission in the database'})
    @ApiOkResponse({description: 'Permission created'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Post()
    @RequiredPermission([{permissionName: 'All'}])
    createNewPermission(@Body() newPermission: Permission){
        return this.service.createPermission(newPermission);
    }

    @ApiOperation({summary: 'User permission (Admin)', description: `Returns a user's permission(s)`})
    @ApiOkResponse({description: 'Returned the permission(s)'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiParam({description: 'Id of a user', type: 'string', name: 'id'})
    @ApiBearerAuth()
    @Get('/:id')
    @RequiredPermission([{permissionName: 'All'}])
    getPermissionsByUser(@Param() userIdString: string){
        const userId: number = parseInt(userIdString);
        return this.service.getPermissionsByUser({userId: userId});
    }

    @ApiOperation({summary: 'All permissions (Admin)', description: 'Returns all permissions'})
    @ApiOkResponse({description: 'Returned all permission(s)'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Get()
    @RequiredPermission([{permissionName: 'All'}])
    listPermissions(){
        return this.service.getAllPermissions();
    }

    @ApiOperation({summary: 'Give permission (Admin)', description: 'Assigns a permission to a role'})
    @ApiOkResponse({description: 'Permission assigned'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Patch()
    @RequiredPermission([{permissionName: 'All'}])
    givePermission(@Body() assignInput: AssignPermissionDto){
        return this.service.givePermission(assignInput);
    }

    @ApiOperation({summary: 'Revoke permission (Admin)', description: 'Revoke a permission from a role'})
    @ApiOkResponse({description: 'Permission revoked'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Patch('/remove')
    @RequiredPermission([{permissionName: 'All'}])
    removePermission(@Body() removeInput: AssignPermissionDto){
        return this.service.removePermission(removeInput);
    }

    @ApiOperation({summary: 'Delete permission (Admin)', description: 'Deletes a permission from the database'})
    @ApiOkResponse({description: 'Permission deleted'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Delete()
    @RequiredPermission([{permissionName: 'All'}])
    deletePermission(@Body() deletePermission: PermissionDto){
        return this.service.deletePermission(deletePermission);
    }
}
