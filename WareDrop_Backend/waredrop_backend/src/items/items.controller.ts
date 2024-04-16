import {Body, Controller, Delete, Get, Patch, Post, UseGuards} from '@nestjs/common';
import {CreateItemDto, ItemDto, ItemsService, UpdateItemDto} from "./items.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";

@Controller('items')
export class ItemsController {
    constructor( private readonly service: ItemsService,) {
    }

    @Post()
    addItem(@Body() newItem: CreateItemDto){
        return this.service.addItem(newItem);
    }

    @Get()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    getItems(){
        return this.service.getItems();
    }

    @Patch()
    updateItem(@Body() updateInput: UpdateItemDto){
        return this.service.updateItem(updateInput);
    }

    @Delete()
    deleteItem(@Body() item: ItemDto) {
        return this.service.deleteItem(item);
    }
}
