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
    transId: number;
}
export declare class TransactionsService {
    private readonly db;
    constructor(db: PrismaService);
    createTrans(newTrans: Transaction): Promise<{
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_email: string;
    }>;
    addWorkerToTrans(addInput: WorkerUpdateInput, workerEmail: string): Promise<{
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_email: string;
    }>;
    getAllTransByUser(user: UserDto): Promise<{
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_email: string;
    }[]>;
    getAllTransByWorker(user: UserDto): Promise<{
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_email: string;
    }[]>;
    getAllTrans(): Promise<{
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_email: string;
    }[]>;
    getAvailableTrans(): Promise<{
        items: {
            item_id: number;
            item_name: string;
            item_quantity: number;
        };
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin: string;
        trans_target: string;
        worker_email: string;
    }[]>;
    updateTrans(updateInput: WorkerUpdateInput): Promise<{
        trans_id: number;
        trans_post_date: Date;
        trans_arrived_date: Date;
        trans_origin: string;
        trans_target: string;
        warehouse_warehouse_id: number;
        item_item_id: number;
        worker_email: string;
    }>;
}
