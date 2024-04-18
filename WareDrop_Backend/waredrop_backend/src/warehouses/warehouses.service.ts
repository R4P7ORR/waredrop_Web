import {Injectable} from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {UserDto} from "../users/users.service";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {TransactionsService} from "../transactions/transactions.service";
import {ApiProperty} from "@nestjs/swagger";

export class WarehouseCreateInput {
    @ApiProperty({
        description: 'The name of the new warehouse'
    })
    @IsString()
    @IsNotEmpty()
    warehouseName: string

    @ApiProperty({
        description: 'The location of the new warehouse'
    })
    @IsString()
    @IsNotEmpty()
    warehouseLocation: string
}

export class WarehouseUpdateInput {
    @ApiProperty({
        description: 'The id of the warehouse which will be updated'
    })
    @IsNumber()
    @IsNotEmpty()
    warehouseId: number

    @ApiProperty({
        description: 'The new name of the warehouse'
    })
    @IsString()
    @IsNotEmpty()
    warehouseName: string

    @ApiProperty({
        description: 'The new location of the warehouse'
    })
    @IsString()
    @IsNotEmpty()
    warehouseLocation: string

    @ApiProperty({
        description: 'The new user which the warehouse will be assigned to'
    })
    @IsOptional()
    @IsNumber()
    assignedUserId: number
}

export class WarehouseDto{
    @ApiProperty({
        description: 'The id of a warehouse'
    })
    @IsNumber()
    @IsNotEmpty()
    warehouseId: number
}

export class AddWarehouseDto {
    @ApiProperty({
        description: 'The id of the user which will be assigned'
    })
    @IsNumber()
    @IsNotEmpty()
    userId: number

    @ApiProperty({
        description: 'The id of the warehouse which the user will be assigned to'
    })
    @IsNumber()
    @IsNotEmpty()
    warehouseId: number
}

@Injectable()
export class WarehousesService {
    constructor(private readonly db: PrismaService, private readonly transService: TransactionsService) { }

    async addWarehouse(createInput: WarehouseCreateInput){
        return this.db.warehouses.create({
            data: {
                warehouse_name: createInput.warehouseName,
                location: createInput.warehouseLocation,
            }
        })
    }

    async getWarehouses(){
        return this.db.warehouses.findMany({
            where: {
                is_active: true
            }
        });
    }

    async getAllWarehouses(){
        return this.db.warehouses.findMany();
    }

    async getWarehouseById(warehouseInput: WarehouseDto){
        return this.db.warehouses.findFirst({
            where: {
                warehouse_id : warehouseInput.warehouseId,
            }
        });
    }

    async getWarehousesByUser(user: UserDto){
        return this.db.warehouses.findMany({
            where: {
                assigned_user_id: user.userId,
                is_active: true
            }
        })
    }

    async getItemsInWarehouse(warehouseDto: WarehouseDto){
        const allItems = await this.db.items.findMany({
            where: {
                warehouse_id: warehouseDto.warehouseId,
                is_active: true
            }
        });
        const allTrans = await this.transService.getAllTrans();

        for (let i = allItems.length - 1; i >= 0; i--) {
            const item = allItems[i];
            for (const trans of allTrans) {
                if (item.item_id === trans.item_item_id && trans.trans_arrived_date === null) {
                    allItems.splice(i, 1);
                    break;
                }
            }
        }

        return allItems;
    }


    async getMovingItemsInWarehouse(warehouseDto: WarehouseDto){
        const allItems = await this.db.items.findMany({
            where: {
                warehouse_id: warehouseDto.warehouseId,
                is_active: true
            }
        })
        const allTrans = await this.transService.getAllTrans();
        const result = [];

        allItems.forEach((item) => {
            for (const trans of allTrans) {
                if (item.item_id === trans.item_item_id && trans.trans_arrived_date === null) {
                    result.push(item);
                }
            }
        })
        return result;
    }

    async addWarehouseToUser(addInput: AddWarehouseDto){
        return this.db.warehouses.update({
            where: {
                warehouse_id: addInput.warehouseId
            },
            data: {
                assigned_user_id: addInput.userId
            }
        })
    }

    async updateWarehouse(input: WarehouseUpdateInput){
        return this.db.warehouses.update({
            where: {
                warehouse_id: input.warehouseId
            },
            data: {
               warehouse_name: input.warehouseName,
               location: input.warehouseLocation,
               assigned_user_id: input.assignedUserId
            }
        })
    }

    async deleteWarehouse(deleteInput: WarehouseDto){
        return this.db.warehouses.update({
            where: {
                warehouse_id: deleteInput.warehouseId
            },
            data: {
                is_active: false
            }
        })
    }
}