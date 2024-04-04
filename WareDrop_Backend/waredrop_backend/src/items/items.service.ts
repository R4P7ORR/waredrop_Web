import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {StockService} from "../stock/stock.service";

export class CreateItemDto{
    @IsString()
    @IsNotEmpty()
    itemName: string

    @IsNumber()
    @IsNotEmpty()
    itemQuantity: number

    @IsNumber()
    @IsNotEmpty()
    warehouseId: number
}

@Injectable()
export class ItemsService {
    constructor(private readonly db: PrismaService, private readonly stock: StockService) {
    }

    async addItem(newItem: CreateItemDto){
        try {
            const createdItem = await this.db.items.create({
                data: {
                    item_name: newItem.itemName,
                    item_quantity: newItem.itemQuantity
                }
            })

            await this.stock.addStock({itemId: createdItem.item_id, warehouseId: newItem.warehouseId});

            return {Massage: 'Added a new item to the warehouse'};

        } catch (e) {
            throw e;
        }
    }

    async getItems(){
        return this.db.items.findMany();
    }
}
