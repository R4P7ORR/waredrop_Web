import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {Item, ItemsService} from "./items.service";

@Controller('items')
export class ItemsController {
    constructor( private readonly service: ItemsService) {
    }

    @Post('/newItem')
    async addItem(@Body() newItem: Item){
        return this.service.addItem(newItem);
    }

    @Get()
    async getItems(){
        return this.service.getItems();
    }

    @Get('/userItem')
    async getUserItem(@Param('id') item_id: number){
        return this.service.getUserItem(item_id);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') item_id: number){
        return this.service.deleteItem(item_id);
    }
}
