import '../Styles/Control.css';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import Warehouse from "../Components/Warehouse/Warehouse";
import WarehouseList from "../Components/Warehouse/WarehouseList";
import WarehouseContext from "../Contexts/WarehouseContext";
interface WarehouseDisplayProps{
    loginToken: string;
}
function WarehouseDisplay({loginToken}: WarehouseDisplayProps) {
    const [warehouseList, setWareHouseList] = useState<Warehouse[]>([]);
    const {overlayType, setOverlayType, editingWarehouse, setEditingWarehouse, deletingWarehouse, setDeletingWarehouse, isAdmin, setIsAdmin} = useContext(WarehouseContext);

    useEffect(() => {
        if (loginToken !== "none"){
            axios.get('http://localhost:3001/auth/isAdmin',{
                headers: {authorization: "Bearer " + loginToken}
            }).then(res => {
                setIsAdmin(res.data.isAdmin);
            })

        }}, [loginToken]);
    useEffect(() => {
        if(loginToken !== "none"){
            if (isAdmin){
                axios.get('http://localhost:3001/warehouses', {
                    headers: {authorization: "Bearer " + loginToken}
                }).then(res => {
                    setWareHouseList(res.data);
                });
            } else {
                axios.get('http://localhost:3001/warehouses/user', {
                    headers: {authorization: "Bearer " + loginToken}
                }).then(res => {
                    if (res.data.length === 0) {
                        setWareHouseList(res.data);
                    }
                });
            }
        }
    }, [isAdmin, overlayType]);

    function addNewWarehouse(name: string, location: string){
        axios.post("http://localhost:3001/warehouses/new", {
            warehouseName: name,
            location: location
        }).then(res =>{
            console.log(res)
        })
    }
    return (
        <>
            {isAdmin&&
                <div className="warehouse-operator-buttons">
                    <button onClick={() => setOverlayType("warehouseAddForm")}>Add new</button>
                    <button onClick={() => {
                        setEditingWarehouse(!editingWarehouse);
                        setDeletingWarehouse(false);
                    }}>{!editingWarehouse? "Modify" : "Done"}</button>
                    <button onClick={() => {
                        setDeletingWarehouse(!deletingWarehouse);
                        setEditingWarehouse(false);
                    }}>{!deletingWarehouse? "Delete" : "Done"}</button>
                </div>
            }
            {warehouseList.length === 0 || warehouseList[0].warehouse_name === "empty" ?
                <div>
                    <h1>You don't have any Warehouses registered yet.</h1>
                </div>
                :
                <div className="container-listed-warehouses">
                    {warehouseList.map((warehouse: Warehouse) => (
                        <WarehouseList key={warehouse.warehouse_id}
                                       warehouse_id={warehouse.warehouse_id}
                                       warehouse_name={warehouse.warehouse_name}
                                       location={warehouse.location}/>
                    ))}
                </div>
            }
        </>
    )
}

export default WarehouseDisplay;