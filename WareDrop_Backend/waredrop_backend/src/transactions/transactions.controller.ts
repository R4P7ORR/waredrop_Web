import {Body, Controller, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {WorkerUpdateInput, Transaction, TransactionsService} from "./transactions.service";
import JwtDecoder from "../auth/jwt.decoder";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {Request} from "express";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";
import {WarehouseDto} from "../warehouses/warehouses.service";
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly service: TransactionsService,
                private readonly jwt: JwtDecoder,
    ) { }

    @ApiOperation({summary: 'New transaction', description: 'Creates a new transaction'})
    @ApiOkResponse({description: 'Transaction created'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiBearerAuth()
    @Post()
    @UseGuards(JwtAuthGuard)
    addTrans(@Body() newTrans: Transaction){
        return this.service.createTrans(newTrans);
    }

    @ApiOperation({summary: 'All completed (Admin)', description: 'Returns all completed transaction'})
    @ApiOkResponse({description: 'Returns the transaction(s)'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Get()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    getAllCompletedTrans(){
        return this.service.getAllCompletedTrans();
    }

    @ApiOperation({summary: 'All active (Admin)', description: 'Returns all transaction which are in progress'})
    @ApiOkResponse({description: 'Returns the transaction(s)'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin'})
    @ApiBearerAuth()
    @Get('/active')
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'All'}])
    getAllActiveTrans(){
        return this.service.getAllActiveTrans();
    }

    @ApiOperation({summary: 'Of warehouse', description: 'Returns all transaction of a warehouse'})
    @ApiOkResponse({description: 'Returns the transaction(s)'})
    @Get('/warehouse/:id')
    getTransOfWarehouse(@Param('id') warehouseIdString: string){
        const warehouse: WarehouseDto = {warehouseId: parseInt(warehouseIdString)}
        return this.service.getTransOfWarehouse(warehouse);
    }

    @ApiOperation({summary: 'All available (Admin | Worker)', description: 'Returns all transaction which are not assigned to workers'})
    @ApiOkResponse({description: 'Returns the transaction(s)'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin or worker'})
    @ApiBearerAuth()
    @Get('/available')
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'Transactions'}, {permissionName: 'All'}])
    getAvailable(){
        return this.service.getAvailableTrans();
    }

    @ApiOperation({summary: 'Of worker (Admin | Worker)', description: 'Returns all transaction which are assigned to a specific worker'})
    @ApiOkResponse({description: 'Returns the transaction(s)'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin or worker'})
    @ApiBearerAuth()
    @Get('/worker')
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'Transactions'}, {permissionName: 'All'}])
    getAllTransByWorker(@Req() req : Request){
        const user = this.jwt.decodeToken(req);
        return this.service.getAllTransByWorker({userId: user.sub.id, userEmail: user.sub.email});
    }

    @ApiOperation({summary: 'Done by (Admin | Worker)', description: 'Returns all transaction which are done by a specific worker'})
    @ApiOkResponse({description: 'Returns the transaction(s)'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin or worker'})
    @ApiBearerAuth()
    @Get('/doneBy')
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'Transactions'}, {permissionName: 'All'}])
    getTransDoneByWorker(@Req() req : Request){
        const user = this.jwt.decodeToken(req);
        return this.service.getTransDone({userId: user.sub.id, userEmail: user.sub.email});
    }

    @ApiOperation({summary: 'Done (Admin | Worker)', description: 'Finalizes a transaction by updating the arrived_date property'})
    @ApiOkResponse({description: 'Updates the transaction'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin or worker'})
    @ApiBearerAuth()
    @Patch()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'Transactions'}, {permissionName: 'All'}])
    updateTrans(@Body() updateInput: WorkerUpdateInput){
        return this.service.updateTrans(updateInput)
    }

    @ApiOperation({summary: 'Assign worker (Admin | Worker)', description: 'Assigns a worker to a transaction'})
    @ApiOkResponse({description: 'Worker assigned'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why'})
    @ApiUnauthorizedResponse({description: 'The request came from an unauthorized user or the token expired'})
    @ApiForbiddenResponse({description: 'The user is not an admin or worker'})
    @ApiBearerAuth()
    @Patch('/assignWorker')
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission([{permissionName: 'Transactions'}, {permissionName: 'All'}])
    addWorker(@Req() token: Request, @Body() transId: WorkerUpdateInput){
        const user = this.jwt.decodeToken(token);
        return this.service.addWorkerToTrans(transId, user.sub.email);
    }
}
