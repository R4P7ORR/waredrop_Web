import TransactionDisplay from "../../Displays/TransactionDisplay";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import WarehouseContext from "../../Contexts/WarehouseContext";
import Transaction from "./Transaction";
import {log} from "node:util";

interface TransactionProps{
    loginToken: string;
}

function Transactions({loginToken}: TransactionProps){
    const {isAdmin, warehouseList} = useContext(WarehouseContext);
    const [activeTransactions, setActiveTransactions] = useState<Transaction[]>();
    const [completedTransactions, setCompletedTransactions] = useState<Transaction[]>();
    useEffect(() => {
        if (isAdmin) {
            axios.get('http://localhost:3001/transactions/active', {
                headers: {authorization: "Bearer " + loginToken},
            }).then(res => {
                setActiveTransactions(res.data);
            });
            axios.get('http://localhost:3001/transactions', {
                headers: {authorization: "Bearer " + loginToken},
            }).then(res => {
                setCompletedTransactions(res.data);
            });
            axios.get('http://localhost:3001/warehouses/all', {
                headers: {authorization: "Bearer " + loginToken},
            }).then(res => {
                console.log(res.data)
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
export default Transactions;