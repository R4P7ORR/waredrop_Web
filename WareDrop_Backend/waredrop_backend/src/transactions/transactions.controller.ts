import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {WorkerUpdateInput, Transaction, TransactionsService} from "./transactions.service";

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly service: TransactionsService) {
    }

    @Post('/newTrans')
    addTrans(newTrans: Transaction){
        return this.service.createTrans(newTrans);
    }

    @Post('/addWorkerToTrans')
    async addWorker(@Body() addInput: WorkerUpdateInput){
        return this.service.addWorkerToTrans(addInput);
    }

    @Get()
    getAllTrans(){
        return this.service.getAllTrans();
    }

    @Get('/user/:id')
    getAllTransByUser(@Param('id') id: number){
        return this.service.getAllTransByUser(id);
    }

    @Get('/worker/:id')
    getAllTransByWorker(@Param('id') id: number){
        return this.service.getAllTransByWorker(id);
    }

    @Post('/update')
    async updateTrans(@Body() input: WorkerUpdateInput){
        return this.service.updateTrans(input)
    }
}
