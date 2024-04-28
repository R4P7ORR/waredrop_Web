import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../BaseUrl";
import axios from "axios";
import React from "react";

interface PatchProps{
    id:number
    Back:()=>void
    setState:React.Dispatch<React.SetStateAction<boolean>>
    url:string
}
async function PatchTransactions(props:PatchProps){
    try {
        const storedToken = await AsyncStorage.getItem('token');
        if (baseUrl&&storedToken){
            axios.patch(props.url,{
                    transId:props.id
                },
                {
                    headers:{
                        Authorization: `Bearer ${storedToken}`,
                    }
                })
                .then((response)=>{
                    console.log('Ez lefut?????')
                    props.Back()
                    props.setState(true)
                })
                .catch((error)=>{
                    console.log('Patch errorja: ' + error)
                })
        }
    }
    catch (error){
        console.log('try cath error: ' + error)
    }
}
export default PatchTransactions