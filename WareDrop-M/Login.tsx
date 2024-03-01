import {View, Text, TextInput, Button, TouchableOpacity} from "react-native"
import React, {useState} from "react";



const Login=() => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [text,setText]=useState('')
    const [id,setId]=useState('')
    const Loginall= async ()=> {
        try {
            const user = await fetch('http://192.168.11.72:3001/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_email: email, user_password: password})
            }).then(response => response.json())
                .then(user => {
                    return user;
                })
            setText(user.user_id);

        } catch (error) {
            console.log(error)
        }
    }




    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>E-mail:</Text>
            <TextInput
                placeholder={"Írja be az e-mail címét!"}
                onChangeText={newEmail => setEmail(newEmail)}
                defaultValue={email}
            />
            <Text>Jelszó:</Text>
            <TextInput
                placeholder={'Írja be a jelszót!'}
                onChangeText={newPassword => setPassword(newPassword)}
                defaultValue={password}
            />
            <TouchableOpacity onPress={() => Loginall()}>
                <Text>Submit</Text>
            </TouchableOpacity>
            <Text>{text}</Text>

        </View>
    )
}
export default Login