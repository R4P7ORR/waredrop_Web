import { PrismaService } from "../database/prisma.service";
export interface Warehouse {
    warehouse_name: string;
    location: string;
}
export declare class WarehousesService {
    private readonly db;
    constructor(db: PrismaService);
    addWarehouse(createInput: Warehouse): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
    }>;
    getWarehouses(): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
    }[]>;
    getWarehousesByUser(user_id: number): Promise<Warehouse[]>;
    getItemsInWarehouse(warehouse_id: number): Promise<{
        items: {
            item_id: number;
            item_name: string;
            item_quantity: number;
        };
    }[]>;
    addWarehouseToUser(user_id: number, warehouse_name: string): Promise<{
        user_user_id: number;
        warehouse_warehouse_id: number;
    }>;
}
