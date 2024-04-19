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
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation, ApiParam,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";

@ApiTags('Warehouses')
@Controller('warehouses')
export class WarehousesController {
    constructor(private readonly jwt: JwtDecoder,
                private readonly service: WarehousesService,
    ) { }

    @ApiOperation({summary: 'New warehouse (Admin)', description: 'Creates a new warehouse'})
    @ApiOkResponse({description: 'Warehouse created'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Post()
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    addNew(@Body() createInput: WarehouseCreateInput){
        return this.service.addWarehouse(createInput);
    }
    @ApiOperation({summary: 'Active warehouse (Admin)', description: 'Lists all active warehouses'})
    @ApiOkResponse({description: 'Lists warehouses'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Get()
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    getWarehouses(){
        return this.service.getWarehouses();
    }

    @ApiOperation({summary: 'All warehouse (Admin)', description: 'Lists all warehouses'})
    @ApiOkResponse({description: 'Lists warehouses'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Get('/all')
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    getAllWarehouses(){
        return this.service.getAllWarehouses();
    }

    @ApiOperation({summary: 'Warehouse by id (Admin | Worker)', description: 'Return the data of a warehouse'})
    @ApiOkResponse({description: 'returns data'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin oor worker'})
    @ApiParam({name: 'id', description: 'warehouseId', type: 'string'})
    @ApiBearerAuth()
    @Get('/warehouse/:id')
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}, {permissionName: 'Transactions'}])
    getWarehouseById(@Param('id') id: string){
        const warehouseInput = {warehouseId: parseInt(id)}
        return this.service.getWarehouseById(warehouseInput);
    }

    @ApiOperation({summary: 'Warehouse by user', description: 'Lists warehouses assigned to a user'})
    @ApiOkResponse({description: 'Lists warehouses'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiBearerAuth()
    @Get('/user')
    @UseGuards(JwtAuthGuard)
    getWarehousesByUser(@Req() req: Request){
        const decodedJwt = this.jwt.decodeToken(req);
        return this.service.getWarehousesByUser({userId: decodedJwt.sub.id, userEmail: decodedJwt.sub.email});
    }

    @ApiOperation({summary: 'Warehouse items', description: 'Lists items of a warehouse'})
    @ApiOkResponse({description: 'Lists items'})
    @ApiParam({name: 'id', description: 'warehouseId', type: 'string'})
    @Get('/items/:id')
    getItemsInWarehouse(@Param('id') warehouseString: string){
        const warehouseId: WarehouseDto = {warehouseId: parseInt(warehouseString)};
        return this.service.getItemsInWarehouse(warehouseId);
    }

    @ApiOperation({summary: 'Warehouse moving items', description: 'Lists items of a warehouse which are in an active transaction'})
    @ApiOkResponse({description: 'Lists items'})
    @ApiParam({name: 'id', description: 'warehouseId', type: 'string'})
    @Get('/movingItems/:id')
    getMovingItemsInWarehouse(@Param('id') warehouseString: string){
        const warehouseId: WarehouseDto = {warehouseId: parseInt(warehouseString)};
        return this.service.getMovingItemsInWarehouse(warehouseId);
    }

    @ApiOperation({summary: 'Update warehouse (Admin)', description: `Updates a warehouse's data`})
    @ApiOkResponse({description: 'Warehouse updated'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Patch()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    updateWarehouse(@Body() warehouseDto: WarehouseUpdateInput){
        return this.service.updateWarehouse(warehouseDto);
    }

    @ApiOperation({summary: 'Assign warehouse (Admin)', description: `Assigns a warehouse to a user`})
    @ApiOkResponse({description: 'Warehouse assigned'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Patch('/assignUser')
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    addToUser(@Body() addInput: AddWarehouseDto){
        return this.service.addWarehouseToUser(addInput);
    }

    @ApiOperation({summary: 'Delete warehouse (Admin)', description: `Sets a warehouse to inactive`})
    @ApiOkResponse({description: 'Warehouse deleted logically'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Delete()
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    deleteWarehouse(@Body() deleteInput: WarehouseDto){
        return this.service.deleteWarehouse(deleteInput);
    }

}
