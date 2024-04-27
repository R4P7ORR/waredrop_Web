import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import styles from "./StyleSheet";
import TransDTO from "./Interfaces/AvailableShowList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "./BaseUrl";
import axios from "axios";
import AvailableList from "./Props/AvailableList";
import AvailableSelect from "./Props/AvailableSelect";
import WarehouseDTO from "./Interfaces/Warehouse";
import GetTransactions from "./Props/GetTransactions";
import GetOrigin_Target from "./Props/GetOrigin_Target";

// @ts-ignore
function Completed_Deliveries({navigation}){
    const [completedDeliveries,setCompletedDeliveries] =useState<TransDTO[]>()
    const [transactionId,setTransactionId]=useState<number|null>(null)
    const [listId,setlistId]=useState<number|null>(null)
    const [target,setTarget]=useState<WarehouseDTO>()
    const [origin,setOrigin]=useState<WarehouseDTO>()


    useEffect(() => {

        GetTransactions({url:`${baseUrl}/transactions/doneBy`,setState:setCompletedDeliveries})
            .then(
                () =>{GetOrigin_Target({
                    url: `${baseUrl}/warehouses/warehouse/${completedDeliveries![listId!].trans_origin_id}`,
                    setTarget: setOrigin,
                    state:completedDeliveries
                })
                 GetOrigin_Target({
                    url: `${baseUrl}/warehouses/warehouse/${completedDeliveries![listId!].trans_target_id}`,
                    setTarget: setTarget,
                    state:completedDeliveries
                })}).catch((error)=>{
            console.log('Fetching error: ',error)
        })

    }, [listId]);

    const showTransactions = (id:number) =>{
        console.log("Clicked transaction with ID:", id)
        setTransactionId(id)
    };

    useEffect(() => {
        if (completedDeliveries&&transactionId!==null){
            const getid =completedDeliveries.findIndex((id)=>id.trans_id===transactionId)
            setlistId(getid)
        }
    }, [transactionId]);


    const getOrigin= async ()=> {
        try {
            const storderToken = await AsyncStorage.getItem('token')
            if (storderToken&&completedDeliveries) {
                axios.get(`${baseUrl}/warehouses/warehouse/${completedDeliveries[listId!].trans_origin_id}`, {
                    headers: {
                        Authorization: `Bearer ${storderToken}`
                    }
                })
                    .then((response) => {
                        const data = response.data;
                        setOrigin(data)
                        console.log("Ez az origin: ", data)
                    })
                    .catch((error) => {
                        console.log("Ez az origin error: ", error)
                    })
            }
        }
        catch (error){
            console.log("Target catch error: ", error)
        }
    }

    const getTarget= async ()=> {
        try {
            const storderToken = await AsyncStorage.getItem('token')
            if (storderToken&&completedDeliveries) {
                axios.get(`${baseUrl}/warehouses/warehouse/${completedDeliveries[listId!].trans_target_id}`, {
                    headers: {
                        Authorization: `Bearer ${storderToken}`
                    }
                })
                    .then((response) => {
                        const data = response.data;
                        setTarget(data)
                        console.log("Ez a target: ", data)
                        console.log("Ez a target stateben: ", target)
                    })
                    .catch((error) => {
                        console.log("Ez a target error: ", error)
                    })
            }
        }
        catch (error){
            console.log("Target catch error: ", error)
        }
    }
    const goBackToCompletedDeliveries=()=>{
        setlistId(null)
        setTransactionId(null)
        console.log("listId: "+listId)
    }

    return(
        <View style={styles.background}>
            {listId===null ?
                <View style={styles.page}>
                    <ScrollView style={{height:'80%'}}>
                    {completedDeliveries === undefined||completedDeliveries.length===0 ?
                        <Text style={styles.Text}>There aren't any completed transactions </Text>
                        :
                        <AvailableList list={completedDeliveries} onClick={showTransactions}/>}
                    </ScrollView>
                        <TouchableOpacity
                            style={styles.TouchableOpacity}
                            onPress={()=>navigation.navigate('StartMenu',{id:3})}>
                            <Text style={styles.TextInput}>Go back</Text>
                        </TouchableOpacity>
                    </View> :
                    <View>
                        {completedDeliveries && origin && target &&
                            <AvailableSelect target={target} origin={origin} list={completedDeliveries[listId]} back={goBackToCompletedDeliveries}/>}
                    </View>
            }
        </View>


    );
}
export default Completed_Deliveries