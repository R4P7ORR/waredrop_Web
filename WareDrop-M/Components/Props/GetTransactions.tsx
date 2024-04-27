import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import TransDTO from "../Interfaces/AvailableShowList";
import WarehouseDTO from "../Interfaces/Warehouse";

interface TransactionsProps{
    url:string
    setState?:React.Dispatch<React.SetStateAction<TransDTO[]|undefined>>
    setTarget?:React.Dispatch<React.SetStateAction<WarehouseDTO|undefined>>
}


async function GetTransactions(props:TransactionsProps){
    try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
            axios.get(props.url,{
                headers:{
                    Authorization: `Bearer ${storedToken}`
                }
            })
                .then((response) => {
                    const data=response.data;
                    { props.setState!==undefined ? props.setState(data): props.setTarget!(data);}
                })
                .catch((error) => {
                    console.log("Ez egy error: ", error);
                });
        }
    } catch (error) {
        console.log("Ez egy error: ", error);
    }
}
export default GetTransactions