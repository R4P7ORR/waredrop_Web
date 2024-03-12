import {View, Text, TextInput, Button, TouchableOpacity, Platform, Image, StyleSheet} from "react-native"
import React, {useState} from "react";
import axios from "axios";
import styles from "./StyleSheet";
const baseUrl="http://192.168.11.120:3001";


function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [text, setText] = useState('')
    const [token,setToken]=useState('')


    const loginFunction =  () => {
        //try {

        console.log('Elmegy a res-ig')
         axios.post(`${baseUrl}/auth/login`, {
            email: email,
            password: password,

        }).then((response)=> {
             console.log(response.data.token)
        })
            .catch(function (error) {
                console.log(error)
            });

    }


    return (

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
        </View>

    )

}


export default Login