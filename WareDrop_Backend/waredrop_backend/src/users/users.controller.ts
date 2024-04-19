import {Body, Controller, Delete, Get, Param, Patch, Req, UseGuards,} from "@nestjs/common";
import {UserUpdateInput, UserDto, UsersService} from "./users.service";
import {PermissionsService} from "../permissions/permissions.service";
import {Request} from "express";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import JwtDecoder from "../auth/jwt.decoder";
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

@ApiTags('Users')
@Controller('/user')
export class UsersController {
    constructor(private service: UsersService,
                private permissions: PermissionsService,
                private jwt: JwtDecoder,
    ) {}

    @ApiOperation({summary: 'All users (Admin)', description: 'Returns all users in the database'})
    @ApiOkResponse({description: 'Returns the user(s)'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Get()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    getAllUsers(@Req() req :Request){
        const user = this.jwt.decodeToken(req);
        return this.service.listUsers({userId: user.sub.id, userEmail: user.sub.email});
    }

    @ApiOperation({summary: 'User permission', description: `Returns a user's permissions`})
    @ApiOkResponse({description: 'Returns the permission(s)'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiBearerAuth()
    @Get('/permissions')
    @UseGuards(JwtAuthGuard)
    userPermissions(@Req() req: Request){
        const decodedJwt = this.jwt.decodeToken(req);
        return this.permissions.getPermissionsByUser(decodedJwt.sub.id);
    }

    @ApiOperation({summary: 'User name', description: `Returns a user's name`})
    @ApiOkResponse({description: 'Returns the name'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiBearerAuth()
    @Get('/userName')
    @UseGuards(JwtAuthGuard)
    getUserName(@Req() req: Request){
        const decodedJwt = this.jwt.decodeToken(req);
        return this.service.getUserName({ userId: decodedJwt.sub.id, userEmail: decodedJwt.sub.email});
    }

    @ApiOperation({summary: 'User by id', description: `Returns a user's by it's userId`})
    @ApiOkResponse({description: 'Returns the user'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiParam({name: 'id', type: 'string', description: `A user's userId`})
    @ApiBearerAuth()
    @Get('/byId/:id')
    getUserById(@Param('id') idParam: string){
        const id = parseInt(idParam);
        return this.service.findUserById(id);
    }

    @ApiOperation({summary: 'Update user', description: `Updates a user's name and/or email`})
    @ApiOkResponse({description: 'Returns the permission(s)'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @Patch()
    updateUser(@Body() updateInput: UserUpdateInput){
        return this.service.updateUser(updateInput);
    }

    @ApiOperation({summary: 'Delete user (Admin)', description: 'Deletes a user from the database'})
    @ApiOkResponse({description: 'Deletes the user'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Delete()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    deleteUser(@Body() deleteUser: UserDto){
        return this.service.deleteUser(deleteUser);
    }
}