import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {CreateItemDto, ItemsService} from "./items.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";

@Controller('items')
export class ItemsController {
    constructor( private readonly service: ItemsService,) {
    }

    @Post()
    async addItem(@Body() newItem: CreateItemDto){
        return this.service.addItem(newItem);
    }

    @Get()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission({permissionName: 'All'})
    async getItems(){
        return this.service.getItems();
    }
}
