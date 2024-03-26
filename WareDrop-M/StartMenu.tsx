import {Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import styles from "./StyleSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as assert from "assert";
import axios from "axios";

function StartMenu({navigation}){
const [url,setUrl]=useState<string|null>('')
const [name,setName]=useState('User')
const [token,setToken]=useState<string|null>('')

 /*   useEffect(()=>{
        AsyncStorage.getItem('url').then((result)=>{
            setUrl(result)
        })
        AsyncStorage.getItem('token').then((result) => {
            if (result !== null) {
                setToken(result)
            }
        })
        axios.get(`${url}/user/getUserName`, {
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            setName(response.data.user_name)
        }).catch(function (error) {
            console.log('Itt az error: ' + error)
        })
    },[])
*/
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUrl = await AsyncStorage.getItem('url');
                const storedToken = await AsyncStorage.getItem('token');
                if (storedUrl && storedToken) {
                    setUrl(storedUrl);
                    setToken(storedToken);
                    const response =
                        await axios.get(`${storedUrl}/user/getUserName`, {
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
                onPress={()=>navigation.navigate('Avaliable')}
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