import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {Request} from "express";
import JwtDecoder from "../auth/jwt.decoder";
import {Warehouse, WarehousesService} from "./warehouses.service";

@Controller('warehouses')
export class WarehousesController {
    constructor(private readonly jwt: JwtDecoder, private readonly service: WarehousesService) {
    }

    @Post('/addNew')
    addNew(@Body() createInput: Warehouse){
        return this.service.addWarehouse(createInput);
    }

    @Post('/addToUser')
    async addToUser(@Body() {user_id, warehouse_name}:{user_id: number, warehouse_name: string}){
        return this.service.addWarehouseToUser(user_id, warehouse_name);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async userPermissions(@Req() req: Request){
        const decodedJwt = this.jwt.decodeToken(req);
        return this.service.getWarehouses(decodedJwt.sub.id);
    }
}
