import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {CreateItemDto, ItemsService} from "./items.service";

@Controller('items')
export class ItemsController {
    constructor( private readonly service: ItemsService,) {
    }

    @Post('/new')
    async addItem(@Body() newItem: CreateItemDto){
        return this.service.addItem(newItem);
    }

    @Get()
    async getItems(){
        return this.service.getItems();
    }

    @Delete('/delete')
    async delete(@Body() itemId: number){
        return this.service.deleteItem(itemId);
    }
}
