import {Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import styles from "./StyleSheet";
import TransDTO from "./Interfaces/AvailableShowList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "./BaseUrl";
import axios from "axios";
import AvailableList from "./Props/AvailableList";
import AvailableSelect from "./Props/AvailableSelect";
import WarehouseDTO from "./Interfaces/Warehouse";

// @ts-ignore
function Completed_Deliveries({navigation}){
    const [completedDeliveries,setCompletedDeliveries] =useState<TransDTO[]>()
    const [transactionId,setTransactionId]=useState<number|null>(null)
    const [listId,setlistId]=useState<number|null>(null)
    const [target,setTarget]=useState<WarehouseDTO>()
    const [origin,setOrigin]=useState<WarehouseDTO>()


    useEffect(() => {
        const List = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (baseUrl && storedToken) {
                    axios.get(`${baseUrl}/transactions/doneBy`,{
                        headers:{
                            Authorization: `Bearer ${storedToken}`
                        }
                    })
                        .then((response) => {
                            const data=response.data;
                            setCompletedDeliveries(data);
                            console.log("Ez a lista: ", data)
                        })
                        .catch((error) => {
                            console.log("Ez axios egy error: ", error);
                        });
                }
            } catch (error) {
                console.log("Ez try catch egy error: ", error);
            }
        };
        List();
        getOrigin();
        getTarget();
        console.log("UseEffect origin: ", origin)
        console.log("UseEffect target: ", target)
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


    const goBackToCompletedDeliveries=()=>{
        setlistId(null)
        setTransactionId(null)
        console.log("listId: "+listId)
    }


    const getOrigin= async ()=> {
        console.log("listaid ",listId)
        try {
            const storderToken = await AsyncStorage.getItem('token')
            if (storderToken && completedDeliveries ) {
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
        console.log("lisstaid ", listId)
        try {
            const storderToken = await AsyncStorage.getItem('token')
            console.log("Token: ",storderToken)
            if (storderToken && completedDeliveries) {
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

    const kiiras=()=>{
        console.log('asd')
        console.log('kiírás: ',completedDeliveries)
        return 'kiiras'
    }

    return(
        <View>
            {listId===null ?
                <View>
                    {completedDeliveries !== undefined ?
                 <AvailableList list={completedDeliveries} onClick={showTransactions}/>
                        :
                        <Text>There aren't any available transactions </Text>}
                        <TouchableOpacity
                            style={styles.loginBtn}
                            onPress={()=>navigation.navigate('StartMenu')}>
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

    /*
     */
}


export default Completed_Deliveries