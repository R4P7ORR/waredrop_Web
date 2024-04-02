import { PrismaService } from "../database/prisma.service";
import { UserDto } from "../users/users.service";
export declare class Transaction {
    transId?: number;
    transArrivedDate?: string;
    transOrigin: string;
    transTarget: string;
    warehouseId: number;
    itemId: number;
    workerEmail?: string;
}
export declare class WorkerUpdateInput {
    workerEmail?: string;
    transId: number;
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
    getAllTransByUser(user: UserDto): Promise<{
        trans_id: number;
        trans_post_date: string;
        trans_arrived_date: string;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_id: number;
    }[]>;
    getAllTransByWorker(user: UserDto): Promise<{
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
