import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {Item, ItemsService} from "./items.service";
import JwtDecoder from "../auth/jwt.decoder";

@Controller('items')
export class ItemsController {
    constructor( private readonly service: ItemsService, private readonly jwt: JwtDecoder) {
    }

    @Post('/newItem')
    async addItem(@Body() newItem: Item){
        return this.service.addItem(newItem);
    }

    @Get()
    async getItems(){
        return this.service.getItems();
    }

    @Post('/assignToWarehouse')
    async assignItemToWarehouse(@Body() {user_id, warehouse_name}:{user_id: number, warehouse_name: string}){
        return this.service.assignItemToWarehouse(user_id, warehouse_name)
    }

    @Delete('/delete')
    async delete(@Body() item_id: number){
        return this.service.deleteItem(item_id);
    }
}
