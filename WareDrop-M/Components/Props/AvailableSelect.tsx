import React, {useEffect} from "react";
import TransDTO from "../Interfaces/AvailableShowList";
import {Text, TouchableOpacity, View} from "react-native";
import styles from "../StyleSheet";
import {format} from "date-fns";
import WarehouseDTO from "../Interfaces/Warehouse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../BaseUrl";
import axios from "axios";

interface ShowList{
    list: TransDTO
    back: () => void
    update?: (id:number) => void
    target:WarehouseDTO
    origin:WarehouseDTO

}
function AvailableSelect(props:ShowList){





    return(
        <View>
        <Text style={styles.details}>Date: {format(props.list.trans_post_date, "yyyy-MM-dd")}</Text>
        <Text style={styles.details}>Origin: {props.origin.location}</Text>
        <Text style={styles.details}>Target: {props.target.location}</Text>
        <Text style={styles.details}>ItemId: {props.list.item_item_id} </Text>
        <Text style={styles.details}>Item name: {props.list.items.item_name}</Text>
        <Text style={styles.details}>Item quantity: {props.list.items.item_quantity}</Text>
        <View>
        <TouchableOpacity
            onPress={()=>props.back()}>
        <Text>Go back </Text>
        </TouchableOpacity>
            {props.update &&
        <TouchableOpacity
             onPress={()=>props.update!(props.list.trans_id)}>
             <Text>Confirm</Text>
        </TouchableOpacity>
            }
        </View>
        </View>
    )

}
export default AvailableSelect