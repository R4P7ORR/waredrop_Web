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

    async assignItemToWarehouse(item_id: number, warehouse_name: string){
        const warehouse = await this.db.warehouses.findFirst({
            select: {
                warehouse_id: true,
                location: true,
            },
            where: {
                warehouse_name: warehouse_name,
            }
        })
        return this.db.transactions.create({
            data:{
                trans_post_date: Date.now().toString(),
                trans_arrived_date: Date.now().toString(),
                warehouse_warehouse_id: warehouse.warehouse_id,
                item_item_id: item_id,
                trans_origin: warehouse.location,
                trans_target: warehouse.location,
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
