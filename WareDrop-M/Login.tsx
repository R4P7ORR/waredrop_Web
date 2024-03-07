import {View, Text, TextInput, Button, TouchableOpacity} from "react-native"
import React, {useState} from "react";
import axios from "axios";
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

        <View>
            <View>
                <Text>Sign in</Text>
            </View>
            <View>
                <TextInput
                    placeholder="Your Email"
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                />
            </View>
            <View>
                <TextInput
                    placeholder="Your Password"
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                />
            </View>
            <View>
                <Button
                    title="Submit"
                    onPress={()=>loginFunction()}
                />
            </View>
        </View>

    )
}
export default Login