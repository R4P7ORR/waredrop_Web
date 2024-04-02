import { Request } from "express";
import JwtDecoder from "../auth/jwt.decoder";
import { Warehouse, WarehousesService } from "./warehouses.service";
export declare class WarehousesController {
    private readonly jwt;
    private readonly service;
    constructor(jwt: JwtDecoder, service: WarehousesService);
    addNew(createInput: Warehouse): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
    }>;
    addToUser({ user_id, warehouse_name }: {
        user_id: number;
        warehouse_name: string;
    }): Promise<{
        user_user_id: number;
        warehouse_warehouse_id: number;
    }>;
    getWarehousesByUser(req: Request): Promise<Warehouse[]>;
    getWarehouses(): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
    }[]>;
    getItemsInWarehouse(warehouse_id: number): Promise<{
        items: {
            item_id: number;
            item_name: string;
            item_quantity: number;
        };
    }[]>;
}
