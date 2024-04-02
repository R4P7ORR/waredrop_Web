import { PrismaService } from "../database/prisma.service";
export interface Transaction {
    trans_id?: number;
    trans_arrived_date?: string;
    trans_origin: string;
    trans_target: string;
    warehouse_warehouse_id: number;
    item_item_id: number;
    worker_id?: number;
}
export interface WorkerUpdateInput {
    worker_id: number;
    trans_id: number;
    date?: string;
}
export declare class TransactionsService {
    private readonly db;
    constructor(db: PrismaService);
    createTrans(newTrans: Transaction): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }>;
    addWorkerToTrans(addInput: WorkerUpdateInput): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }>;
    getAllTransByUser(user_id: number): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }[]>;
    getAllTransByWorker(worker_id: number): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }[]>;
    getAllTrans(): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }[]>;
    getAvailableTrans(): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }[]>;
    updateTrans(updateInput: WorkerUpdateInput): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }>;
}
