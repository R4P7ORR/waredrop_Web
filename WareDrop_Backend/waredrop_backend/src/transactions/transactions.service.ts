import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";

export interface Transaction {
    trans_id?: number,
    trans_post_date: string,
    trans_arrived_date?: string,
    trans_origin: string,
    trans_target: string,
    warehouse_warehouse_id: number,
    item_item_id: number,
    worker_id?: number,
}

export interface WorkerUpdateInput {
    worker_id: number,
    trans_id: number,
    date?: string,
}

@Injectable()
export class TransactionsService {
    constructor(private readonly db: PrismaService) {}

    async createTrans(newTrans: Transaction){
        return this.db.transactions.create({
            data: newTrans
        })
    }

    async addWorkerToTrans(addInput: WorkerUpdateInput ){
        return this.db.transactions.update({
            data: {
                worker_id: addInput.worker_id,
            },
            where: {
                trans_id: addInput.trans_id,
            }
        })
    }
    async getAllTransByUser(user_id: number){
        return this.db.transactions.findMany({
            where: {
                warehouses: {
                    user_assigned_to_warehouse: {
                        some: {
                            user_user_id: user_id
                        }
                    }
                }
            }
        });
    }

    async getAllTransByWorker(worker_id: number){
        return this.db.transactions.findMany({
            where:{
                worker_id: worker_id
            }
        });
    }

    async getAllTrans(){
        return this.db.transactions.findMany();
    }

    async getAvailableTrans(){
        return this.db.transactions.findMany({
            where: {
                worker_id: null
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
