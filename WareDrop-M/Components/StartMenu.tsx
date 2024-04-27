import {Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import styles from "./StyleSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrl from "./BaseUrl";
import TransDTO from "./Interfaces/AvailableShowList";
import GetTransactions from "./Props/GetTransactions";

// @ts-ignore
function StartMenu({navigation,route}){
const [name,setName]=useState('User')
const [available,setAvailable] =useState<TransDTO[]>()
const [deliveries,setDeliveries] =useState<TransDTO[]>()
let news=route.params.id


    const fetchData = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if (baseUrl && storedToken) {
                const response = await axios.get(`${baseUrl}/user/userName`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${storedToken}`
                    }
                });
                setName(response.data.user_name);
            }
        } catch (error) {
            console.log('Itt az error: ' + error);
        }
    };

    useEffect(() => {
        GetTransactions({url:`${baseUrl}/transactions/available`,setState:setAvailable})
        GetTransactions({url:`${baseUrl}/transactions/worker`,setState:setDeliveries})
        fetchData()
    }, [news]);



    const handleLogout=async ()=>{
        await AsyncStorage.removeItem('token')
        navigation.navigate('Login')
    }



    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.Text}>Welcome {name}!</Text>
            </View>

            <View>
                <Text style={styles.Text}>Available deliveries: {available?.length}</Text>
            </View>

            <View>
                <Text style={styles.Text}>Your Deliveries: {deliveries?.length}</Text>
            </View>

                <TouchableOpacity
                    style={styles.loginBtn}
                onPress={()=>navigation.navigate('My_Deliveries')}
                >
                    <Text style={styles.TextInput}>My deliveries</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.loginBtn}
                onPress={()=>navigation.navigate('Available')}
                >
                    <Text style={styles.TextInput}>Available</Text>
                </TouchableOpacity>


            <TouchableOpacity
                style={styles.loginBtn}
                onPress={()=>navigation.navigate('Completed_Deliveries')}
            >
                <Text style={styles.TextInput}>Completed Deliveries</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.loginBtn}
            onPress={()=>handleLogout()}
            >
                <Text style={styles.TextInput}>Log out</Text>
            </TouchableOpacity>


        </View>
    )


}
export default StartMenu