import {Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import styles from "./StyleSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrl from "./BaseUrl";

// @ts-ignore
function StartMenu({navigation}){
const [name,setName]=useState('User')

    useEffect(() => {
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

        fetchData();
    }, []);


    const handleLogout=async ()=>{
        await AsyncStorage.removeItem('token')
        navigation.navigate('Login')
    }


    return(
        <View style={styles.container}>
            <View>
                <Text>Welcome {name}!</Text>
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
                    <Text style={styles.TextInput}>Avaliable</Text>
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