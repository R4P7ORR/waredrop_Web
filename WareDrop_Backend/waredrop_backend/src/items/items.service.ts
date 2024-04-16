import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";

export class CreateItemDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    itemName: string

    @IsNumber()
    @IsNotEmpty()
    itemQuantity: number

    @IsNumber()
    @IsNotEmpty()
    warehouseId: number
}

export class UpdateItemDto{
    @IsNumber()
    @IsNotEmpty()
    itemId: number

    @IsNumber()
    @IsNotEmpty()
    itemQuantity: number
}

export class ItemDto {

    @IsNumber()
    @IsNotEmpty()
    itemId: number
}

@Injectable()
export class ItemsService {
    constructor(private readonly db: PrismaService) {
    }

    async addItem(newItem: CreateItemDto){
        try {
            await this.db.items.create({
                data: {
                    item_name: newItem.itemName,
                    item_quantity: newItem.itemQuantity,
                    warehouse_id: newItem.warehouseId
                }
            })

            return {Massage: 'Added a new item to the warehouse'};

        } catch (e) {
            throw e;
        }
    }

    async getItems(){
        return this.db.items.findMany();
    }

    async updateItem(updateInput: UpdateItemDto){
        try {
            await this.db.items.update({
                data: {
                    item_quantity: updateInput.itemQuantity
                },
                where: {
                    item_id: updateInput.itemId
                }
            })
            return {Massage: 'Item updated'};

        } catch (e) {
            throw e;
        }
    }

    async deleteItem(item: ItemDto){
        return this.db.items.update({
            where: {
                item_id: item.itemId
            },
            data: {
                is_active: false
            }
        })
    }
}
