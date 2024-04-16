import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrl from "../BaseUrl";
import React from "react";
import WarehouseDTO from "../Interfaces/Warehouse";
import TransDTO from "../Interfaces/AvailableShowList";

interface GetProps{
    url:string
    setTarget:React.Dispatch<React.SetStateAction<WarehouseDTO|undefined>>
    state:TransDTO[]|undefined

}

async function GetOrigin_Target(props:GetProps){


        try {
            const storderToken = await AsyncStorage.getItem('token')
            if (storderToken&&props.state) {
                axios.get(props.url, {
                    headers: {
                        Authorization: `Bearer ${storderToken}`
                    }
                })
                    .then((response) => {
                        const data = response.data;
                        props.setTarget(data)
                        console.log("Ez az origin: ", data)
                    })
                    .catch((error) => {
                        console.log("Ez az origin error: ", error)
                    })
            }
        }
        catch (error){
            console.log("Target catch error: ", error)
        }


}

export default GetOrigin_Target