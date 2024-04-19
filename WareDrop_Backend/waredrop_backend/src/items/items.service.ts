import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateItemDto {
    @ApiProperty({
        description: 'The name of the new item',
        maxLength: 30,
        default: 'New item'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    itemName: string

    @ApiProperty({
        description: 'The quantity of the new item',
        default: 2
    })
    @IsNumber()
    @IsNotEmpty()
    itemQuantity: number

    @ApiProperty({
        description: 'The id of the warehouse which the new item will be put into',
        default: 1
    })
    @IsNumber()
    @IsNotEmpty()
    warehouseId: number
}

export class UpdateItemDto{
    @ApiProperty({
        description: 'The id of the item which will be updated',
        default: 1
    })
    @IsNumber()
    @IsNotEmpty()
    itemId: number

    @ApiProperty({
        description: 'The updated quantity',
        default: 3
    })
    @IsNumber()
    @IsNotEmpty()
    itemQuantity: number
}

export class ItemDto {
    @ApiProperty({
        description: 'The id of an item'
    })
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
