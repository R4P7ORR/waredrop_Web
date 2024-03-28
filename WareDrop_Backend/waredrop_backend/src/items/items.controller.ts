import {Body, Controller, Delete, Get, Post, UseGuards} from '@nestjs/common';
import {CreateItemDto, ItemDto, ItemsService} from "./items.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";

@Controller('items')
export class ItemsController {
    constructor( private readonly service: ItemsService,) {
    }

    @Post('/new')
    async addItem(@Body() newItem: CreateItemDto){
        return this.service.addItem(newItem);
    }

    @Get()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission({permission_name: 'All'})
    async getItems(){
        return this.service.getItems();
    }

    @Delete('/delete')
    async delete(@Body() deleteItem: ItemDto){
        return this.service.deleteItem(deleteItem);
    }
}
