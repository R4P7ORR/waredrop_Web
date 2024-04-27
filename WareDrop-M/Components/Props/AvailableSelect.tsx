import React, {useEffect} from "react";
import TransDTO from "../Interfaces/AvailableShowList";
import {Text, TouchableOpacity, View} from "react-native";
import styles from "../StyleSheet";
import {format} from "date-fns";
import WarehouseDTO from "../Interfaces/Warehouse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../BaseUrl";
import axios from "axios";
import PatchTransactions from "./PatchTransactions";

interface ShowList{
    list: TransDTO
    back: () => void
    update?:boolean
    target:WarehouseDTO
    origin:WarehouseDTO
    setState?:React.Dispatch<React.SetStateAction<boolean>>
    url?:string
    Back?:()=>void

}
function AvailableSelect(props:ShowList){




    return(
        <View style={{marginTop:50}}>
        <Text style={styles.details}>Post Date: {format(props.list.trans_post_date, "yyyy-MM-dd")}</Text>
        {props.list.trans_arrived_date &&
        <Text style={styles.details}>Arrived Date: {format(props.list.trans_arrived_date, "yyyy-MM-dd")} </Text>}
        <Text style={styles.details}>Origin: {props.origin.location}</Text>
        <Text style={styles.details}>Target: {props.target.location}</Text>
        <Text style={styles.details}>Item Name: {props.list.items.item_name}</Text>
        <Text style={styles.details}>Item Quantity: {props.list.items.item_quantity}</Text>
        <View style={styles.details_con}>
        <TouchableOpacity
            style={[styles.TouchableOpacity, props.update ? styles.touchable2 : styles.touchable1]}
            onPress={()=>props.back()}>
        <Text style={styles.TextInput}>Go back </Text>
        </TouchableOpacity>
            {props.update &&
        <TouchableOpacity
            style={[styles.TouchableOpacity, styles.touchable2 ]}
             onPress={()=>PatchTransactions({id:props.list.trans_id,Back:props.Back!,setState:props.setState!,url:props.url!})}>
             <Text style={styles.TextInput}>Confirm</Text>
        </TouchableOpacity>
            }
        </View>
        </View>
    )

}
export default AvailableSelect