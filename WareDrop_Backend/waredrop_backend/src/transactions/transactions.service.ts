import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";

export interface Transaction {
    trans_id?: number,
    trans_arrived_date?: string,
    trans_origin: string,
    trans_target: string,
    warehouse_warehouse_id: number,
    item_item_id: number,
    worker_email?: string,
}

export interface WorkerUpdateInput {
    worker_email: string,
    trans_id: number,
    date?: string,
}

@Injectable()
export class TransactionsService {
    constructor(private readonly db: PrismaService) {}

    async createTrans(newTrans: Transaction){
        return this.db.transactions.create({
            data: {
                trans_post_date: Date.now().toString(),
                trans_origin: newTrans.trans_origin,
                trans_target: newTrans.trans_target,
                warehouse_warehouse_id: newTrans.warehouse_warehouse_id,
                item_item_id: newTrans.item_item_id
            }
        })
    }

    async addWorkerToTrans(addInput: WorkerUpdateInput ){
        return this.db.transactions.update({
            data: {
                worker_email: addInput.worker_email,
            },
            where: {
                trans_id: addInput.trans_id,
            }
        })
    }
    async getAllTransByUser(userId: number){
        return this.db.transactions.findMany({
            where: {
                warehouses: {
                    user_assigned_to_warehouse: {
                        some: {
                            user_user_id: userId
                        }
                    }
                }
            }
        });
    }

    async getAllTransByWorker(workerEmail: string){
        return this.db.transactions.findMany({
            where:{
                worker_email: workerEmail
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
                trans_id: updateInput.trans_id,
            }
        })
    }
}
