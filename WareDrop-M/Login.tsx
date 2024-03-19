import {View, Text, TextInput, Button, TouchableOpacity, Platform, Image, StyleSheet} from "react-native"
import React, {useState} from "react";
import axios  from "axios";
import styles from "./StyleSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseUrl="http://192.168.11.120:3001";


function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loginToggle,setLoginToggle]=useState(true)


    const loginFunction =  () => {


        console.log('Elmegy a res-ig')
        //A baseUrl-t írd át arra az ip címre amin van a backend, mert a localhost nem működik
         axios.post(`${baseUrl}/auth/login`, {
            email: email,
            password: password,

        }).then(async (response)=> {
             console.log(response.data)
            await AsyncStorage.setItem('token', response.data.accessToken)
             navigation.navigate('StartMenu')
        })
            .catch(function (error) {
                console.log(error)
            });

    }

    const registerFunction =() =>{
        axios.post(`${baseUrl}/auth/register`, {
            name: name,
            email: email,
            password: password,

        }).then(async (response)=> {
            console.log(response.data)
            await AsyncStorage.setItem('token', response.data.accessToken)
            navigation.navigate('StartMenu')
        })
            .catch(function (error) {
                console.log(error)
            });
    }
    const toggleRegister= ()=>{
        if (loginToggle){
            setLoginToggle(false)
        }else{
            setLoginToggle(true)
        }


    }

    return (

        loginToggle ?
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={require("./assets/WareDrop_logo.png")}/>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => loginFunction()}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>toggleRegister()}
            >
            <Text>Don't have account?</Text>
            </TouchableOpacity>
        </View>

            :
            <View style={styles.container}>
                <Image
                    style={styles.img}
                    source={require("./assets/WareDrop_logo.png")}/>

                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Your name"
                    placeholderTextColor="#FFFFFF"
                    value={name}
                    onChangeText={(text:string)=>setName(text)}
                    />

                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email"
                        placeholderTextColor="#FFFFFF"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#FFFFFF"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => registerFunction()}>
                    <Text>Login</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() =>toggleRegister()}
                >
                    <Text>Do you have an account?</Text>
                </TouchableOpacity>
            </View>
    )

}


export default Login