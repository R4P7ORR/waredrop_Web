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
import AwesomeAlert from "react-native-awesome-alerts";
import GetTransactions from "./Props/GetTransactions";

// @ts-ignore
function My_Deliveries({navigation}){
const [deliveries,setDeliveries] =useState<TransDTO[]>()
const [transactionId,setTransactionId]=useState<number|null>(null)
const [listId,setlistId]=useState<number|null>(null)
const [target,setTarget]=useState<WarehouseDTO>()
const [origin,setOrigin]=useState<WarehouseDTO>()
const [showAlert,setShowAlert]=useState(false)


        useEffect( () => {
            GetTransactions({url:`${baseUrl}/transactions/worker`,setState:setDeliveries})
                .then(()=>{
                    GetTransactions({url:`${baseUrl}/warehouses/warehouse/${deliveries![listId!].trans_origin_id}`, setTarget:setOrigin})
                    GetTransactions({url:`${baseUrl}/warehouses/warehouse/${deliveries![listId!].trans_target_id}`, setTarget:setTarget})
                }).catch((error)=>{
                    console.log('Fetching error: ',error)
            })
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
            <View style={styles.background}>
                {
                    listId===null ?

                        <View style={styles.page}>
                            <ScrollView style={{height:'80%'}}>
                            {deliveries === undefined||deliveries.length===0 ?  <Text>There aren't any transactions </Text>:
                                <AvailableList list={deliveries} onClick={showTransactions}/>  }

                            <AwesomeAlert
                                show={showAlert}
                                title="Transaction successfully completed"
                                titleStyle={{fontSize:22,color:"#ffa600"}}
                                useNativeDriver={true}

                            />
                            </ScrollView>
                            <TouchableOpacity
                                style={styles.TouchableOpacity}
                                onPress={()=>navigation.navigate('StartMenu',{id:2})}>
                                <Text style={styles.TextInput}>Go back</Text>
                            </TouchableOpacity>

                        </View>
                        :
                        <View>
                            {deliveries && origin && target &&
                                <AvailableSelect target={target} origin={origin} list={deliveries[listId]} back={goBackToMyDeliveries} update={true} url={`${baseUrl}/transactions`} setState={setShowAlert} Back={goBackToMyDeliveries}/>}


                        </View>
                }
            </View>


        );
    }


    export default My_Deliveries