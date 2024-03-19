import {Controller, Get, Post} from '@nestjs/common';
import {Transaction, TransactionsService} from "./transactions.service";

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly service: TransactionsService) {
    }

    @Post('/newTrans')
    addTrans(newTrans: Transaction){
        return this.service.createTrans(newTrans);
    }

    @Get()
    getAllTrans(){
        return this.service.getAllTrans()
    }
}
