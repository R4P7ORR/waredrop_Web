import {ReactNode, useState} from "react";
import WarehouseContext from "../Contexts/WarehouseContext";

interface WarehouseContextProviderProps {
    children: ReactNode;
}

function DarkModeContextProvider(props: WarehouseContextProviderProps) {
    const [selectedId, setSelectedId] = useState(0);
    const darkModeContextValue = { selectedId, setSelectedId};

    return <WarehouseContext.Provider value={darkModeContextValue}>
        {props.children}
    </WarehouseContext.Provider>
}
export default DarkModeContextProvider;