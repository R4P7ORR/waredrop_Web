import {Injectable} from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {UserDto} from "../users/users.service";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {Prisma} from "@prisma/client";

export class WarehouseCreateInput {
    @IsString()
    @IsNotEmpty()
    warehouseName: string

    @IsString()
    @IsNotEmpty()
    warehouseLocation: string
}

export class WarehouseUpdateInput {
    @IsNumber()
    @IsNotEmpty()
    warehouseId: number

    @IsString()
    @IsNotEmpty()
    warehouseName: string

    @IsString()
    @IsNotEmpty()
    warehouseLocation: string

    @IsOptional()
    @IsNumber()
    assignedUserId: number
}

export class WarehouseDto{
    @IsNumber()
    @IsNotEmpty()
    warehouseId: number
}

export class AddWarehouseDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number

    @IsNumber()
    @IsNotEmpty()
    warehouseId: number
}

@Injectable()
export class WarehousesService {
    constructor(private readonly db: PrismaService) { }

    async addWarehouse(createInput: WarehouseCreateInput){
        return this.db.warehouses.create({
            data: {
                warehouse_name: createInput.warehouseName,
                location: createInput.warehouseLocation,
            }
        })
    }

    async getWarehouses(){
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
                assigned_user_id: user.userId
            }
        })
    }

    async getItemsInWarehouse(warehouseDto: WarehouseDto){
        const result = await this.db.items.findMany({
            where: {
                warehouse_id: warehouseDto.warehouseId,
            }
        })
        return result.map((item) => item);
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
        try {
            const result = await this.db.warehouses.delete({
                where: {
                    warehouse_id: deleteInput.warehouseId
                }
            })

            if (result){
                return {result, message: 'Warehouse deleted'};
            }

        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2003'){
                return {errorMassage: "Warehouse is not empty"};
            } else {
                throw e;
            }
        }
    }
}