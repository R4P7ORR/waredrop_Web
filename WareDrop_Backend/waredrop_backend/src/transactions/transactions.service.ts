import {Injectable} from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {UserDto} from "../users/users.service";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

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
    constructor(private readonly db: PrismaService) { }

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
        return this.db.transactions.update({
            data: {
                worker_email: workerEmail,
            },
            where: {
                trans_id: addInput.transId,
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
            }
        });
    }

    async getAllTransByWorker(user: UserDto){
        return this.db.transactions.findMany({
            where: {
                worker_email: user.userEmail,
            }
        });
    }

    async getAllTrans(){
        return this.db.transactions.findMany();
    }

    async getAvailableTrans(){
        return this.db.transactions.findMany({
            select: {
                trans_id: true,
                trans_post_date: true,
                trans_arrived_date: true,
                trans_origin: true,
                trans_target: true,
                worker_email: true,
                items: {}
            },
            where: {
                worker_email: null
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
