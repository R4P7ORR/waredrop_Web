import React from "react";
import User from "../Components/Users/User";
import Item from "../Components/Warehouse/Item";
import Warehouse from "../Components/Warehouse/Warehouse";

export interface WarehouseContextValues {
    selectedId: number;
    setSelectedId: (selectedId: number) => void;

    warehouseList: Warehouse[] | [];
    setWarehouseList: (list: Warehouse[] | []) => void;

    selectedUserId: number;
    setSelectedUserId: (id: number) => void;

    users: User[] | [];
    setUsers: (users: User[] | []) => void;

    overlayType: string;
    setOverlayType: (type: string) => void;

    editingWarehouse: boolean;
    setEditingWarehouse: (set: boolean) => void;

    deletingWarehouse: boolean;
    setDeletingWarehouse: (set: boolean) => void;

    isAdmin: boolean;
    setIsAdmin: (set: boolean) => void;

    editingUser: userWOId;
    setEditingUser: (user: userWOId) => void;

    selectedItems: Item[];
    setSelectedItems: (items: Item[]) => void;

    flushValues: number;
    setFlushValues: (number: number) => void
}

const WarehouseContext = React.createContext<WarehouseContextValues>(null as unknown as WarehouseContextValues);
export type userWOId = Omit<User, "user_id">
export default WarehouseContext;