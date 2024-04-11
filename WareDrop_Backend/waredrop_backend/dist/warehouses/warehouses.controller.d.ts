import { Request } from "express";
import JwtDecoder from "../auth/jwt.decoder";
import { AddWarehouseDto, WarehouseCreateInput, WarehouseDto, WarehousesService, WarehouseUpdateInput } from "./warehouses.service";
export declare class WarehousesController {
    private readonly jwt;
    private readonly service;
    constructor(jwt: JwtDecoder, service: WarehousesService);
    addNew(createInput: WarehouseCreateInput): Promise<{
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
    getWarehouseById(id: string): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
        assigned_user_id: number;
    }>;
    getWarehousesByUser(req: Request): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
        assigned_user_id: number;
    }[]>;
    getItemsInWarehouse(warehouseString: string): Promise<{
        item_id: number;
        item_name: string;
        item_quantity: number;
        warehouse_id: number;
    }[]>;
    updateWarehouse(warehouseDto: WarehouseUpdateInput): Promise<any>;
    addToUser(addInput: AddWarehouseDto): Promise<{
        warehouse_id: number;
        warehouse_name: string;
        location: string;
        assigned_user_id: number;
    }>;
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
