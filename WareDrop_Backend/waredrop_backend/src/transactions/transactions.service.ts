import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {UserDto} from "../users/users.service";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {WarehouseDto} from "../warehouses/warehouses.service";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class Transaction {
    @ApiPropertyOptional({
        description: 'The id of a transaction',
    })
    @IsNumber()
    @IsOptional()
    transId?: number

    @ApiPropertyOptional({
        description: 'The timestamp of when the transaction was finished'
    })
    @IsString()
    @IsOptional()
    transArrivedDate?: string

    @ApiProperty({
        description: 'The id of the warehouse which the item will be moved out of'
    })
    @IsNumber()
    @IsNotEmpty()
    transOriginId: number

    @ApiProperty({
        description: 'The id of the warehouse which the item will be moved to'
    })
    @IsNumber()
    @IsNotEmpty()
    transTargetId: number

    @ApiProperty({
        description: 'The id of the item which will be moved'
    })
    @IsNumber()
    @IsNotEmpty()
    itemId: number

    @ApiPropertyOptional({
        description: 'The email address of the worker who managed the transaction'
    })
    @IsString()
    @IsOptional()
    workerEmail?: string
}

export class WorkerUpdateInput {
    @ApiProperty({
        description: 'The id of a worker'
    })
    @IsNumber()
    @IsNotEmpty()
    transId: number
}

@Injectable()
export class TransactionsService {
    constructor(private readonly db: PrismaService) { }

    async createTrans(newTrans: Transaction){
        const inTransit = await this.db.transactions.findFirst({
            where: {
                trans_origin_id: newTrans.transOriginId,
                item_item_id: newTrans.itemId,
                trans_arrived_date: null
            }
        })
        if (inTransit !== null){
            throw new BadRequestException('Item already in transit')
        } else {
            return this.db.transactions.create({
                data: {
                    trans_post_date: new Date(Date.now()),
                    trans_origin_id: newTrans.transOriginId,
                    trans_target_id: newTrans.transTargetId,
                    item_item_id: newTrans.itemId
                }
            })
        }
    }

    async getTransOfWarehouse(warehouse: WarehouseDto){
        return this.db.transactions.findMany({
            where: {
                trans_origin_id: warehouse.warehouseId,
            },
            include: {
                items: {
                    select: {
                        item_name: true,
                        item_quantity: true
                    }
                }
            }
        });
    }

    async getAllTransByWorker(user: UserDto){
        return this.db.transactions.findMany({
            where: {
                worker_email: user.userEmail,
                trans_arrived_date: null
            },
            include: {
                items: {
                    select: {item_name: true, item_quantity: true}
                }
            }
        });
    }

    async getAllTrans(){
        return this.db.transactions.findMany({
            include: {
            items: {
                select: {item_name: true, item_quantity: true}
            }
        }
        });
    }

    async getAllCompletedTrans(){
        return this.db.transactions.findMany({
            where: {
                NOT: {
                    trans_arrived_date: null
                }
            }, include: {
                items: true
            }
        });
    }

    async getAllActiveTrans(){
        return this.db.transactions.findMany({
            where: {
                trans_arrived_date: null
            },
            include: {
                items: true
            }
        });
    }

    async getAvailableTrans(){
        return this.db.transactions.findMany({
            where: {
                worker_email: null
            },
            include: {
                items: {
                    select: {item_name: true, item_quantity: true}
                }
            },
        })
    }

    async getTransDone(input: UserDto){
        return this.db.transactions.findMany({
            where: {
                worker_email: input.userEmail,
            },
            include: {
                items: true
            }
        })
    }

    async addWorkerToTrans(addInput: WorkerUpdateInput, workerEmail: string ){
        return this.db.transactions.update({
            where: {
                trans_id: addInput.transId
            },
            data: {
                worker_email: workerEmail,
            }
        })
    }

    async updateTrans(updateInput: WorkerUpdateInput){
        const result = await this.db.transactions.update({
            data: {
                trans_arrived_date: new Date(Date.now()),
            },
            where: {
                trans_id: updateInput.transId,
            }
        })
        await this.db.items.update({
            where: {
                item_id: result.item_item_id
            },
            data: {
                warehouse_id: result.trans_target_id
            }
        })
        return result;
    }
}
