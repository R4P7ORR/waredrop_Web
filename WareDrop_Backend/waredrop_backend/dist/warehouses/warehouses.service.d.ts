import { PrismaService } from "../database/prisma.service";
import { UserDto } from "../users/users.service";
export declare class WarehouseCreateInput {
    warehouseName: string;
    warehouseLocation: string;
}
export declare class WarehouseUpdateInput {
    warehouseId: number;
    warehouseName: string;
    warehouseLocation: string;
}
export declare class WarehouseDto {
    warehouseId: number;
}
export declare class AddWarehouseDto {
    userId: number;
    warehouseId: number;
}
export declare class WarehousesService {
    private readonly db;
    constructor(db: PrismaService);
    addWarehouse(createInput: WarehouseCreateInput): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
        assigned_user_id: number;
    }>;
    getWarehouses(): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
        assigned_user_id: number;
    }[]>;
    getWarehouseById(warehouseInput: WarehouseDto): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
        assigned_user_id: number;
    }>;
    getWarehousesByUser(user: UserDto): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
        assigned_user_id: number;
    }[]>;
    getItemsInWarehouse(warehouseDto: WarehouseDto): Promise<{
        item_id: number;
        item_name: string;
        item_quantity: number;
        warehouse_id: number;
    }[]>;
    addWarehouseToUser(addInput: AddWarehouseDto): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
        assigned_user_id: number;
    }>;
    updateWarehouse(input: WarehouseUpdateInput): Promise<any>;
    deleteWarehouse(deleteInput: WarehouseDto): Promise<{
        result: {
            warehouse_id: number;
            warehouse_name: string;
            location: string;
            assigned_user_id: number;
        };
        message: string;
        errorMassage?: undefined;
    } | {
        errorMassage: string;
        result?: undefined;
        message?: undefined;
    }>;
}
