import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";

export interface Item{
    item_id?: number,
    item_name: string,
    item_quantity: number,
}

@Injectable()
export class ItemsService {
    constructor(private readonly db: PrismaService) {
    }

    async addItem(newItem: Item){
        return this.db.items.create({
            data: newItem
        })
    }

    async getItems(){
        return this.db.items.findMany()
    }

    async getUserItem(user_id: number){
        return this.db.transactions.findFirst({
            select: {
                items:{}
            },
            where: {
                warehouses: {
                    user_assigned_to_warehouse: {
                        some: {
                            user_user_id: user_id
                        }
                    }
                }
            }
        })
    }

    async deleteItem(item_id: number){
        return this.db.items.delete({
            where: {
                item_id: item_id
            }
        })
    }
}
