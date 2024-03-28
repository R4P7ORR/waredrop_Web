import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {UserDto} from "../users/users.service";

export interface Transaction {
    transId?: number,
    transArrivedDate?: string,
    transOrigin: string,
    transTarget: string,
    warehouseId: number,
    itemId: number,
    workerEmail?: string,
}

export interface WorkerUpdateInput {
    workerEmail: string,
    transId: number,
    date?: string,
}

@Injectable()
export class TransactionsService {
    constructor(private readonly db: PrismaService) {}

    async createTrans(newTrans: Transaction){
        return this.db.transactions.create({
            data: {
                trans_post_date: Date.now().toString(),
                trans_origin: newTrans.transOrigin,
                trans_target: newTrans.transTarget,
                warehouse_warehouse_id: newTrans.warehouseId,
                item_item_id: newTrans.itemId
            }
        })
    }

    async addWorkerToTrans(addInput: WorkerUpdateInput ){
        return this.db.transactions.update({
            data: {
                worker_email: addInput.workerEmail,
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
            where:{
                worker_email: user.userEmail,
            }
        });
    }

    async getAllTrans(){
        return this.db.transactions.findMany();
    }

    async getAvailableTrans(){
        return this.db.transactions.findMany({
            where: {
                worker_email: null
            }
        })
    }

    async updateTrans(updateInput: WorkerUpdateInput){
        return this.db.transactions.update({
            data: {
                trans_arrived_date: updateInput.date,
            },
            where: {
                trans_id: updateInput.transId,
            }
        })
    }
}
