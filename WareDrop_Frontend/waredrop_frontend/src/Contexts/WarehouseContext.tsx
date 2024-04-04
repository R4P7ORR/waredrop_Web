import React from "react";

export interface WarehouseContextValues {
    selectedId: number;
    setSelectedId: (selectedId: number) => void

    overlayType: string;
    setOverlayType: (type: string) => void;
}

const WarehouseContext = React.createContext<WarehouseContextValues>(null as unknown as WarehouseContextValues);

export default WarehouseContext;