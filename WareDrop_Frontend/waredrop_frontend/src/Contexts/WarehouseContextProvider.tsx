import {ReactNode, useContext, useState} from "react";
import WarehouseContext from "../Contexts/WarehouseContext";

interface WarehouseContextProviderProps {
    children: ReactNode;
}

function WarehouseContextProvider(props: WarehouseContextProviderProps) {
    const [selectedId, setSelectedId] = useState(0);
    const [overlayType, setOverlayType] = useState("none");
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const warehouseContextValues = { selectedId, setSelectedId, overlayType, setOverlayType, editing, setEditing, deleting, setDeleting, isAdmin, setIsAdmin };

    return <WarehouseContext.Provider value={warehouseContextValues}>
        {props.children}
    </WarehouseContext.Provider>
}
export default WarehouseContextProvider;