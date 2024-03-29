import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";

export interface CreateItemDto{
    itemName: string,
    itemQuantity: number,
    warehouseId: number,
}

export interface ItemDto {
    itemId: number,
    itemName: string,
    itemQuantity: number,
}

@Injectable()
export class ItemsService {
    constructor(private readonly db: PrismaService) {
    }

    async addItem(newItem: CreateItemDto){
        try {
            const createdItem = await this.db.items.create({
                data: {
                    item_name: newItem.itemName,
                    item_quantity: newItem.itemQuantity
                }
            })

            await this.assignItemToWarehouse(createdItem.item_id, newItem.warehouseId);

            return {Massage: 'Added a new item to the warehouse'};

        } catch (e) {
            return {errorMassage: 'Something went wrong'};
        }
    }

    async getItems(){
        return this.db.items.findMany();
    }

    async assignItemToWarehouse(itemId: number, warehouseId: number){
        const warehouse = await this.db.warehouses.findFirst({
            select: {
                warehouse_id: true,
                location: true,
            },
            where: {
                warehouse_id: warehouseId,
            }
        })
        return this.db.transactions.create({
            data:{
                trans_post_date: Date.now().toString(),
                trans_arrived_date: Date.now().toString(),
                warehouse_warehouse_id: warehouse.warehouse_id,
                item_item_id: itemId,
                trans_origin: warehouse.location,
                trans_target: warehouse.location,
            }
        })
    }
}
