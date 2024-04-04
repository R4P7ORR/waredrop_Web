import React from "react";

export interface WarehouseContextValues {
    selectedId: number;
    setSelectedId: (selectedId: number) => void

    overlayType: string;
    setOverlayType: (type: string) => void;

    editing: boolean;
    setEditing: (set: boolean) => void;

    deleting: boolean;
    setDeleting: (set: boolean) => void;

    isAdmin: boolean;
    setIsAdmin: (set: boolean) => void;
}

const WarehouseContext = React.createContext<WarehouseContextValues>(null as unknown as WarehouseContextValues);

export default WarehouseContext;