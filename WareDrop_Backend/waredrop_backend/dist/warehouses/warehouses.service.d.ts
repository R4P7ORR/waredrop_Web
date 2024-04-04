import { PrismaService } from "../database/prisma.service";
import { UserDto } from "../users/users.service";
export declare class WarehouseCreateInput {
    warehouseName: string;
    warehouseLocation: string;
}
export declare class WarehouseDto {
    warehouseId: number;
}
export declare class AddWarehouseDto {
    userId: number;
    warehouseName: string;
}
export declare class WarehousesService {
    private readonly db;
    constructor(db: PrismaService);
    addWarehouse(createInput: WarehouseCreateInput): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
    }>;
    getWarehouses(): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
    }[]>;
    getWarehousesByUser(user: UserDto): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
    }[]>;
    getItemsInWarehouse(warehouseDto: WarehouseDto): Promise<{
        item_id: number;
        item_name: string;
        item_quantity: number;
    }[]>;
    addWarehouseToUser(addInput: AddWarehouseDto): Promise<{
        user_user_id: number;
        warehouse_warehouse_id: number;
    }>;
}
