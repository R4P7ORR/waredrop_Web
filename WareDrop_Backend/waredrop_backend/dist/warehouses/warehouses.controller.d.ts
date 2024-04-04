import { Request } from "express";
import JwtDecoder from "../auth/jwt.decoder";
import { AddWarehouseDto, WarehouseCreateInput, WarehousesService } from "./warehouses.service";
export declare class WarehousesController {
    private readonly jwt;
    private readonly service;
    constructor(jwt: JwtDecoder, service: WarehousesService);
    addNew(createInput: WarehouseCreateInput): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
    }>;
    getWarehouses(): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
    }[]>;
    getWarehousesByUser(req: Request): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
    }[]>;
    getItemsInWarehouse(warehouseString: string): Promise<{
        item_id: number;
        item_name: string;
        item_quantity: number;
    }[]>;
    addToUser(addInput: AddWarehouseDto): Promise<{
        user_user_id: number;
        warehouse_warehouse_id: number;
    }>;
}
