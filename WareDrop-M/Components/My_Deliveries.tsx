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
            setShowAlert(false)
        }


        return(
            <View style={styles.background}>
                {
                    listId===null ?

                        <View style={styles.page}>
                            <ScrollView style={{height:'80%'}}>
                            {deliveries === undefined||deliveries.length===0 ?
                                <Text style={styles.Text}>There aren't any transactions </Text>:
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
                                <AvailableSelect target={target} origin={origin} list={deliveries[listId]}
                                                 back={goBackToMyDeliveries} update={true} url={`${baseUrl}/transactions`}
                                                 setState={setShowAlert} Back={goBackToMyDeliveries}/>}


                        </View>
                }
            </View>


        );
    }


    export default My_Deliveries