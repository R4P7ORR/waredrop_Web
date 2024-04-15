import {Body, Controller, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {WorkerUpdateInput, Transaction, TransactionsService} from "./transactions.service";
import JwtDecoder from "../auth/jwt.decoder";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {Request} from "express";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";
import {WarehouseDto} from "../warehouses/warehouses.service";

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly service: TransactionsService,
                private readonly jwt: JwtDecoder,
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    addTrans(@Body() newTrans: Transaction){
        return this.service.createTrans(newTrans);
    }

    @Get()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    getAllTrans(){
        return this.service.getAllTrans();
    }

    @Get('/warehouse/:id')
    @UseGuards(JwtAuthGuard)
    getTransOfWarehouse(@Param('id') warehouseIdString: string){
        const warehouse: WarehouseDto = {warehouseId: parseInt(warehouseIdString)}
        return this.service.getTransOfWarehouse(warehouse);
    }

    @Get('/available')
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'Transactions'}, {permissionName: 'All'}])
    getAvailable(){
        return this.service.getAvailableTrans();
    }

    @Get('/worker')
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'Transactions'}, {permissionName: 'All'}])
    getAllTransByWorker(@Req() req : Request){
        const user = this.jwt.decodeToken(req);
        return this.service.getAllTransByWorker({userId: user.sub.id, userEmail: user.sub.email});
    }

    @Get('/doneBy')
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'Transactions'}, {permissionName: 'All'}])
    getTransDoneByWorker(@Req() req : Request){
        const user = this.jwt.decodeToken(req);
        return this.service.getTransDone({userId: user.sub.id, userEmail: user.sub.email});
    }

    @Patch()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'Transactions'}, {permissionName: 'All'}])
    updateTrans(@Body() updateInput: WorkerUpdateInput){
        return this.service.updateTrans(updateInput)
    }

    @Patch('/assignWorker')
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'Transactions'}, {permissionName: 'All'}])
    addWorker(@Req() token: Request, @Body() transId: WorkerUpdateInput){
        const user = this.jwt.decodeToken(token);
        return this.service.addWorkerToTrans(transId, user.sub.email);
    }
}
