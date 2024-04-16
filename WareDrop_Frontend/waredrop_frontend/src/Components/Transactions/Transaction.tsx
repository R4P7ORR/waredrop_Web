import TransactionDisplay from "../../Displays/TransactionDisplay";
import axios from "axios";
import {useContext, useEffect} from "react";
import WarehouseContext from "../../Contexts/WarehouseContext";

interface TransactionProps{
    loginToken: string;
}

function Transaction({loginToken}: TransactionProps){
    const {isAdmin, warehouseList} = useContext(WarehouseContext);
    useEffect(() => {
        if (isAdmin) {
            axios.get('http://localhost:3001/transactions', {
                headers: {authorization: "Bearer " + loginToken},
            }).then(res => {
                console.log(res);
            });
        } else {
            warehouseList.forEach(warehouse => {
                axios.get('http://localhost:3001/transactions/warehouse/' + warehouse.warehouse_id
                ).then(res => {
                    console.log(res);
                })
            })
        }
    }, [loginToken, isAdmin]);


    return (
        <></>
    )
}
export default Transaction;