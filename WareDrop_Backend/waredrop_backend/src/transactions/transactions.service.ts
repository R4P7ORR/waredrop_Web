import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";

export interface Transaction{
    trans_id?: number,
    trans_post_date: string,
    trans_arrived_date?: string,
    trans_origin: string,
    trans_target: string,
    warehouse_warehouse_id: number,
    item_item_id: number,
}

@Injectable()
export class TransactionsService {
    constructor(private readonly db: PrismaService) {}

    async createTrans(newTrans: Transaction){
        return this.db.transactions.create({
            data: newTrans
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

    async getTrans(){
        return this.db.transactions.findMany()
    }
}
