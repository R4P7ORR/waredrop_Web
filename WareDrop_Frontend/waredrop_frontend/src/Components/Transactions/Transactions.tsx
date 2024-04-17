import TransactionDisplay from "../../Displays/TransactionDisplay";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import WarehouseContext from "../../Contexts/WarehouseContext";
import Transaction from "./Transaction";
import User from "../Users/User";

interface TransactionProps{
    loginToken: string;
}

function Transactions({loginToken}: TransactionProps){
    const {isAdmin, warehouseList, setOverlayType, setViewTransaction} = useContext(WarehouseContext);
    const [viewCompleted, setViewCompleted] = useState<boolean>(false);
    const [activeTransactions, setActiveTransactions] = useState<Transaction[]>([]);
    const [completedTransactions, setCompletedTransactions] = useState<Transaction[]>([]);
    useEffect(() => {
        if (isAdmin) {
            axios.get('http://localhost:3001/transactions/active', {
                headers: {authorization: "Bearer " + loginToken},
            }).then(res => {
                console.log("active ",res.data)
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
                    console.log(res.data)
                    setActiveTransactions(res.data);
                })
            })
        }
    }, [loginToken, isAdmin, viewCompleted]);

    function FindWarehouse(id: number): string {
        for (const warehouse of warehouseList) {
            if (warehouse.warehouse_id === id) {
                return warehouse.warehouse_name;
            }
        }
        return "Foreign Warehouse";
    }

    function handleShowDetails(id: number){
        let select;
        if (viewCompleted) {
            select = completedTransactions.filter(trans => trans.trans_id === id);
        } else {
            select = activeTransactions.filter(trans => trans.trans_id === id);
        }
        setViewTransaction(select[0]);
        setOverlayType("transactionDetails");
    }

    function CheckForNull(date: string | null){
        if (date === null){
            return 9999;
        } else {
            return date;
        }
    }

    function SortTransactions(sortBy: string){
        let updateTransactions: Transaction[];
        if (sortBy === "origin"){
            updateTransactions = [...activeTransactions].sort((a,b) => {
                return FindWarehouse(a.trans_origin_id).toLowerCase() > FindWarehouse(b.trans_origin_id).toLowerCase() ? 1: -1;
            });
        } else if(sortBy === "destination"){
            updateTransactions = [...activeTransactions].sort((a,b) => {
                return FindWarehouse(a.trans_target_id).toLowerCase() > FindWarehouse(b.trans_target_id).toLowerCase() ? 1: -1;
            });
        } else if (sortBy === "sent"){
            updateTransactions = [...activeTransactions].sort((a,b) => {
                return a.trans_post_date > b.trans_post_date ? 1: -1;
            });
        } else {
            updateTransactions = [...activeTransactions].sort((a,b) => {
                return CheckForNull(a.trans_arrived_date) > CheckForNull(b.trans_arrived_date) ? 1: -1;
            });
        }
        setActiveTransactions(updateTransactions)
    }

    return (
        <>
        {isAdmin&&
        <div className="warehouse-operator-buttons">
            <button className="transaction-view-button" onClick={() => setViewCompleted(false)}>In Progress</button>
            <button className="transaction-view-button" onClick={() => setViewCompleted(true)}>Completed</button>
        </div>
}
        <div className="container-users container-box">
                {warehouseList.length === 0 ? <h1 style={{textAlign: "center"}}>There are no warehouses!</h1> : <>
                <div className="transaction-line align-horizontal clickable">
                    <h3 className="transaction-location" onClick={() => SortTransactions("origin")}>Origin</h3>
                    <h3 className="transaction-location" onClick={() => SortTransactions("destination")}>Destination</h3>
                    <h3 className="transaction-date" onClick={() => SortTransactions("sent")}>Sent on</h3>
                    <h3 className="transaction-date" onClick={() => SortTransactions("arrived")}>Arrived on</h3>
                </div>
                    <div className="container-body">
                        <div className="transaction-container-inner-body clickable">
                            {!viewCompleted?
                                activeTransactions.length !== 0 ?
                                    activeTransactions.map((transaction: Transaction) => (
                                        <TransactionDisplay
                                                            transId={transaction.trans_id}
                                                            transOrigin={FindWarehouse(transaction.trans_origin_id)}
                                                            transDestination={FindWarehouse(transaction.trans_target_id)}
                                                            transPost={transaction.trans_post_date}
                                                            handleClick={(id) => handleShowDetails(id)}
                                                            transArrived={transaction.trans_arrived_date === null?"In Transit"
                                                                :transaction.trans_arrived_date}/>
                                    ))
                                :
                                <>
                                    <h2 style={{textAlign: "center"}}>There are no active transactions</h2>
                                </>
                                :
                                completedTransactions.length !== 0 ?
                                    completedTransactions.map((transaction: Transaction) => (
                                        <TransactionDisplay transId={transaction.trans_id}
                                                            transOrigin={FindWarehouse(transaction.trans_origin_id)}
                                                            transDestination={FindWarehouse(transaction.trans_target_id)}
                                                            transPost={transaction.trans_post_date}
                                                            handleClick={(id) => handleShowDetails(id)}
                                                            transArrived={transaction.trans_arrived_date!}/>
                                    ))
                                    :
                                    <>
                                        <h2 style={{textAlign: "center"}}>There are no completed transactions</h2>
                                    </>
                            }
                        </div>
                    </div>
                </>}
            </div>
        </>
    )
}

export default Transactions;