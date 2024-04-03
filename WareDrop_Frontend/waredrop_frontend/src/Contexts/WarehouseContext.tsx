import React from "react";

export interface WarehouseContextValue {
    selectedId: number;
    setSelectedId: (selectedId: number) => void
}

const WarehouseContext = React.createContext<WarehouseContextValue>(null as unknown as WarehouseContextValue);

export default WarehouseContext;