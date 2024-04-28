import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "./StyleSheet";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios  from "axios";
import baseUrl from "./BaseUrl";
import AvailableList from "./Props/AvailableList";
import TransDTO from "./Interfaces/AvailableShowList";
import AvailableSelect from "./Props/AvailableSelect";
import WarehouseDTO from "./Interfaces/Warehouse";
import AwesomeAlert from "react-native-awesome-alerts";
import GetTransactions from "./Props/GetTransactions";

// @ts-ignore
function Available({navigation}){
const [available,setAvailable] =useState<TransDTO[]>()
const [transactionId,setTransactionId]=useState<number|null>(null)
const [listId,setlistId]=useState<number|null>(null)
const [target, setTarget]=useState<WarehouseDTO>()
const [origin, setOrigin]=useState<WarehouseDTO>()
const [showAlert,setShowAlert]=useState(false)

useEffect(() => {
   GetTransactions({url:`${baseUrl}/transactions/available`,setState:setAvailable})
      .then(()=>{
         GetTransactions({url:`${baseUrl}/warehouses/warehouse/${available![listId!].trans_origin_id}`, setTarget:setOrigin})
         GetTransactions({url:`${baseUrl}/warehouses/warehouse/${available![listId!].trans_target_id}`, setTarget:setTarget})
        }).catch((error)=>{
       console.log('Fetching error: ',error)
     })
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
        setShowAlert(false)
    }

        return(
            <View style={styles.background}>
                {
                    listId===null ?
                <View style={styles.page} >
                    <ScrollView style={{height:'80%'}}>
                        {available===undefined||available.length===0 ? <Text style={styles.Text}>There aren't any available transactions </Text> :
                            <AvailableList list={available} onClick={showTransactions}/>                       }
                    <AwesomeAlert
                        show={showAlert}
                        title="Transaction successfully accepted"
                        titleStyle={{fontSize:22,color:"#ffa600"}}
                        useNativeDriver={true} />
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.TouchableOpacity}
                        onPress={()=>navigation.navigate('StartMenu',{id:1})}>
                        <Text style={styles.TextInput}>Go back</Text>
                    </TouchableOpacity>
                </View>
                  :
                        <View style={{marginTop:50}}>
                            {available && target&& origin &&
                                <AvailableSelect
                                    origin={origin}
                                    target={target}
                                    list={available[listId]}
                                    back={goBackToAvailable}
                                    update={true}
                                    setState={setShowAlert}
                                    url={`${baseUrl}/transactions/assignWorker`}
                                    Back={goBackToAvailable}/>}
                        </View>
                }
            </View>
        );
    }
    export default Available