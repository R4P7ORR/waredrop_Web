import {Body, Controller, Get, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {WorkerUpdateInput, Transaction, TransactionsService} from "./transactions.service";
import JwtDecoder from "../auth/jwt.decoder";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {Request} from "express";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly service: TransactionsService,
                private readonly jwt: JwtDecoder
    ) { }

    @Post('/new')
    async addTrans(@Body() newTrans: Transaction){
        return await this.service.createTrans(newTrans);
    }

    @Get()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequiredPermission({permission_name: 'All'})
    getAllTrans(){
        return this.service.getAllTrans();
    }

    @Get('/available')
    getAvailable(){
        return this.service.getAvailableTrans();
    }

    @Get('/user')
    @UseGuards(JwtAuthGuard)
    async getAllTransByUser(@Req() req : Request){
        const user = this.jwt.decodeToken(req);
        return this.service.getAllTransByUser(user.sub.id);
    }

    @Get('/worker')
    @UseGuards(JwtAuthGuard)
    async getAllTransByWorker(@Req() req : Request){
        const user = this.jwt.decodeToken(req);
        return this.service.getAllTransByWorker(user.sub.id);
    }

    @Patch('/update')
    async updateTrans(@Body() updateInput: WorkerUpdateInput){
        return this.service.updateTrans(updateInput)
    }

    @Patch('/assignWorker')
    async addWorker(@Body() addInput: WorkerUpdateInput){
        return this.service.addWorkerToTrans(addInput);
    }
}
