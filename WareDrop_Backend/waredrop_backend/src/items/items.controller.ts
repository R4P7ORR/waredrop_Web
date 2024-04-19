import {Body, Controller, Delete, Get, Patch, Post, UseGuards} from '@nestjs/common';
import {CreateItemDto, ItemDto, ItemsService, UpdateItemDto} from "./items.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiCreatedResponse, ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";

@ApiTags('Items')
@Controller('items')
export class ItemsController {
    constructor( private readonly service: ItemsService,) {
    }

    @ApiOperation({summary: 'New item', description: 'Creates a new item in the database, and assigns it to a warehouse'})
    @ApiCreatedResponse({description: 'New item created'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @Post()
    addItem(@Body() newItem: CreateItemDto){
        return this.service.addItem(newItem);
    }

    @ApiOperation({summary: 'All items (Admin)', description: 'Returns all items from the database'})
    @ApiOkResponse({description: 'Returned all items'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Get()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    getItems(){
        return this.service.getItems();
    }

    @ApiOperation({summary: 'Item quantity update', description: 'Updates an items quantity'})
    @ApiOkResponse({description: 'Updated the item'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @Patch()
    updateItem(@Body() updateInput: UpdateItemDto){
        return this.service.updateItem(updateInput);
    }

    @ApiOperation({summary: 'Delete item', description: 'Sets the items isActive status to false, so it will be logical deleted'})
    @ApiOkResponse({description: 'Item logically deleted'})
    @ApiUnauthorizedResponse({description: 'The token expired'})
    @ApiBearerAuth()
    @Delete()
    @UseGuards(JwtAuthGuard)
    deleteItem(@Body() item: ItemDto) {
        return this.service.deleteItem(item);
    }
}
