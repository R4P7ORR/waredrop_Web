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
    @IsOptional()
    warehouseName: string

    @IsString()
    @IsOptional()
    warehouseLocation: string
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
        return this.db.warehouses.findMany({
            where: {
                warehouse_id : warehouseInput.warehouseId,
            }
        });
    }

    async getWarehousesByUser(user: UserDto){
        return this.db.warehouses.findMany({
            where: {
                user_assigned_to_warehouse: {
                    some: {
                        user_user_id: user.userId,
                    }
                }
            }
        })
    }

    async getItemsInWarehouse(warehouseDto: WarehouseDto){
        const result = await this.db.stock.findMany({
            select: {
                items: {
                    select: {
                        item_id: true,
                        item_name: true,
                        item_quantity: true,
                    }
                },
            },
            where: {
                warehouse_warehouse_id: warehouseDto.warehouseId,
            }
        })
        return result.map((item) => item.items);
    }

    async addWarehouseToUser(addInput: AddWarehouseDto){
        const result = await this.db.warehouses.findFirst({
            select: {
                warehouse_id: true,
            },
            where: {
                warehouse_name: addInput.warehouseName,
            }
        })
        return this.db.user_assigned_to_warehouse.create({
            data: {
                user_user_id: addInput.userId,
                warehouse_warehouse_id: result.warehouse_id
            }
        })
    }

    async updateWarehouse(input: WarehouseUpdateInput){
        let result;
        if (input.warehouseLocation!) {
            result = this.db.warehouses.update({
                where: {
                    warehouse_id: input.warehouseId
                },
                data: {
                    warehouse_name: input.warehouseName
                }
            })
        } else if (input.warehouseName!) {
            result = this.db.warehouses.update({
                where: {
                    warehouse_id: input.warehouseId
                },
                data: {
                    location: input.warehouseLocation
                }
            })
        } else {
            result = this.db.warehouses.update({
                where: {
                    warehouse_id: input.warehouseId
                },
                data: {
                    warehouse_name: input.warehouseName,
                    location: input.warehouseLocation
                }
            })
        }

        return result;
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
