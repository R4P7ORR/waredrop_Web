import {ReactNode, useContext, useState} from "react";
import WarehouseContext, {userWOId} from "../Contexts/WarehouseContext";
import Item from "../Components/Warehouse/Item";
import User from "../Components/Users/User";

interface WarehouseContextProviderProps {
    children: ReactNode;
}

function WarehouseContextProvider(props: WarehouseContextProviderProps) {
    const [selectedId, setSelectedId] = useState(0);
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [users, setUsers] = useState<User[] | []>([]);
    const [overlayType, setOverlayType] = useState("none");
    const [editingWarehouse, setEditingWarehouse] = useState(false);
    const [deletingWarehouse, setDeletingWarehouse] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingUser, setEditingUser] = useState<userWOId>({user_name: "default", user_email: "user"});
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const warehouseContextValues = {
        selectedId, setSelectedId,
        selectedUserId, setSelectedUserId,
        users, setUsers,
        overlayType, setOverlayType,
        editingWarehouse, setEditingWarehouse,
        deletingWarehouse, setDeletingWarehouse,
        isAdmin, setIsAdmin,
        editingUser, setEditingUser,
        selectedItems, setSelectedItems
    };

    return <WarehouseContext.Provider value={warehouseContextValues}>
        {props.children}
    </WarehouseContext.Provider>
}
export default WarehouseContextProvider;