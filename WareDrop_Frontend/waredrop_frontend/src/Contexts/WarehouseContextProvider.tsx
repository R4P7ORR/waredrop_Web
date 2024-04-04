import {ReactNode, useContext, useState} from "react";
import WarehouseContext, {userWOId} from "../Contexts/WarehouseContext";

interface WarehouseContextProviderProps {
    children: ReactNode;
}

function WarehouseContextProvider(props: WarehouseContextProviderProps) {
    const [selectedId, setSelectedId] = useState(0);
    const [overlayType, setOverlayType] = useState("none");
    const [editingWarehouse, setEditingWarehouse] = useState(false);
    const [deletingWarehouse, setDeletingWarehouse] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingUser, setEditingUser] = useState<userWOId>({user_name: "default", user_email: "user"});
    const warehouseContextValues = { selectedId, setSelectedId, overlayType, setOverlayType, editingWarehouse, setEditingWarehouse, deletingWarehouse, setDeletingWarehouse, isAdmin, setIsAdmin, editingUser, setEditingUser };

    return <WarehouseContext.Provider value={warehouseContextValues}>
        {props.children}
    </WarehouseContext.Provider>
}
export default WarehouseContextProvider;