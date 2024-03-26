import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {WorkerUpdateInput, Transaction, TransactionsService} from "./transactions.service";
import JwtDecoder from "../auth/jwt.decoder";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {Request} from "express";

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly service: TransactionsService, private readonly jwt: JwtDecoder) {
    }

    @Post('/newTrans')
    async addTrans(@Body() newTrans: Transaction){
        return await this.service.createTrans(newTrans);
    }

    @Post('/addWorkerToTrans')
    async addWorker(@Body() addInput: WorkerUpdateInput){
        return this.service.addWorkerToTrans(addInput);
    }

    @Get()
    getAllTrans(){
        return this.service.getAllTrans();
    }

    @Get()
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

    @Post('/update')
    async updateTrans(@Body() input: WorkerUpdateInput){
        return this.service.updateTrans(input)
    }
}
