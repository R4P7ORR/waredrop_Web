import {Text, TouchableOpacity, View} from "react-native";
import styles from "./StyleSheet";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios  from "axios";
import baseUrl from "./BaseUrl";
import AvailableList from "./AvailableList";
import TransDTO from "./AvailableShowList";
import AvailableSelect from "./AvailableSelect";


// @ts-ignore
function Available({navigation}){
const [available,setAvailable] =useState<TransDTO[]>()
const [transactionId,setTransactionId]=useState<number|null>(null)
const [listId,setlistId]=useState<number|null>(null)


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


    const goBackToStartMenu = () => {
            navigation.navigate('StartMenu');
        };

        return(
            <View>
                {
                    listId===null ?

                <View>
                        {available !== undefined ? <AvailableList list={available} onClick={showTransactions}/> :
                        <Text>There aren't any available transactions </Text>}

                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={goBackToStartMenu}>
                        <Text style={styles.TextInput}>Go back</Text>
                    </TouchableOpacity>

                </View>
                  :
                        <View>
                            {available &&
                                <AvailableSelect list={available[listId]} back={goBackToAvailable} update={acceptTransaction}/>}


                        </View>
                }
            </View>


        );
    }
    export default Available