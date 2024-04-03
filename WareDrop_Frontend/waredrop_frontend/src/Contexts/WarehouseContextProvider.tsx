import {ReactNode, useState} from "react";
import WarehouseContext from "../Contexts/WarehouseContext";

interface WarehouseContextProviderProps {
    children: ReactNode;
}

function WarehouseContextProvider(props: WarehouseContextProviderProps) {
    const [selectedId, setSelectedId] = useState(0);
    const [overlayType, setOverlayType] = useState("none");
    const warehouseContextValues = { selectedId, setSelectedId, overlayType, setOverlayType };

    return <WarehouseContext.Provider value={warehouseContextValues}>
        {props.children}
    </WarehouseContext.Provider>
}
export default WarehouseContextProvider;