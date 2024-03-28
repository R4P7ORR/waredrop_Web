import {Body, Controller, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {Request} from "express";
import JwtDecoder from "../auth/jwt.decoder";
import {AddWarehouseDto, WarehouseCreateInput, WarehouseDto, WarehousesService} from "./warehouses.service";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";

@Controller('warehouses')
export class WarehousesController {
    constructor(private readonly jwt: JwtDecoder,
                private readonly service: WarehousesService,
    ) { }

    @Post('/new')
    addNew(@Body() createInput: WarehouseCreateInput){
        return this.service.addWarehouse(createInput);
    }
    @Get()
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @RequiredPermission({permission_name: 'All'})
    async getWarehouses(){
        return this.service.getWarehouses();
    }

    @Get('/user')
    @UseGuards(JwtAuthGuard)
    async getWarehousesByUser(@Req() req: Request){
        const decodedJwt = this.jwt.decodeToken(req);
        return this.service.getWarehousesByUser({userId: decodedJwt.sub.id, userEmail: decodedJwt.sub.email});
    }

    @Get('/items/:id')
    async getItemsInWarehouse(@Param('id') warehouseId: WarehouseDto){
        return this.service.getItemsInWarehouse(warehouseId);
    }
    @Patch('/assignUser')
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @RequiredPermission({permission_name: 'All'})
    async addToUser(@Body() addInput: AddWarehouseDto){
        return this.service.addWarehouseToUser(addInput);
    }
}
