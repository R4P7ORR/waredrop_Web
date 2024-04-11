import {View, Text, TextInput, Button, TouchableOpacity, Platform, Image, StyleSheet} from "react-native"
import React, {useEffect, useRef, useState} from "react";
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
    const inputRef=useRef<TextInput|null>(null)

    if (loggedIn) {
        setName('')
        setEmail('')
        setPassword('')
        setPassword2('')
        setLoggedIn(false)
        setLoginToggle(true)
    }

    useEffect(() => {
        if (inputRef.current && !inputRef.current.props.defaultValue) {
            const textLength = 0;
            const middlePosition = Math.floor(textLength / 2);
            inputRef.current.setNativeProps({ selection: { start: middlePosition, end: middlePosition } });
        }
    }, []);


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

        if(!name) {
            alert('Name required')
        }else if (name.length<3) {
            alert('Name must be at least 3 characters')
        }
        else {
           if (!email) {
               alert('Email is required')
           }
           else if (!/\S+@\S+\.\S+/.test(email)){
               alert('Email is invalid')
           }else {
               if (!password) {
                   alert('Password required')
               }else if(password.length<6){
                alert('Password must be at least 6 characters.')
               }
               else{
                   if (password == password2) {
                       axios.post(`${baseUrl}/auth/registerWorker`, {
                           userName: name,
                           userEmail: email,
                           userPassword: password,

                       }).then((response) => {
                           console.log(response.data)
                           alert('Sikeresen megcsináltad a felhasználót')
                           loginFunction()

                       })
                           .catch(function (error) {
                               alert('Nem sikerült a felhasználót megcsinálni :(')
                               console.log(error)
                           });
                   }else{
                       alert('Password does not match')
                   }
               }
           }
        }

    }
    const toggleRegister= ()=>{
        if (loginToggle){
            setLoginToggle(false)
        }else{
            setLoginToggle(true)
        }


    }

    const handleViewPress = () =>{
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    return (
        loginToggle ?
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={require("../assets/WareDrop_logo.png")}/>
            <View style={styles.inputView} onTouchStart={handleViewPress}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Enter your email"
                    placeholderTextColor="#FFFFFF"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputView} onTouchStart={handleViewPress}>
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
                    source={require("../assets/WareDrop_logo.png")}/>

                <View style={styles.inputView} onTouchStart={handleViewPress}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Enter your name"
                    placeholderTextColor="#FFFFFF"
                    value={name}
                    onChangeText={(text:string)=>setName(text)}
                    />

                </View>
                <View style={styles.inputView} onTouchStart={handleViewPress}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Enter your email"
                        placeholderTextColor="#FFFFFF"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.inputView} onTouchStart={handleViewPress}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Enter your password"
                        placeholderTextColor="#FFFFFF"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View style={styles.inputView} onTouchStart={handleViewPress}>
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