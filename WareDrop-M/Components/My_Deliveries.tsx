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
function My_Deliveries({navigation}){
        const [deliveries,setDeliveries] =useState<TransDTO[]>()
        const [transactionId,setTransactionId]=useState<number|null>(null)
        const [listId,setlistId]=useState<number|null>(null)
        const [target,setTarget]=useState<WarehouseDTO>()
        const [origin,setOrigin]=useState<WarehouseDTO>()


        useEffect(() => {
            const List = async () => {
                try {
                    const storedToken = await AsyncStorage.getItem('token');
                    if (baseUrl && storedToken) {
                        axios.get(`${baseUrl}/transactions/worker`,{
                            headers:{
                                Authorization: `Bearer ${storedToken}`
                            }
                        })
                            .then((response) => {
                                const data=response.data;
                                setDeliveries(data);
                                console.log("Ez a lista: ", data)
                            })
                            .catch((error) => {
                                console.log("Ez egy error: ", error);
                            });
                    }
                } catch (error) {
                    console.log("Ez egy error: ", error);
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
            if (deliveries&&transactionId!==null){
                const getid =deliveries.findIndex((id)=>id.trans_id===transactionId)
                setlistId(getid)
            }
        }, [transactionId]);


        const goBackToMyDeliveries=()=>{
            setlistId(null)
            setTransactionId(null)
            console.log("listId: "+listId)
        }

        const acceptTransaction= async (id:number)=>{
            console.log("Transaction idja: " +id)
            try {
                const storedToken = await AsyncStorage.getItem('token');
                console.log("Ez a token: " +storedToken)
                if (baseUrl&&storedToken){
                    axios.patch(`${baseUrl}/transactions`,{
                            transId:id
                        },
                        {
                            headers:{
                                Authorization: `Bearer ${storedToken}`,
                            }
                        })
                        .then((response)=>{
                            goBackToMyDeliveries()
                            alert('Transaction successfully completed')
                        })
                        .catch((error)=>{
                            console.log('Patch errorja: ' + error)
                        })
                }
            }
            catch (error){
                console.log('try cath error: ' + error)


            }

        }



    const getOrigin= async ()=> {
        console.log("listaid ",listId)
        try {
            const storderToken = await AsyncStorage.getItem('token')
            console.log("toooken: ", storderToken)
            console.log("Deliveries jó lenne ha létezne: ", deliveries)
            if (storderToken && deliveries ) {
                axios.get(`${baseUrl}/warehouses/warehouse/${deliveries[listId!].trans_origin_id}`, {
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
            if (storderToken && deliveries) {
                axios.get(`${baseUrl}/warehouses/warehouse/${deliveries[listId!].trans_target_id}`, {
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

        return(
            <View>
                {
                    listId===null ?

                        <View>
                            {deliveries !== undefined ? <AvailableList list={deliveries} onClick={showTransactions}/> :
                                <Text>There aren't any available transactions </Text>}

                            <TouchableOpacity
                                style={styles.loginBtn}
                                onPress={()=>navigation.navigate('StartMenu')}>
                                <Text style={styles.TextInput}>Go back</Text>
                            </TouchableOpacity>

                        </View>
                        :
                        <View>
                            {deliveries && origin && target &&
                                <AvailableSelect target={target} origin={origin} list={deliveries[listId]} back={goBackToMyDeliveries} update={acceptTransaction}/>}


                        </View>
                }
            </View>


        );
    }


    export default My_Deliveries