import {View, Text, TextInput, Button, TouchableOpacity, Platform, Image, StyleSheet} from "react-native"
import React, {useState} from "react";
import axios from "axios";
import styles from "./StyleSheet";
const baseUrl="http://192.168.56.1:3001";


const Login= () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [text, setText] = useState('')



    const loginFunction= async ()=> {
        try {

            console.log('Elmegy a res-ig')
            const response = await axios.post(`${baseUrl}/auth/login`, {
                email:email,
                password:password,

            }).catch(function (error){
                console.log(error)
            });
                console.log('Atment a res')
          /*  if (response.status === 201) {
                alert(`Csináltál egy: ${JSON.stringify(response.data)} `)
                setEmail('')
                setPassword('')

            } else {
                alert("Hiba történt a bejelentkezéssel")
                console.log('Nem volt jó a res')
            } */
        } catch (error) {
            alert("Hiba történt")
            console.log('Bele se ment a responseba')
        }

    }

    return (

        <View style={styles.container}>
            <Image
                style={styles.img}
                source={require("./assets/WareDrop_logo.png")} />
            <View>
                <Text>Sign in</Text>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text)=>setPassword(text)}
                />
            </View>
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={loginFunction}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>

    )

}


export default Login