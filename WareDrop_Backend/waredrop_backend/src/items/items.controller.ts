import {Body, Controller, Delete, Get, Param, Post, Req} from '@nestjs/common';
import {Item, ItemsService} from "./items.service";
import JwtDecoder from "../auth/jwt.decoder";
import {Request} from "express";

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

    @Get('/userItem')
    async getUserItem(@Req() req: Request){
        const user = this.jwt.decodeToken(req);
        return this.service.getUserItem(user.sub.id);
    }

    @Delete('/delete')
    async delete(@Body() item_id: number){
        return this.service.deleteItem(item_id);
    }
}
