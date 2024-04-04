import {View, Text, TextInput, Button, TouchableOpacity, Platform, Image, StyleSheet} from "react-native"
import React, {useState} from "react";
import axios  from "axios";
import styles from "./StyleSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "./BaseUrl";

// @ts-ignore
function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loginToggle,setLoginToggle]=useState(true)
    const [password2, setPassword2]=useState('')
    const [loggedIn,setLoggedIn]=useState(false)

    if (loggedIn) {
        setName('')
        setEmail('')
        setPassword('')
        setPassword2('')
        setLoggedIn(false)
    }



    const loginFunction =  () => {


        console.log('Elmegy a res-ig')
        console.log('Írd át a saját ip címedre!!')
        //A baseUrl-t írd át arra az ip címre amin van a backend, mert a localhost nem működik
         axios.post(`${baseUrl}/auth/login`, {
            email: email,
            password: password,

        }).then(async (response)=> {
             console.log(response.data)
            await AsyncStorage.setItem('token', response.data.accessToken)
             setLoggedIn(true)
             navigation.navigate('StartMenu')
        })
            .catch(function (error) {
                console.log(error)
                alert('Invalid credentials')
            });

    }


    const registerFunction =() =>{

        if (password==password2){
        axios.post(`${baseUrl}/auth/registerWorker`, {
            userName: name,
            userEmail: email,
            userPassword: password,

        }).then( (response)=> {
            console.log(response.data)
            loginFunction()

        })
            .catch(function (error) {
                console.log(error)
            });
        }
        else {
            alert('Password do not match')
        }

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
                    placeholder="Enter your email"
                    placeholderTextColor="#FFFFFF"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Enter your password"
                    placeholderTextColor="#FFFFFF"
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
                    placeholder="Enter your name"
                    placeholderTextColor="#FFFFFF"
                    value={name}
                    onChangeText={(text:string)=>setName(text)}
                    />

                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Enter your email"
                        placeholderTextColor="#FFFFFF"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Enter your password"
                        placeholderTextColor="#FFFFFF"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Enter your password agian"
                        placeholderTextColor="#FFFFFF"
                        value={password2}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword2(text)}
                    />
                </View>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => registerFunction()}>
                    <Text>Register</Text>
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