import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {Request} from "express";
import JwtDecoder from "../auth/jwt.decoder";
import {
    AddWarehouseDto,
    WarehouseCreateInput,
    WarehouseDto,
    WarehousesService,
    WarehouseUpdateInput
} from "./warehouses.service";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";

@Controller('warehouses')
export class WarehousesController {
    constructor(private readonly jwt: JwtDecoder,
                private readonly service: WarehousesService,
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    addNew(@Body() createInput: WarehouseCreateInput){
        return this.service.addWarehouse(createInput);
    }
    @Get()
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    getWarehouses(){
        return this.service.getWarehouses();
    }

    @Get('/warehouse/:id')
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    getWarehouseById(@Param('id') id: string){
        const warehouseInput = {warehouseId: parseInt(id)}
        return this.service.getWarehouseById(warehouseInput);
    }

    @Get('/user')
    @UseGuards(JwtAuthGuard)
    getWarehousesByUser(@Req() req: Request){
        const decodedJwt = this.jwt.decodeToken(req);
        return this.service.getWarehousesByUser({userId: decodedJwt.sub.id, userEmail: decodedJwt.sub.email});
    }

    @Get('/items/:id')
    getItemsInWarehouse(@Param('id') warehouseString: string){
        const warehouseId: WarehouseDto = {warehouseId: parseInt(warehouseString)};
        return this.service.getItemsInWarehouse(warehouseId);
    }

    @Patch()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    updateWarehouse(@Body() warehouseDto: WarehouseUpdateInput){
        return this.service.updateWarehouse(warehouseDto);
    }

    @Patch('/assignUser')
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    addToUser(@Body() addInput: AddWarehouseDto){
        return this.service.addWarehouseToUser(addInput);
    }

    @Delete()
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    deleteWarehouse(@Body() deleteInput: WarehouseDto){
        return this.service.deleteWarehouse(deleteInput);
    }

}
