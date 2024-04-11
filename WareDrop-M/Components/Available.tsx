import {Text, TouchableOpacity, View} from "react-native";
import styles from "./StyleSheet";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios  from "axios";
import baseUrl from "./BaseUrl";
import AvailableList from "./Props/AvailableList";
import TransDTO from "./Interfaces/AvailableShowList";
import AvailableSelect from "./Props/AvailableSelect";
import WarehouseDTO from "./Interfaces/Warehouse";


// @ts-ignore
function Available({navigation}){
const [available,setAvailable] =useState<TransDTO[]>()
const [transactionId,setTransactionId]=useState<number|null>(null)
const [listId,setlistId]=useState<number|null>(null)
const [target, setTarget]=useState<WarehouseDTO>()
const [origin, setOrigin]=useState<WarehouseDTO>()



    useEffect(() => {
        const List = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (baseUrl && storedToken) {
                    axios.get(`${baseUrl}/transactions/available`,{
                        headers:{
                            Authorization: `Bearer ${storedToken}`
                        }
                    })
                        .then((response) => {
                            const data=response.data;
                            setAvailable(data);
                        })
                        .catch((error) => {
                            console.log("Ez egy error: ", error);
                        });
                }
            } catch (error) {
                console.log("Ez egy error: ", error);
            }
        };
        List()
        getOrigin()
        getTarget();
    }, [listId]);




    const showTransactions = (id:number) => {
        console.log("Clicked transaction with ID:", id)
        setTransactionId(id)



    };

    useEffect(() => {
        if (available&&transactionId!==null){
            const getid =available.findIndex((id)=>id.trans_id===transactionId)
            setlistId(getid)
        }
    }, [transactionId]);


    const goBackToAvailable=()=>{
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
                    axios.patch(`${baseUrl}/transactions/assignWorker`,{
                      transId:id
                    },
                        {
                            headers:{
                                Authorization: `Bearer ${storedToken}`,
                            }
                        })
                        .then((response)=>{
                            goBackToAvailable()
                            alert('Transaction successfully accepted')
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
        try {
            const storderToken = await AsyncStorage.getItem('token')
            if (storderToken && available) {
                axios.get(`${baseUrl}/warehouses/warehouse/${available[listId!].trans_origin_id}`, {
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
            if (storderToken && available) {
                axios.get(`${baseUrl}/warehouses/warehouse/${available[listId!].trans_target_id}`, {
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
            <View >
                {
                    listId===null ?

                <View>
                        {available !== undefined ? <AvailableList list={available} onClick={showTransactions}/> :
                        <Text>There aren't any available transactions </Text>}

                    <TouchableOpacity
                        style={styles.TouchableOpacity}
                        onPress={()=>navigation.navigate('StartMenu')}>
                        <Text style={styles.TextInput}>Go back</Text>
                    </TouchableOpacity>

                </View>
                  :
                        <View>
                            {available && target&& origin &&
                                <AvailableSelect origin={origin} target={target} list={available[listId]} back={goBackToAvailable} update={acceptTransaction}/>}


                        </View>
                }
            </View>


        );
    }
    export default Available