import {Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import styles from "./StyleSheet";
import TransDTO from "./AvailableShowList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "./BaseUrl";
import axios from "axios";
import AvailableList from "./AvailableList";
import AvailableSelect from "./AvailableSelect";

// @ts-ignore
function My_Deliveries({navigation}){
        const [deliveries,setDeliveries] =useState<TransDTO[]>()
        const [transactionId,setTransactionId]=useState<number|null>(null)
        const [listId,setlistId]=useState<number|null>(null)


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


        const goBackToStartMenu = () => {
            navigation.navigate('StartMenu');
        };

        return(
            <View>
                {
                    listId===null ?

                        <View>
                            {deliveries !== undefined ? <AvailableList list={deliveries} onClick={showTransactions}/> :
                                <Text>There aren't any available transactions </Text>}

                            <TouchableOpacity
                                style={styles.loginBtn}
                                onPress={goBackToStartMenu}>
                                <Text style={styles.TextInput}>Go back</Text>
                            </TouchableOpacity>

                        </View>
                        :
                        <View>
                            {deliveries &&
                                <AvailableSelect list={deliveries[listId]} back={goBackToMyDeliveries} update={acceptTransaction}/>}


                        </View>
                }
            </View>


        );
    }


    export default My_Deliveries