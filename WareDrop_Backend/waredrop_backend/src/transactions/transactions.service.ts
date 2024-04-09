import {Injectable} from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {UserDto} from "../users/users.service";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {StockService} from "../stock/stock.service";

export class Transaction {
    @IsNumber()
    @IsOptional()
    transId?: number

    @IsString()
    @IsOptional()
    transArrivedDate?: string

    @IsString()
    @IsNotEmpty()
    transOrigin: string

    @IsString()
    @IsNotEmpty()
    transTarget: string

    @IsNumber()
    @IsNotEmpty()
    warehouseId: number

    @IsNumber()
    @IsNotEmpty()
    itemId: number

    @IsString()
    @IsOptional()
    workerEmail?: string
}

export class WorkerUpdateInput {
    @IsNumber()
    @IsNotEmpty()
    transId: number
}

@Injectable()
export class TransactionsService {
    constructor(private readonly db: PrismaService, private readonly stock: StockService) { }

    async createTrans(newTrans: Transaction){
        return this.db.transactions.create({
            data: {
                trans_post_date: new Date(Date.now()),
                trans_origin: newTrans.transOrigin,
                trans_target: newTrans.transTarget,
                warehouse_warehouse_id: newTrans.warehouseId,
                item_item_id: newTrans.itemId
            }
        })
    }

    async addWorkerToTrans(addInput: WorkerUpdateInput, workerEmail: string ){
        const trans = await this.db.transactions.findFirst({where: {trans_id: addInput.transId}})
        await this.stock.deleteStock({warehouseId: trans.warehouse_warehouse_id, itemId: trans.item_item_id});
        return this.db.transactions.update({
            where: {
                trans_id: addInput.transId
            },
            data: {
                worker_email: workerEmail
            }
        })
    }
    async getAllTransByUser(user: UserDto){
        return this.db.transactions.findMany({
            where: {
                warehouses: {
                    user_assigned_to_warehouse: {
                        some: {
                            user_user_id: user.userId
                        }
                    }
                }
            },
            include: {
                items: {
                    select: {item_name: true, item_quantity: true}
                }
            }
        });
    }

    async getAllTransByWorker(user: UserDto){
        return this.db.transactions.findMany({
            where: {
                worker_email: user.userEmail,
                trans_arrived_date: null
            },
            include: {
                items: {
                    select: {item_name: true, item_quantity: true}
                }
            }
        });
    }

    async getAllTrans(){
        return this.db.transactions.findMany({
            include: {
            items: {
                select: {item_name: true, item_quantity: true}
            }
        }
        });
    }

    async getAvailableTrans(){
        return this.db.transactions.findMany({
            where: {
                worker_email: null
            },
            include: {
                items: {
                    select: {item_name: true, item_quantity: true}
                }
            }
        })
    }

    async getTransDone(input: UserDto){
        return this.db.transactions.findMany({
            where: {
                worker_email: input.userEmail,
            }
        })
    }

    async updateTrans(updateInput: WorkerUpdateInput){
        return this.db.transactions.update({
            data: {
                trans_arrived_date: new Date(Date.now()),
            },
            where: {
                trans_id: updateInput.transId,
            }
        })
    }
}
